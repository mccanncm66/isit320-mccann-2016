/**
 * Created by bcuser on 10/26/16.
 */
define(function() {
    var THREE;
    var sne;
    var size = 20;
    function Npcs(threeInit, scene) {
        THREE = threeInit;
        sne = scene;
    }

    Npcs.prototype.createNpc = function(sne, camera, wireFrame, x, z){
        var geometry = new THREE.SphereGeometry(10, 40, 25);
        var material = new THREE.MeshNormalMaterial({
            //color: 0x00ffff,
            wireframe: wireFrame
        });

        var sphere = new THREE.Mesh(geometry, material);
        sphere.overdraw = true;
        sphere.position.set(x, size / 2, z);
        sne.add(sphere);

        return sphere;
    }
    return Npcs;
});