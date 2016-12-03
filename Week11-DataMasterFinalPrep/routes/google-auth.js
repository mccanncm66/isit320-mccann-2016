/**
 * Created by charlie on 11/5/16.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

/**************************************
 *  Google
 **************************************/

function ensureAuthenticated(req, res, next) {
    'use strict';
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

router.get('/account', ensureAuthenticated, function(request, response) {
    'use strict';
    console.log(request.user);
    response.render('profile-google', {
        title: 'Google Account',
        user: request.user
    });
});

router.get('/logout', function(request, response) {
    'use strict';
    request.logout('google');
    response.redirect('/');
});

passport.use(new GoogleStrategy({
        clientID: '1036854361807-kmktafn5nva9dibaqrokt8q8l7g2e2bh.apps.googleusercontent.com',
        clientSecret: 'q4C8sLOr4u_OiuiMsOFG1ySS',
        callbackURL: 'http://localhost:30025/auth/google/callback',
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {

        'use strict';
        console.log('***********');
        console.log(request);
        console.log('***********');
        console.log(accessToken);
        console.log('***********');
        console.log(refreshToken);
        console.log('***********');
        console.log(profile);
        console.log('***********');
        console.log(done);
        console.log('***********');
        // asynchronous verification, for effect...
        process.nextTick(function() {
            console.log('***********');

            // Return Google profile for now. We will add Database data here later.
            return done(null, profile);
        });
    }
));

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile']
    }));

//router.get('/auth/google/callback',
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/authentication-page'
    }),
    function(req, res) {
        'use strict';
        console.log('successful authentication');
        // Successful authentication, redirect home.
        res.redirect('/authentication-page');
    });

module.exports = router;
