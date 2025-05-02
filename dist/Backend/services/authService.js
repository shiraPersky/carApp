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
const bcrypt = __importStar(require("bcrypt")); //compare passwords securely
const crypto = __importStar(require("crypto")); //generate secure random tokens
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
    googleLogin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if user already exists
                let user = yield prisma.user.findUnique({
                    where: { email: data.email }
                });
                if (!user) {
                    // Create new user if they don't exist
                    user = yield prisma.user.create({
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
                            user = yield prisma.user.update({
                                where: { id: user.id },
                                data: {
                                    // This will work after adding googleId to the schema and running the migration
                                    googleId: data.googleId
                                }
                            });
                        }
                        catch (err) {
                            console.error('Could not update user with googleId:', err);
                            // Continue even if this fails - the user is created
                        }
                    }
                }
                else if (user) {
                    // Update existing user
                    try {
                        user = yield prisma.user.update({
                            where: { id: user.id },
                            data: {
                                is_sso_user: true,
                                // This will work after adding googleId to the schema and running the migration
                                googleId: data.googleId
                            }
                        });
                    }
                    catch (err) {
                        console.error('Could not update user with googleId:', err);
                        // Continue with the existing user
                    }
                }
                // Update last login time
                yield prisma.user.update({
                    where: { id: user.id },
                    data: { last_login: new Date() }
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
                        data: JSON.stringify({ authenticated: true, provider: 'google' })
                    }
                });
                // Return the user without sensitive information
                const { password } = user, userWithoutPassword = __rest(user, ["password"]);
                return {
                    sessionId,
                    user: userWithoutPassword
                };
            }
            catch (error) {
                console.error('Google login error:', error);
                throw new Error(`Google login failed: ${error.message}`);
            }
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
    // Add these methods to your AuthService class in backend/service/auth.service.ts
    requestPasswordReset(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
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
            const existingReset = yield prisma.passwordReset.findUnique({
                where: { email: user.email }
            });
            if (existingReset) {
                // Update existing record instead of creating a new one
                yield prisma.passwordReset.update({
                    where: { email: user.email },
                    data: {
                        token,
                        expires
                    }
                });
            }
            else {
                // Create new record if none exists
                yield prisma.passwordReset.create({
                    data: {
                        email: user.email,
                        token,
                        expires
                    }
                });
            }
            // Send email with reset link
            const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
            const emailSent = yield this.mailService.sendPasswordResetEmail(user.email, resetLink);
            if (!emailSent) {
                console.warn(`Password reset email could not be sent to ${user.email}`);
            }
            // Return success even if the email fails, to avoid revealing information
            return { message: 'If your email exists in our system, you will receive a password reset link' };
        });
    }
    resetPassword(token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find valid token
            const resetRecord = yield prisma.passwordReset.findUnique({
                where: { token }
            });
            if (!resetRecord) {
                throw new Error('Invalid or expired token');
            }
            if (new Date() > resetRecord.expires) {
                // Delete expired token
                yield prisma.passwordReset.delete({
                    where: { token }
                });
                throw new Error('Token expired');
            }
            // Hash new password
            const hashedPassword = yield bcrypt.hash(newPassword, 10);
            // Update user password
            yield prisma.user.update({
                where: { email: resetRecord.email },
                data: { password: hashedPassword }
            });
            // Delete used token
            yield prisma.passwordReset.delete({
                where: { token }
            });
            return { message: 'Password reset successful' };
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
            if (new Date() > session.expires) { //If the token has expired, it is deleted from the session table
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
