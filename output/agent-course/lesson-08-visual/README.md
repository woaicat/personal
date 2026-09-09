# 第八课：管理上下文窗口 · 视觉设计稿

本目录用于保存内置 image_gen 生成的连续三段桌面详情页视觉稿，供后续开发参考。本次仅制作视觉资产。

## 当前页面规范来源

- `components/agent-course/AgentLessonShell.tsx`
- `components/agent-course/styles/agent-course.module.css`
- 第五、六、七课详情页组件，以及 `agent-tools.module.css`

沿用白底、深色标题、绿色强调色、正文与右侧目录双栏、8px 圆角及细分隔线。正文用工作台、嵌套窗口、消息轨道、摘要与检索回填图解。

## 内容核实与开发注意

1. 不将 Codex 窗口固定写作 200K。官方配置将模型窗口和自动压缩阈值分别管理，实际值取决于模型与配置。
   https://learn.chatgpt.com/docs/config-file/config-reference
2. Claude Code 存在 200K、1M 等配置，取决于模型、运行方式和设置；不将压缩触发窗口等同于模型物理上限。
   https://code.claude.com/docs/en/model-config
3. Codex 官方说明包括自动压缩和专门的 compaction 内容，不应把具体实现说成始终生成一段可读摘要。
   https://openai.com/index/unrolling-the-codex-agent-loop/
4. Claude Code 会管理和压缩上下文，支持指定压缩保留重点。
   https://code.claude.com/docs/en/how-claude-code-works
5. DeepSeek 网页版滑动窗口说法尚未得到本次官方来源验证；视觉稿标为“具体策略待核实”，不作为既定机制。
6. 128K=96K输入+32K预留输出、最近3轮、最多5轮、90%阈值、30,000→3,000 Token 均为教学示例，非产品承诺。
7. 历史检索是外部存储按需回填，不会扩大单次模型上下文窗口；检索可能失败，摘要也可能丢失信息。
8. 生图用于视觉与布局参考，页面开发仍应使用用户提供的完整文案；图中文字可能有压缩或排字误差，不能通过OCR反向替换正文。需要核实的产品描述以本文件为准。

生成方式：内置 image_gen。完整提示词见 prompts.md。
