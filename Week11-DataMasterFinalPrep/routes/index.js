var router = require('./Couch');

/* GET home page. */
router.get('/', function(req, res) {
    'use strict';
    res.render('index', {
        title: 'Couch Views II'
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
