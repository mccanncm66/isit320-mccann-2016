var express = require('express');
var router = express.Router();
var passport = require('passport');
var clientId = '1036854361807-kmktafn5nva9dibaqrokt8q8l7g2e2bh.apps.googleusercontent.com';
var clientSecret = 'q4C8sLOr4u_OiuiMsOFG1ySS';
/* GET home page. */
router.get('/', function(req, res, next) { 'use strict';
  res.render('index', { title: 'Week08-Passport' });
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
  console.log('Info called');
  console.log('Auth: ' + request.isAuthenticated('google'));
  response.send({
    result: 'Success',
    authenticated: request.isAuthenticated()
  });
});

module.exports = router;
