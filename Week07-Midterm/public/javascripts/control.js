/* globals define: true, THREE:true */

define(['floor', 'PointerLockControls', 'PointerLockSetup', 'Collisions', 'Npcs'],
    function(Floor, PointerLockControls, PointerLockSetup, Collisions, Npcs) {
        'use strict';
        var alternateCrateTexture;
        var camera = null;
        var collisions;
        var cube = null;
        var cubes = [];
        var crateTexture;
        var controls = null;
        var scene = null;
        var foundX;
        var foundZ;
        var totalNpcs = 3;
        var foundNpcs = 0;
        //var npcList = [];
        var npc;
        var npcGrid = [
            [],
            []
        ];
        var renderer = null;
        var raycaster = null;
        var size = 20;
        var THREE = null;

        function Control(threeInit) {
            THREE = threeInit;
            console.log('Control called');
            var loader = new THREE.TextureLoader();
            crateTexture = loader.load('images/crate.jpg');
            alternateCrateTexture = loader.load('images/crate02.jpg');
            init();
            animate();
        }

        function init() {

            var screenWidth = window.innerWidth / window.innerHeight;
            camera = new THREE.PerspectiveCamera(75, screenWidth, 1, 1000);

            scene = new THREE.Scene();
            scene.fog = new THREE.Fog(0xffffff, 0, 750);

            npc = new Npcs(THREE, scene);

            addCubes(scene, camera, false);

            doPointerLock();

            addLights();

            var floor = new Floor(THREE);
            floor.drawFloor(scene);

            collisions = new Collisions(THREE);

            raycaster = new THREE.Raycaster(new THREE.Vector3(),
                new THREE.Vector3(0, -1, 0), 0, 10);

            renderer = new THREE.WebGLRenderer({
                antialias: true
            });

            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            window.addEventListener('resize', onWindowResize, false);
        }

        function animate() {

            requestAnimationFrame(animate);

            var xAxis = new THREE.Vector3(1, 0, 0);

            controls.isOnObject(false);

            var controlObject = controls.getObject();
            var position = controlObject.position;

            var currentX = Math.abs(Math.round(position.x / size));
            var currentZ = Math.abs(Math.round(position.z / size));

            drawText(position);

            collisions.collisionDetection(controls, cubes, raycaster);

            if (collisions.npcDetection(position, npcGrid)) {
                npc.removeNpc(currentX, currentZ, scene, npcGrid);
                foundX = currentX;
                foundZ = currentZ;
            }

            if (currentX !== foundX || currentZ !== foundZ) {
                $('#npcName').html('');
            }

            // Move the camera
            controls.update();

            renderer.render(scene, camera);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function addCubes(scene, camera, wireFrame) {
            //var horizontalLine = 0;
            //var verticalLine = 20;
            var crateSelector;
            $.getJSON('grid000.json', function(grid) {
                for (var i = 0; i < grid.length; i++) {
                    //console.log(grid[i]);
                    for (var j = 0; j < grid[i].length; j++) {
                        if (grid[i][j] === 1) {
                            if (j % 5 !== 0 && i % 5 !== 0) {
                                crateSelector = true;
                            } else {
                                crateSelector = false;
                            }
                            addCube(scene, camera, wireFrame, i * size, -(size * j), crateSelector);
                        }

                    }

                }
            });

            $.getJSON('npcs000.json', function(grid) {

                for (var i = 0; i < grid.length; i++) {
                    //console.log(grid[i]);
                    for (var j = 0; j < grid[i].length; j++) {
                        if (grid[i][j] !== 0) {
                            npc.npcList.push([j, i]);
                            npc.createNpc(scene, camera, wireFrame, size * i, -(size * j));
                        }

                    }

                }
                npcGrid = grid;
            });
            //readDataBase();
        }

        function addCube(scene, camera, wireFrame, x, z, crateType) {
            var geometry = new THREE.BoxGeometry(size, size, size);
            var material;

            if (crateType) {
                material = new THREE.MeshLambertMaterial({
                    map: crateTexture
                });
            } else {
                material = new THREE.MeshLambertMaterial({
                    map: alternateCrateTexture
                });
            }

            var cube = new THREE.Mesh(geometry, material);
            cube.position.set(x, size / 2, z);
            scene.add(cube);
            cubes.push(cube);

            return cube;
        }

        function addLights() {
            var light = new THREE.DirectionalLight(0xffffff, 1.5);
            light.position.set(1, 1, 1);
            scene.add(light);
            light = new THREE.DirectionalLight(0xffffff, 0.75);
            light.position.set(-1, -0.5, -1);
            scene.add(light);
        }

        function doPointerLock() {
            controls = new PointerLockControls(camera, THREE);
            var yawObject = controls.getObject();
            scene.add(yawObject);

            yawObject.position.x = size;
            yawObject.position.z = size;

            var ps = new PointerLockSetup(controls);
        }

        function drawText(position) {
            $('#cameraX').html(position.x);
            $('#cameraY').html(position.y);
            $('#cameraZ').html(position.z);

            $('#mazeX').html(Math.abs(Math.round(position.x / size)));
            $('#mazeY').html(Math.abs(Math.round(position.z / size)));

            $('#npcs').empty();
            for (var i = 0; i < npcs.length; i++) {
                $('#npcs').append('<li>' + npcs[i] + '</li>');
            }

        }

        return Control;
    });
