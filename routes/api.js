var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    res.render('index', { title: 'hello' });
});

module.exports = router;
