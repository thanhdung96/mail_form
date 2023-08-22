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

const sendMailClient = async (subscription) => {
    let renderedTemplate = await renderEmailTemplate('mail_subscription.jade', subscription);

    try{
        await transporter.sendMail({
            from: process.env.EMAIL_ADDRESS, // sender address
            to: subscription.email,
            subject: 'Cảm ơn Anh/Chị đã liên hệ với MATI', // Subject line
            html: renderedTemplate,
        });
    } catch (error) {
        throw new Error(
            `Something went wrong in the sendmail method. Error: ${error.message}`
        );
    };
};

const sendMailAdmin = async (subscription) => {
    let renderedTemplate =  await renderEmailTemplate('mail_admin_noti.jade', subscription);

    try{
        await transporter.sendMail({
            from: process.env.EMAIL_ADDRESS, // sender address
            to: process.env.ADMIN_EMAIL,
            subject: 'Thông báo: Khách hàng mới đã liên hệ qua HRM MATI', // Subject line
            html: renderedTemplate,
        });
    } catch (error) {
        throw new Error(
            `Something went wrong in the sendmail method. Error: ${error.message}`
        );
    };

}

const renderEmailTemplate = async (templateName, subscription) => {
    // manually render jade template without response object
    let pathToTemplate = path.resolve(__dirname, '../views/') + '/' + templateName;
    let template = fs.readFileSync(pathToTemplate, 'utf8');
    let jadeFn = jade.compile(template, { filename: pathToTemplate, pretty: true });
    let renderedTemplate = jadeFn({ subscription: subscription, hrm_address: process.env.HRM_ADDRESS });
    
    return renderedTemplate;
}

module.exports = { sendMailClient, sendMailAdmin };
