var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    'use strict';
    res.render('index', {
        title: 'Week02-BasicTypesExpress'
    });
});

router.get('/getIndex', function(req, res, next) {
    'use strict';
    fs.readFile('./index.json', 'utf8', function(err, rawJson) {
        if (err) {
            throw err;
        }

        var json = JSON.parse(rawJson);
        res.send(json);
    });

});

module.exports = router;
