/**
 * Created by bcuser on 11/23/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    'use strict';
    console.log('Hello from routes/about');
    res.render('about', {
        title: 'Isit320-McCann',
        description: 'jquery demo',
        content: 'this is the about page'
    });
});

module.exports = router;
