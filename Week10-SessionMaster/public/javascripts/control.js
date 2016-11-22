$(document).ready(function() {
    'use strict';

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
    $('#designDoc').click(function() {
        showPage('/designDoc');
    });
    $('#sessionView').click(function() {
        showPage('/viewSessions?designDoc=elf-session&view=elfSessions');
    });
});
