$(document).ready(function() {
    'use strict';
    var isValid;
    var validateInput = function(userInput) {
        if (parseInt(userInput)) {
            return true;
        } else {
            $('#debug').html('Error: Please enter a number!');
            return false;
        }
    };

    $('button').click(function() {
        isValid = validateInput($('#milesInput').val());
    });

    $.postJSON = function(url, data, func) {
        $.post(url, data, func, 'json');
    };

    $('#feetToMiles').click(function() {
        console.log('Clicked on Feet To Miles');
        var miles = $('#milesInput').val();
        var input = {
            miles: miles
        };
        if (isValid) {
            $.getJSON('/feetToMiles', input, function(data) {
                var output = JSON.stringify(data.result, null, 4);
                console.log(output);
                $('#debug').html(output);
            });
        }
    });

    $('#getFeet').click(function() {
        $.getJSON('/getFeetInMile', function(data) {
            $('#debug').html(JSON.stringify(data.result, null, 4));
        });
    });

    $('#calcCir').click(function() {
        var radius = $('#milesInput').val();
        var input = {
            radius: radius
        };
        if (isValid) {
            $.postJSON('/getCircumference', input, function(data) {
                var output = JSON.stringify(data.result, null, 4);
                console.log(output);
                $('#debug').html(output);
            });
        }
    });

    $('#postMilesToFeet').click(function() {
        var miles = $('#milesInput').val();
        var data = {
            result: 'success',
            miles: miles
        };
        if (isValid) {
            $.getJSON('/miles-to-feet', data, function(data) {
                var output = JSON.stringify(data.result, null, 4);
                $('#debug').html(output);
            });
        }
    });

});
