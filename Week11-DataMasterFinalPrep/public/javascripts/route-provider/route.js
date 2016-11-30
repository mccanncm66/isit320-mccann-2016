/**
 * Created by charlie on 10/31/16.
 */

define(['runQuery'], function(runQuery) {
    'use strict';

    var that;

    function Route() {
        this.route = '';
        that = this;
    }

    Route.prototype.setRoute = function(routeInit) {
        console.log('Setting Route.setRoute to ' + routeInit);
        this.route = routeInit;
    };

    function root(control) {
        console.log('Calling root inside Route');
        $('#elfContent').load(control.templateUrl, function(result) {
            that.resolveRequest(control)
        });
    }

    Route.prototype.resolveRequest = function(control) {
        console.log('Calling Route.resolveRequest')
        var resolver = {
            getController: function() {
                return control.controller;
            }
        };

        if (control.resolve) {
            for (var funcName in control.resolve) {
                control.resolve[funcName](resolver);
            }
        } else {
            runQuery(null, resolver)
        }
    };

    Route.prototype.when = function(route, control) {
        if (route === this.route) {
            console.log('Calling Route.when with route ' + route);
            if (control.templateUrl) {
                root(control)
            } else {
                this.resolveRequest(control);
            }
        }
        return this;
    };

    Route.prototype.otherwise = function() {
        // DO NOTHING FOR NOW
        console.log('otherwise');
    };

    return Route;

});
