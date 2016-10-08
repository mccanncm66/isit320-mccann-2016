$(document).ready(function() {
    'use strict';
    console.log('Document loaded in Isit320');

    $('#read').click(read);
    $('#readJson').click(callReadJson);
    $('#add').click(add);

    function read() {
        console.log('callRead called');
        $.getJSON('/read', function(result) {
            console.log(result);
            $('#display').html(JSON.stringify(result));
        });
    }

    function callReadJson() {
        console.log('readJson called');
        $.getJSON('names.json', function(result) {
            console.log(result);
            $('#display').html(JSON.stringify(result));
        });
    }

    function add() {
        var operatorA = $('#operatorA').val();
        var operatorB = $('#operatorB').val();
        console.log('operators:', operatorA, operatorB);
        var requestQuery = {
            operatorA: operatorA,
            operatorB: operatorB
        };
        console.log('add called');
        $.getJSON('/add', requestQuery, function(result) {
            console.log(result);
            $('#display').html(JSON.stringify(result));
        });
    }
});
