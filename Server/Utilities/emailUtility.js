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
        from:`Work Flow <${process.env.EMAIL_USER}>`,
        to:emailTo,
        subject:emailSubject,
        text:emailText,
    };

    return await transporter.sendMail(mailOption)
}

