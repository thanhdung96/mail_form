require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require("path");
var jade = require('jade');
var fs = require('fs');

let transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: false,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS
    }
});

const sendMail = async (subscription) => {
    // manually render jade template without response object
    let pathToTemplate = path.resolve(__dirname, '../views/') + '/mail_subscription.jade';
    let template = fs.readFileSync(pathToTemplate, 'utf8');
    let jadeFn = jade.compile(template, { filename: pathToTemplate, pretty: true });
    let renderedTemplate = jadeFn({subscription: subscription});

    try{
        let mailStatus = await transporter.sendMail({
            from: process.env.EMAIL_ADDRESS, // sender address
            to: subscription.email,
            subject: 'A subscription from ' + subscription.fullName, // Subject line
            html: renderedTemplate,
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
