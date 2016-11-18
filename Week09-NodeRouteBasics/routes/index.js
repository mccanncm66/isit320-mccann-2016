var express = require('express');
var router = express.Router();
var FEET_IN_MILE = 5280;

/* GET home page. */
router.get('/', function(req, res, next) { 'use strict';
  res.render('index', { title: 'NodeRouteBasics' });
});

router.get('/feetToMiles', function(request, response) {
  console.log(request.query);
  //console.log(request.params);
  var miles = parseInt(request.query.miles) / FEET_IN_MILE;
  response.send({
    result: 'success', ok: true, TotalMiles: miles + ' mile(s) in ' + request.query.miles + ' ft.'
  });
});

router.get('/getFeetInMile', function(request, response) {
  response.send({
    FeetInMile: FEET_IN_MILE + ' ft. in a Mile'
  });
});

router.get('/getCircumference', function(request, response){
  var input = request.query.radius;
  //console.log(input);
  var circumference = 2 * parseInt(input) * Math.PI;
  response.send({
    Circumference: 'The circumfernce of a circle with a radius of ' + input + ' is ' + circumference
  });
});


module.exports = router;
