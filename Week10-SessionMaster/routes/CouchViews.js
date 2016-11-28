function views(router, nano, dbName) {
    'use strict';

    router.get('/viewSessions', function(request, response) {
        console.log(request.body);
        var nanoDb = nano.db.use(dbName);
        nanoDb.view(request.query.designDoc, request.query.view, function(err, body) {
            if (!err) {
                console.log(body.session);
                response.send(body);
            } else {
                console.log(err);
                response.status(err.statusCode).send(err);
            }
        });

    });
}

module.exports = views;
