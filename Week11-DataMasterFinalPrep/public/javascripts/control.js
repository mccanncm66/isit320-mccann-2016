/**
 * @name Control
 */

//var myModule = angular.module('myModule', ['ngRoute']);
define(['Route', 'nameController', 'queryController'], function(Route, nameController, queryController) {
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
            templateUrl: 'templates/database-names.jade',
            controller: nameController,
            resolve: {
                result: nameController.allDbs
            }
        }).when('/database-create', {
            templateUrl: 'templates/database-create.jade',
            controller: queryController,
            resolve: {
                result: queryController.create
            }
        }).when('/database-delete', {
            templateUrl: 'templates/database-delete.jade',
            controller: queryController,
            resolve: {
                result: queryController.delete
            }
        }).otherwise({
            redirectTo: '/'
        });
    }

    return findRoutes;
});
