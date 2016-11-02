/**
 * Created by bcuser on 11/2/16.
 */
define(function() {
    'use strict';

    function ReadDB() {}
    ReadDB.prototype.docData = null;

    ReadDB.prototype.readDataBase = function(callback) {
        $.getJSON('/read?docName=npcData', function(data) {
            console.log(JSON.stringify(data.docs), null, 4);
            callback(data);

        }).fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log({
                'Request Failed': err
            });
            var response = JSON.parse(jqxhr.responseText);
            var responseValue = JSON.stringify(response, null, 4);
            console.log(responseValue);
            alert('Database not connected' + responseValue);
        });
    };

    return ReadDB;
});
