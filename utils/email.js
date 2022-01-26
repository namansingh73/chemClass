const path = require('path');

const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

const emailTemplatedCompiled = pug.compileFile(
  path.join(__dirname, '../views/email/index.pug')
);

module.exports = class Email {
  constructor({ email, name }, baseUrl) {
    this.to = email;
    this.firstName = (name || 'user').split(' ')[0];
    this.from = `${process.env.EMAIL_BY} <${process.env.EMAIL_FROM}>`;
    this.baseUrl =
      process.env.NODE_ENV === 'production' ? baseUrl : 'http://localhost:3000';
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(html, subject, attachments) {
    // 1) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html, {
        baseElement: '*',
        tags: { img: { format: 'skip' } },
      }),
    };

    if (attachments) {
      mailOptions.attachments = attachments;
    }

    // 2) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    const subject = 'Welcome to Chem Class';

    const html = emailTemplatedCompiled({
      subject,
      baseUrl: this.baseUrl,
      preheader: 'Greeting from Chem Class for joining our family!',
      heading: 'Welcome to Chem Class!',
      text: `Hello ${this.firstName},<br>I ceo of Chem Class, give you a warm welcome to the Chem Class Family. Now you can, explore the Chem Class Family. Explore the whole new world. Just click the button below to get started.`,
      link: {
        href: this.baseUrl,
        text: 'Explore now',
      },
    });

    await this.send(html, subject);
  }

  async sendPasswordResetToken({ relativeUrl, time }) {
    const subject = `Forgot your password (Link valid for ${time})`;

    const html = emailTemplatedCompiled({
      subject,
      baseUrl: this.baseUrl,
      preheader: 'To reset your password click on the link',
      heading: `Forgot your password (Link valid for ${time})`,
      text: `Hello ${this.firstName},<br>We got to know you forgot your password. Don't worry just click the button below to reset your password.<br>If you haven't made this request, you are safe, kindly ignore this email. Please don't share the link with anyone if the person claims to be Chem Class Employee.`,
      link: {
        href: `${this.baseUrl}${relativeUrl}`,
        text: 'Reset Password',
      },
    });

    await this.send(html, subject);
  }
};
