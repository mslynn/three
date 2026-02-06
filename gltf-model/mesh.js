import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

const mesh = new THREE.Group();

loader.load("./Horse.gltf", function (gltf) {
    console.log(gltf,'模型对象')
    mesh.add(gltf.scene);
})

export default mesh;
