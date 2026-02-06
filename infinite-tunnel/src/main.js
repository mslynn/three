import './style.css';
import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh.js';

const scene = new THREE.Scene();
scene.add(mesh);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.set(0.9, -520, 6.5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

let H = 0;
const clock = new THREE.Clock();

// 等待纹理加载完成
let isTextureLoaded = false;

// 检查纹理是否加载完成
function checkTextureLoaded() {
    if (mesh.material && mesh.material.alphaMap) {
        isTextureLoaded = true;
        console.log('✅ 纹理加载完成，开始动画');
    } else {
        console.log('⏳ 等待纹理加载...');
        setTimeout(checkTextureLoaded, 100);
    }
}

function render() {
    const delta = clock.getDelta();
    
    // 只有纹理加载完成才执行动画
    if (isTextureLoaded && mesh.material.alphaMap) {
        H += 0.002;
        if (H > 1) { H = 0; }

        mesh.material.color.setHSL(H, 0.5, 0.5);
        mesh.material.alphaMap.offset.y += delta * 0.5;
        mesh.rotation.y += delta * 0.5;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

// 延迟启动渲染，等待纹理加载
setTimeout(() => {
    checkTextureLoaded();
    render();
}, 500);

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => {
    console.log(camera.position);
});