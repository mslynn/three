import * as THREE from 'three';

const pointsArr = [
    new THREE.Vector2(100, 0),
    new THREE.Vector2(50, 20),
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 50),
    new THREE.Vector2(50, 100)
];

// const shape = new THREE.Shape(pointsArr);
const shape = new THREE.Shape();
shape.moveTo(100, 0);    // 移动到起点 (100, 0)
shape.lineTo(0, 0);     // 画线到 (0, 0)
shape.lineTo(0, 50);    // 画线到 (0, 50)
shape.lineTo(80, 100);  // 画线到 (80, 100)
const path = new THREE.Path();
path.arc(50, 50, 10);
shape.holes.push(path);

// 添加方形孔洞
const squarePath = new THREE.Path();
const squareSize = 12;
const squareX = 40;  // 在几何体内部左侧
const squareY = 10;  // 在圆形孔洞下方
squarePath.moveTo(squareX, squareY);
squarePath.lineTo(squareX + squareSize, squareY);
squarePath.lineTo(squareX + squareSize, squareY + squareSize);
squarePath.lineTo(squareX, squareY + squareSize);
squarePath.lineTo(squareX, squareY);
shape.holes.push(squarePath);


// const geometry = new THREE.ShapeGeometry(shape);
const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 100
});

const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('gold'),
    // side: THREE.DoubleSide,
    // wireframe: true
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
