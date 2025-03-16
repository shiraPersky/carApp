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
exports.sendSSOEmail = sendSSOEmail;
// Backend/service/mailService.js
const nodemailer_1 = __importDefault(require("nodemailer"));
let transporter;
// Initialize the transporter
function initializeTransporter() {
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
    return transporter;
}
function sendSSOEmail(to, loginLink) {
    return __awaiter(this, void 0, void 0, function* () {
        const transport = initializeTransporter();
        const mailOptions = {
            from: process.env.MAIL_FROM || 'CarApp <noreply@carapp.example.com>',
            to,
            subject: 'CarApp - Login Link',
            text: `Click the following link to log in to your CarApp account: ${loginLink}`,
            html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>CarApp Login</h2>
        <p>Hello,</p>
        <p>Click the button below to log in to your CarApp account:</p>
        <p style="text-align: center;">
          <a href="${loginLink}" 
             style="background-color: #4CAF50; color: white; padding: 10px 20px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Log In
          </a>
        </p>
        <p>If you didn't request this email, please ignore it.</p>
        <p>This link will expire in 15 minutes for security reasons.</p>
        <p>Best regards,<br/>CarApp Team</p>
      </div>
    `
        };
        yield transport.sendMail(mailOptions);
    });
}
