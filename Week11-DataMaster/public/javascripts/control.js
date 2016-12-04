/**
 * @name Control
 */

//var myModule = angular.module('myModule', ['ngRoute']);
define(['Route', 'nameController', 'queryController', 'passportController'], function(Route, nameController, queryController, passportController) {
    'use strict';

    function findRoutes($routeProvider) {
        //'use strict';
        $routeProvider.when('/db-names', {
            templateUrl: '/db-names',
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
        }).when('/insertStatesBulk', {
            templateUrl: 'templates/States.html',
            controller: queryController,
            resolve: {
                result: queryController.statesBulk
            }
        }).when('/insertNpcsBulk', {
            templateUrl: 'templates/States.html',
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
        }).when('/passport-status', {
            templateUrl: '/passport-status',
            controller: passportController
        }).otherwise({
            redirectTo: '/'
        });
    }

    return findRoutes;
});
