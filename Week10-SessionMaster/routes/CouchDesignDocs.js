/**
 * New node file
 */

function designDocs(router, nano, dbName) {
    'use strict';

    var firstAndLast = function(doc) {
        if (doc.firstName && doc.lastName) {
            var name = doc.firstName + ' ' + doc.lastName;
            emit(doc._id, name);
        }
    };

    var lastOnly = function(doc) {

        if (doc.firstName && doc.lastName) {
            var name = doc.lastName;
            emit(doc._id, name);
        }
    };

    var elfSessions = function(doc) {
        if (doc.type === 'connect-session') {
            emit(doc._id, doc);
        }
    };

    var elfSessionStore = function(doc) {
        if (doc.collectionName === 'sessions' && doc.expires){
            emit(doc._id, doc);
        }
        // if the doc **collectionName** property equals **'sessions'** then emit the **doc._id** and the **doc** itself.
    };

    var elfSessionExpires = function (doc) {
        // if the doc **collectionName** property equals **'sessions'** and **doc.expires exists** then emit the **doc.expires**.
        if (doc.collectionName === 'sessions' && doc.expires) {
            emit(doc.expires);
        }
    };

    function createDesignDocument(designDocument, designName, response) {
        var nanoDb = nano.db.use(dbName);
        nanoDb.insert(designDocument, designName, function(error, body) {
            if (!error) {
                console.log(body);
                response.send(body);
            } else {
                console.log('error: ' + error);
                response.send({
                    'Result': 'The document might already exist. ' + error
                });
            }
        });
    }

    router.get('/designDoc', function(request, response) {
        console.log('Design Doc Called');

        var designName = '_design/elf-session';
        var designDocument = {
            'views': {
                'elfSessions': {
                    'map': elfSessions
                },
                'elfSessionStore' : {
                    'map': elfSessionStore
                },
                'elfSessionExpires': {
                    'map': elfSessionExpires
                }
            }
        };

        createDesignDocument(designDocument, designName, response);
    });

}

module.exports = designDocs;
