// ========================================
// MathNav · 做题工作流脚本
// 调用方式：Workflow({scriptPath: "操作指南/mathnav-exam.workflow.js", args: {paperPath, paperName}})
// args: { paperPath: "PDF路径或文字", paperName: "2026新高考I卷" }
// ========================================

export const meta = {
  name: 'mathnav-exam',
  description: '提取试卷 → 逐题精讲 → 更新考点 → 部署上线',
  phases: [
    { title: '提取试卷', detail: '读取PDF/文字' },
    { title: '逐题精讲', detail: '一题一题过知识点' },
    { title: '更新考点', detail: '标记薄弱点' },
    { title: '部署', detail: '推送上线' },
  ],
}

const { paperPath, paperName } = args

// ===== Phase 1: 读取试卷 =====
phase('提取试卷')

let paperText = ''
if (paperPath.endsWith('.pdf')) {
  const result = await agent({
    prompt: `用pypdf读取 ${paperPath}，提取全部文字并输出`,
    label: '提取PDF',
    phase: '提取试卷',
  })
  paperText = result
} else {
  paperText = paperPath
}

log(`📄 ${paperName} 已加载`)

// ===== Phase 2: 分析试卷 =====
const paperInfo = await agent({
  prompt: `分析以下试卷的题型结构。列出每道题的题号、题型、知识点标签(中文)。

${paperText}

输出JSON格式：
{
  "questions": [
    {"num": 1, "type": "单选题", "topic": "复数运算"},
    ...
  ],
  "totalCount": 19,
  "weakTopics": ["可能的知识点"]
}`,
  label: '分析试卷',
  phase: '提取试卷',
  schema: {
    type: 'object',
    properties: {
      questions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            num: { type: 'number' },
            type: { type: 'string' },
            topic: { type: 'string' },
          },
          required: ['num', 'type', 'topic'],
        },
      },
      totalCount: { type: 'number' },
      weakTopics: { type: 'array', items: { type: 'string' } },
    },
    required: ['questions', 'totalCount'],
  },
})

log(`📊 共 ${paperInfo.totalCount} 题`)

// ===== Phase 3: 逐题精讲（交互式） =====
phase('逐题精讲')

// 生成完整的 HTML 页面
const htmlContent = await agent({
  prompt: `生成 ${paperName} 的完整精讲HTML页面。

试卷内容：
${paperText}

题目分析：
${JSON.stringify(paperInfo.questions, null, 2)}

规范要求：
1. 完整的HTML骨架，含KaTeX CDN
2. 侧边栏：MathNav标题 + 题目锚点跳转 + 导航链接
3. 进度总览表格（所有题号、题型、考点、答案留空、状态⬜）
4. 每道题一个 .q-card，包含：
   - .q-header: 题号(带对应class: multi/fill/solve) + 题型 + 考点标题
   - 📌 知识点: tag标签 + 表格
   - ✍️ 解题过程: step分步
   - ✅ 答案: answer-box
   - ⚠️ 易错点: mistake-item
5. CSS样式同MathNav风格
6. 未做的题答案框留空，写"待做"
7. 题目锚点 id="q1" "q2" ...

输出完整HTML代码。`,
  label: `生成${paperName}页面`,
  phase: '逐题精讲',
})

// 写入文件
// 这里保存到真题精讲/目录下
log(`✅ ${paperName} 精讲页面已生成`)

// ===== Phase 4: 更新真题列表 =====
phase('更新考点')

await agent({
  prompt: `更新 MathNav/真题精讲/index.html 的真题列表，
添加 ${paperName} 的卡片入口（共${paperInfo.totalCount}题）。`,
  label: '更新列表',
  phase: '更新考点',
})

// ===== Phase 5: 推送 =====
phase('部署')

log(`🚀 部署命令:
cd d:/Desk/MathNote/MathNav
git add .
git commit -m "完成${paperName}全部${paperInfo.totalCount}题精讲"
git push`)

return {
  paperName,
  totalQuestions: paperInfo.totalCount,
  questions: paperInfo.questions,
  message: `${paperName} 精讲完成，待推送上线`,
}
