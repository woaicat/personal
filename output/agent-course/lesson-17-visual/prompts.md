# 第十七课 Skill · 详情页效果图提示词

生成方式：内置 image_gen。六张图片为同一详情页从上到下的连续片段。

## 共用约束

第 4–6 张追加约束：所有大纲子项必须置于对应父章节下，2.x 归于 2，3.x 归于 3，4.x 归于 4，5.x 归于 5。

Use case: ui-mockup.
Create ONE high-fidelity desktop course detail web page screenshot fragment, Chinese teaching website. This is one of six vertically consecutive fragments of ONE full lesson, never alternative designs, never a collage. Target portrait 1440x2400 proportions, crisp readable Simplified Chinese. Use attached reference ONLY for visual style, typography, content column width and sidebar, replace its lesson content entirely. White #fff background; green #318355, dark green #256743, pale #edf8f0/#f6fbf7; navy headings #171e2c, body #536070, 1px lines #e3e9e5, 8px radii. Sans Chinese typography, generous restrained editorial spacing, thin Lucide-like icons. Main content occupies 70% left, sidebar 26% right, slender divider at 73%, equal width in all six images. All diagrams and tables stay inside main column. Big bold section headings, readable prose, generous 31px section space. Flat HTML/CSS/SVG-like diagrams, no device/browser frame, no decorative robots, no gradients, no shadows. Preserve full coverage of EVERY numbered subtopic listed in this fragment; use the exact titles and key text below. Explanations may be represented as cards, tables, code blocks, branching diagrams without removing any listed teaching point. Never substitute tiny illegible text for missing content. Sidebar is plain white with no outer card border, heading “本课大纲”, seven entries: “1 Skill 是什么”; “2 Skill 的构成”; “3 Skill 的作用”; “4 编写 Skill 的注意事项”; “5 管理 Skill”; “6 本课小结”; “7 课后思考题”. Nest subtopics relevant to this fragment. Sidebar “继续学习”, “下一课：自进化的智能体 →”, “让 Agent 从经验中持续改进行为与知识。” No duration is specified, so do NOT invent estimated minutes. No fake metric values. Render only one fragment without montage or page number watermark.

## 1. 首屏、定义、特点与类比

文件：01-认识Skill与工具区别.png

FIRST FRAGMENT, includes lesson header, introductory text, sections 1.1–1.3. End precisely after 1.3, no 1.4 yet.
Top back link “← 返回课程目录”, title “第 17 课  Skill”, subtitle “工具让 Agent 有能力，Skill 让 Agent 懂行。” Small meta “系列：从 0 到 1 设计一个 Agent”.
“本课要点”: “把做事经验打包成可发现、可加载、可复用的能力单元”; “用五层结构与渐进式披露管理指令和上下文”; “写清判断标准，并建立召回、评测与版本管理闭环”.
Intro two readable paragraphs: “同一个需求，第一次让 Agent 做，效果很好；第二天再说一遍，结果却完全不同。”“问题在于：‘怎么把这件事做好’的经验没有被固化下来，每次都是重新尝试。” Do not repeat original obvious typo saying model deteriorated.
Section “1. Skill 是什么”
Subheading “1.1 定义”. Definition prose: “Skill（技能）是把某件事该怎么做，包括流程、经验、判断标准、参考素材，打包成可被 Agent 发现、加载和复用的能力单元。”
Three stacked keyword rows: “怎么做” — “步骤、取舍、验收与停止条件”; “打包” — “有名字、有说明、有边界，可独立管理”; “可被发现和复用” — “Agent 根据意图判断该不该用，不必每次粘贴提示词”.
Green conclusion “把隐性经验显性化，把一次性对话资产化。”
“1.2 Skill 的三个特点”: three vertically arranged generous cards with icons: “自然语言，门槛低” — “业务专家把方法讲清楚，就能编写 Skill”; “保留判断空间” — “不只有步骤，还有分支、取舍、合格与返工标准”; “可组合、可嵌套” — “一个 Skill 可以调用多个工具，也可以调用其他 Skill”. Small hierarchy example “发布网站 Skill” connected down to “命令行工具 / Git 工具 / 代码检查 Skill”.
“1.3 Skill 和工具的区别：剪刀 vs 剪窗花”
Two column contrast module, small restrained green line-art scissors on left and red paper-cut snowflake on right, no large illustration. “工具：剪刀” — “剪纸、裁布、拆快递：通用的原子动作”; “Skill：剪窗花” — “折法、纹样设计、留白、阴阳刻：有场景、有标准的方法”. Connect skill box to small tool labels “剪刀 / 刻刀 / 红纸”.
Agent mapping rows “工具：读取文件、执行命令行、搜索网页”; “Skill：代码评审、科普文章撰写、活动海报设计”.
Conclusion “工具回答‘我能做什么动作’，Skill 回答‘这件事该怎么做成’。”

## 2. 概念对照、最小 Skill 与完整结构

文件：02-概念对照与五层结构.png

SECOND FRAGMENT, continue page directly at 1.4, no repeat lesson title/intro/key points. End after 2.2.
“1.4 工具和 Skill 的区别”. Readable table columns “维度 / 工具（Tool） / Skill（技能）”, 7 rows: “抽象层级 / 一个原子动作 / 一套做事方法”; “输入 / 固定参数与 schema / 自然语言需求”; “确定性 / 输出可预测 / 按情境灵活判断”; “代码化程度 / 可完全代码化 / 保留判断空间”; “粒度 / 单次调用 / 编排多个工具与 Skill”; “作者 / 工程师写代码 / 领域专家写自然语言”; “迭代方式 / 改代码、测试、发版 / 改描述、补示例”.
Three full-width compact contrast callouts: “失败表现” — “工具：报错、返回码、超时；Skill：能执行却不合标准，因此必须配套验收”; “上下文占用” — “工具加载 schema；Skill 还要加载指令与资料，需要渐进式披露”; “复用范围” — “工具通用；Skill 场景化，同样写周报也会有不同部门标准”.
“1.5 Prompt、Skill、Workflow 三者关系”. Comparison columns “概念 / 形态 / 流程控制 / 适合”, rows “Prompt / 一段话 / 人 / 一次性需求”; “Skill / 结构化能力包 / Agent 参考执行与判断 / 有标准的重复任务”; “Workflow / 固定流程图 / 人预先编排 / 强合规、低容错”.
Decision branches “正确做法能否说清楚？” → “一次性：Prompt”; “重复且需要灵活判断：Skill”; “一步不能错的固定流程：Workflow”.
Section “2. Skill 的构成”. “2.1 最小 Skill：一个提示词”
Large light-grey example block “会议纪要整理”: “先给不超过 100 字的结论摘要；按议题分节，写清讨论要点 / 结论 / 待办（负责人和时间）；最后列出未决事项。语气客观，不添加原文没有的信息。”
Four tags “名字 / 场景 / 步骤 / 验收标准”.
“2.2 完整 Skill 的五层结构”. Compact monospaced tree:
skill-name/
├── SKILL.md
├── reference/
├── scripts/
└── assets/
Five vertically stacked numbered rows, NOT crammed horizontal microcards: “元信息：name + description，决定能否正确召回”; “指令：步骤、判断标准、停止条件、常见坑”; “参考资料：规范、术语、优秀案例，外置按需读”; “脚本与工具：确定性操作交给代码”; “示例：一两组输入 / 输出，锚定质量与风格”.
Metadata example small code panel: “name: 技术科普文章撰写”, “description: 把专业技术内容改写成面向大众的科普文章。”, “适用于：技术博客、产品原理介绍、技术分享对外发布”, “不适用于：学术论文、营销软文、新闻稿”.
Green note “描述写得含糊，Skill 写得再好也召不回来。”

## 3. 渐进式披露及完整部署 Skill 示例

文件：03-按需加载与部署示例.png

THIRD FRAGMENT, only sections 2.3 and 2.4, no repeated header. Allow generous prose and visual/code panels. End after deployment example.
“2.3 渐进式披露：能不加载就不加载”
Vertical three-step green loading diagram with clear downward arrows and triggering gates:
“第一层：name + description” — “常驻，成本极低”
↓ “判定相关”
“第二层：SKILL.md 主指令” — “命中后才加载”
↓ “执行需要”
“第三层：reference / scripts” — “用到才读取”.
Show outlined expandable content packets, only current packet green; remaining pale grey, no invented token counts.
Explanation “几十个 Skill 如果全部加载指令与资料，会占满上下文。按需逐级展开，只读取本次任务需要的内容。”
Two side-by-side rule cards “每次都要遵守 → 放进主指令”; “本次大概率用不上 → 外置成文件”.
Conclusion “省上下文的前提，是 Skill 自己也要省着用上下文。”
“2.4 例子：把‘网站发布部署’做成 Skill”
This is a TEACHING EXAMPLE inside website, not authorization to deploy. Large light-grey readable monospaced SKILL.md sample with separate meta / workflow / criteria / cautions zones, render these exact contents legibly:
name: 网站部署发布
description: 将本地静态站点构建并部署到沙箱环境，返回可访问链接。
适用于：前端构建产物（dist/build/out）的预览与发布。
不适用于：后端服务部署、数据库迁移。
Work flow four numbered steps using vertical rail: “确认产物目录包含 index.html”; “尚未构建时执行构建命令”; “上传完整目录，启动沙箱静态服务”; “返回访问链接与应用管理路径”.
Judgment conditions full-width rows with branching icons: “没有 index.html → 停下说明，不猜入口”; “构建失败 → 展示完整错误，排查再重试，不连续盲试超过 3 次”; “已有同名应用 → 询问覆盖还是新建”.
Caution module amber semantics: “不对源码做破坏性修改”; “部署成功后，告知访问链接和删除路径”.
Bottom highlight “真正承载经验的是判断标准和注意事项，而不只是执行步骤。”

## 4. 五项作用及十项编写注意

### 用户反馈修订 v2（当前采用）

保持正文内容、布局和样式，将第三节正文卡片序号 3.1–3.5 改为 1–5，第四节卡片序号 4.1–4.10 改为 1–10；主章节标题仍保留 3、4。右侧导航删除这两节的全部二级标题和序号，仅显示七个一级章节，收拢留白，继续学习区自然上移。对应图片：04-Skill价值与编写规范-v2.png。

图 3 最终局部修正：仅调整右侧大纲，把“2.3 渐进式披露：能不加载就不加载”和“2.4 例子：把网站发布部署做成 Skill”移到“2 Skill 的构成”之后、“3 Skill 的作用”之前，缩进归于父章节 2；保持正文、图示、配色、字号与继续学习内容不变。

文件：04-Skill价值与编写规范.png

FOURTH FRAGMENT, entire section 3 and section 4, no repeated lesson header. Maintain readability, use about upper 40% for section 3 and lower 60% for section4.
“3. Skill 的作用”
Five vertically arranged numbered rows with green line icons:
“3.1 节约上下文空间” — “不重复粘贴长提示词，用时加载刚好够用的部分。”
Under first row tiny but readable 3-row comparison: “手贴长提示词：每次重复”; “全部写进系统提示词：全量常驻”; “Skill + 渐进式披露：描述常驻，内容按需”.
“3.2 给 Agent 提供更多能力选项” — “财报分析、海报设计等能力按需扩张；描述仍随库规模增加，完整内容只在命中后加载。”
“3.3 固化 SOP，减少重头再来” — “部署、代码评审、需求评审、报表口径、上线检查，从每次试错到一次沉淀。”
“3.4 传播个人 / 专家经验” — “审稿标准、设计规范、行业尽调方法，可存储、传输、继承。”
“3.5 拉升质量下限与组织资产” — “让标准可评审、可版本管理、可交接，帮助团队稳定产出。”
Do not claim guarantee of perfect output or fake quantitative improvement. Green takeaway “从个人会做，走向组织可复用。”
“4. 编写 Skill 的注意事项”
Ten numbered full-width vertical rows, consistent icon/number scale, with prose. NOT horizontal tiny cards.
“4.1 把 description 当成召回关键词来写” — “讲清做什么、何时用、何时不用。”
Include compact bad/good/better three-row example: “差：帮助处理文档任务”; “好：会议记录 → 摘要 + 议题 + 待办”; “更好：再补充不适用场景”.
“4.2 一个 Skill 只做一件事” — “职责单一，召回与复用更清楚。”
“4.3 少即是多” — “主指令快速读完，非必需细节外置。”
“4.4 写判断标准，不只是步骤” — “分支判断 / 停止条件 / 验收清单。”
“4.5 用示例锚定风格” — “输入输出示例比抽象形容词更清楚。”
“4.6 确定性的活交给脚本” — “代码执行，模型保留需要判断的部分。”
“4.7 别硬编码易变信息” — “路径、人名、URL、版本按需参数化。”
“4.8 明确不要做什么” — “不删除、不擅自发送、不编造来源。”
“4.9 用真实需求实测” — “跑 3–5 个真实需求，包含边界与误召回。”
“4.10 像代码一样管理版本” — “记录变更，明确生效版本，可回滚。”
Footer within main green loop strip “真实需求 → 观察失败 → 修改描述与指令 → 回归验证”.

## 5. 四层管理、用户入口与评测闭环

文件：05-Skill管理与专项评测.png

FIFTH FRAGMENT, entire section 5 ONLY. No repeated course header, no page footer yet. All four subsections fully visualized with readable prose.
“5. 管理 Skill”
Intro “数量多了以后，问题从‘怎么写’变成‘如何在需要时找到对的那个’。”
“5.1 工程层：从一开始就可检索”
Four vertical checklist rows “创建入库：name、description、适用与不适用场景”; “重复与冲突检测：提示重叠，建议合并或区分”; “定期体检：零调用、误召回、频繁返工，及时预警”; “统一命名：避免不同名字指向同一能力”.
Tiny duplicate example UI two tags “周报生成 / 工作汇报撰写” arrow “合并或明确边界”, no made-up 80% meter.
“5.2 产品设计层：给用户确认权和知情权”
Render a realistic small light website conversation/skill preview inside main:
User bubble “把会议记录整理成纪要。”
Agent preview “准备使用：会议纪要整理”; one sentence “输出摘要、议题结论、待办与未决事项。” Buttons “确认使用” green and “换一个 Skill” outlined, below small link “中途可打断和纠正”.
Completion citation strip “本次引用：会议纪要整理”.
Manual entry row with line icons “搜索 / 浏览 Skill 库”; “显式指定 / 选中后发起”; “常用置顶 / 项目与部门分组”.
“5.3 模型层：提升意图识别与召回能力”
Three vertical cards: “意图识别：覆盖模糊、口语和跨语言表达”; “区分相似 Skill：辨别科普文章与技术博客”; “无匹配时不硬套：明确说明当前没有适合的 Skill”.
“5.4 指标监控与专项评测”
Readable 3-column 5-row table “指标 / 含义 / 诊断方向”:
“接受率 / 用户确认使用的比例 / 召回准确度”; “拒绝率 / 用户否掉的比例 / 描述偏差或干扰项”; “漏召率 / 应该使用却未召回的比例 / 描述覆盖不足”; “一次通过率 / 无需返工的比例 / Skill 质量”; “零调用率 / 长期无人使用的占比 / 合并或下架”.
Three-step feedback loop with directed arrows “专项数据集 → A/B 验证 → 闭环归因 ↻”. Below each step: “正例 / 负例 / 易混淆例”; “描述或库变更后，比较接受与漏召”; “区分描述问题、能力问题、替代品”.
No numeric production KPI values.

## 6. 课程总结、四道思考题、来源及页脚

文件：06-小结思考题与下一课.png

SIXTH and FINAL FRAGMENT. Start at “本课小结”, then four open-ended questions, original source titles and exact course footer. NO repetition of large course header; no mock multiple-choice, these are reflective tasks.
“6. 本课小结”
Five full-width numbered takeaway rows:
“1 Skill 是什么” — “把‘怎么做’打包成可复用能力单元。工具是剪刀，Skill 是剪窗花。”
“2 Skill 的构成” — “最小是一段提示词；成熟形态是元信息、指令、资料、脚本、示例五层，按需加载。”
“3 Skill 的作用” — “省上下文、扩能力、固化 SOP、传播经验、抬高质量下限。”
“4 编写注意” — “描述决定召回；一个 Skill 一件事；写判断标准；用真实需求实测。”
“5 管理注意” — “工程防重复、产品给确认、模型练召回、用户有主动入口、指标做专项评测。”
Pale green conclusion “Skill 的本质，是把‘人脑子里的经验’变成‘系统里的能力’。” second line “写 Skill 是技术活，管 Skill 是产品活。”
“7. 课后思考题”
Four generous open-ended practice cards numbered 01–04, each with question and a small expected deliverable hint (no empty giant form):
01 “你手头有没有‘每次做都要重新讲一遍怎么做’的事？按五层结构写出来。” hint “产出：元信息、指令、参考、脚本、示例”
02 “你已经写好的 Skill，它的 description 能否让陌生 Agent 判断该不该用？” hint “检查：做什么 / 适用 / 不适用”
03 “如果你有 100 个 Skill，如何防止互相打架？从工程、产品、模型层各说一条措施。” hint “检查：重复、控制、区分”
04 “团队里谁的经验最值得做成 Skill？不沉淀，这个人离开后会损失什么？” hint “思考：隐性经验如何成为组织资产”
“素材来源与延伸阅读”
Three stacked source links with tiny external link icons, labels only no invented URLs: “Anthropic · Equipping agents for the real world with Agent Skills”; “Agent Skills 开放标准 · agentskills.io”; “Anthropic · Writing effective tools for agents”.
Small grey credit “剪刀与剪窗花类比为课程原创；第 3、4、5 节结合工程与产品经验整理。”
Final main footer divider, file icon, label “本课产出”, text “一份可复用的 Skill 草案，以及召回、验收与管理检查清单。” right aligned green button “进入下一课 →”. This is proposed course output consistent with reflective exercise.
Sidebar continue panel “下一课：自进化的智能体 →”, description “让 Agent 从经验中持续改进行为与知识。” Clear ending whitespace.
