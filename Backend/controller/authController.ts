// backend/controller/auth.controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { LoginDto, RegisterDto, SSOLoginDto } from '../dto/authDto';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    try {
      const data: RegisterDto = req.body;
      const user = await this.authService.register(data);
      
      // Create session
      const sessionId = req.sessionID;
      res.cookie('sessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      
      res.status(201).json(user);//Created
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ message: error.message || 'Registration failed' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      // Log the request body to ensure it contains the correct data
      console.log('Login request received with data:', req.body);
      const data: LoginDto = req.body;
      // Debugging: Check if the data is correctly parsed
      console.log('Parsed login data:', data);
      const user = await this.authService.login(data);
      // Log user details after login
      console.log('User after login:', user);

      // Create session
      const sessionId = req.sessionID;
      res.cookie('sessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      
      res.status(200).json(user);
    } catch (error) {
      console.error('Login error:', error);
      res.status(401).json({ message: error.message || 'Authentication failed' });
    }
  }

  async initiateSSO(req: Request, res: Response) {
    try {
      const data: SSOLoginDto = req.body;
      const result = await this.authService.initiateSSO(data);
      res.status(200).json(result);
    } catch (error) {
      console.error('SSO initiation error:', error);
      res.status(400).json({ message: error.message || 'SSO initiation failed' });
    }
  }

  async validateSSOToken(req: Request, res: Response) {
    try {
      const { token } = req.query as { token: string };
      if (!token) {
        return res.status(400).json({ message: 'Token is required' });
      }
      
      const { sessionId, user } = await this.authService.validateSSOToken(token);
      
      // Set session cookie
      res.cookie('sessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      
      res.status(200).json(user);
    } catch (error) {
      console.error('SSO validation error:', error);
      res.status(401).json({ message: error.message || 'SSO validation failed' });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const sessionId = req.sessionID;
      await this.authService.logout(sessionId);
      
      // Clear the session cookie
      res.clearCookie('sessionId');
      
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Logout failed' });
    }
  }

  async getCurrentUser(req: Request, res: Response) {
    try {
      // User is already set by the auth middleware
      const user = req.user;
      
      if (!user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
      
      res.status(200).json(user);
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ message: 'Failed to get current user' });
    }
  }
}