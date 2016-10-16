/**
 * Created by bcuser on 10/10/16.
 */
requirejs.config({
    baseUrl: '.',
    paths: {
        'jquery': 'components/jquery/dist/jquery',
        'bootstrap': 'components/bootstrap/dist/js/bootstrap',
        'Three': 'javascripts/three',
        'control': 'javascripts/control',
        'floor': 'javascripts/floor',
        'PointerLockControls': 'javascripts/pointer-lock-controls',
        'PointerLockSetup': 'javascripts/pointer-lock-setup'

    },
    shim: {
        'Three': {
            exports: 'THREE'
        }
        /*        'PointerLockControls': {
                    exports: 'THREE.PointerLockControls'
                }*/
    }
});

requirejs(['jquery'], function($) {
    'use strict';
    requirejs(['bootstrap', 'Three', 'control'], function(bootstrap, THREE, Control) {
        window.THREE = THREE;
        $(document).ready(function() {
            var control = new Control(THREE);
        });
    });
});
