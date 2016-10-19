define(['jquery'], function(jquery) {
    'use strict';

    var elf = {};
    elf.run = {};

    elf.ClickEvents = (function() {
        var listItem = $('.listItem');
        var intro = $('#intro');

        function ClickEvents() {
            $(intro).html('ClickEvents is loaded. Click the three items seen below.');
            $(intro).addClass('blue');
            $(listItem).click(listClick);
        }

        var listClick = function(event) {
            var clickText = event.target.innerText;
            var prompt = 'You clicked: ';
            $(intro).html(prompt + clickText);
            callServer();

        };

        function callServer() {
            $.getJSON('/' + clickText, function(result) {
                console.log(result);
                $('#result').html('Result: ' + result.result);
                $('#route').html('Route: ' + result.route);
                $('#message').html('Message: ' + result.message);
            });
        };

        return ClickEvents;

    }());

    return elf.ClickEvents;

});
