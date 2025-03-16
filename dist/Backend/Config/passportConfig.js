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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const client_1 = require("@prisma/client"); // Ensure we are importing 'User' type correctly
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
// Local strategy for email/password authentication
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Correct access to the user model
        const user = yield prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.password) {
            return done(null, false, { message: 'This account uses SSO for login.' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
})));
// Serialize user to session
passport_1.default.serializeUser((user, done) => {
    done(null, user.id); // Ensure that 'user' is of type 'User'
});
// Deserialize user from session
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Correctly accessing user by `id`
        const user = yield prisma.user.findUnique({
            where: { id }
        });
        if (!user) {
            return done(null, false);
        }
        // Remove sensitive information
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        done(null, userWithoutPassword); // Send back user without password
    }
    catch (error) {
        done(error);
    }
}));
exports.default = passport_1.default;
