// backend/routes/auth.routes.ts
import { Router } from 'express';
import { AuthController } from '../controller/authController';
import { AuthMiddleware } from '../Middleware/authMiddleware';

const router = Router();
const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

// Public routes
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/sso', authController.initiateSSO.bind(authController));
router.get('/sso/validate', authController.validateSSOToken.bind(authController));
router.post('/logout', authController.logout.bind(authController));

// Protected routes
router.get('/me', authMiddleware.authenticate.bind(authMiddleware), authController.getCurrentUser.bind(authController));

export default router;