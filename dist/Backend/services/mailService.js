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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
// Backend/service/mailService.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
let transporter;
class MailService {
    constructor() {
        if (!transporter) {
            transporter = nodemailer_1.default.createTransport({
                host: process.env.MAIL_HOST || 'smtp.example.com',
                port: parseInt(process.env.MAIL_PORT || '587'),
                secure: process.env.MAIL_SECURE === 'true',
                auth: {
                    user: process.env.MAIL_USER || 'user@example.com',
                    pass: process.env.MAIL_PASSWORD || 'password'
                }
            });
        }
    }
    sendSSOEmail(to, loginLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: process.env.MAIL_FROM || 'CarApp <noreply@carapp.example.com>',
                to,
                subject: 'CarApp - Login Link',
                text: `Click the following link to log in to your CarApp account: ${loginLink}`,
                html: `...` // Your HTML content here
            };
            yield transporter.sendMail(mailOptions);
        });
    }
}
exports.MailService = MailService;
