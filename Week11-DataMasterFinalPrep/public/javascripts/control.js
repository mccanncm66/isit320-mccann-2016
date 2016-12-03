
define(['Route', 'nameController', 'queryController', 'passportController'], function(Route, nameController, queryController, passportController) {
    'use strict';

    function findRoutes($routeProvider) {
        //'use strict';
        $routeProvider.when('/databaseName', {
            templateUrl: 'templates/DatabaseNames.html',
            controller: nameController,
            resolve: {
                databaseName: nameController.databaseName,
                allDbs: nameController.allDbs
            }
        }).when('/deleteDb', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.delete
            }
        }).when('/createDb', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.create
            }
        }).when('/insertNpcsBulk', {
            templateUrl: 'templates/States.html',
            controller: queryController,
            resolve: {
                result: queryController.insertNpcsBulk
            }
        }).when('/insertNpcsOneDoc', {
            templateUrl: 'templates/States.html',
            controller: queryController,
            resolve: {
                result: queryController.insertNpcsOneDoc
            }
        }).when('/insertDesignDoc', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.design
            }
        }).when('/readOne', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.readOne
            }
        }).when('/viewBulk', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.viewBulk
            }
        }).when('/viewOneDoc', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.viewOneDoc
            }
        }).when('/viewBulkStatesCapital', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.viewBulkAngular
            }
        }).when('/viewNpcsBulk', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.viewBulk
            }
        }).when('/viewNpcsOneDoc', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.viewOneDoc
            }
        }).when('/database-names', {
            templateUrl: '/database-names',
            controller: nameController,
            resolve: {
                result: nameController.allDbs
            }
        }).when('/database-create', {
            templateUrl: '/database-create',
            controller: queryController,
            resolve: {
                result: queryController.create
            }
        }).when('/database-delete', {
            templateUrl: '/database-delete',
            controller: queryController,
            resolve: {
                result: queryController.delete
            }
        }).when('/authentication', {
            templateUrl: '/authentication',
            controller: passportController,
            resolve: {
                result: passportController.login
            }
        }).when('/status', {
            templateUrl: '/status-page',
            controller: passportController,
            resolve: {
                result: passportController.login
            }
        }).when('/database-insert-design-doc', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.design
            }
        }).when('/database-insert-data', {
            templateUrl: 'templates/States.html',
            controller: 'QueryController',
            resolve: {
                result: queryController.insertGameData
            }
        }).otherwise({
            redirectTo: '/'
        });
    }

    return findRoutes;
});
