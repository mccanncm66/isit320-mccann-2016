/**
 * @name CouchDesignDoc
 */

/* globals emit: true */

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

    var docIdDoc = function(doc) {
        emit(doc._id, doc);
    };

    var docBulk = function(doc) {
        emit(doc._id, doc.name);
    };

    var docStateCapital = function(doc) {
        emit(doc.abbreviation, {
            'name': doc.name,
            'capital': doc.capital
        });
    };

    var docStatesDoc = function(doc) {
        if (doc._id === 'statesDoc') {
            var data = [];
            doc.docs.forEach(function(state) {
                data.push({
                    'name': state.name,
                    'capital': state.capital
                });
            });
            emit(doc.docs[0].abbreviation, data);
        }
    };

    var docGamesDoc = function(doc) {
        if (doc._id === 'npcData') {
            var data = [];
            doc.docs.forEach(function(game) {
                data.push({
                    'id': game.npc_id,
                    'name': game.npc_name,
                    'value': game.value
                });
            });
            emit(doc.docs[0].abbreviation, data);
        }
    };

    var docGameQuestionDoc = function(doc) {
        if (doc._id === 'npcData') {
            var data = [];
            doc.docs.forEach(function(game) {
                data.push({
                    'id': game.npc_id,
                    'name': game.npc_name,
                    'question': game.question
                });
            });
            emit(doc.docs[0].abbreviation, data);
        }
    };

    var elfSessions = function(doc) {
        console.log('**********************************' + doc.type);
        console.log('**********************************' + doc.collectionName);
        if (doc.type === 'connect-session' || doc.collectionName === 'sessions') {
            emit(doc._id, doc);
        }
    };

    var elfSessionStore = function(doc) {
        if (doc.collectionName === 'sessions' && doc.expires) {
            emit(doc._id, doc);
        }
    };

    var elfSessionExpires = function(doc) {
        if (doc.collectionName === 'sessions' && doc.expires) {
            emit(doc.expires);
        }
    };

    function createDesignDocument(designDocument, designName, response) {
        var nanoDb = nano.db.use(dbName);
        nanoDb.insert(designDocument, designName, function(error, body) {
            if (!error) {
                var result = {
                    'ok': true,
                    data: body
                };
                console.log(result);
                response.status(200).send(result);
            } else {
                console.log('error: ' + error);
                response.send({
                    'Result': 'The document might already exist. ' + error
                });
            }
        });
    }

    function createElfDesignDocument(designDocument, designName, response) {
        var nanoDb = nano.db.use('couch-session-mccann');
        nanoDb.insert(designDocument, designName, function(error, body) {
            if (!error) {
                var result = {
                    'ok': true,
                    data: body
                };
                console.log(result);
                response.status(200).send(result);
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

        var designName = '_design/states';
        var designDocument = {
            'views': {
                'docBulk': {
                    'map': docBulk
                },
                'docIdDoc': {
                    'map': docIdDoc
                },
                'docStateCapital': {
                    'map': docStateCapital
                },
                'docStatesDoc': {
                    'map': docStatesDoc
                },
                'docGamesDoc': {
                    'map': docGamesDoc
                },
                'docGameQuestionDoc': {
                    'map': docGameQuestionDoc
                }
                /*,
                 'viewStatesDoc' : {
                 'map' : viewStatesDoc
                 },
                 'docStatesHtml' : {
                 'map' : docStatesHtml
                 }*/
            }
        };

        createDesignDocument(designDocument, designName, response);
    });

    router.get('/sessionDesignDoc', function(request, response) {
        console.log('Design Doc Called');

        var designName = '_design/elf-session';
        var designDocument = {
            'views': {
                'elfSessions': {
                    'map': elfSessions
                },
                'elfSessionStore': {
                    'map': elfSessionStore
                },
                'elfSessionExpires': {
                    'map': elfSessionExpires
                }
            }
        };

        createElfDesignDocument(designDocument, designName, response);
    });

}

module.exports = designDocs;
