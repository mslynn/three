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
