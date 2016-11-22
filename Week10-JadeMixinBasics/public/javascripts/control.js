$(document).ready(function() { 'use strict';
    $("#target").submit(function(event) {
        event.preventDefault();
        var userFormData = $(this).serialize();
        $('#formResults').html(userFormData);

        $.getJSON('/foo?' + userFormData, function(result){
            var resultString = JSON.stringify(result, null, 4);
            $('#serverResults').html(resultString);
        });
    });
});