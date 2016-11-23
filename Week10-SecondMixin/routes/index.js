var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { pageTitle: 'Main Page',
  programTitle: 'Week10-SecondMixin'});
});

router.get('/foo', function(request, response){
  console.log(request.query);
  response.send(request.query);
});

module.exports = router;
