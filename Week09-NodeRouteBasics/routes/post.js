var express = require('express');
var router = express.Router();
var FEET_IN_MILE = 5280;

/* GET home page. */


router.post('/test-post', function(request,response) {
    console.log('post.js called');
    //response.send('POST request sent');
    //request.body = {result:'success'};
    response.send({result:'success'});

});

/*router.get('/test-post', function(request,response) {
    //console.log('post.js called');
    //response.send(request.body);

});*/


module.exports = router;