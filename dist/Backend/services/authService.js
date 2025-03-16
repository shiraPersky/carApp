"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
// backend/service/auth.service.ts
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const mailService_1 = require("./mailService");
const prisma = new client_1.PrismaClient();
class AuthService {
    constructor() {
        this.mailService = new mailService_1.MailService();
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield prisma.user.findUnique({
                where: { email: data.email }
            });
            if (existingUser) {
                throw new Error('User with this email already exists');
            }
            const hashedPassword = yield bcrypt.hash(data.password, 10);
            const user = yield prisma.user.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    name: data.name
                }
            });
            // Return user without password
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            return userWithoutPassword;
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { email: data.email }
            });
            if (!user) {
                throw new Error('Invalid email or password');
            }
            if (!user.password) {
                throw new Error('This account uses SSO for login');
            }
            const isPasswordValid = yield bcrypt.compare(data.password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }
            // Update last login time
            yield prisma.user.update({
                where: { id: user.id },
                data: { last_login: new Date() }
            });
            // Return user without password
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            return userWithoutPassword;
        });
    }
    initiateSSO(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find or create user
            let user = yield prisma.user.findUnique({
                where: { email: data.email }
            });
            if (!user) {
                // Create new SSO user
                user = yield prisma.user.create({
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
            yield prisma.session.create({
                data: {
                    id: token,
                    user_id: user.id,
                    expires,
                    data: JSON.stringify({ type: 'sso-link' })
                }
            });
            // Send email with login link
            const loginLink = `${process.env.FRONTEND_URL}/sso-login?token=${token}`;
            yield this.mailService.sendSSOEmail(data.email, loginLink);
            return { message: 'SSO login link sent to your email' };
        });
    }
    validateSSOToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield prisma.session.findUnique({
                where: { id: token }
            });
            if (!session) {
                throw new Error('Invalid or expired token');
            }
            if (new Date() > session.expires) {
                // Delete expired session
                yield prisma.session.delete({
                    where: { id: token }
                });
                throw new Error('Token expired');
            }
            // Get user
            const user = yield prisma.user.findUnique({
                where: { id: session.user_id }
            });
            if (!user) {
                throw new Error('User not found');
            }
            // Update last login time
            yield prisma.user.update({
                where: { id: user.id },
                data: { last_login: new Date() }
            });
            // Delete the one-time token
            yield prisma.session.delete({
                where: { id: token }
            });
            // Create a new session for the authenticated user
            const sessionId = crypto.randomBytes(32).toString('hex');
            const expires = new Date();
            expires.setHours(expires.getHours() + 24); // 24 hours session
            yield prisma.session.create({
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
        });
    }
    validateSession(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield prisma.session.findUnique({
                where: { id: sessionId }
            });
            if (!session) {
                return null;
            }
            if (new Date() > session.expires) {
                // Delete expired session
                yield prisma.session.delete({
                    where: { id: sessionId }
                });
                return null;
            }
            // Return user info
            const user = yield prisma.user.findUnique({
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
        });
    }
    logout(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.session.delete({
                where: { id: sessionId }
            });
            return { message: 'Logged out successfully' };
        });
    }
}
exports.AuthService = AuthService;
