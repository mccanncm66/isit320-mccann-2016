var express = require('express');
var router = require('./Couch');
var passport = require('passport');

var routeParamMiddleware = function(request, response, next) {
    'use strict';
    console.log('My middleware called by this route:', request.originalUrl);
    next();
};
/* GET home page. */
router.get('/', routeParamMiddleware, function(req, res, next) {
    'use strict';
    res.render('index', {
        title: 'Week09-SessionMaster'
    });
});

router.get('/', routeParamMiddleware, function(req, res, next) {
    'use strict';
    res.render('index', {
        title: 'Week09-SessionMaster'
    });
});

var pageReport = function(request, response) {
    'use strict';
    var previousPage = '';
    if (request.session.lastPage) {
        previousPage = request.session.lastPage;
    }

    request.session.lastPage = request.url;
    var welcome = 'Welcome to ' + request.url;
    console.log('welcome', welcome);
    response.send({
        currentPage: request.url,
        previousPage: previousPage,
        'session': request.session
    });
};
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

router.get('/login', function(req, res) {
    'use strict';
    res.render('login', {
        user: req.user
    });
});

router.get('/database-page', function(req, res) {
    'use strict';
    res.render('database', {
        title: 'database'
    });
});

router.get('/authentication-page', function(req, res) {
    'use strict';
    res.render('authentication', {
        title: 'authentication'
    });
});

router.get('/basics-page', function(req, res, next) {
    'use strict';
    res.render('basics', {
        title: 'Basics'
    });
});

router.get('/logout', function(request, response) {
    'use strict';
    request.logout('google');
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

module.exports = router;
