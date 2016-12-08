define(['runQuery', 'utils', 'jsonToHtml'], function(runQuery, utility, jsonToHtml) {
    'use strict';

    var basicsController = function(query, result) {
        //'use strict';
        function showPage(pageRoute) {

            $.getJSON(pageRoute, function(data) {
                console.log(data);
                $('#display').html(JSON.stringify(data, null, 4));
            }).fail(function(jq, textStatus, error) {
                $('#displayArea').html('error: ' + jq.responseText);
                console.log('error: ', status);
                console.log('error: ', error);
            });
        }

        $('#page01').click(function() {
            showPage('/page01');
        });
        $('#page02').click(function() {
            showPage('/page02');
        });
        $('#page03').click(function() {
            showPage('/page03');
        });
        $('#viewPage01').click(function() {
            showPage('/views/page01');
        });
        $('#viewPage02').click(function() {
            showPage('/views/page02');
        });
        $('#dataInsertDesign, #designDoc').click(function() {
            showPage('/sessionDesignDoc');
        });
        $('#dataViewSessions, #sessionView').click(function() {
            showPage('/viewSessions?designDoc=sessions&view=findAll');
        });
        $('#mainBasic').click(function() {
            redirect('/basics-page');
        });
        $('#mainDatabase').click(function() {
            showPage('/database-page');
        });
        $('#mainAuthentication').click(function() {
            showPage('/authentication-page');
        });
        $('#dataSessionExpires').click(function() {
            showPage('/viewSessions?designDoc=elf-session&view=elfSessionExpires');
        });
        $('#authLoginStatus').click(function() {
            showPage('/status');
        });
        $('#request').click(function() {
            showPage('views/request');
        });
        //docs.html('YOUR CODE HERE PUTS INFO IN docs');
    };

    basicsController.viewBulk = function($q) { //*************************************************
        //'use strict';
        return runQuery('/viewOneDoc?designDoc=states&view=docGamesDoc', $q);
    };

    basicsController.viewOneDoc = function($q) { //************************************************8
        //'use strict';
        return runQuery('/db-viewNpcsOneDoc?designDoc=states&view=docGameQuestionDoc', $q);
    };

    return basicsController;
});
