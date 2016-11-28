$(document).ready(function() {
    'use strict';
    $('.nav li').hover(function(event) {
        setActiveMenuItem(event.currentTarget.id);
    });

    function setActiveMenuItem(id) {

        $('.nav li').removeClass('active');

        // var menuItem = $('a[href=".' + this.location.pathname + '"]');
        var name = id;
        name = name.slice(1, name.length).trim();
        if (name.length === 0) {
            name = 'home';
        }
        var selector = '#' + name;
        try {
            var menuItem1 = $(selector);
            menuItem1.addClass('active');
        } catch (e) {
            console.log('Could not find selector. This is expected when testing.', e);
        }
    }

    Main();

});

var Main = (function() {
    'use strict';

    function Main() {
        $('#aboutButton').click(function() {
            console.log('main button clicked');
        });
    }

    return Main;
})();
