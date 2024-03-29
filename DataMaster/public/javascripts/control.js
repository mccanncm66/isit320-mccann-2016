/**
 * @name Control
 */

//var myModule = angular.module('myModule', ['ngRoute']);
define(['Route', 'nameController', 'queryController',
    'passportController', 'buttonController', 'basicsController'
], function(Route, nameController, queryController,
    passportController, buttonController, basicsController) {
    'use strict';

    function findRoutes($routeProvider) {
        //'use strict';
        $routeProvider.when('/db-names', {
            templateUrl: '/db-names',
            controller: nameController,
            resolve: {
                allDbs: nameController.allDbs
            }
        }).when('/db-delete', {
            templateUrl: '/db-delete',
            controller: queryController,
            resolve: {
                result: queryController.delete
            }
        }).when('/db-create', {
            templateUrl: '/db-create',
            controller: queryController,
            resolve: {
                result: queryController.create
            }
        }).when('/insertStatesBulk', {
            templateUrl: 'templates/States.html',
            controller: queryController,
            resolve: {
                result: queryController.statesBulk
            }
        }).when('/db-insert-bulk', {
            templateUrl: '/db-insert-bulk',
            controller: queryController,
            resolve: {
                result: queryController.insertNpcsBulk
            }
        }).when('/insertStatesOneDoc', {
            templateUrl: 'templates/States.html',
            controller: 'QueryController',
            resolve: {
                result: queryController.statesOneDoc
            }
        }).when('/db-insert-one-doc', {
            templateUrl: '/db-insert-one-doc',
            controller: queryController,
            resolve: {
                result: queryController.insertNpcsOneDoc
            }
        }).when('/db-insert-design', {
            templateUrl: '/db-insert-design',
            controller: queryController,
            resolve: {
                result: queryController.design
            }
        }).when('/db-readOne', {
            templateUrl: '/db-readOne',
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
        }).when('/db-viewOneDoc', {
            templateUrl: '/db-viewOneDoc',
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
        }).when('/viewOneDoc', { //**************************************
            templateUrl: '/db-viewNpcsBulk',
            controller: buttonController,
            resolve: {
                result: buttonController.viewBulk
            }
        }).when('/db-viewNpcsOneDoc', { //******************************************
            templateUrl: '/db-viewNpcsOneDoc',
            controller: buttonController,
            resolve: {
                result: buttonController.viewOneDoc
            }
        }).when('/passport-status', {
            templateUrl: '/passport-status',
            controller: passportController
        }).when('/basics', {
            templateUrl: '/basics',
            controller: basicsController
        }).otherwise({
            redirectTo: '/'
        });
    }

    return findRoutes;
});
