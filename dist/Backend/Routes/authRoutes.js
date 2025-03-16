"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/routes/auth.routes.ts
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const router = (0, express_1.Router)();
const authController = new authController_1.AuthController();
const authMiddleware = new authMiddleware_1.AuthMiddleware();
// Public routes
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/sso', authController.initiateSSO.bind(authController));
router.get('/sso/validate', authController.validateSSOToken.bind(authController));
router.post('/logout', authController.logout.bind(authController));
// Protected routes
router.get('/me', authMiddleware.authenticate.bind(authMiddleware), authController.getCurrentUser.bind(authController));
exports.default = router;
