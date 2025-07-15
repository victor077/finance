import { IEmailService } from "./email.interface";
import nodemailer from "nodemailer";

export class EmailService implements IEmailService {
  private readonly transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.AUTH_USER_EMAIL}`,
      pass: `${process.env.AUTH_USER_KEY}`,
    },
  });
  async sendConfirmationEmail(to: string, token: string): Promise<void> {
    console.log("url", process.env.APP_URL);

    const confirmationLink = `${process.env.APP_URL}/api/auth/confirm?token=${token}`;
    await this.transporter.sendMail({
      from: `${process.env.ENVITE_EMAIL}`,
      to,
      subject: "Confirme seu e-mail",
      html: `<p>Clique para confirmar: <a style="
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #ffffff;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
  " href="${confirmationLink}">Confirmar email</a></p>`,
    });
  }
}
