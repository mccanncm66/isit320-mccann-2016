/**
 * Created by bcuser on 10/10/16.
 */
requirejs.config({
    baseUrl: '.',
    paths: {
        'Collisions': 'javascripts/collisions',
        'control': 'javascripts/control',
        'jquery': 'components/jquery/dist/jquery',
        'Three': 'javascripts/three',
        'floor': 'javascripts/floor',
        'Npcs': 'javascripts/npcs',
        'PointerLockControls': 'javascripts/pointer-lock-controls',
        'PointerLockSetup': 'javascripts/pointer-lock-setup'
    },
    shim: {
        'Three': {
            exports: 'THREE'
        }
    }
});

requirejs(['jquery'], function($) {
    'use strict';
    requirejs(['Three', 'control'], function(THREE, Control) {
        //window.THREE = THREE;
        $(document).ready(function() {
            var control = new Control(THREE);
        });
    });
});
