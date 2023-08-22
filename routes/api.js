var express = require('express');
require("dotenv").config();
var router = express.Router();
var Subscription = require('../models/subscription');
var moment = require('moment');
var { sendMailClient, sendMailAdmin } = require('../helpers/mailer');

router.post('/jobs', async function(req, res, next) {
    let data = req.body;
    let subscription = new Subscription({
        company: data.company,
        name: data.name,
        email: data.email,
        phone: data.phone,
        messages: data.messages,
    });

    await subscription.save(async function (err, Subscription) {
        if(err) {
            res.json({
                status: 500,
                message: 'Something went wrong when saving subscription.'
            });
        } else {
            try {
                // change created date to vietnamese text
                moment.locale('vi');
                subscription.submissionDate = moment().format(process.env.TIMESTAMP_FORMAT);

                // send mail to client
                await sendMailClient(subscription);

                // send mail to admin
                await sendMailAdmin(subscription);

                res.json({
                    status: 200,
                    message: 'Email sent successfully.'
                });
            } catch (error) {
                res.json({
                    status: 500,
                    message: `Something went wrong when sending email. Error: ${error.message}`
                });
            }
        }
    });
});

router.get('/jobs/get', async function(req, res, next) {
    let lstSubscriptions = await Subscription.find();
    res.json({
        jobs: lstSubscriptions
    });
});

module.exports = router;
