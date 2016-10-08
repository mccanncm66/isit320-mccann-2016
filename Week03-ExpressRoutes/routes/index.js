var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    'use strict';
    res.render('index', {
        title: 'McCann-ExpressRoutes-2016'
    });
});

router.get('/read', function(request, response) {
    'use strict';
    response.send([{
        name: 'SarahLee'
    }, {
        name: 'Bob'
    }]);
});

router.get('/add', function(request, response) {
    'use strict';
    console.log('add method called');
    console.log('The parameters are: ' + request.query);
    var addedTotal = parseInt(request.query.operatorA) + parseInt(request.query.operatorB);
    response.send([{
        total: addedTotal
    }]);
});

module.exports = router;
