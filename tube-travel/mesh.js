import * as THREE from 'three';

const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-100, 20, 90),
    new THREE.Vector3(-40, 80, 100),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(100, -40, 80),
    new THREE.Vector3(150, 60, 60)
]);

const geometry = new THREE.TubeGeometry(path, 100, 5, 30);

const loader = new THREE.TextureLoader();

// 创建动漫流光溢彩效果
const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 128;
const ctx = canvas.getContext('2d');

// 创建多彩渐变背景
const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop(0, '#000033');
gradient.addColorStop(0.2, '#6600cc');
gradient.addColorStop(0.4, '#cc00ff');
gradient.addColorStop(0.6, '#ff00cc');
gradient.addColorStop(0.8, '#ff6600');
gradient.addColorStop(1, '#ffcc00');

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 添加彩虹流光条纹
for(let i = 0; i < 15; i++) {
    const hue = (i * 24) % 360;  // 彩虹色相
    ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${0.3 + Math.random() * 0.4})`;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
    
    ctx.beginPath();
    ctx.moveTo(i * 34, 0);
    ctx.lineTo(i * 34 + 25, canvas.height);
    ctx.stroke();
}

// 添加发光光点
for(let i = 0; i < 30; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 3 + 1;
    const hue = Math.random() * 360;
    
    // 外发光
    ctx.shadowBlur = 15;
    ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
    ctx.fillStyle = `hsla(${hue}, 100%, 80%, ${0.6 + Math.random() * 0.4})`;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

// 添加能量流线条
ctx.shadowBlur = 20;
for(let i = 0; i < 8; i++) {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    const y = (canvas.height / 8) * i + 10;
    ctx.moveTo(0, y);
    
    for(let x = 0; x <= canvas.width; x += 20) {
        const waveY = y + Math.sin(x * 0.05 + i) * 5;
        ctx.lineTo(x, waveY);
    }
    
    ctx.stroke();
}

const texture = new THREE.CanvasTexture(canvas);
texture.wrapS = THREE.RepeatWrapping;
texture.colorSpace = THREE.SRGBColorSpace;
texture.repeat.x = 20;

const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material);
export const tubePoints = path.getSpacedPoints(1000);



export default mesh;
