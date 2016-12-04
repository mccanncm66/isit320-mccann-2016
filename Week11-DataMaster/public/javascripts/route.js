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
        this.route = routeInit;
    };

    Route.prototype.when = function(route, control) {
        if (route === this.route) {
            console.log('route called');
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
    };

    return Route;

});
