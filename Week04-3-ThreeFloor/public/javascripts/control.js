/* globals define: true, THREE:true */

define(['floor'], function(Floor) {

    var scene = null;
    var camera = null;
    var renderer = null;
    var cube = null;
    var THREE = null;

    function Control(threeInit) {
        THREE = threeInit;
        console.log("Control called");
        scene = new THREE.Scene();
        var width = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera(75, width, 0.1, 1000);

        var floor = new Floor(THREE);
        floor.drawFloor(scene);

        addLights();

        renderer = new THREE.WebGLRenderer({
            antialias : true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        cube = addCubes(scene, camera, false);
        camera.position.z = 23;
        camera.position.x = 2;
        camera.position.y = 0;

        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);

        window.addEventListener('resize', onWindowResize, false);

        render();
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function render() {
        requestAnimationFrame(render);
        //cube.rotation.x += 0.01;
        //cube.rotation.y += 0.01;

        if (keyMove.moveLeft) {
            cameraPosition.x -= .31;
        } else if (keyMove.moveRight) {
            cameraPosition.x += .31;
        } else if (keyMove.moveForward) {
            cameraPosition.z -= .31;
        } else if (keyMove.moveBackward) {
            cameraPosition.z += .31;
        }

        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

        renderer.render(scene, camera);
    }

/*    function addCube(scene, camera, wireFrame, x, y) {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshNormalMaterial({
            color : 0x00ffff,
            wireframe : wireFrame
        });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, 0, y);
        scene.add(cube);

        return cube;
    }*/

    function addCubes(scene, camera, wireFrame) {
        var space1 = -20;

        for (var i = 0; i < 15; i++) {
            addCube(scene,camera, wireFrame, 3, space1);
            addCube(scene,camera, wireFrame, 1, space1);
            space1 += 1;
        }
/*        addCube(scene, camera, wireFrame, -1, -20);
        addCube(scene, camera, wireFrame, 1, -20);*/
    }

    var keyMove = {
        moveForward : false,
        moveBackward : false,
        moveLeft : false,
        moveRight : false
    };

    var cameraPosition = {
        x : 2,
        y : 0,
        z : 2
    }

    var onKeyDown = function(event) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                keyMove.moveForward = true;
                break;

            case 37: // left
            case 65: // a
                keyMove.moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                keyMove.moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                keyMove.moveRight = true;
                break;
        }
    };



    var onKeyUp = function(event) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                keyMove.moveForward = false;
                break;

            case 37: // left
            case 65: // a
                keyMove.moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                keyMove.moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                keyMove.moveRight = false;
                break;
        }
    };


    function addCube(scene, camera, wireFrame, x, y) {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        /*var material = new THREE.MeshNormalMaterial({
         color : 0x00ffff,
         wireframe : wireFrame
         });*/

        var material = new THREE.MeshLambertMaterial({
            map : THREE.ImageUtils.loadTexture('images/crate.jpg')
        });

        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, 0, y);
        scene.add(cube);

        addSphere(scene, camera, wireFrame, 2, -20);

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

    function addSphere(sne, camera, wireFrame, x, y) {
        var geometry = new THREE.SphereGeometry(.5, 25, 25);
        var material = new THREE.MeshNormalMaterial({
            color: 0x00ffff,
            wireframe: wireFrame
        });

        var sphere = new THREE.Mesh(geometry, material);
        sphere.overdraw = true;
        sphere.position.set(x, 0, y);
        scene.add(sphere);

        return sphere;
    }

    return Control;
});