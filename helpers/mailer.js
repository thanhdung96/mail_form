require("dotenv").config();
const { model } = require("mongoose");
const nodemailer = require("nodemailer");
const path = require("path");

let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS
    }
});

const sendMail = async (mailObj) => {
    try{
        let mailStatus = await transporter.sendMail({
            from: process.env.EMAIL_ADDRESS, // sender address
            to: recipients, // list of recipients
            subject: subject, // Subject line
            text: message, // plain text
        });
    } catch (error) {
        throw new Error(
            `Something went wrong in the sendmail method. Error: ${error.message}`
          );
    };
};

module.exports = sendMail;

// sample sending email
// const mailObj = {
//     from: "hello@schadokar.dev",
//     recipients: ["me@schadokar.dev"],
//     subject: "Sending email by nodejs",
//     html: {
//          path: path.resolve(__dirname, "../template/mail.html"),
// },
//   };
  
//   sendEmail(mailObj).then((res) => {
//     console.log(res);
//   });
