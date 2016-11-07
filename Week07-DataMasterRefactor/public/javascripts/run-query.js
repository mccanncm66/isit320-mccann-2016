define(function(require) {
    'use strict';

    function runQuery(query, $q) {
        console.log('run query started');
        //'use strict';
        var controller = $q.getController();
        $.getJSON(query, function(json) {
            console.log('run-query called');
            console.log('query requested');
            console.log(query);
            console.log('json data');
            console.log(json);
            console.log('controller');
            console.log(controller);
            controller(query, json);
        }).fail(function(jqxhr, textStatus, error) {
            var response = {
                error: 'Unknown. Is program running?'
            };
            if (jqxhr.responseText) {
                response = JSON.parse(jqxhr.responseText);
                response.genericError = error;
                response.statusText = textStatus;
            }
            queryController({
                'requestFailed': response
            });
        });
    }

    return runQuery;
});
