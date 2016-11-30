/**
 * Created by bcuser on 11/2/16.
 */
define(function() {
    'use strict';

    function Route() {
        //'use strict';
        this.route = '';
    }

    Route.prototype.setRoute = function(routeInit) {
        console.log('Setting Route to ' + routeInit);
        this.route = routeInit;
    };

    Route.prototype.when = function(route, control) {
        if (route === this.route) {
            console.log('Route.when calling route ' + route);
            var resolver = {
                getController: function() {
                    return control.controller;
                }
            };

            for (var funcName in control.resolve) {
                control.resolve[funcName](resolver);
            }
        }
        return this;
    };

    Route.prototype.otherwise = function() {
        // DO NOTHING FOR NOW
        console.log('Route.otherwise being called');
    };

    return Route;

});
