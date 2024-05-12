import { MapControls } from 'three/addons/controls/MapControls.js';
const addControls = (camera, renderer) => {
    const controls = new MapControls( camera, renderer.domElement );
    
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    controls.screenSpacePanning = false;
    
    controls.minDistance = 100;
    controls.maxDistance = 500;
    
    controls.maxPolarAngle = Math.PI / 2;
}

export default addControls;