import nodemailer from "nodemailer";


//it only creates transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT), //from  which port you are sending mail
  secure: false,//it  means we donot want secured connection at starting of connecting or in testing phase change it to true and go to 467 encrypted port
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export default transporter;