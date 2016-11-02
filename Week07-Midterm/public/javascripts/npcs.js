/**
 * Created by bcuser on 10/26/16.
 */
define(['ReadDB'], function(ReadDB) {
    'use strict';
    var THREE;
    var sne;
    var size = 20;
    var baseName = 'npc';
    var readDB;
    var npcsDocs = [];
    var dataIndex = 0;

    function Npcs(threeInit, scene) {
        THREE = threeInit;
        sne = scene;
        readDB = new ReadDB();
        readDB.readDataBase(function(data) {
            readDB.docData = data;
        });
        npcsDocs = readDB.docData;
    }
    Npcs.prototype.npcList = [];
    Npcs.prototype.npcCoordinates = [];

    Npcs.prototype.createNpc = function(sne, camera, wireFrame, x, z) {
        var geometry = new THREE.SphereGeometry(10, 40, 25);
        var material = new THREE.MeshNormalMaterial({
            //color: 0x00ffff,
            wireframe: wireFrame
        });

        var sphere = new THREE.Mesh(geometry, material);
        sphere.overdraw = true;
        sphere.position.set(x, size / 2, z);
        sphere.name = getName(baseName, Math.abs(x / size), Math.abs(z / size));
        sphere.doc = readDB.docData.docs[dataIndex++];

        sne.add(sphere);

        return sphere;
    };

    Npcs.prototype.removeNpc = function(x, z, scene, gridNpc) {
        gridNpc[x][z] = 0;
        var objectName = getName(baseName, x, z);
        var selectedObject = scene.getObjectByName(objectName);
        var index = this.npcList.indexOf(selectedObject);

        $('#npcName').html(selectedObject.doc.npc_name);

        this.npcList.splice(index, 1);
        scene.remove(selectedObject);
    };

    function getName(baseName, x, z) {
        return baseName + '_' + x + '_' + z;
    }

    return Npcs;
});
