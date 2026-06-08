# 🧠 MathNav

> 🌐 **在线体验：** [yiz-l.github.io/MathNav](https://yiz-l.github.io/MathNav/)
>
> 🖼️ 示例：点击进入 → [📖 考点速查](https://yiz-l.github.io/MathNav/考点速查.html) · [📝 2025新高考I卷精讲](https://yiz-l.github.io/MathNav/真题精讲/2025新高考I卷.html)

高考数学导航 —— 考点速查 + 薄弱点追踪 + 真题精讲。纯静态网站，KaTeX 公式渲染，SVG 内嵌几何图，一页搞定。

---

## 📁 文件结构

```
MathNav/
├── index.html                    🏠 首页（导航+进度总览）
├── 考点速查.html                  📖 全考点知识库（可折叠/搜索/标记）
├── assets/
│   ├── main.css                   🎨 样式
│   └── main.js                    ⚡ 交互（折叠/搜索/薄弱点弹窗）
├── 真题精讲/
│   ├── index.html                 📝 真题列表
│   ├── 2025新高考I卷.html          ✅ 已做（含SVG几何图）
│   └── 新卷子.html                 ⬜ 待做
├── 操作指南/
│   ├── 做题全流程.md               📋 做新卷子的步骤规范
│   ├── 更新流程.md                  🔄 提交/部署/维护流程
│   ├── 编辑指南.md                  ✏️ 所有文件编辑要点速查
│   └── mathnav-exam技能说明.md       🧠 技能调用说明
└── README.md
```

---

## ✨ 功能特色

| 功能 | 说明 |
|------|------|
| **KaTeX 公式渲染** | `$...$` 和 `$$...$$` 自动渲染为数学公式 |
| **SVG 内嵌几何图** | 立体几何/解析几何纯内联 SVG，不依赖外部图片 |
| **题解图分离** | 题目区放纯原图，解题区放带标注的解析图 |
| **薄弱点追踪** | 点击 ⚠️ 标签展开详细对比/记忆技巧 |
| **搜索过滤** | 顶部搜索框实时过滤知识点 |
| **折叠展开** | 按模块折叠/展开 |
| **标记掌握** | 学会的点 √ 打勾 |
| **锚点直跳** | 每个知识点有唯一 `id`，URL 带 `#` 直接定位 |

---

## 🚀 本地使用

```bash
git clone https://github.com/Yiz-L/MathNav.git
cd MathNav
# 直接用浏览器打开 index.html
start index.html
```

## 🔄 更新流程

```bash
cd d:/Desk/MathNote/MathNav
git add .
git commit -m "更新内容"
git push
```

GitHub Pages 自动部署，1-2 分钟后生效。

---

## 📦 技术栈

- 纯静态 HTML/CSS/JS，零依赖
- [KaTeX](https://katex.org/) CDN 公式渲染
- 内联 SVG 几何图形
- GitHub Pages 自动部署
