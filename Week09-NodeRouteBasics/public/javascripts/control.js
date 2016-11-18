$(document).ready(function() {
    'use strict';
    $.postJSON = function(url, data, func) {
        $.post(url,data,func,'json');
    };
    $('#feetToMiles').click(function() {
        console.log('Clicked on Feet To Miles');
        var miles = $('#milesInput').val();
        var input = {miles: miles};
        $.getJSON('/feetToMiles', input, function(result) {
            var output = JSON.stringify(result.TotalMiles, null, 4);
            console.log(output);
            $('#debug').html(output);
        });
    });

    $('#getFeet').click(function() {
        $.getJSON('/getFeetInMile', function(result) {
            $('#debug').html(JSON.stringify(result.FeetInMile, null, 4));
        })
    });

    $('#calcCir').click(function(){
        var radius = $('#milesInput').val();
        var input = {radius: radius};
        $.getJSON('/getCircumference', input, function(result){
            var output = JSON.stringify(result.Circumference, null, 4);
            console.log(output);
            $('#debug').html(output);
        });
    });

    $('#testPost').click(function(){
        var data = {result:'success'};
        console.log('testPost clicked');
        $.postJSON('/post/test-post', data, function(data){
            var output = JSON.stringify(data, null, 4);
            console.log(textStatus);
            $('#debug').html(output);
        });
    });
});
