// backend/service/auth.service.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';//compare passwords securely
import * as crypto from 'crypto';//generate secure random tokens
import { LoginDto, RegisterDto, SSOLoginDto } from '../dto/authDto';
import { MailService } from './mailService';

const prisma = new PrismaClient();

export class AuthService {
  private mailService: MailService;

  constructor() {
    this.mailService = new MailService();
  }

  async register(data: RegisterDto) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name
      }
    });

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async googleLogin(data: { email: string, name: string, googleId: string }) {
    try {
      // Check if user already exists
      let user = await prisma.user.findUnique({
        where: { email: data.email }
      });
      
      if (!user) {
        // Create new user if they don't exist
        user = await prisma.user.create({
          data: {
            email: data.email,
            name: data.name || data.email.split('@')[0], // Use part of email as name if not provided
            // Remove googleId if it's not in your schema yet
            is_sso_user: true
          }
        });
        
        // If googleId is added to schema, you can update the user separately
        if (user) {
          try {
            user = await prisma.user.update({
              where: { id: user.id },
              data: {
                // This will work after adding googleId to the schema and running the migration
                googleId: data.googleId
              }
            });
          } catch (err) {
            console.error('Could not update user with googleId:', err);
            // Continue even if this fails - the user is created
          }
        }
      } else if (user) {
        // Update existing user
        try {
          user = await prisma.user.update({
            where: { id: user.id },
            data: {
              is_sso_user: true,
              // This will work after adding googleId to the schema and running the migration
              googleId: data.googleId
            }
          });
        } catch (err) {
          console.error('Could not update user with googleId:', err);
          // Continue with the existing user
        }
      }
      
      // Update last login time
      await prisma.user.update({
        where: { id: user.id },
        data: { last_login: new Date() }
      });
  
      // Create a new session for the authenticated user
      const sessionId = crypto.randomBytes(32).toString('hex');
      const expires = new Date();
      expires.setHours(expires.getHours() + 24); // 24 hours session
  
      await prisma.session.create({
        data: {
          id: sessionId,
          user_id: user.id,
          expires,
          data: JSON.stringify({ authenticated: true, provider: 'google' })
        }
      });
      
      // Return the user without sensitive information
      const { password, ...userWithoutPassword } = user;
      
      return {
        sessionId,
        user: userWithoutPassword
      };
    } catch (error) {
      console.error('Google login error:', error);
      throw new Error(`Google login failed: ${error.message}`);
    }
  }
  

  async login(data: LoginDto) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.password) {
      throw new Error('This account uses SSO for login');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Update last login time
    await prisma.user.update({
      where: { id: user.id },
      data: { last_login: new Date() }
    });

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Add these methods to your AuthService class in backend/service/auth.service.ts

  async requestPasswordReset(email: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });
  
    if (!user) {
      // For security reasons, don't reveal that the email doesn't exist
      return { message: 'If your email exists in our system, you will receive a password reset link' };
    }
  
    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // 1 hour expiration
    
    // Check if a password reset record already exists for this email
    const existingReset = await prisma.passwordReset.findUnique({
      where: { email: user.email }
    });
  
    if (existingReset) {
      // Update existing record instead of creating a new one
      await prisma.passwordReset.update({
        where: { email: user.email },
        data: {
          token,
          expires
        }
      });
    } else {
      // Create new record if none exists
      await prisma.passwordReset.create({
        data: {
          email: user.email,
          token,
          expires
        }
      });
    }
  
    // Send email with reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const emailSent = await this.mailService.sendPasswordResetEmail(user.email, resetLink);
    
    if (!emailSent) {
      console.warn(`Password reset email could not be sent to ${user.email}`);
    }
    
    // Return success even if the email fails, to avoid revealing information
    return { message: 'If your email exists in our system, you will receive a password reset link' };
  }

async resetPassword(token: string, newPassword: string) {
  // Find valid token
  const resetRecord = await prisma.passwordReset.findUnique({
      where: { token }
  });

  if (!resetRecord) {
      throw new Error('Invalid or expired token');
  }

  if (new Date() > resetRecord.expires) {
      // Delete expired token
      await prisma.passwordReset.delete({
          where: { token }
      });
      throw new Error('Token expired');
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user password
  await prisma.user.update({
      where: { email: resetRecord.email },
      data: { password: hashedPassword }
  });

  // Delete used token
  await prisma.passwordReset.delete({
      where: { token }
  });

  return { message: 'Password reset successful' };
  }
  
  async initiateSSO(data: SSOLoginDto) {
    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      // Create new SSO user
      user = await prisma.user.create({
        data: {
          email: data.email,
          is_sso_user: true
        }
      });
    }

    // Generate one-time token for SSO
    const token = crypto.randomBytes(32).toString('hex');
    
    // Store token in session (would normally use Redis or similar)
    // For simplicity, we're using a simple expiration-based approach
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 15); // 15 minutes expiration
    
    await prisma.session.create({
      data: {
        id: token,
        user_id: user.id,
        expires,
        data: JSON.stringify({ type: 'sso-link' })
      }
    });

    // Send email with login link
    const loginLink = `${process.env.FRONTEND_URL}/sso-login?token=${token}`;
    await this.mailService.sendSSOEmail(data.email, loginLink);
    
    return { message: 'SSO login link sent to your email' };
  }

  async validateSSOToken(token: string) {
    const session = await prisma.session.findUnique({
      where: { id: token }
    });

    if (!session) {
      throw new Error('Invalid or expired token');
    }

    if (new Date() > session.expires) {
      // Delete expired session
      await prisma.session.delete({
        where: { id: token }
      });
      throw new Error('Token expired');
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: session.user_id }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Update last login time
    await prisma.user.update({
      where: { id: user.id },
      data: { last_login: new Date() }
    });

    // Delete the one-time token
    await prisma.session.delete({
      where: { id: token }
    });

    // Create a new session for the authenticated user
    const sessionId = crypto.randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 24); // 24 hours session

    await prisma.session.create({
      data: {
        id: sessionId,
        user_id: user.id,
        expires,
        data: JSON.stringify({ authenticated: true })
      }
    });

    return { 
      sessionId, 
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };
  }

  async validateSession(sessionId: string) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId }
    });

    if (!session) {
      return null;
    }

    if (new Date() > session.expires) {//If the token has expired, it is deleted from the session table
      // Delete expired session
      await prisma.session.delete({
        where: { id: sessionId }
      });
      return null;
    }

    // Return user info
    const user = await prisma.user.findUnique({
      where: { id: session.user_id }
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name
    };
  }

  async logout(sessionId: string) {
    await prisma.session.delete({
      where: { id: sessionId }
    });
    return { message: 'Logged out successfully' };
  }

  e
}