// Backend/service/mailService.ts
import nodemailer, { Transporter } from 'nodemailer';//nodemailer - for sending emails

let transporter: Transporter;

class MailService {
  constructor() {
    if (!transporter) {//if it is not initialized yet
      transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST ,
        port: parseInt(process.env.MAIL_PORT),
        secure: process.env.MAIL_SECURE === 'true',
        auth: {
          user: process.env.MAIL_USER ,
          pass: process.env.MAIL_PASSWORD 
        }
      });
    }
  }

  async sendSSOEmail(to: string, loginLink: string) {
    const mailOptions = {
      from: process.env.MAIL_FROM,
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
