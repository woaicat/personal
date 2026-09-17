# 第 16 课 UI 效果图生图提示词（依据最新版文案）

## 1. 内容基线与生成方式

- 唯一内容基线：`/Users/gaojiaxuan/Desktop/第十六课文案.md`
- 页面：`第 16 课：搭建评测飞轮`
- 副标题：`找到问题，有的放矢。`
- 推荐生成方式：不要尝试把整课压进一张图。按下面 7 个提示词分别生成 7 张同宽的连续页面切片，再按顺序拼成长页。
- 推荐画幅：每张约 `1440 × 2200`；内容较多的第 4、5 张可使用 `1440 × 2600`。如果工具只支持常见比例，使用竖版 `1024 × 1536`，但不要缩小字体来硬塞全部内容，应继续拆图。
- 生成类型：`ui-mockup`。
- 中文要求：正文不需要逐字排出全部长段落，但标题、表格字段、流程节点、卡片要点、指标和案例数据必须使用下方规定的原文，不得用无意义占位符替代。

## 2. 所有图片必须共享的页面母版

以下规范已经写入每个独立提示词，但生成多张图时仍应将上一张作为视觉参考，确保页面可以纵向拼接。

- 真实可开发的课程详情页，不是概念海报、营销落地页或数据大屏。
- 白色背景，绿色作为唯一主强调色：`#318355`；深绿 `#256743`；浅绿 `#edf8f0`、`#f6fbf7`；分隔线 `#e3e9e5`；标题深蓝黑 `#171e2c`；正文灰 `#536070`。
- 现代中文无衬线字体，接近 PingFang SC；正文可读，不使用细小脚注堆内容。
- 桌面端双栏：左侧正文，右侧 286px 大纲；中间 50px 间距；右栏左侧有细分隔线。
- 卡片统一 8px 圆角、1px 浅灰绿边框、12–16px 内边距；图标为绿色 Lucide 风格线性图标。
- 每节之间用细横线和充足留白分隔；同级标题、正文和卡片遵守一致层级。
- 右侧大纲固定显示以下结构，并根据当前图片高亮相应章节：
  - `1 为什么需要评测`
  - `2 什么值得测`
  - `2.1 不需要一开始就测完所有环节`
  - `2.2 用四个问题判断优先级`
  - `2.3 从三层结果中选择评测点`
  - `2.4 电商客服 Agent 示例`
  - `3 如何进行 Agent 评测：三步方法论`
  - `3.1 目标和任务`
  - `3.2 指标和数据 / 用例`
  - `3.3 方法和工具`
  - `3.4 Agent 评测平台和产品`
  - `4 Agent 评测的注意事项`
  - `5 如何搭建第一版评测飞轮`
  - `6 练习题`
- 右栏大纲下方固定保留“继续学习”模块：`下一课：课程总结与最终方案`，说明为`汇总你的 Agent 设计，形成最终方案。`
- 禁止：蓝色主色、深色仪表盘、霓虹、玻璃拟态、渐变营销 Hero、巨大插画、人物或吉祥物、3D 装饰、厚重阴影、品牌 Logo、水印、乱码、伪造无关导航。

---

## 3. 提示词 1：课程顶部与第 1 节“为什么需要评测”

```text
Use case: ui-mockup
Asset type: high-fidelity desktop course detail page, first continuous vertical slice

Primary request: Design the top portion and section 1 of a shippable Chinese course detail page for “从 0 到 1 设计一个 Agent”. This is not a poster. It must look like an actual reading page that can be implemented in React and CSS.

Canvas and layout: tall desktop screenshot, about 1440 × 2200. Centered container approximately 1360px. Two-column layout: flexible main reading column on the left and a 286px sticky course-outline sidebar on the right, separated by a 50px gap and a thin vertical divider. Show the page from the back link through the complete first section.

Visual system: white background; accent green #318355; dark green #256743; pale green #edf8f0 and #f6fbf7; divider #e3e9e5; headings #171e2c; body #536070. Modern Chinese sans-serif typography similar to PingFang SC. Lucide-style thin line icons. 8px card radius, thin borders, almost no shadows. Generous editorial whitespace.

Top shell, render these Chinese texts verbatim:
- Back link: “← 返回课程目录”
- Large heading: “第 16 课  搭建评测飞轮”
- Subtitle: “找到问题，有的放矢。”
- Intro sentence: “我认为设计 AI 产品最重要的事之一，就是搭建起评测飞轮，对产品表现进行检测、评估和改进。”
- Meta: “预计 25 分钟  ·  系列：从 0 到 1 设计一个 Agent”

Create a standard “本课要点” block directly below the title, with a green circular sparkle icon and exactly three readable bullets:
1. “理解大模型的特殊性质，以及为什么传统软件测试不足以覆盖 Agent 质量”
2. “先定位高价值问题，再用目标、指标与用例、方法与工具完成评测”
3. “把真实失败沉淀为回归集，搭建持续迭代的评测飞轮”

Main section title: “1. 为什么需要评测”

Do not reduce this section to four generic cards. Present all five reasons from the lesson with a clear hierarchy:

A. Card “非确定性输出”
- Visualize the same user input branching into several different but potentially acceptable outputs.
- Add the exact supporting label: “目标不是验证唯一答案，而是确保输出落在可接受范围内。”

B. Card “结果质量定义具有主观性”
- Show four small role chips: “工程团队”, “产品经理”, “业务人员”, “真实用户”.
- Add the labels “不存在唯一标准答案” and “需要非技术方参与评估”.

C. A wider feature card “独特的失败模式”
- Explain that these risks are not ordinary software bugs.
- Include four clearly separated sub-items with icons and descriptions:
  “幻觉：生成看似合理但与事实不符的信息”
  “偏见：学习并放大训练数据中的社会偏见”
  “提示敏感性：输入的微小变化导致输出质量剧烈波动”
  “提示注入和越狱：绕过安全护栏，生成有害内容或泄露隐私与商业机密”
- Include one small continuation tag: “以及其他 Agent 特有失败模式”.

D. Card “衡量产品是否成功”
- Connect evaluation metrics to concrete business outcomes.
- Show all three business questions as readable checklist rows:
  “产品是否满足特定任务和需求？满足到什么程度？”
  “用户使用情况是否符合预期？用户满意度如何？”
  “系统能否应对计划之外、边缘和高风险场景？”
- Add a small bridge label from “抽象指标” to “业务成果”.

E. Card “定位问题，快速迭代”
- Show the problem “不断修改，却不知道是否真的变好” on the left.
- Show a measurable feedback loop on the right: “构建 → 部署 → 评估 → 记录 → 迭代”, with the arrow returning to “构建”.
- Emphasize the label “量化反馈：验证改进假设是否成立”.

End the section with a horizontal evaluation flywheel preview using every node from the lesson:
“真实运行 → 发现问题 → 选择高价值问题 → 建立评测用例与指标 → 修改 Agent → 回归测试 → 上线观察 → 发现新的问题”.
The final node must visually loop back to the beginning.

Add a pale green conclusion callout with the exact sentence:
“评测的目标不是得到一个漂亮的分数，而是更快找到值得解决的问题，并确认改动真的有效。”

Right sidebar:
- Heading “本课大纲”.
- Show the complete lesson outline: sections 1 through 6, including the nested 2.x and 3.x items.
- Highlight “1 为什么需要评测” in green.
- Below a divider show “继续学习”, “下一课：课程总结与最终方案”, right arrow, and “汇总你的 Agent 设计，形成最终方案。”

Typography constraints: all quoted Chinese labels must be readable and correctly spelled. Use short body summaries but do not remove any of the five reasons, four failure modes, three business questions, or eight flywheel nodes.

Avoid: marketing hero, dashboard layout, dark UI, blue accent, giant illustration, neon, glassmorphism, characters, mascots, logos, watermark, meaningless placeholder text, illegible tiny typography.
```

---

## 4. 提示词 2：第 2 节“什么值得测”

```text
Use case: ui-mockup
Asset type: high-fidelity desktop course detail page, second continuous vertical slice

Primary request: Design section 2, “什么值得测”, for the same Chinese Agent course page. Preserve the established white-and-green editorial course-detail visual system. This image must continue naturally below the previous screenshot and must not redesign the shell.

Canvas and layout: tall desktop screenshot, about 1440 × 2300. Same centered 1360px two-column grid: wide content column and 286px sticky right outline, 50px gap, thin vertical divider. White background, #318355 green accent, #256743 dark green, #edf8f0 pale green, #e3e9e5 dividers, #171e2c headings, #536070 body. PingFang-like Chinese sans serif, Lucide-style line icons, 8px card radius, thin borders, restrained shadows.

Section title: “2. 什么值得测”

Subsection “2.1 不需要一开始就测完所有环节”
- Begin with a horizontal system map showing all Agent components from the lesson:
  “模型 / 系统提示词 / 上下文 / 知识检索 / 记忆 / 工具 / 多 Agent 协作 / 权限控制 / 前端交互”.
- Communicate that evaluating every component and every step equally creates excessive workload and may spend effort on low-impact areas.
- Follow with a numbered five-step practical sequence, using the exact meaning and visible labels:
  1. “先用少量典型任务跑通完整流程”
  2. “结合执行链路、人工体验和用户反馈定位问题”
  3. “找出对任务结果影响最大的失败点”
  4. “围绕这些问题建立专项评测”
  5. “稳定且影响较小的环节，先保留观测，暂缓复杂评测”
- Add a clear outcome-versus-claim comparison card:
  left: Agent reply “机票已经预订”
  right: database status “是否真的存在订单？”
  conclusion: “第一优先级：用户任务是否真正完成”.

Subsection “2.2 用四个问题判断优先级”
- Render the full four-row decision table with three columns “判断维度 / 要问的问题 / 优先级较高的信号”.
- Preserve all four dimensions and their content:
  “业务影响 / 出错会影响什么？ / 任务失败、用户损失、投诉、合规或资金风险”
  “发生概率 / 这个问题多常见？ / 高频任务反复失败，或错误在多个场景中出现”
  “不确定性 / 团队是否知道 Agent 能否稳定做好？ / 靠人工感觉判断、不同运行结果波动很大”
  “可改进性 / 测出问题后能否采取行动？ / 可以调整提示词、上下文、工具、权限或流程”
- Under the table show a prominent formula card:
  “评测优先级 ≈ 业务影响 × 发生概率 × 不确定性 × 可改进性”
- Add two contrasting notes:
  “高风险但低频：仍应提高优先级”
  “影响较小、稳定且短期不修改：可以暂缓专项评测”.

Subsection “2.3 从三层结果中选择评测点”
- Create a three-layer horizontal evaluation stack or staircase, preserving the complete meaning:
  1. “最终结果：用户目标是否真正完成” with examples “正确判断可退货 / 退款单真实创建”
  2. “关键过程：是否在重要节点做对决定” with examples “查询正确订单 / 使用有效规则 / 高风险时转人工”
  3. “运行约束：代价和风险是否可接受” with examples “是否超时 / 成本是否过高 / 是否越权 / 是否陷入循环”
- Add the principle: “先评最终结果，再评影响结果、安全、成本和可解释性的关键过程。”
- Show “10 个步骤 ≠ 10 套同等复杂的评测” as a compact visual rule.

Subsection “2.4 示例：电商客服 Agent 什么值得测”
- Use the exact user question as the case header: “我七天前签收的这件商品还能退吗？”
- Split the case into two columns.
- Left green column heading “第一版优先检查”, containing all five checks:
  “找到正确订单和签收时间”
  “使用当前有效的退货规则”
  “根据商品类型和订单状态得出正确结论”
  “无法确认时说明原因并转人工，不编造答案”
  “执行退款时，退款单真实创建成功”
- Right neutral column heading “可以暂缓”, containing all three examples:
  “低频过渡语是否足够自然”
  “两种有效工具调用顺序是否完全一致”
  “不影响用户理解的轻微措辞差异”

Right sidebar:
- Heading “本课大纲”, show the complete lesson outline.
- Highlight section 2 and visually expand 2.1–2.4; highlight 2.1 or 2.2 as the current reading position.
- Retain the “继续学习” block with “下一课：课程总结与最终方案” and “汇总你的 Agent 设计，形成最终方案。”

Constraints: render quoted Chinese text clearly; retain all five practical steps, all four prioritization dimensions, all three evaluation layers, and every item in the customer-service example. Do not replace them with generic icons or vague lorem ipsum.

Avoid: dense dashboard, marketing page, dark theme, blue accent, excessive shadows, tiny table text, floating cards without reading order, unrelated charts, logos, watermark.
```

---

## 5. 提示词 3：第 3.1 节“目标和任务”

```text
Use case: ui-mockup
Asset type: high-fidelity desktop course detail page, third continuous vertical slice

Primary request: Design subsection 3.1 of the same lesson page. The content teaches the first step of a three-step Agent evaluation methodology: defining goals and tasks. Preserve the exact course page shell and visual language from previous images.

Canvas and layout: desktop tall screenshot, about 1440 × 2000. Same 1360px centered two-column layout, wide reading column plus 286px sticky right outline, 50px gap. White background, #318355 green accent, pale green support colors, #e3e9e5 dividers, dark navy headings, gray body. PingFang-like Chinese sans serif, 8px cards, thin borders, line icons, generous whitespace.

Section heading: “3. 如何进行 Agent 评测：三步方法论”
- At the top, show a clear three-step progress rail:
  “01 目标和任务” → “02 指标和数据 / 用例” → “03 方法和工具”.
- Highlight step 01 in solid green; steps 02 and 03 remain outlined.

Subsection heading: “3.1 第一步：目标和任务”

Create a main decomposition flow using all five nodes:
“产品目标 → 用户任务 → 成功结果 → 关键失败 → 评测任务”.
Each node should have a short icon and visible connection arrows.

Below it, render the complete two-column customer-service mapping table “项目 / 退货咨询示例” with all five rows:
- “产品目标 / 提高常见售后问题的自助解决率，同时减少错误承诺”
- “用户任务 / 判断一笔订单是否符合退货条件”
- “成功结果 / 给出正确结论和依据；需要执行时，真实完成操作”
- “关键失败 / 用错订单、引用过期规则、错误承诺、越权退款、该转人工时没有转”
- “评测任务 / 提供订单、商品和规则环境，让 Agent 完成判断或操作”

Then create a four-part evaluation-task anatomy panel. Keep all four labels and meanings visible:
1. “输入” — “用户请求，以及 Agent 在真实使用中能获得的信息”
2. “环境” — “可调用的工具、数据状态、权限和必要约束”
3. “成功标准” — “什么结果算完成，哪些错误不能接受”
4. “检查对象” — “最终输出、环境状态，以及必要的关键步骤”

Add a pale green quality gate panel with two checks:
- “两位熟悉业务的人，能否对是否通过形成基本一致的判断？”
- “是否准备了一个确定能够通过全部评测器的参考结果？”
Connect the checks to the conclusion “任务清晰、可执行、可验证”.

Right sidebar:
- Show the full outline.
- Highlight “3 如何进行 Agent 评测：三步方法论” and nested item “3.1 目标和任务”.
- Keep the “继续学习” block with the same next-lesson text.

Constraints: preserve every table row and every evaluation-task component. Do not reduce the section to three generic cards. Chinese typography must be readable and correctly spelled.

Avoid: dashboard UI, giant diagram replacing all text, marketing visuals, dark theme, blue accent, glassmorphism, 3D, logos, watermark, tiny illegible table labels.
```

---

## 6. 提示词 4：第 3.2 节“指标和数据 / 用例”

```text
Use case: ui-mockup
Asset type: high-fidelity desktop course detail page, fourth continuous vertical slice

Primary request: Design subsection 3.2 of the same Chinese course detail page. This is the densest data-and-test-case section, so use a tall page with readable tables and cards rather than compressing the content.

Canvas and layout: tall desktop screenshot, about 1440 × 2600. Same centered 1360px two-column reading layout with a wide content column and 286px sticky right outline. White background, green #318355 accent, dark green #256743, pale green support backgrounds, #e3e9e5 dividers, navy headings, gray body. Modern Chinese sans serif, 8px radius, thin borders, minimal shadow, no font smaller than a readable course-table size.

At the top retain the three-step rail:
“01 目标和任务” → “02 指标和数据 / 用例” → “03 方法和工具”.
Highlight step 02 in solid green.

Subsection title: “3.2 第二步：指标和数据 / 用例”

Block A — “3.2.1 选择指标”
- Render the complete three-column table “评测维度 / 可以使用的指标 / 适用问题”.
- Preserve all six rows:
  “任务结果 / 任务成功率、正确率、真实操作完成率 / Agent 是否完成用户目标”
  “回答质量 / 正确性、完整性、有依据程度、表达清晰度 / 最终回答是否可信、可用”
  “工具使用 / 工具选择正确率、参数正确率、结果处理正确率 / Agent 是否正确连接外部能力”
  “安全与边界 / 越权率、危险操作拦截率、敏感信息泄露率 / Agent 是否在允许范围内行动”
  “效率 / 总耗时、工具调用次数、Token 与单次任务成本 / 完成任务的代价是否合理”
  “稳定性 / 多次运行成功率、失败波动、异常终止率 / Agent 能否持续稳定地完成任务”
- Add an example card showing the distinction:
  “主指标：退货判断正确率”
  “安全约束：不能越权退款”
  “效率约束：耗时与成本”
- Add a warning: “总分可以比较版本，但不能替代单项分数、失败类型与执行链路分析。”

Block B — “3.2.2 建立测试用例”
- Create a five-source intake visual containing all sources:
  “产品需求中的典型任务”
  “发布前的人工检查场景”
  “线上用户反馈、失败记录和人工接管案例”
  “低频但损失较大的安全、资金或合规场景”
  “容易混淆的相似情况，以及应该做 / 不应该做的对照案例”
- Show a prominent statistic card: “第一批可以从 20～50 条真实失败和人工测试任务开始”, with a note “数量不是硬标准，代表性与决策价值更重要”.
- Render the complete three-row dataset table:
  “核心任务集 / 高频、代表性的主要任务 / 比较整体能力，建立版本基线”
  “回归集 / 曾经出错并已经修复的案例 / 防止旧问题再次出现”
  “风险与边界集 / 高风险、异常输入、工具失败、权限限制 / 验证安全边界与异常处理”
- Add metadata chips for every field mentioned in the lesson:
  “任务类型 / 难度 / 风险等级 / 数据来源 / 首次出现版本”.

Block C — Full test-case example
- Create a form-like card titled “签收第 7 天的普通商品退货咨询”.
- Show all rows exactly:
  “用户输入：这件商品还能退吗？”
  “环境状态：订单已签收 7 天；商品不属于特殊品类；规则版本为 v3”
  “期望结果：可以申请退货；说明截止条件；不承诺立即退款”
  “必须检查：订单查询正确、规则版本正确、最终结论正确”
  “禁止行为：编造订单状态、直接创建退款、引用旧规则”
- Visually distinguish expected behavior, must-check items, and prohibited behavior with green, neutral, and subtle amber/red semantic treatments.

Block D — “3.2.3 同时使用离线评测和线上信号”
- Use a balanced two-column comparison:
  Left “离线评测”：上线前、固定数据集、比较模型/提示词/流程、基线测试与回归测试、可重复和便于版本比较、可能脱离真实用户分布.
  Right “线上评测”：真实运行数据、抽样打分、用户反馈、异常监控、发现未覆盖问题、数据更真实但通常缺少标准答案.
- At the bottom show the closed loop:
  “线上问题 → 离线回归集 → 修改与验证 → 上线 → 新的线上问题”.

Right sidebar:
- Show the full outline.
- Highlight section 3 and nested item “3.2 指标和数据 / 用例”.
- Keep the same “继续学习” block.

Constraints: every one of the six metric rows, five case sources, three dataset groups, five metadata fields, complete test-case example, and offline/online comparison must be represented. Do not collapse them into generic placeholder charts. Preserve readable Chinese typography.

Avoid: unreadable dense dashboard, tiny tables, dark UI, blue accent, decorative charts unrelated to the lesson, gradient cards, glassmorphism, logos, watermark.
```

---

## 7. 提示词 5：第 3.3 节“方法和工具”与第 3.4 节“平台和产品”

```text
Use case: ui-mockup
Asset type: high-fidelity desktop course detail page, fifth continuous vertical slice

Primary request: Design subsections 3.3 and 3.4 of the same Chinese Agent evaluation course page. Preserve the established course-detail shell and show the differences, strengths, limitations, and combinations of evaluation methods without oversimplifying them.

Canvas and layout: tall desktop screenshot, about 1440 × 2700. Same centered 1360px two-column layout, wide main content and 286px sticky right outline. White background, #318355 accent green, #256743 dark green, #edf8f0 and #f6fbf7 pale fills, #e3e9e5 dividers, navy headings, gray body. PingFang-like sans serif, Lucide-style icons, 8px cards, thin borders, restrained shadow.

At the top retain the three-step rail and highlight “03 方法和工具”.

Subsection title: “3.3 第三步：方法和工具”

First clarify the taxonomy with a small two-level diagram:
- Level 1, execution mode: “人工测试 / 自动化测试”.
- Level 2, automated scoring methods: “代码规则 / LLM-as-a-Judge / Agent-as-a-Judge”.
- Add the conclusion: “实际项目通常组合使用”.

Create four full evaluation-method modules. Each must include what it is, suitable situations, limitations, and one concrete example.

Module 1 — “人工测试”
- Participants: “产品经理 / 测试人员 / 业务专家 / 真实用户”.
- Suitable situations, preserve all four:
  “评测体系刚建立，还不知道什么算好”
  “涉及专业判断、用户体验或复杂业务语境”
  “需要发现意料之外的问题”
  “需要校准自动评测器”
- Limitation: “速度慢、成本高、评测人标准可能不一致，不适合每次变更都全量执行”.
- Key principle: “自动评测建立后，仍需领域专家定期抽查和校准”.

Module 2 — “基于规则或代码的自动化测试”
- Show every example from the lesson:
  “JSON 结构是否正确”
  “工具名称和参数是否合法”
  “数据库中是否真实创建退款单”
  “是否访问禁止访问的数据”
  “耗时、调用次数和成本是否超过阈值”
- Advantage: “快速、便宜、稳定，适合 CI 和大规模回归”.
- Limitation: “难以判断表达是否清楚、理由是否充分等开放问题”.
- Prominent principle: “能用程序验证，就不要让另一个模型猜”.

Module 3 — “LLM-as-a-Judge”
- Definition: “让大模型根据评分标准，对回答或执行记录打分”.
- Preserve all suitable judgments:
  “回答是否完整、清晰、有帮助”
  “是否依据给定材料作答”
  “是否遵循业务规则和沟通要求”
  “两个版本中哪一个更好”
- Judge prompt anatomy: “评分对象 / 评分维度 / 等级定义 / 必要证据 / 信息不足时返回无法判断”.
- Risks: “表述风格 / 答案顺序 / 模型偏好 / 含糊标准”.
- Calibration: “用人工标注样本验证与业务专家判断的一致性，并持续抽查”.

Module 4 — “Agent-as-a-Judge”
- Compare it directly with LLM-as-a-Judge:
  “LLM Judge：读取已提供的输入、输出或执行记录”
  “Judge Agent：拥有工具和任务循环，主动寻找证据后判断”
- Show two examples:
  “研究 Agent：打开引用来源，核对原文是否支持结论”
  “操作型 Agent：查询数据库、页面状态或任务产物，确认动作真实完成”
- Preserve all suitable situations:
  “证据分散在多个文件、网页、数据库或执行步骤中”
  “只看最终回答无法确认任务是否完成”
  “需要检查复杂产物或完整执行轨迹”
- Limitations: “可能选错工具、漏看证据，成本与耗时更高，自身也具有不确定性”.
- Principle: “作为代码检查、LLM Judge 和人工复核的补充，不作为未经校准的唯一标准”.

Next create a decision table titled “如何组合评测方法”, preserving all four mappings:
- “格式、字段、阈值、数据库状态 → 代码或规则”
- “表达质量、语义正确性、是否有依据 → LLM-as-a-Judge + 人工校准”
- “需要主动访问环境才能获得证据 → Agent-as-a-Judge + 确定性检查”
- “高风险、标准尚不清楚或存在争议 → 业务专家人工评测”
- Above the table show the rule: “优先使用成本最低、能够可靠判断问题的方法”.
- Add the complete refund example: “代码检查退款单状态 + LLM Judge 检查用户解释 + 人工抽查高风险失败”.

Subsection title: “3.4 一些 Agent 评测平台和产品”
- Render a readable five-row comparison table with columns “平台 / 适合的使用方式 / 主要特点”.
- Preserve all five products and their meanings:
  “LangSmith / Trace、数据集、实验、离线与线上评测 / 代码评测器、LLM-as-a-Judge、成对比较、人工标注”
  “Langfuse / 可观测性与评测联动，支持云服务或自托管 / 人工分数、代码评测器、LLM Judge、数据集实验和线上规则”
  “Arize Phoenix / 开源 Trace 分析、数据集实验和评测 / 代码评测、LLM Judge、人工标签、OpenTelemetry / OpenInference”
  “Braintrust / 实验、评分器、CI 回归和线上质量监控 / 数据集、实验快照、代码或模型评分器、线上评分”
  “Promptfoo / 配置文件和命令行，本地或 CI 比较模型与 Agent / 规则断言、模型评分、工具调用和 Agent 轨迹检查”
- Add a selection checklist containing every factor from the lesson:
  “现有技术栈 / 是否需要自托管 / 数据能否上传 / 是否需要界面化标注 / 是否接入 CI / 调用与存储成本”.
- Add a clear note: “平台不能替代业务目标、指标和用例设计；采用前重新核对当前版本、部署方式和价格。”

Right sidebar:
- Show the full outline.
- Highlight “3.3 方法和工具” and “3.4 Agent 评测平台和产品”.
- Keep the standard next-lesson block.

Constraints: do not reduce the four methods to four titles. Preserve the suitable situations, limitations, examples, four combination mappings, all five platform rows, and all six selection factors. Keep tables readable.

Avoid: vendor-logo wall, dark SaaS dashboard, blue accent, pricing cards, neon, excessive shadow, tiny text, fake metrics, watermark.
```

---

## 8. 提示词 6：第 4 节“Agent 评测的注意事项”

```text
Use case: ui-mockup
Asset type: high-fidelity desktop course detail page, sixth continuous vertical slice

Primary request: Design the complete section 4, “Agent 评测的注意事项”, for the same course page. The current lesson contains nine distinct precautions; all nine must be represented with their important examples and rules. Do not compress them into six generic checklist items.

Canvas and layout: tall desktop screenshot, about 1440 × 2600. Same 1360px centered two-column layout with wide reading content and 286px sticky outline sidebar. White background, #318355 green accent, #256743 dark green, pale green panels, #e3e9e5 dividers, #171e2c headings, #536070 body. Modern Chinese sans serif, 8px card radius, thin borders, semantic amber only for warnings, no dense dashboard.

Section title: “4. Agent 评测的注意事项”

Organize the nine items into three vertically stacked groups while keeping the original 4.1–4.9 numbering visible.

Group A — “评什么、看什么”

4.1 “评测的是整个 Agent 系统，不只是模型”
- Show the complete system chain: “模型 / 提示词 / 上下文 / 知识库 / 记忆 / 工具 / 权限 / 编排逻辑 / 外部环境”.
- Show the warning: “换模型后分数提高，不等于问题一定来自旧模型”.
- Conclusion: “结合执行链路做原因分析，不把所有问题都归为模型不够强”.

4.2 “不要把 Agent 自己说‘完成了’当成成功”
- Use a two-column evidence comparison: “Agent 声称完成” versus “真实环境结果”.
- Preserve all four environment checks:
  “邮件是否发给正确的人”
  “日历事件是否真实创建”
  “数据库记录是否正确更新”
  “文件是否存在于指定位置并符合要求”
- Conclusion: “最终回答只是证据之一，不能替代环境状态”.

4.3 “结果优先，但关键过程也不能完全忽略”
- Visualize several valid paths reaching the same successful outcome; do not force a unique tool sequence.
- Preserve every process that still needs checking:
  “是否越权或绕过审批”
  “是否使用错误数据源”
  “是否泄露敏感信息”
  “是否出现无效循环和异常成本”
  “业务明确要求的步骤是否完成”
- Prominent principle: “只检查会影响结果、风险和成本的关键路径”.

Group B — “可靠性与评测器质量”

4.4 “Agent 具有随机性，一次通过不代表稳定”
- Show three observation cards:
  “首次成功能力 / 第一次运行是否成功”
  “多次稳定性 / 重复运行是否持续成功”
  “失败分布 / 失败集中在哪些任务和步骤”
- Include a clear comparison:
  “pass@k：多次尝试中至少成功一次”
  “pass^k：多次尝试全部成功”
- Mark “探索任务” near pass@k and “客服、支付等高可靠场景” near pass^k.

4.5 “先评测评测器”
- Use a five-item calibration checklist, preserving every item:
  “参考答案能否通过”
  “明显错误能否被识别”
  “Judge 是否与业务专家判断基本一致”
  “改变答案顺序或风格后，是否出现无关偏差”
  “信息不足时，是否愿意返回无法判断”
- Add the rule: “定期阅读失败记录，区分 Agent 问题、题目歧义、环境故障和评分规则错误”.

4.6 “用例要平衡，避免优化到另一个极端”
- Show both lesson examples:
  “只测应该搜索 → Agent 可能什么都搜索”
  “只测应该转人工 → Agent 可能过度保守”
- Show all four balanced pairs:
  “应该做 / 不应该做”
  “正常情况 / 异常情况”
  “容易任务 / 困难任务”
  “高频任务 / 低频高风险任务”.

Group C — “数据集健康与治理”

4.7 “不要在测试集上反复调到满分”
- Show the overfitting loop “同一测试集 → 反复调 Prompt → 满分假象”.
- Show the healthier path “保留独立验证集 → 用新流量检查 → 新失败进入回归集 → 饱和时增加更难任务”.

4.8 “不要让单一分数掩盖关键风险”
- Use the exact example: “99 个普通问题正确 + 1 个高风险退款任务越权 ≠ 可以上线”.
- Show severe failures as non-negotiable hard gates:
  “越权 / 数据泄露 / 错误付款”.
- Add the metric-gaming examples:
  “为了完整性评分故意写得更长”
  “修改测试条件让自己更容易通过”.
- Conclusion: “指标必须回到真实用户目标和业务结果”.

4.9 “控制数据、环境与版本”
- Show version tags for “模型 / 提示词 / 工具 / 知识库 / 评测器 / 数据集”.
- Show isolated-environment risks: “缓存 / 残留文件 / 共享状态 / 外部服务波动”.
- Show privacy controls: “脱敏 / 权限控制 / 保留期限 / 不复制不必要的敏感数据”.

Right sidebar:
- Show the full outline and highlight section “4 Agent 评测的注意事项”.
- Keep the standard “继续学习” block.

Constraints: all nine numbered precautions must be visible. Preserve the listed examples, pass@k versus pass^k, judge-calibration checklist, balanced case pairs, 99+1 risk example, version controls, and privacy controls. Use clear course-reading hierarchy, not an infographic poster detached from the page shell.

Avoid: reducing to six items, unreadable micro-text, dashboard, dark theme, blue accent, giant warning illustrations, excessive red, logos, watermark.
```

---

## 9. 提示词 7：第 5 节评测飞轮、第 6 节练习题与页面底部

```text
Use case: ui-mockup
Asset type: high-fidelity desktop course detail page, final continuous vertical slice

Primary request: Design the final portion of the same lesson page: section 5 “如何搭建第一版评测飞轮”, section 6 exercise, the lesson output summary, and the next-lesson control. Preserve the established white-and-green course-detail shell and end the page with a strong but restrained sense of completion.

Canvas and layout: tall desktop screenshot, about 1440 × 2400. Same centered 1360px two-column grid, wide main content plus 286px sticky right outline, 50px gap. White background, #318355 accent green, #256743 dark green, pale green support fills, #e3e9e5 lines, navy headings, gray body. PingFang-like Chinese sans serif, Lucide line icons, 8px cards, thin borders, no marketing decoration.

Section title: “5. 如何搭建第一版评测飞轮”

Do not show only a seven-node generic circle. The latest lesson contains ten concrete implementation steps. Create a readable ten-step loop or two-row connected timeline, preserving every step and description:
1. “选择任务：选出 3～5 类最重要的用户任务”
2. “跑通流程：用少量真实或接近真实的案例完成人工测试”
3. “定位问题：结合 Trace 找到影响任务结果的主要失败点”
4. “确定指标：每类任务设置一个主指标，再补充安全、成本或延迟约束”
5. “建立用例集：收集 20～50 条代表性用例，包含正常、异常和高风险情况”
6. “组合评测器：代码验证确定性结果，LLM Judge 评开放质量，高风险案例人工复核”
7. “建立基线：记录当前版本结果，不是一开始就追求高分”
8. “一次解决一类问题：先修改最有价值的失败点”
9. “运行回归：专项用例与核心任务集一起测试，避免整体退化”
10. “上线继续观察：把新的真实失败加入回归集，进入下一轮迭代”
- The tenth step must visibly loop back to the first.
- Group the loop into four subtle stages without changing the ten steps: “发现 / 定义 / 改进 / 验证”.

Below the main loop, create a full customer-service case study titled “退货咨询：过期规则问题如何进入评测飞轮”.
Preserve every node in the case:
“线上发现 Agent 经常引用过期退货规则”
→ “按商品类型和订单状态分类失败”
→ “选出影响最大的典型案例”
→ “增加规则版本正确率和回归用例”
→ “修改检索过滤与规则版本管理”
→ “重跑专项用例和核心任务集”
→ “确认正确率提高，且耗时、成本、转人工率没有异常退化”
→ “上线后继续观察真实退货咨询”.

Add a prominent pale green conclusion callout with the exact sentence:
“评测飞轮不是一次性做一份测试报告，而是不断把问题变成用例，把用例变成改进证据。”

Section title: “6. 练习题”
- Create a realistic, clean “评测设计卡” form module.
- Include every field from the lesson, with blank lines or neutral input-style placeholders:
  “任务名称”
  “用户目标”
  “为什么值得测”
  “成功结果”
  “不可接受的失败”
  “需要检查的最终状态”
  “需要检查的关键过程”
  “主指标”
  “约束指标”
  “第一批用例”
  “评测方法：人工 / 代码规则 / LLM-as-a-Judge / Agent-as-a-Judge”
  “回归触发条件”.
- Add a small instruction above it: “请选择你的 Agent 中一个最重要的任务，完成一张评测设计卡。”

Bottom fixed lesson footer:
- Left output summary with file icon and heading “本课产出”.
- Use the full latest output text verbatim:
  “一份 Agent 评测方案，明确高价值评测任务、指标与用例、评测方法和工具，以及从真实问题进入持续迭代的评测飞轮。”
- Right side green button: “进入下一课 →”.

Right sidebar:
- Show the full outline.
- Highlight “5 如何搭建第一版评测飞轮” and then “6 练习题” near the lower scroll position.
- Show the standard block “继续学习”, “下一课：课程总结与最终方案”, right arrow, and “汇总你的 Agent 设计，形成最终方案。”

Constraints: keep all ten implementation steps, all eight customer-service case nodes, all twelve exercise fields, the full output sentence, and the next-lesson control. The page should feel like the exact ending of a long course article, with consistent margins and divider rhythm.

Avoid: seven-node simplification, omitted exercise fields, dashboard visuals, dark UI, blue accent, giant illustration, confetti, gamification, heavy shadow, logos, watermark, illegible text.
```


