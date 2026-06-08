# 🧠 MathNav

高考数学导航 —— 考点速查 + 薄弱点追踪 + 真题精讲。

## 📁 文件结构

```
MathNav/
├── index.html           # 🏠 首页（导航+进度总览）
├── 考点速查.html         # 📖 全考点知识库（可折叠/搜索/标记）
├── assets/
│   ├── main.css          # 样式
│   └── main.js           # 交互（折叠/搜索/薄弱点弹窗）
├── 真题精讲/
│   ├── index.html         # 📝 真题列表
│   └── 2025新高考I卷.html  # 2025I卷逐题精讲（含KaTeX公式）
└── README.md
```

## ✨ 功能

- **KaTeX 公式渲染** — 所有 `$...$` 和 `$$...$$` 自动渲染为美观数学公式
- **锚点直跳** — 每个知识点有唯一 `id`，URL 带 `#` 直接定位
- **薄弱点追踪** — 点击 ⚠️ 标签展开详细对比/技巧，侧边栏一键跳转
- **搜索过滤** — 顶部搜索框实时过滤知识点
- **折叠展开** — 按模块折叠/展开，清爽浏览
- **标记掌握** — 学会的点 √ 打勾，进度一目了然

## 🚀 部署到 GitHub Pages

### 方法一：克隆后推送新仓库

```bash
# 在 GitHub 新建仓库（如 gaokao-math-brain），然后：
cd d:/Desk/MathNote/MathNav
git init
git add .
git commit -m "init: MathNav"
git remote add origin https://github.com/你的用户名/gaokao-math-brain.git
git branch -M main
git push -u origin main
```

然后在 GitHub 仓库 → Settings → Pages → 选 `main` 分支 → 保存。  
过几分钟访问 `https://你的用户名.github.io/gaokao-math-brain/`

### 方法二：用 gh CLI

```bash
cd d:/Desk/MathNote/MathNav
git init
git add .
git commit -m "init: MathNav"
gh repo create MathNav --public --push --remote origin --source=.
gh repo deploy-key  # 或直接在 Settings > Pages 开启
```

## 🔄 本地更新后同步

```bash
cd d:/Desk/MathNote/MathNav
git add .
git commit -m "更新内容"
git push
```

GitHub Pages 会自动重新部署。

## 📦 技术栈

- 纯静态 HTML/CSS/JS，零依赖
- [KaTeX](https://katex.org/) CDN 公式渲染
- 兼容 VS Code Live Preview 和 GitHub Pages
