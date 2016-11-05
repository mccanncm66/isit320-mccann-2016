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
    //var totalNpcs = 0;
    //var totalFound = 0;
    var blocker;
    var winMessage;

    function Npcs(threeInit, scene) {
        THREE = threeInit;
        sne = scene;
        /*        readDB = new ReadDB();
                readDB.readDataBase(function(data) {
                    readDB.docData = data;
                });
                npcsDocs = readDB.docData;*/
        blocker = document.getElementById('blocker');
        winMessage = document.getElementById('win');
    }
    Npcs.prototype.npcList = [];
    Npcs.prototype.npcCoordinates = [];
    Npcs.prototype.totalNpcs = 0;
    Npcs.prototype.totalFound = 0;

    Npcs.prototype.createNpc = function(sne, camera, wireFrame, x, z, data) {
        var geometry = new THREE.SphereGeometry(10, 40, 25);
        var material = new THREE.MeshNormalMaterial({
            //color: 0x00ffff,
            wireframe: wireFrame
        });

        var sphere = new THREE.Mesh(geometry, material);
        sphere.overdraw = true;
        sphere.position.set(x, size / 2, z);
        sphere.name = getName(baseName, Math.abs(x / size), Math.abs(z / size));
        sphere.doc = data.docs[dataIndex++];
        ++this.totalNpcs;

        sne.add(sphere);

        return sphere;
    };

    Npcs.prototype.removeNpc = function(x, z, scene, gridNpc, controls) {
        gridNpc[x][z] = 0;
        var objectName = getName(baseName, x, z);
        var selectedObject = scene.getObjectByName(objectName);
        var index = this.npcList.indexOf(selectedObject);

        $('#npcName').html(selectedObject.doc.npc_name);
        ++this.totalFound;

        this.npcList.splice(index, 1);
        scene.remove(selectedObject);

        if (this.totalFound == this.totalNpcs) {
            blocker.style.display = 'none';
            //instructions.innerHTML = 'You have found all the characters!';
            winMessage.style.display = 'inline';
            controls.enabled = false;
        }
    };

    function getName(baseName, x, z) {
        return baseName + '_' + x + '_' + z;
    }

    return Npcs;
});
