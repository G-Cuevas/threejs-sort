import * as THREE from 'three';

interface Options {
    cubeColor?: string;
    lineColor?: string;
    edges?: boolean;
}

const addBox = (scene, dimensions, options?: Options): THREE.Mesh => {
    const { cubeColor, lineColor, edges }: Options = {
        cubeColor: '#5cb85c',
        lineColor: '#000000',
        edges: true,
        ...options
    }

    const geometry = new THREE.BoxGeometry( ...dimensions );

    const material = new THREE.MeshBasicMaterial( { color: cubeColor } );
    const cube: THREE.Mesh = new THREE.Mesh( geometry, material );
    scene.add( cube );

    if (!edges) return { cube };
    
    const edgesGeometry = new THREE.EdgesGeometry( geometry ); 
    const line = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial( { color: lineColor } ) ); 
    scene.add( line );
    return {cube, line};
}

export default addBox;