import nodemailer, { Transport } from "nodemailer";

class Email {
  transport = nodemailer.createTransport({
    service: "",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  async _send(subject: string, text: string, to: string, from: string) {
    const mailOptions = {
      from,
      to,
      subject,
      text,
    };

    await this.transport.sendMail(mailOptions);
  }

  async sendWelcome() {
    await this._send("welcome", "", "", "");
  }

  async sendPasswordReset() {
    await this._send("passwordReset", "", "", "");
  }
}

export default new Email();
