import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import mesh, { tubePoints } from './mesh.js';

const scene = new THREE.Scene();

scene.add(mesh);

const pointLight = new THREE.PointLight(0xffffff, 200);
pointLight.position.set(80, 80, 80);
scene.add(pointLight);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)

let i = 0;
let speed = 1;  // 控制移动速度
let targetSpeed = 1;  // 目标速度
let isTraveling = false;  // 是否开始穿越

function render() {
    // 只有在穿越状态下才移动
    if (isTraveling) {
        // 平滑速度过渡
        if (Math.abs(speed - targetSpeed) > 0.01) {
            speed += (targetSpeed - speed) * 0.1;
        }
        
        if (i < tubePoints.length - 1) {
            camera.position.copy(tubePoints[Math.floor(i)]);
            camera.lookAt(tubePoints[Math.floor(i) + 1]);
            i += speed;  // 使用速度变量控制
        } else {
            i = 0;
        }
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
document.addEventListener('keydown', (e) => {
    if(e.code === 'Enter') {
        // Enter键开始/停止穿越
        isTraveling = !isTraveling;
        if(isTraveling) {
            console.log(' 开始时光隧道穿越！');
            showNotification('时光隧道启动！');
        } else {
            console.log(' 停止穿越');
            showNotification('穿越暂停 ');
        }
    } else if(e.code === 'ArrowDown') {
        if(isTraveling) i += 10;  // 只有在穿越时才能跳跃
    } else if(e.code === 'ArrowUp') {
        if(isTraveling) {
            i -= 10;  // 向后跳跃
            if(i < 0) i = tubePoints.length - 1;  // 防止负数
        }
    } else if(e.code === 'Space') {
        if(isTraveling) {
            targetSpeed = targetSpeed === 0 ? 1 : 0;  // 空格键暂停/继续
        }
    } else if(e.code === 'ArrowLeft') {
        if(isTraveling) {
            targetSpeed = Math.max(0.1, targetSpeed - 0.5);  // 减速
        }
    } else if(e.code === 'ArrowRight') {
        if(isTraveling) {
            targetSpeed = Math.min(5, targetSpeed + 0.5);  // 加速
        }
    }
    
    if(isTraveling) {
        console.log('目标速度:', targetSpeed, '当前速度:', speed);
    }
})

// 显示通知的函数
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #ff0066, #6600ff);
        color: white;
        padding: 15px 30px;
        border-radius: 25px;
        font-size: 18px;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(255, 0, 102, 0.5);
        animation: slideDown 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// 显示初始提示
setTimeout(() => {
    showNotification('按 Enter 键开始时光隧道穿越 ');
}, 1000);