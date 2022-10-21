var express = require('express');
var router = express.Router();
var Subscription = require('../models/subscription');
var sendMail = require('../helpers/mailer');

router.post('/', async function(req, res, next) {
    let data = req.body;
    let subscription = new Subscription({
        jobId: null,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        message: data.message,
    });

    await sendMail(subscription);

    subscription.save(function (err, Subscription) {
        if(err) {
            res.render(
                       'error',
                        {
                            message: "Something went wrong",
                            error: err
                        }
            );
        } else {
            res.redirect('/');
        }
    })
});

router.get('/get', async function(req, res) {
    let lstSubscriptions = await Subscription.find();
    
    res.json({
        subscriptions: lstSubscriptions
    });
});

module.exports = router;
