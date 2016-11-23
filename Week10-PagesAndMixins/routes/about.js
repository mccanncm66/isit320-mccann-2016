/**
 * Created by bcuser on 11/23/16.
 */
var express = require('express');
var router = express.Router();

router.get('/about', function(req, res){
    res.render('about', {
        title: 'Isit320-McCann',
        description: 'jquery demo'
    });
});

module.exports = router;
