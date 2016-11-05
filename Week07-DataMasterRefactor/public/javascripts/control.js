/**
 * @name Control
 */

//var myModule = angular.module('myModule', ['ngRoute']);
define(['nameController', 'queryController'], function (nameController, queryController) {

    function control ($routeProvider) {
        'use strict';
        $routeProvider.when('/databaseName', {
            templateUrl: 'templates/DatabaseNames.html',
            controller: nameController,
            resolve: {
                databaseName: nameController.databaseName,
                allDbs: nameController.allDbs
            }
        }).when('/deleteDb', {
            templateUrl: 'templates/QueryView.html',
            controller: 'QueryController',
            resolve: {
                result: queryController.delete
            }
        }).when('/createDb', {
            templateUrl: 'templates/QueryView.html',
            controller: 'QueryController',
            resolve: {
                result: queryController.create
            }
        }).when('/insertStatesBulk', {
            templateUrl: 'templates/States.html',
            controller: 'QueryController',
            resolve: {
                result: queryController.statesBulk
            }
        }).when('/insertStatesOneDoc', {
            templateUrl: 'templates/States.html',
            controller: 'QueryController',
            resolve: {
                result: queryController.statesOneDoc
            }
        }).when('/insertDesignDoc', {
            templateUrl: 'templates/QueryView.html',
            controller: 'QueryController',
            resolve: {
                result: queryController.design
            }
        }).when('/readOne', {
            templateUrl: 'templates/QueryView.html',
            controller: 'QueryController',
            resolve: {
                result: queryController.readOne
            }
        }).when('/viewBulk', {
            templateUrl: 'templates/QueryView.html',
            controller: 'QueryController',
            resolve: {
                result: queryController.viewBulk
            }
        }).when('/viewOneDoc', {
            templateUrl: 'templates/QueryView.html',
            controller: 'QueryController',
            resolve: {
                result: queryController.viewOneDoc
            }
        }).when('/viewBulkStatesCapital', {
            templateUrl: 'templates/QueryView.html',
            controller: 'QueryController',
            resolve: {
                result: queryController.viewBulkAngular
            }
        }).otherwise({
            redirectTo: '/'
        });
    };

    return control;
});
