var express = require('express');
var router = express.Router();
var FEET_IN_MILE = 5280;
var utils = require('./utils');

/* GET home page. */
router.get('/', function(req, res, next) {
    'use strict';
    res.render('index', {
        title: 'NodeRouteBasics'
    });
});

router.get('/feetToMiles', function(request, response) {
    'use strict';
    console.log(request.query);
    //console.log(request.params);
    var miles = parseInt(request.query.miles) / FEET_IN_MILE;
    response.send({
        result: miles + ' mile(s) in ' + request.query.miles + ' ft.'
    });
});

router.get('/getFeetInMile', function(request, response) {
    'use strict';
    response.send({
        result: FEET_IN_MILE + ' ft. in a Mile'
    });
});

router.post('/getCircumference', function(request, response) {
    'use strict';
    var input = request.body.radius;
    //console.log(input);
    var circumference = utils.calculateCircumference(input);
    response.send({
        result: 'The circumfernce of a circle with a radius of ' + input + ' is ' + circumference
    });
});

router.get('/miles-to-feet', function(request, response) {
    'use strict';
    console.log('post.js called');
    console.log(request.query.miles);
    var feet = parseInt(request.query.miles) * FEET_IN_MILE;
    //response.send('POST request sent');
    //request.body = {result:'success'};
    response.send({
        result: 'There is ' + feet + ' ft. in ' + request.query.miles + ' mile(s)'
    });

});

module.exports = router;
