import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

const mesh = new THREE.Group();

loader.load("./Michelle2.glb", function (gltf) {
    console.log(gltf);
    gltf.scene.scale.setScalar(5);
    mesh.add(gltf.scene);
})

loader.load("./Michelle2.glb", function (gltf) {
    console.log(gltf);
    gltf.scene.scale.setScalar(5);
    mesh.add(gltf.scene);
})

loader.load("./Michelle2.glb", function (gltf) {
    console.log(gltf);
    gltf.scene.scale.setScalar(5);
    mesh.add(gltf.scene);
})

loader.load("./Michelle2.glb", function (gltf) {
    console.log(gltf);
    gltf.scene.scale.setScalar(5);
    mesh.add(gltf.scene);
})



export default mesh;
