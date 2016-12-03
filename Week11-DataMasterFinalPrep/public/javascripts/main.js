/**
 * Created by bcuser on 11/2/16.
 */
/**
 * author: Charlie Calvert
 * name: main.js
 * Created on 10/10/16.
 */

requirejs.config({
    baseUrl: '.',
    paths: {
        'foo': 'javascripts/foo',
        'jquery': 'components/jquery/dist/jquery',
        'control': 'javascripts/control',
        'nameController': 'javascripts/controllers/name-controller',
        'queryController': 'javascripts/controllers/query-controller',
        'passportController': 'javascripts/controllers/passport-controller',
        'Route': 'javascripts/route-provider/route',
        'runQuery': 'javascripts/route-provider/run-query',
        'jsonToHtml': '/components/elf-json-to-table/json-to-table',
        'utility': 'javascripts/utility'
    }
});

requirejs(['jquery'], function($) {
    'use strict';

    requirejs(['Route', 'control', 'utility'], function(Route, control, utils) {
        $(document).ready(function() {

            var route = new Route();
            /*
             * User clicks control
             * Create Route
             * Tell Route which route was selected
             * Call findRoutes and pass in Routes object
             *   findRoutes calls route.when for each possible path
             */
/*            $('#databaseOptions, #navigationbar, ul, li, a').click(function(event) {
                event.preventDefault();
                console.log('In main');
                route.setRoute(event.target.pathname);
                control(route);
            });*/

            $('#navigationbar').click(function(event) {
                utils.clearAll();
                event.preventDefault();
                console.log('In main');
                route.setRoute(event.target.pathname);
                control(route);
            });

        });
    });
});
