# Three.js 学习项目集合

基于 Three.js (v0.174.0) 的系统学习项目，按主题拆分为独立示例，从基础场景到完整应用逐步进阶。

## 运行方式

```bash
cd <example-folder>
npm install
npm run dev  # Vite 项目
# 或
npx live-server  # 纯静态项目
```

---

## 一、基础入门

### `first-scene/` — 第一个场景

Three.js 最基础的 Hello World。创建一个橙色立方体，配合点光源照明，展示 Scene → Camera → Renderer 的完整流程。

- `BoxGeometry` + `MeshLambertMaterial` 创建网格
- `PointLight` 点光源照明
- `AxesHelper` 坐标轴辅助
- `OrbitControls` 鼠标交互控制
- `requestAnimationFrame` 渲染循环

### `perspective-camera/` — 透视相机

用 `CameraHelper` 可视化第二个相机的视锥体，通过 GUI 实时调整相机参数，直观理解透视投影。

- `fov`（视角）：下拉选择 10°/30°/60°
- `aspect`（宽高比）：16:9 / 4:3 切换
- `near` / `far`（近远裁剪面）：滑块调节
- `updateProjectionMatrix()` 参数变更后必须调用

### `data-gui/` — GUI 控制面板

学习 lil-gui 的使用方式，分组控制立方体和灯光的属性。

- `addFolder` 分组管理
- `addColor` 颜色选择器
- `add().step()` 步进控制
- 实时调整 position、color、intensity

### `point-line-mesh/` — 点、线、网格

Three.js 三种基本渲染对象的对比（通过 mesh1/2/3 切换）。

- `THREE.Points` + `PointsMaterial` 点渲染
- `THREE.Line` / `LineLoop` + `LineBasicMaterial` 线渲染
- `THREE.Mesh` + `MeshLambertMaterial` 面渲染

---

## 二、几何体与缓冲区

### `buffer-geometry/` — BufferGeometry

手动构建缓冲几何体，理解底层顶点数据结构。

- `mesh.js`：手动定义顶点 `Float32Array`，用 `index` 索引复用顶点构建矩形（两个三角形），`wireframe` 线框模式查看结构
- `mesh2.js`：`PlaneGeometry` 内置平面，对比手动构建
- `mesh3.js`：`BoxGeometry` 线框模式，观察立方体的三角面构成

### `generate-geometry/` — 生成几何体

程序化生成复杂几何体，配合 GUI 调参。

- `mesh.js`：`LatheGeometry` 车削几何体，用 2D 轮廓线绕 Y 轴旋转生成 3D 形状，同时显示控制点和轮廓线
- `mesh2.js`：`TubeGeometry` 管道几何体，沿三次贝塞尔曲线生成管道，GUI 控制分段数、半径等参数
- `mesh3.js`：`ExtrudeGeometry` 拉伸几何体，用 `Shape` 定义 2D 轮廓 + `Path` 挖圆形和方形孔洞，拉伸成 3D

### `curve/` — 曲线

各类曲线的创建与可视化。

- `mesh.js`：`EllipseCurve` 椭圆/圆弧曲线，`getPoints()` 采样后用 Line 渲染
- `mesh2.js`：`SplineCurve` 二维样条曲线，同时显示采样点（粉色）和控制点（绿色）
- `mesh3.js`：`QuadraticBezierCurve` 二次贝塞尔曲线，显示控制点和曲线

---

## 三、场景组织与坐标系

### `scene-group/` — Group 与场景图

Group 层级关系、本地坐标与世界坐标的核心概念。

- `Group` 创建层级：Scene → Group → Mesh
- `position` 设置本地坐标，`getWorldPosition()` 获取世界坐标
- 两个 `AxesHelper` 分别可视化世界坐标系和 Group 本地坐标系
- `scene.traverse()` 递归遍历场景图，批量修改材质颜色
- `scene.getObjectByName()` 按名称查找对象

---

## 四、材质与纹理

### `material-color-texture/` — 材质与纹理

材质类型、颜色控制、纹理贴图的综合示例。

- `mesh.js`：`EdgesGeometry` + `LineDashedMaterial` 虚线边框效果，`computeLineDistances()` 计算线段距离
- `mesh2.js`：`MeshBasicMaterial` 透明度控制，`transparent: true` + `opacity: 0.2`
- `mesh3.js`：`TextureLoader` 加载地球纹理贴图到球体，`map` 属性映射
- `mesh4.js`：纹理重复平铺，`RepeatWrapping` + `repeat.set(4, 4)`，`aoMap` 环境遮蔽贴图

### `texture-uv/` — UV 映射

手动控制纹理坐标，精确映射纹理到几何体。

- `mesh.js`：手动设置 UV 坐标 `Float32Array`，只显示纹理的左下角 1/4 区域
- `mesh2.js`：球体纹理贴图（木星），`RepeatWrapping` 控制纹理环绕方式

### `geometry-color/` — 顶点颜色（Vite 项目）

逐顶点颜色渲染，不依赖纹理贴图。

- `BufferGeometry` 手动定义三角形顶点
- `BufferAttribute` 设置 RGB 顶点颜色（红、绿、蓝）
- `vertexColors: true` 启用顶点颜色插值
- `side: THREE.DoubleSide` 双面渲染
- 注释中保留了 Points 和 LineLoop 的渲染方式对比

### `vertex-normal/` — 顶点法线与高光

Phong 材质的高光效果演示。

- `CubicBezierCurve3` 三次贝塞尔曲线路径
- `TubeGeometry` 沿曲线生成管道（50 段，半径 10，截面 20 段）
- `MeshPhongMaterial` + `shininess: 1000` 强高光效果
- 法线由 TubeGeometry 自动计算，Phong 着色模型产生光滑高光

---

## 五、光照系统

### `light-helper/` — 五种光源全解

每个 mesh 文件对应一种光源，配合 Helper 可视化和 GUI 实时调参。

- `mesh.js`：**DirectionalLight 平行光**（太阳光），`DirectionalLightHelper` 显示光源方向
- `mesh2.js`：**PointLight 点光源**（灯泡），强度 1000000，`AmbientLight` 环境光补光，`PointLightHelper` 显示位置
- `mesh3.js`：**SpotLight 聚光灯**（手电筒），`angle` 光锥角度 + `distance` 照射距离，`SpotLightHelper` 显示锥形范围，GUI 下拉选择 30°/60°，`helper.update()` 实时更新辅助线
- `mesh4.js`：**HemisphereLight 半球光**（室外环境光），天空色 orange + 地面色 green，白色材质更清晰展示颜色影响，`addColor` GUI 调色
- `mesh5.js`：**RectAreaLight 矩形区域光**（LED 面板），必须配合 `MeshStandardMaterial`（PBR 材质），`RectAreaLightHelper` 需单独导入

---

## 六、综合应用

### `house/` — 房屋场景

模块化建模的完整实践，每个建筑部件独立文件。

- `foundation.js`：地基，`BoxGeometry` + 水泥纹理
- `front-wall.js`：前墙，`ExtrudeGeometry` + `Shape` 挖门窗孔洞 + 砖块纹理
- `behind-wall.js`：后墙，`BoxGeometry` + 砖块纹理重复
- `side-wall.js`：侧墙，`ExtrudeGeometry` 五边形轮廓（带尖顶）+ 窗户孔洞
- `roof.js`：屋顶，GUI 调整角度/位置/宽度，瓦片纹理
- `doorstep.js`：台阶，`ExtrudeGeometry` 阶梯形轮廓
- `grass.js`：草地，超大平面 + 草地纹理 20x20 重复
- `house.js`：总装配，`Group` 组织所有部件，`clone()` 复制对称侧墙和屋顶

### `mountain-terrain/` — 山地地形

程序化地形生成 + 动态波浪动画。

- `PlaneGeometry(3000, 3000, 100, 100)` 高精度网格平面
- `simplex-noise` 库生成 Simplex 噪声地形高度
- `sin` + `cos` 叠加实现动态波浪效果
- `positions.needsUpdate = true` 每帧更新顶点
- `wireframe` 线框渲染

### `tube-travel/` — 管道穿行

沿管道路径的第一人称相机穿越动画，带流光纹理效果。

- `CatmullRomCurve3` 创建平滑 3D 路径
- `Canvas` 程序化生成流光纹理（渐变 + 彩虹条纹 + 发光粒子 + 能量波纹）
- `CanvasTexture` + `RepeatWrapping` 纹理动画
- `path.getSpacedPoints(1000)` 均匀采样路径点
- 键盘控制：Enter 开始/停止，方向键加减速/跳跃，Space 暂停
- 平滑速度过渡 `speed += (targetSpeed - speed) * 0.1`
- CSS 动画通知提示

### `infinite-tunnel/` — 无限隧道（Vite 项目）

无限隧道穿越视觉效果。

- `CylinderGeometry(30, 50, 1000, 32, 32, true)` 开口圆锥管道
- `alphaMap` 透明度贴图（风暴纹理）实现镂空效果
- `BackSide` 只渲染内壁（从内部观看）
- HSL 颜色循环 + 纹理 offset 滚动 = 无限穿越感
- 相机放置在管道内部 `(0.9, -520, 6.5)`

### `gradient-color-bar-chart/` — 渐变色 3D 柱状图（Vite 项目）

Three.js 数据可视化实践。

- XY 坐标轴 + 刻度线（`LineSegments`）
- 柱体用 `PlaneGeometry` + 顶点颜色渐变（green → blue → red，按高度 lerp 插值）
- `CanvasTexture` 生成数字标签（Canvas 2D 绘制文字）
- 数据驱动：`createBar([70, 20, 100, 40, 50])`

### `cloudscape-figure/` — 几何图案

多层同心圆装饰图案，交替旋转动画，类曼陀罗视觉效果。

- 6 层不同半径的几何图案（圆环、小圆阵列、折线图案）
- `EllipseCurve` 生成圆形路径
- `Line2` 宽线条渲染
- 三角函数均匀分布
- 奇偶层交替正反旋转

### `gltf-model/` — GLTF 模型加载

加载外部 3D 模型文件。

- `GLTFLoader` 异步加载 `.gltf` 模型（Horse 马模型）
- `gltf.scene` 获取模型场景树并添加到 Group
- `DirectionalLight` 照明
