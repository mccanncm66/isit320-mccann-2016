$(document).ready(function() { 'use strict';
    $('#feetToMiles').click(function() {
        console.log('Clicked on Feet To Miles');
        var miles = $('#milesInput').val();
        var input = {miles: miles};
        $.getJSON('/feetToMiles', input, function(result) {
            var output = JSON.stringify(result, null, 4);
            console.log(output);
            $('#debug').html(output);
        });
    });
});
