import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { PrismaClient } from '@prisma/client'; // Correct import
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Local strategy for email/password authentication
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email: string, password: string, done) => {
    try {
      // Correct access to the user model
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      if (!user.password) {
        return done(null, false, { message: 'This account uses SSO for login.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize user to session
passport.serializeUser((user: any, done) => { // Use `any` if you still need to avoid TypeScript errors
    done(null, user.id);
  });
  

// Deserialize user from session
passport.deserializeUser(async (id: number, done) => {
  try {
    // Correctly accessing user by `id`
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return done(null, false);
    }

    // Remove sensitive information
    const { password, ...userWithoutPassword } = user;
    done(null, userWithoutPassword); // Send back user without password
  } catch (error) {
    done(error);
  }
});

export default passport;
