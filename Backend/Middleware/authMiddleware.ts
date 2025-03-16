// backend/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        name?: string;
      };
    }
  }
}

export class AuthMiddleware {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionId = req.cookies.sessionId || req.headers['x-session-id'];
      
      if (!sessionId) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
      
      const user = await this.authService.validateSession(sessionId);
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid or expired session' });
      }
      
      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      console.error('Authentication middleware error:', error);
      res.status(401).json({ message: 'Authentication failed' });
    }
  }

  // Optional middleware to check if user is authenticated but not block the request
  async attachUser(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionId = req.cookies.sessionId || req.headers['x-session-id'];
      
      if (sessionId) {
        const user = await this.authService.validateSession(sessionId);
        if (user) {
          req.user = user;
        }
      }
      
      next();
    } catch (error) {
      // Just log the error but don't block the request
      console.error('Attach user middleware error:', error);
      next();
    }
  }
}