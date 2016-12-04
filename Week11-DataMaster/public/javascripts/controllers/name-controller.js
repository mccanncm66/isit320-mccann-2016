define(['runQuery', 'jsonToHtml'], function(runQuery, jsonToHtml) {
    'use strict';
    var nameController = function(query, data) {
        //'use strict';
        var dbList = '';
        var debug = $('#debug');
        var docs = $('#docs');
        var displayData = JSON.stringify(data, null, 5);
        if (query == '/databaseName') {
            debug.html(data.currentDatabaseName);
        } else if (query == '/listDb') {
            for (var i = 0; i < data.length; i++) {
                dbList += data[i] + '\n';
            }
            docs.html(dbList);
            docs.html('allDatabases: ' + dbList);
            var jsonHtmlTable = jsonToHtml(JSON.parse(displayData), 'jsonTable', 'table table-bordered table-striped', 'Download');
            $('#myTable').html(jsonHtmlTable);
        }
        // YOU WRITE THE REST OF THE CODE
        // YOU NEED TO HANDLE WHAT HAPPENS WHEN
        // EITHER THE databaseName METHOD IS CALLED
        // OR WHEN THE allDbs METHOD IS CALLED
        // VERY SIMILAR TO queryController, but simpler.
    };

    nameController.databaseName = function($q) {
        //'use strict';
        return runQuery('/databaseName', $q);
    };

    nameController.allDbs = function($q) {
        //'use strict';
        return runQuery('/listDb', $q);
    };

    return nameController;
});
