import nodemailer from "nodemailer";
import { smtpPassword, smtpUsername } from "../configs/index.js";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: smtpUsername,
    pass: smtpPassword,
  },
});

export default transporter;
