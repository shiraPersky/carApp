// Backend/service/mailService.ts
import nodemailer, { Transporter } from 'nodemailer';

let transporter: Transporter;

class MailService {
  constructor() {
    if (!transporter) {
      transporter = nodemailer.createTransport({
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

  async sendSSOEmail(to: string, loginLink: string) {
    const mailOptions = {
      from: process.env.MAIL_FROM || 'CarApp <noreply@carapp.example.com>',
      to,
      subject: 'CarApp - Login Link',
      text: `Click the following link to log in to your CarApp account: ${loginLink}`,
      html: `...` // Your HTML content here
    };

    await transporter.sendMail(mailOptions);
  }
}

// Export the class
export { MailService };
