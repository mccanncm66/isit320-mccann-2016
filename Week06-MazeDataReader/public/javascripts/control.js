/* globals define: true, THREE:true */

define(['floor', 'PointerLockControls', 'PointerLockSetup'], function(Floor, PointerLockControls, PointerLockSetup) {
    'use strict';
    var scene = null;
    var camera = null;
    var renderer = null;
    var cube = null;
    var crateTexture;
    var npcs = [];
    var alternateCrateTexture;
    var THREE = null;
    var controls = null;
    var raycaster = null;
    var cubes = [];
    var size = 20;

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

        addCubes(scene, camera, false);

        doPointerLock();

        addLights();

        var floor = new Floor(THREE);
        floor.drawFloor(scene);

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

        drawText(position);

        collisionDetection(controls, cubes);

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
                        npcs.push([j,i]);
                        addSphere(scene, camera, wireFrame, size * i, -(size * j));
                    }

                }

            }
        });
        readDataBase();

    }

    function readDataBase() {
        $.getJSON('/read?docName=npcObjects', function(data) {
            console.log(JSON.stringify(data.docs), null, 4);
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log({"Request Failed": err});
            var response = JSON.parse(jqxhr.responseText);
            var responseValue = JSON.stringify(response, null, 4);
            console.log(responseValue);
            alert('Database not connected' + responseValue);
        });
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

    var collisionDetection = function(controls, cubes) {

        function bounceBack(position, ray) {
            position.x -= ray.bounceDistance.x;
            position.y -= ray.bounceDistance.y;
            position.z -= ray.bounceDistance.z;
        }

        var rays = [
            //   Time    Degrees      words
            new THREE.Vector3(0, 0, 1), // 0 12:00,   0 degrees,  deep
            new THREE.Vector3(1, 0, 1), // 1  1:30,  45 degrees,  right deep
            new THREE.Vector3(1, 0, 0), // 2  3:00,  90 degress,  right
            new THREE.Vector3(1, 0, -1), // 3  4:30, 135 degrees,  right near
            new THREE.Vector3(0, 0, -1), // 4  6:00  180 degress,  near
            new THREE.Vector3(-1, 0, -1), // 5  7:30  225 degrees,  left near
            new THREE.Vector3(-1, 0, 0), // 6  9:00  270 degrees,  left
            new THREE.Vector3(-1, 0, 1) // 7 11:30  315 degrees,  left deep
        ];

        var position = controls.getObject().position;
        var rayHits = [];
        for (var index = 0; index < rays.length; index += 1) {

            // Set bounce distance for each vector
            var bounceSize = 0.01;
            rays[index].bounceDistance = {
                x: rays[index].x * bounceSize,
                y: rays[index].y * bounceSize,
                z: rays[index].z * bounceSize
            };

            raycaster.set(position, rays[index]);

            var intersections = raycaster.intersectObjects(cubes);

            if (intersections.length > 0 && intersections[0].distance <= 3) {
                controls.isOnObject(true);
                bounceBack(position, rays[index]);
            }
        }

        return false;
    };

    function addLights() {
        var light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(1, 1, 1);
        scene.add(light);
        light = new THREE.DirectionalLight(0xffffff, 0.75);
        light.position.set(-1, -0.5, -1);
        scene.add(light);
    }

    function addSphere(sne, camera, wireFrame, x, z) {
        var geometry = new THREE.SphereGeometry(5, 25, 25);
        var material = new THREE.MeshNormalMaterial({
            //color: 0x00ffff,
            wireframe: wireFrame
        });

        var sphere = new THREE.Mesh(geometry, material);
        sphere.overdraw = true;
        sphere.position.set(x, size / 2, z);
        scene.add(sphere);

        return sphere;
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

        $('#mazeX').html(Math.abs(Math.round(position.x/size)));
        $('#mazeY').html(Math.abs(Math.round(position.z/size)));

        $('#npcs').empty();
        for(var i = 0; i < npcs.length; i++) {
            $('#npcs').append('<li>' + npcs[i] + '</li>');
        }

    }

    return Control;
});
