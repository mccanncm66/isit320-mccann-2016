var router = require('./Couch');

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

router.get('/:id', function(request, response) {
    'use strict';
    response.render(request.params.id, {
        id: request.params.id
    });
});

module.exports = router;
