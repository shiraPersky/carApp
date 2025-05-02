// backend/routes/auth.routes.ts
import { Router } from 'express';
import { AuthController } from '../controller/authController';
import { AuthMiddleware } from '../Middleware/authMiddleware';
console.log('Auth routes loaded');

const router = Router();
const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

// Public routes
router.post('/register', authController.register.bind(authController));
// router.post('/login', authController.login.bind(authController));
router.post('/login', (req, res) => {
    console.log('Login route is being hit');
    console.log('Request body:', req.body);
    authController.login(req, res);
  });
  
router.post('/sso', authController.initiateSSO.bind(authController));
router.get('/sso/validate', authController.validateSSOToken.bind(authController));
router.post('/logout', authController.logout.bind(authController));

// Password reset routes
router.post('/forgot-password', authController.requestPasswordReset.bind(authController));
router.post('/reset-password', authController.resetPassword.bind(authController));

router.post('/google', authController.googleAuth.bind(authController));
// Protected routes
router.get('/me', authMiddleware.authenticate.bind(authMiddleware), authController.getCurrentUser.bind(authController));


export default router;