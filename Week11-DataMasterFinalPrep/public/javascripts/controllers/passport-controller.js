/**
 * Created by bcuser on 12/2/16.
 */
define(['runQuery', 'utility'], function(runQuery, utils) {
    'use strict';
    var passportController = function(query, data) {
        utils.clearAll();
        if(query.requestFailed) {
            utils.failed(query.requestFailed);
            return;
        }

        var debug = $('#debug');
        var docs = $('#docs');
        var display = $('#display');
        var displayData = JSON.stringify(data, null, 5);

        if (query === '/status') {
            console.log('in /login');
            display.html(displayData);
        }
    }

    passportController.login = function($q) {
        return runQuery('/status', $q);
    };

    passportController.status = function(request, response) {
        'use strict';
        console.log('Status called');
        console.log('Auth: ' + request.isAuthenticated('google'));
        response.send({
            result: 'Success',
            authenticated: request.isAuthenticated()
        });
    }
    return passportController;
});
