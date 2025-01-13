import nodemailer from 'nodemailer';//for sending emails in Node.js
import dotenv from 'dotenv';//loading environment variables from a .env file
import { SentMessageInfo, Options } from 'nodemailer/lib/smtp-transport';

// Load environment variables from .env file
dotenv.config();

export class EmailService {
  private transporter: nodemailer.Transporter<SentMessageInfo, Options>;

  constructor() {//to initialize the transporter 
    // Set up the email transporter
    this.transporter = nodemailer.createTransport({//to create an email transporter instance
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Use environment variable
        pass: process.env.EMAIL_PASS, // Use environment variable
      },
    });
  }

  // Method to send an email
  async sendEmail(to: string, subject: string, htmlContent: string) {
    try {
      const info = await this.transporter.sendMail({//to send the email
        from: process.env.EMAIL_USER, // Use environment variable
        to,
        subject,
        html: htmlContent,
      });

      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendReminder(to: string, subject: string, htmlContent: string) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER, // Use environment variable
        to,
        subject,
        html: htmlContent,
      });

      console.log('Reminder email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending reminder email:', error);
      throw new Error('Failed to send reminder email');
    }
  }
}
