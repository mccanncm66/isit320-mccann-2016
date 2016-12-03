var router = require('./Couch');

/* GET home page. */
router.get('/', function(req, res) {
    'use strict';
    console.log('Inside routes/index.js / path');
    res.render('index', {
        title: 'Data Master Final Prep'
    });
});
router.get('/logout', function(request, response) {
    'use strict';
    request.logout('google');
    response.redirect('/');
});

router.get('/login', function(req, res) {
    'use strict';
    res.render('login', {
        user: req.user
    });
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

router.get('/authentication-page', function(req, res) {
    'use strict';
    res.render('authentication', {
        title: 'authentication'
    });
});


router.get('/:id', function(request, response) {
    'use strict';
    console.log('Requested: ', request.params.id);
    response.render(request.params.id, {
        title: request.params.id
    });
});

module.exports = router;
