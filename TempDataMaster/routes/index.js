var router = require('./Couch');
var express = require('express');
var passport = require('passport');

var routeParamMiddleware = function(request, response, next) {
    'use strict';
    console.log('My middleware called by this route:', request.originalUrl);
    next();
};

var pageReport = function(request, response) {
    'use strict';
    var previousPage = '';
    if (request.session.lastPage) {
        previousPage = request.session.lastPage;
    }

    request.session.lastPage = request.url;
    var welcome = 'Welcome to ' + request.url;
    console.log('Hello', welcome);
    response.send({
        currentPage: request.url,
        previousPage: previousPage,
        'session': request.session
    });
};

/* GET home page. */
router.get('/', routeParamMiddleware, function(req, res) {
    'use strict';
    res.render('index', {
        title: 'Isit Final'
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

router.get('/page01', function(request, response) {
    'use strict';
    pageReport(request, response);
});

router.get('/page02', function(request, response) {
    'use strict';
    pageReport(request, response);
});

router.get('/page03', function(request, response) {
    'use strict';
    pageReport(request, response);
});

passport.serializeUser(function(user, done) {
    'use strict';
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    'use strict';
    done(null, obj);
});

router.get('/:id', function(request, response) {
    'use strict';
    response.render(request.params.id, {
        id: request.params.id
    });
});

module.exports = router;
