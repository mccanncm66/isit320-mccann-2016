/**
 * Created by bcuser on 11/12/16.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');

var TwitterStrategy = require('passport-twitter').Strategy;

var TWITTER_CONSUMER_KEY = 'Rr5925aGxDkeATYDFf4q1zRVH';
var TWITTER_CONSUMER_SECRET = 'pcVFz2qeQsY5tM0getw82G5DvLewcBkDPalwIloI7EjCIYqsWe';

passport.use(new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: "http://localhost:30025/twitter/callback"
    },
    function(token, tokenSecret, profile, cb) {
        console.log('Twitter strategy callback', profile);
        process.nextTick(function() {
            return cb(null, profile);
        });
    }));


router.get('/login',
    passport.authenticate('twitter'));

router.get('/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/profile', function(req, res) {
    'use strict';
    console.log(req);
    res.render('profile-twitter', {
        title: 'Twitter Account',
        user: req.user
    });
});

module.exports = router;