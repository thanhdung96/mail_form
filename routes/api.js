var express = require('express');
var router = express.Router();
var Subscription = require('../models/subscription');
var sendMail = require('../helpers/mailer');

router.post('/jobs', async function(req, res, next) {
    let data = req.body;
    console.log(data);
    let subscription = new Subscription({
        company: data.company,
        name: data.name,
        email: data.email,
        phone: data.phone,
        messages: data.messages,
    });

    await subscription.save(function (err, Subscription) {
        if(err) {
            res.json({
                status: 500,
                message: 'Something went wrong when saving subscription.'
            });
        } else {
            try {
                sendMail(subscription);
                res.json({
                    status: 200,
                    message: 'Email sent successfully.'
                });
            } catch (error) {
                res.json({
                    status: 500,
                    message: 'Something went wrong when sending email.'
                });
            }
        }
    });
});

router.get('/jobs/get', async function(req, res, next) {
    let lstSubscriptions = await Subscription.find();
    console.log(lstSubscriptions);
    res.json({
        jobs: lstSubscriptions
    });
});

module.exports = router;
