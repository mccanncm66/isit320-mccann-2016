$(document).ready(function() {
    'use strict';
    $('.nav li').hover(function(event) {
        setActiveMenuItem(event.currentTarget.id);
    });


    function setActiveMenuItem(id) {

        $(".nav li").removeClass("active");

        // var menuItem = $('a[href=".' + this.location.pathname + '"]');
        var name = id;
        var name = name.slice(1, name.length).trim();
        if (name.length === 0) { name = 'home'; }
        var selector = '#' + name;
        try {
            console.log('try called');
            var menuItem1 = $(selector);
            menuItem1.addClass('active');

        } catch(e) {
            console.log('Could not find selector. This is expected when testing.', e);
        }
    };
    Main();

});

var Main = (function(){
    function Main(){
        $('#mainButton').click(function(req, res){
           console.log('main button clicked');
        });
    }

    return Main;
})();