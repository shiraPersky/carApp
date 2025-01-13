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
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer")); //for sending emails in Node.js
const dotenv_1 = __importDefault(require("dotenv")); //loading environment variables from a .env file
// Load environment variables from .env file
dotenv_1.default.config();
class EmailService {
    constructor() {
        // Set up the email transporter
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Use environment variable
                pass: process.env.EMAIL_PASS, // Use environment variable
            },
        });
    }
    // Method to send an email
    sendEmail(to, subject, htmlContent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = yield this.transporter.sendMail({
                    from: process.env.EMAIL_USER, // Use environment variable
                    to,
                    subject,
                    html: htmlContent,
                });
                console.log('Email sent: ' + info.response);
            }
            catch (error) {
                console.error('Error sending email:', error);
                throw new Error('Failed to send email');
            }
        });
    }
    sendReminder(to, subject, htmlContent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = yield this.transporter.sendMail({
                    from: process.env.EMAIL_USER, // Use environment variable
                    to,
                    subject,
                    html: htmlContent,
                });
                console.log('Reminder email sent: ' + info.response);
            }
            catch (error) {
                console.error('Error sending reminder email:', error);
                throw new Error('Failed to send reminder email');
            }
        });
    }
}
exports.EmailService = EmailService;
