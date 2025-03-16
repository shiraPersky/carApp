"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
class AuthController {
    constructor() {
        this.authService = new authService_1.AuthService();
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const user = yield this.authService.register(data);
                // Create session
                const sessionId = req.sessionID;
                res.cookie('sessionId', sessionId, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 24 * 60 * 60 * 1000 // 24 hours
                });
                res.status(201).json(user);
            }
            catch (error) {
                console.error('Registration error:', error);
                res.status(400).json({ message: error.message || 'Registration failed' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const user = yield this.authService.login(data);
                // Create session
                const sessionId = req.sessionID;
                res.cookie('sessionId', sessionId, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 24 * 60 * 60 * 1000 // 24 hours
                });
                res.status(200).json(user);
            }
            catch (error) {
                console.error('Login error:', error);
                res.status(401).json({ message: error.message || 'Authentication failed' });
            }
        });
    }
    initiateSSO(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const result = yield this.authService.initiateSSO(data);
                res.status(200).json(result);
            }
            catch (error) {
                console.error('SSO initiation error:', error);
                res.status(400).json({ message: error.message || 'SSO initiation failed' });
            }
        });
    }
    validateSSOToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.query;
                if (!token) {
                    return res.status(400).json({ message: 'Token is required' });
                }
                const { sessionId, user } = yield this.authService.validateSSOToken(token);
                // Set session cookie
                res.cookie('sessionId', sessionId, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 24 * 60 * 60 * 1000 // 24 hours
                });
                res.status(200).json(user);
            }
            catch (error) {
                console.error('SSO validation error:', error);
                res.status(401).json({ message: error.message || 'SSO validation failed' });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sessionId = req.sessionID;
                yield this.authService.logout(sessionId);
                // Clear the session cookie
                res.clearCookie('sessionId');
                res.status(200).json({ message: 'Logged out successfully' });
            }
            catch (error) {
                console.error('Logout error:', error);
                res.status(500).json({ message: 'Logout failed' });
            }
        });
    }
    getCurrentUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // User is already set by the auth middleware
                const user = req.user;
                if (!user) {
                    return res.status(401).json({ message: 'Not authenticated' });
                }
                res.status(200).json(user);
            }
            catch (error) {
                console.error('Get current user error:', error);
                res.status(500).json({ message: 'Failed to get current user' });
            }
        });
    }
}
exports.AuthController = AuthController;
