var router = require('./Couch');
var express = require('express');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
    'use strict';
    res.render('index', {
        title: 'Couch Views II'
    });
});

router.get('/aboutText', function(request, response) {
    'use strict';
    response.send({
        ok: true,
        docs: 'Data from a database could be here'
    });
});

router.get('/user-form', function(request, response) {
    'use strict';
    console.log('user form');
    var result = request.query;
    console.log(result);
    response.send(result);
});



/* GET home page. */
router.get('/', function(request, response, next) {
    'use strict';
    console.log('Index called');
    response.render('index', {
        title: 'Passport Google'
    });
});

passport.serializeUser(function(user, done) {
    'use strict';
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    'use strict';
    done(null, obj);
});

router.get('/login', function(req, res) {
    'use strict';
    res.render('login', {
        user: req.user
    });
});

router.get('/logout', function(request, response) {
    'use strict';
    request.logout();
    response.redirect('/');
});

router.get('/status', function(request, response) {
    'use strict';
    console.log('Status called');
    console.log('Auth: ' + request.isAuthenticated('google'));
    response.send({
        result: 'Success',
        authenticated: request.isAuthenticated()
    });
});

router.get('/:id', function(request, response) {
    'use strict';
    response.render(request.params.id, {
        id: request.params.id
    });
});

module.exports = router;
