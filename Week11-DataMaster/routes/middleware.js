var express = require('express');
var router = express.Router();

var session = require('express-session');
var uuid = require('uuid');

var FileStore = require('session-file-store')(session);
var ConnectCouchDB = require('connect-couchdb')(session);
//var passport = require('passport');
var sessionstore = require('sessionstore');
var setServer = require('./set-server');
var setDB = require('./set-db');

// LOAD PARSEURL:
var parseurl = require('parseurl');

// WHAT OTHER PACKAGES NEED TO BE LOADED BEFORE THIS CODE WILL WORK?

router.use(function(request, response, next) {
    'use strict';
    console.log('Sample middleware with useful output');
    console.log('COOKIES', request.cookies);
    console.log('SECRET', request.secret);
    // Uncomment the following line for one run, perhaps.
    // It is too verbose to use everytime
    // console.log(Object.getOwnPropertyNames(request));
    next();
});

/**********************************
 * * Couch Session
 **********************************/
//Add couchdb server IP address

var sessionStore = sessionstore.createSessionStore({
    type: 'couchdb',
    host: setServer.serverUrls.sessionServer, // optional
    port: 5984, // optional
    dbName: 'couch-session-mccann', // optional
    collectionName: 'sessions', // optional
    timeout: 10000 // optional
}, function(data) {
    'use strict';
    console.log('sessionStore callback', data);
});

/*var couchStore = new ConnectCouchDB({
    // Name of the database you would like to use for sessions.
    name: 'couch-session-mccann',

    // Optional. Database connection details. See yacw documentation
    // for more informations
    //username: 'username',
    //password: 'password',

    host: '168.156.47.122',

    // Optional. How often expired sessions should be cleaned up.
    // Defaults to 600000 (10 minutes).
    reapInterval: 600000,

    // Optional. How often to run DB compaction against the session
    // database. Defaults to 300000 (5 minutes).
    // To disable compaction, set compactInterval to -1
    compactInterval: 300000,

    // Optional. How many time between two identical session store
    // Defaults to 60000 (1 minute)
    setThrottle: 60000
});*/

router.use(session({
    genid: function(req) {
        'use strict';
        console.log('id generated------------------------------------------------------');
        return uuid.v4(); // use UUIDs for session IDs
    },
    key: 'app.sess',
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: sessionStore
}));

router.use(function(request, response, next) {
    'use strict';
    var views = request.session.views;

    if (!views) {
        views = request.session.views = {};
    }

    // get the url pathname
    var pathname = parseurl(request).pathname;
    console.log('pathname', pathname);
    console.log('views', views);

    // count the views
    views[pathname] = (views[pathname] || 0) + 1;

    next();
});

// WHAT DO YOU NEED TO DO HERE TO EXPORT THIS CODE FROM THIS MODULE?
module.exports = router;
