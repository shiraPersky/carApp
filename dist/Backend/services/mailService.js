"use strict";
// // Backend/service/mailService.ts
// import nodemailer, { Transporter } from 'nodemailer';//nodemailer - for sending emails
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
// let transporter: Transporter;
// class MailService {
//   constructor() {
//     if (!transporter) {//if it is not initialized yet
//       transporter = nodemailer.createTransport({
//         host: process.env.MAIL_HOST ,
//         port: parseInt(process.env.MAIL_PORT),
//         secure: process.env.MAIL_SECURE === 'true',
//         auth: {
//           user: process.env.MAIL_USER ,
//           pass: process.env.MAIL_PASSWORD 
//         }
//       });
//     }
//   }
//   async sendSSOEmail(to: string, loginLink: string) {
//     const mailOptions = {
//       from: process.env.MAIL_FROM,
//       to,
//       subject: 'CarApp - Login Link',
//       text: `Click the following link to log in to your CarApp account: ${loginLink}`,
//       html: `...` // Your HTML content here
//     };
//     await transporter.sendMail(mailOptions);
//   }
// }
// // Export the class
// export { MailService };
// Backend/service/mailService.ts
// import nodemailer, { Transporter } from 'nodemailer';
// let transporter: Transporter;
// class MailService {
//   constructor() {
//     if (!transporter) {
//       transporter = nodemailer.createTransport({
//         host: process.env.MAIL_HOST,
//         port: parseInt(process.env.MAIL_PORT),
//         secure: process.env.MAIL_SECURE === 'true',
//         auth: {
//           user: process.env.MAIL_USER,
//           pass: process.env.MAIL_PASSWORD
//         }
//       });
//     }
//   }
//   async sendSSOEmail(to: string, loginLink: string) {
//     const mailOptions = {
//       from: process.env.MAIL_FROM,
//       to,
//       subject: 'CarApp - Login Link',
//       text: `Click the following link to log in to your CarApp account: ${loginLink}`,
//       html: `<p>Click the following link to log in to your CarApp account:</p>
//             <p><a href="${loginLink}" target="_blank">${loginLink}</a></p>`
//     };
//     await transporter.sendMail(mailOptions);
//   }
//   // Add this new method for password reset emails
//   async sendPasswordResetEmail(to: string, resetLink: string) {
//     const mailOptions = {
//       from: process.env.MAIL_FROM,
//       to,
//       subject: 'CarApp - Password Reset Link',
//       text: `Click the following link to reset your password: ${resetLink}\nThis link will expire in 1 hour.`,
//       html: `<p>You requested a password reset for your CarApp account.</p>
//             <p>Click the following link to reset your password:</p>
//             <p><a href="${resetLink}" target="_blank">${resetLink}</a></p>
//             <p>This link will expire in 1 hour.</p>`
//     };
//     await transporter.sendMail(mailOptions);
//   }
// }
// // Export the class
// export { MailService };
// backend/service/mailService.ts
const nodemailer = __importStar(require("nodemailer"));
class MailService {
    constructor() {
        // Use Gmail service configuration instead of manual host/port setup
        this.transporter = nodemailer.createTransport({
            service: 'gmail', // This automatically sets the correct host and port
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            }
        });
    }
    sendPasswordResetEmail(email, resetLink) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = yield this.transporter.sendMail({
                    from: `"Car Maintenance App" <${process.env.MAIL_FROM || process.env.MAIL_USER}>`,
                    to: email,
                    subject: 'Password Reset Request',
                    html: `
          <h1>Password Reset</h1>
          <p>You requested a password reset for your Car Maintenance App account.</p>
          <p>Click the link below to reset your password:</p>
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>If you didn't request this, please ignore this email.</p>
          <p>The link will expire in 1 hour.</p>
        `,
                });
                console.log('Email sent: %s', info.messageId);
                return true;
            }
            catch (error) {
                console.error('Email sending error:', error);
                // Don't throw the error to prevent the API from failing when email fails
                // Instead, log it and return false
                return false;
            }
        });
    }
    sendSSOEmail(email, loginLink) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = yield this.transporter.sendMail({
                    from: `"Car Maintenance App" <${process.env.MAIL_FROM || process.env.MAIL_USER}>`,
                    to: email,
                    subject: 'Login Link',
                    html: `
          <h1>Login to Car Maintenance App</h1>
          <p>Click the link below to log in:</p>
          <a href="${loginLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Log In</a>
          <p>This link will expire in 15 minutes.</p>
        `,
                });
                console.log('Email sent: %s', info.messageId);
                return true;
            }
            catch (error) {
                console.error('Email sending error:', error);
                // Don't throw the error to prevent the API from failing when email fails
                return false;
            }
        });
    }
}
exports.MailService = MailService;
