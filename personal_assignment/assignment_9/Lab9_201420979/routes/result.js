var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log(res);
    res.render('result', { title: 'Result' });
});

module.exports = router;