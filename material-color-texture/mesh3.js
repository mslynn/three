import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('./diqiu.awebp');

const geometry = new THREE.SphereGeometry(100);

const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('red'),
    map: texture
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
