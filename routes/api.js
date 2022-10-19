var express = require('express');
var router = express.Router();
var Subscription = require('../models/subscription');

router.post('/', function(req, res, next) {
    let data = req.body;
    let subscription = new Subscription({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        message: data.message,
    });

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
            res.render('index', { title: 'Subscription saved' });
        }
    })
});

module.exports = router;
