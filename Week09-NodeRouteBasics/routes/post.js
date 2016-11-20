var express = require('express');
var router = express.Router();
var FEET_IN_MILE = 5280;

router.get('/miles-to-feet', function(request, response) {
    'use strict';
    console.log('post.js called');
    console.log(request.body.miles);
    var feet = parseInt(request.body.miles) * FEET_IN_MILE;
    //response.send('POST request sent');
    //request.body = {result:'success'};
    response.send({
        result: 'There is ' + feet + ' ft. in ' + request.body.miles + ' mile(s)'
    });

});

/*router.get('/test-post', function(request,response) {
    //console.log('post.js called');
    //response.send(request.body);

});*/

module.exports = router;
