import { MailOptions } from "nodemailer/lib/json-transport";
import nodemailer from "nodemailer";

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASS,
  },
});

// dummy mail options
// const options: MailOptions = {
//   to: "pavansargar36@gmail.com",
//   replyTo: "sender",
//   subject: "Forget password Otp",
//   text: "This email is sent from the command line",
//   html: `<h1>OTP is 34343</h1> `,
//   textEncoding: "base64",
// };

const sendMail = async (options: MailOptions) => {
  try {
    const mailer = await mailTransporter.sendMail(options);
    return mailer.messageId;
  } catch (error) {
    return error;
  }
};

export default sendMail;
