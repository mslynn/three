# three 项目说明

这是一个基于 Three.js 的学习/练习项目集合，按主题拆分为多个独立的小示例。

## 目录结构

- `buffer-geometry/`：BufferGeometry 相关示例。
  - `index.html`：页面入口。
  - `index.js`：示例入口脚本。
  - `mesh.js` / `mesh2.js` / `mesh3.js`：不同几何体/材质的实验代码。
- `data-gui/`：GUI 控制面板（dat.GUI）相关示例。
  - `index.html` / `index.js`：GUI 示例入口。
- `first-scene/`：Three.js 第一场景示例。
  - `index.html` / `index.js`：基础场景、相机、渲染器配置。
- `perspective-camera/`：透视相机（PerspectiveCamera）相关示例。
  - `index.html` / `index.js`：透视相机示例入口。
- `cloudscape-figure/`：几何图案可视化项目。
  - `index.html`：页面入口。
  - `src/main.js`：Three.js 场景设置、渲染循环和动画控制。
  - `src/mesh.js`：复杂几何图案生成逻辑，创建多层同心圆和装饰图案。

## 运行方式（建议）

每个子目录都是独立示例，可进入对应目录后安装依赖并运行（若有需要）：

```bash
# 进入示例目录
cd <example-folder>

# 安装依赖
npm install

# 启动（若 package.json 中有脚本）
npm run dev  或者  npx live-server 
```

如果只是静态示例，也可直接用本地服务器打开 `index.html`。

## 说明

- 根目录仅用于组织示例，不包含统一构建流程。
- `node_modules/` 已被忽略，不会提交到仓库。

## 项目详解

### cloudscape-figure 项目

这是一个使用 Three.js 创建的复杂几何图案可视化项目，具有以下特点：

#### 技术架构
- **Three.js 核心**：场景、相机、渲染器基础设置
- **轨道控制器**：支持鼠标交互（旋转、缩放、平移）
- **动态动画**：几何图形实时旋转效果
- **多层次渲染**：6层不同半径的几何图案

#### 几何图案结构
1. **内圈圆环** (半径 110) - 粗线条圆形
2. **中圈圆环** (半径 120) - 细线条圆形  
3. **小圆圈阵列** (半径 130) - 24个小圆圈均匀分布
4. **外圈圆环** (半径 142.5) - 粗线条圆形
5. **几何图案组** (半径 200) - 36个复杂折线图案
6. **外层图案** (半径 260) - 更大的几何图案

#### 核心技术点
- **EllipseCurve**：生成精确的圆形路径
- **Line2 vs Line**：不同线条渲染技术对比
- **三角函数分布**：圆形对称布局算法
- **Group 管理**：层次化对象组织
- **动画系统**：基于 requestAnimationFrame 的渲染循环

#### 代码特色
```javascript
// 动态旋转逻辑
mesh.children.forEach((item, index) => {
    const flag = index % 2 === 0 ? 1 : -1;
    item.rotation.z += 0.001 * index * flag;
})
```

通过正反交替旋转创造独特的视觉效果，形成类似曼陀罗或星图的几何艺术。
