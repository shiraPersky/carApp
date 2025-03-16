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
exports.AuthMiddleware = void 0;
const authService_1 = require("../services/authService");
class AuthMiddleware {
    constructor() {
        this.authService = new authService_1.AuthService();
    }
    authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sessionId = req.cookies.sessionId || req.headers['x-session-id'];
                if (!sessionId) {
                    return res.status(401).json({ message: 'Not authenticated' });
                }
                const user = yield this.authService.validateSession(sessionId);
                if (!user) {
                    return res.status(401).json({ message: 'Invalid or expired session' });
                }
                // Attach user to request object
                req.user = user;
                next();
            }
            catch (error) {
                console.error('Authentication middleware error:', error);
                res.status(401).json({ message: 'Authentication failed' });
            }
        });
    }
    // Optional middleware to check if user is authenticated but not block the request
    attachUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sessionId = req.cookies.sessionId || req.headers['x-session-id'];
                if (sessionId) {
                    const user = yield this.authService.validateSession(sessionId);
                    if (user) {
                        req.user = user;
                    }
                }
                next();
            }
            catch (error) {
                // Just log the error but don't block the request
                console.error('Attach user middleware error:', error);
                next();
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
