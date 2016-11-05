define(['runQuery'], function (runQuery) {
    var nameController = function (query, data) {
        'use strict';
        var dbList = '';
        var debug = $('#debug');
        var docs = $('#docs');
        if (query == '/databaseName') {
            debug.html(data.currentDatabaseName);
        } else if (query == '/listDb') {
            for (var i = 0; i < data.length; i++) {
                dbList += data[i] + '\n';
            }
            docs.html(dbList);
        }
        // YOU WRITE THE REST OF THE CODE
        // YOU NEED TO HANDLE WHAT HAPPENS WHEN
        // EITHER THE databaseName METHOD IS CALLED
        // OR WHEN THE allDbs METHOD IS CALLED
        // VERY SIMILAR TO queryController, but simpler.
    };

    nameController.databaseName = function ($q) {
        'use strict';
        return runQuery('/databaseName', $q);
    };

    nameController.allDbs = function ($q) {
        'use strict';
        return runQuery('/listDb', $q);
    };

    return nameController;
});