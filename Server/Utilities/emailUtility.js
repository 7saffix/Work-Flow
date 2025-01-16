import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const sendEmail=async(emailTo,emailText,emailSubject)=>{
    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:parseInt(process.env.EMAIL_PORT, 10),
        secure: process.env.EMAIL_SECURITY === 'true',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        },
        tls:{
           rejectUnauthorized: process.env.EMAIL_UNAUTH === 'false'
        }
    });

    const mailOption = {
        from:'Work Flow <mern_ostad@themesoft69.com>',
        to:emailTo,
        subject:emailSubject,
        text:emailText,
    };

    return await transporter.sendMail(mailOption)
}
// const Nodemailer = require("nodemailer");
// const { MailtrapTransport } = require("mailtrap");

// const TOKEN = "8a137beb043968d748a71b1a33225ddd";

// const transport = Nodemailer.createTransport(
//   MailtrapTransport({
//     token: TOKEN,
//   })
// );

// const sender = {
//   address: "hello@demomailtrap.com",
//   name: "Mailtrap Test",
// };
// const recipients = [
//   "7saffix@gmail.com",
// ];

// transport
//   .sendMail({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);