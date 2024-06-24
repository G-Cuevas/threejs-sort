import * as THREE from 'three';
import addControls from './controls/addControls';
import addBox from './models/box';

const init = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    
    camera.position.set( -75, 0, 0 );
    camera.lookAt( 0, 0, 0 );

    return {scene, camera, renderer};
}

const { scene, camera, renderer } = init();
addControls(camera, renderer);

const loopTime = 10;
const mapY = 50;

const getHeightsArray = (mapY) => {
    const heights = [];
    for (let i = 0; i < mapY; i++) {
        heights.push((i + 1) * 0.5);
    }
    return heights;
}

const heights = getHeightsArray(mapY);

const cubes = [];

for (let j = 0; j < mapY; j++) {
    const randomHeight = heights.splice(Math.floor(Math.random() * heights.length), 1)[0];

    const dimensions = [ 1, randomHeight, 1 ];

    const options = {
        edges: false,
        cubeColor: '#ffffff'
    }

    const { cube } = addBox(scene, dimensions, options);
    cube.position.set(0, randomHeight / 2, j - mapY / 2);
    cubes.push(cube);
}

const switchCubes = (i1, i2) => {
    const cube1 = cubes[i1];
    const cube2 = cubes[i2];

    cube1.material.color.setHex(0x00ff00);
    cube2.material.color.setHex(0xff0000);

    const cube1Position = cube1.position.z;
    const cube2Position = cube2.position.z;

    cube1.position.z = cube2Position;
    cube2.position.z = cube1Position;

    cubes[i1] = cube2;
    cubes[i2] = cube1;

    setTimeout(() => {
        cube1.material.color.setHex(0xffffff);
        cube2.material.color.setHex(0xffffff);
    }, loopTime);
}

const finishedSorting = () => {

    for (let i = 0; i < cubes.length; i++) {
        const cube = cubes[i];
        setTimeout(() => {
            cube.material.color.setHex(0x00ff00);
        }, loopTime * i);
        
    }
}

const sortCubesStep = () => {
    for (let i = 0; i < cubes.length - 1; i++) {
        const cubeHeight1 = cubes[i].position.y;
        const cubeHeight2 = cubes[i + 1].position.y;

        if (cubeHeight1 > cubeHeight2) {
            switchCubes(i, i + 1);
            return false
        }
    }
    return true;
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const shuffleCubes = () => {
    
    for (let i = 0; i < cubes.length; i++) {
        const randomIndex = Math.floor(Math.random() * cubes.length);
        setTimeout(() => {
            switchCubes(i, randomIndex);
        }, loopTime * i);
    }
}

const mainLoop = async () => {
    while (true) {
        await sleep(loopTime);
    
        const sorted = sortCubesStep();
        
        if (sorted) {
            finishedSorting();
            await sleep(1500);
            
            cubes.forEach(cube => {
                cube.material.color.setHex(0xffffff);
            });
            await sleep(1500);

            shuffleCubes();
            await sleep(1500);
        }
    }
}

mainLoop();

function animate() {
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

animate();