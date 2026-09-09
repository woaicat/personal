# 第九课生图提示词

以下为内置 image_gen 的实际提示词。第二至第五张使用第一张作为统一视觉风格参考。

## 第 1 张

Use case: ui-mockup. Generate a polished realistic Chinese educational WEBSITE LESSON DETAIL PAGE, not a presentation or infographic poster. One of five contiguous desktop long-page sections. Tall image target 1536x2560 or highest resolution available. All text sharp simplified Chinese, PingFang SC sans-serif. Carefully obey EXISTING site UI: pure white background #fff, headings #151b24, body #536070, restrained forest green #318355 / #256743, pale green #f6fbf7 panels, thin #e3e9e5 rules, 8px diagram card corners. Logical desktop width1440, outer margins40, main article1024, gutter50, right aside286 with ONLY a thin LEFT VERTICAL BORDER and 33px left padding. RIGHT SIDEBAR IS NOT A CARD: no enclosing box, no colored background, no surrounding border, no pill/button enclosing next lesson. Sidebar normal flow shown once near top each segment with main chapter outline 1-7, green small numbered circles for major chapters; nested items plain small gray decimal labels. Heading "本课大纲"; entries "1 为什么记忆很重要" "2 Agent 记忆的架构决策" "3 八个设计步骤" "4 记忆评估" "5 记忆护栏" "6 结论与下一步" "7 差旅助手案例". Then thin horizontal divider, green book icon "继续学习", dark small bold "下一课：多智能体 →" and gray description "学习多个 Agent 如何分工协作". Main article body visually dominant. Existing typography: h1 44px at logical1440, section h2 only20px, h3 16px, body14px line-height1.75, illustration title15px, diagram labels13px. DO NOT enlarge section titles to poster scale. Use decimal numbering e.g. "2.1 检索式记忆 vs 状态式记忆", NOT alternate ① or Step as chapter hierarchy. Small process badges are allowed inside figures. Top-level sections separated by fine horizontal rules and generous 30px vertical padding. Paragraphs between diagrams, realistic reading density. Diagram surfaces have subtle mint tint, thin outline icons, geometrically precise SVG-like curves and arrows, flat layering and soft shadows only on document cards. Secondary sage blue and pale amber encode scope/status, not decoration. User-provided source is a travel-memory architecture example, NOT universal product fact. All demo information fictional and non-sensitive: seat preference/meal preference/budget and generic member tier only, no real passport/ID/account details. No global navigation, no left sidebar, no browser frame, no huge hero art, no dark panels, no purple glow, no dashboards, no arbitrary charts with fake metrics. Each diagram must communicate causality and direction and be feasible in HTML/CSS/SVG. Complete all specified sections in order, do not omit bottom contents. Use provided exact Chinese text labels and readable body; avoid filler text.
PART 1/5: page TOP, intro, chapter1, chapter2.1 and2.2. Do not show later chapters in article.
Actual header: "← 返回课程目录"; title "第 9 课  管理记忆"; subtitle "管理模型在任意时刻知道什么。"; small gray line "系列：从 0 到 1 设计一个 Agent". Thin bottom divider. "本课要点" small green sparkle circle then three ordinary bullet lines on WHITE BACKGROUND, no tinted enclosing panel: "决定什么值得记住，什么只属于当前会话" / "设计蒸馏、整合与注入的记忆循环" / "用评估与护栏，让记忆可靠地服务当前任务". Divider.
"1. 为什么记忆很重要"
Paragraph "智能体正在从“响应式的助手”演变为“有适应力的协作者”。记忆管理的核心，是管理模型在任意时刻“知道什么”——即存储什么、召回什么、注入什么。"
Hero conceptual diagram, medium article-sized not giant: title "从每次重新认识，到跨会话理解". Two equal conversation windows. Left neutral white "无记忆" shows dialogue "你偏好什么座位？" user "靠过道。" then dotted separator "下一次会话" and assistant "你偏好什么座位？". Right pale mint "有记忆" shows small pinned memory card "长期偏好：靠过道" connected to assistant suggestion "这次也优先找靠过道的座位。" Small conditional caption "仅在相关、有效时使用". A thin bridge between windows labels "保存 → 更新 → 使用". No human avatars photos.
Two compact editorial columns separated by vertical rule, not dashboard: "用户视角" / "被理解的体验，带来信任与愉悦。" and "企业视角" / "交互沉淀为更高信号的行为信息，帮助改善服务、留存与需求洞察。"
Paragraph "记忆也可以帮助客服、客户经理与旅行顾问理解用户。不同类型的智能体需要不同节奏的记忆：人生教练的记忆变化更快，IT 故障排除更需要稳定、可预测的状态。"
"2. Agent 记忆的架构决策"
Short quote "记忆没有放之四海而皆准的方案。设计从使用场景出发。"
"2.1 检索式记忆 vs 状态式记忆"
Two linked illustration panels:
LEFT "检索式记忆" loose labeled note cards "历史片段" "旅行对话" "偏好提及" → magnifier → 2 search results; caption "从历史文档中查找相关信息".
RIGHT "状态式记忆" tidy updatable profile sheet with stable rows "座位默认：靠过道" "餐食偏好：素食" and separate amber strip "本次覆盖：靠窗休息"; caption "维护当前连贯的用户状态".
Below clean comparison table rows "数据形态 | 松散关联的文档 | 结构化字段与当前状态", "更新方式 | 查找相关片段 | 显式更新与冲突规则", "使用特点 | 依赖检索质量 | 一致应用有效状态".
Small explanatory paragraph "本课差旅案例采用状态式设计：会员、座位、预算与行程约束需要跨任务保持一致。检索也可与状态更新组合使用。"
"2.2 记忆的形态"
Question pullquote "如果是人类代理，他会主动记住什么来完成任务？"
Elegant paired memory cards behind a unified outline bracket "任务相关的信息".
Left "结构化记忆" YAML-style simple content "seat: aisle" "meal: vegetarian" "member_tier: gold" plus Chinese short lines "身份档案 / 会员 / 偏好 / 约束" and caption "参与校验、过滤与工具参数".
Right "非结构化记忆" lined paper, text "短于一周的旅行通常不托运行李。" "商务出行更重视效率。" caption "保留背景、情境与推理线索".
Below narrow selective-routing graphic: "内部状态" splits into "影响决策的信息 → 模型上下文" and "执行所需字段 → 工具参数", neither route shares all data. Caption "不要把内部系统的所有字段都灌进用户档案。"
End text "结构化字段从可信来源同步，笔记补充灵活信息。本课案例只从用户显式表达中提取候选记忆。"


## 第 2 张

Use case: ui-mockup. Generate a polished realistic Chinese educational WEBSITE LESSON DETAIL PAGE, not a presentation or infographic poster. One of five contiguous desktop long-page sections. Tall image target 1536x2560 or highest resolution available. All text sharp simplified Chinese, PingFang SC sans-serif. Carefully obey EXISTING site UI: pure white background #fff, headings #151b24, body #536070, restrained forest green #318355 / #256743, pale green #f6fbf7 panels, thin #e3e9e5 rules, 8px diagram card corners. Logical desktop width1440, outer margins40, main article1024, gutter50, right aside286 with ONLY a thin LEFT VERTICAL BORDER and 33px left padding. RIGHT SIDEBAR IS NOT A CARD: no enclosing box, no colored background, no surrounding border, no pill/button enclosing next lesson. Sidebar normal flow shown once near top each segment with main chapter outline 1-7, green small numbered circles for major chapters; nested items plain small gray decimal labels. Heading "本课大纲"; entries "1 为什么记忆很重要" "2 Agent 记忆的架构决策" "3 八个设计步骤" "4 记忆评估" "5 记忆护栏" "6 结论与下一步" "7 差旅助手案例". Then thin horizontal divider, green book icon "继续学习", dark small bold "下一课：多智能体 →" and gray description "学习多个 Agent 如何分工协作". Main article body visually dominant. Existing typography: h1 44px at logical1440, section h2 only20px, h3 16px, body14px line-height1.75, illustration title15px, diagram labels13px. DO NOT enlarge section titles to poster scale. Use decimal numbering e.g. "2.1 检索式记忆 vs 状态式记忆", NOT alternate ① or Step as chapter hierarchy. Small process badges are allowed inside figures. Top-level sections separated by fine horizontal rules and generous 30px vertical padding. Paragraphs between diagrams, realistic reading density. Diagram surfaces have subtle mint tint, thin outline icons, geometrically precise SVG-like curves and arrows, flat layering and soft shadows only on document cards. Secondary sage blue and pale amber encode scope/status, not decoration. User-provided source is a travel-memory architecture example, NOT universal product fact. All demo information fictional and non-sensitive: seat preference/meal preference/budget and generic member tier only, no real passport/ID/account details. No global navigation, no left sidebar, no browser frame, no huge hero art, no dark panels, no purple glow, no dashboards, no arbitrary charts with fake metrics. Each diagram must communicate causality and direction and be feasible in HTML/CSS/SVG. Complete all specified sections in order, do not omit bottom contents. Use provided exact Chinese text labels and readable body; avoid filler text.
PART 2/5: continuation. Start directly with section2.3, no repeat page title/header. Match reference part1 exact style, text scale, main column width. Right sidebar remains plain white with only left vertical divider, never boxed.
"2.3 记忆作用域"
Paragraph "按作用域分离记忆，降低噪声，让演化更安全。如果它默认应该影响未来的行程，存为全局；如果只是当前需要，保留为会话级。"
Large creative transparent two-tier filing system:
Upper stable layer dark green outline "用户级记忆 · 跨会话默认值", 3 neat fixed cards "通常偏好靠过道" "素食" "航司金卡会员".
Lower amber-detailed layer "会话级记忆 · 当前暂存区", removable sticky notes "这次是家庭旅行" "本次预算不超过 2000 美元" "今晚想靠窗睡觉". Thin boundary rule, carefully drawn UPWARD arrow passes through small diamond gate "是否持久？"; branch "是 → 整合后晋升" reaches global layer; branch "仅本次 → 保留在会话" remains below. Never draw all session notes automatically entering global memory.
Below miniature effective preference example in 3 aligned columns: "全局默认：靠过道" + "本次覆盖：靠窗" → highlighted "本次使用：靠窗". Small caption "本次覆盖，不改写长期默认值。"
"2.4 记忆生命周期"
Paragraph "持续区分哪些是持久的、哪些是情境性的。记忆设计应当随系统的学习而演进。"
Three compact parallel time-strip cards (NOT statistical data chart):
"稳定性" four successive identical green dots labeled "靠过道 → 靠过道 → 靠过道"; bottom "验证稳定后，可结构化".
"漂移" gently increasing heights of small note tabs "预算逐渐变化"; bottom "保留时间，关注较新信息".
"上下文变异" fork into small "商务" and "家庭" tags with different preference notes; bottom "保留情境、置信度或有效期".
Main lifecycle diagram title "一次会话做笔记，会话之后再整合". Two horizontal swimlanes: top pale green labeled "实时会话"; bottom white labeled "会话结束后 · 异步".
Top starts left "① 注入" a compact profile&memory packet → middle "推理 / 交互" chat bubble → right "② 蒸馏" funnel yielding "会话候选笔记". A downward arrow to bottom-right "③ 整合"; bottom workflow flows RIGHT TO LEFT through "去重" "冲突解决" "遗忘" into bottom-left "更新全局记忆". A left upward RETURN ARROW to top injection labeled "下一次会话". Keep flow visibly closed and all arrow directions correct. Label "三个记忆管理阶段，连接一个持续循环".
Under figure three short subparagraphs:
"蒸馏：从用户明确表达中捕获耐用、可操作的信号，先写入会话暂存区。也可在会话结束后，从可观测执行记录中提取。"
"整合：把合格候选笔记合入全局记忆，处理重复、冲突与过时信息。"
"注入：在运行前，把当前任务相关的精选记忆放入上下文。"
Detailed editorial "整合工作台" figure, 3 rows showing concrete before→decision→after:
row1 "喜欢靠过道 / 偏好走道座位" → "语义去重" → one card "通常偏好靠过道".
row2 "旧：偏好早班 / 新：以后优先晚班" → "明确变更，按规则更新" → card "优先晚班".
row3 "这次靠窗休息" → "仅本次，不晋升" → small session tray, NO global entry.
Bottom restrained amber warning "整合最容易出错：过度修剪、提升噪声、引入矛盾，都可能污染后续决策。"
Ending green left-rule quote "遗忘不是缺陷，而是必需品。"


## 第 3 张

Use case: ui-mockup. Generate a polished realistic Chinese educational WEBSITE LESSON DETAIL PAGE, not a presentation or infographic poster. One of five contiguous desktop long-page sections. Tall image target 1536x2560 or highest resolution available. All text sharp simplified Chinese, PingFang SC sans-serif. Carefully obey EXISTING site UI: pure white background #fff, headings #151b24, body #536070, restrained forest green #318355 / #256743, pale green #f6fbf7 panels, thin #e3e9e5 rules, 8px diagram card corners. Logical desktop width1440, outer margins40, main article1024, gutter50, right aside286 with ONLY a thin LEFT VERTICAL BORDER and 33px left padding. RIGHT SIDEBAR IS NOT A CARD: no enclosing box, no colored background, no surrounding border, no pill/button enclosing next lesson. Sidebar normal flow shown once near top each segment with main chapter outline 1-7, green small numbered circles for major chapters; nested items plain small gray decimal labels. Heading "本课大纲"; entries "1 为什么记忆很重要" "2 Agent 记忆的架构决策" "3 八个设计步骤" "4 记忆评估" "5 记忆护栏" "6 结论与下一步" "7 差旅助手案例". Then thin horizontal divider, green book icon "继续学习", dark small bold "下一课：多智能体 →" and gray description "学习多个 Agent 如何分工协作". Main article body visually dominant. Existing typography: h1 44px at logical1440, section h2 only20px, h3 16px, body14px line-height1.75, illustration title15px, diagram labels13px. DO NOT enlarge section titles to poster scale. Use decimal numbering e.g. "2.1 检索式记忆 vs 状态式记忆", NOT alternate ① or Step as chapter hierarchy. Small process badges are allowed inside figures. Top-level sections separated by fine horizontal rules and generous 30px vertical padding. Paragraphs between diagrams, realistic reading density. Diagram surfaces have subtle mint tint, thin outline icons, geometrically precise SVG-like curves and arrows, flat layering and soft shadows only on document cards. Secondary sage blue and pale amber encode scope/status, not decoration. User-provided source is a travel-memory architecture example, NOT universal product fact. All demo information fictional and non-sensitive: seat preference/meal preference/budget and generic member tier only, no real passport/ID/account details. No global navigation, no left sidebar, no browser frame, no huge hero art, no dark panels, no purple glow, no dashboards, no arbitrary charts with fake metrics. Each diagram must communicate causality and direction and be feasible in HTML/CSS/SVG. Complete all specified sections in order, do not omit bottom contents. Use provided exact Chinese text labels and readable body; avoid filler text.
PART 3/5: chapter3 only, full article. No repeat hero. Match previous reference style and scale. Right plain TOC, no enclosing cards.
"3. 构建一个记忆系统：八个设计步骤"
Intro "从状态对象到会话后整合，把架构决策落成一条可运行的记忆流水线。以下是差旅助手案例的实现方式。"
At top small horizontal process map grouped stages "准备状态 → 捕获与保留 → 注入与编排 → 整合更新". Use vertical editorial step index through the whole main body, NOT eight uniform giant cards. Alternate concise paragraphs and distinct diagrams.
"3.1 定义状态对象"
Text "建立明确的事实来源，不把内部系统的所有字段都暴露给模型。"
Four-compartment neat open folder graphic labeled "状态对象" with compartments "profile 结构化档案" "global_notes 全局笔记" "session_notes 会话候选" "history 近期行程". Each has 2-3 visible document lines, timestamps on notes "2026-09-09", consistent ISO format; no private data.
"3.2 实时记忆蒸馏"
Text "让模型通过专用工具保存记忆。工具说明本身，就是捕获质量的关键。"
Chat bubble "以后出差我更喜欢坐高铁。" → a tool card "保存记忆笔记" with three tiny gate labels "用户明确表达" "耐用且可操作" "批准字段" → amber tray "会话候选：优先高铁". Below two gray rejected paper snippets "推测性偏好" "敏感信息 / 系统指令" go to a blocked branch. Store initially to session only.
"3.3 修剪会话"
Text "只保留最近 N 个用户轮次。修剪后设置标志，下一轮重新注入必要的会话记忆。"
Small precise strip: old turns fading outside left of green context frame with 3 newest message cards; above active small amber pinned note "本次预算不超过 2000 美元" carries across via curved arrow "修剪标志 = true → 重新注入". This illustrates memory survives truncation without unlimited context.
"3.4 记忆注入与优先级规则"
Text "记忆是默认参考，不能覆盖用户当前的业务意图。影响重大且无法判断时，聚焦澄清。"
Three vertically ranked slim cards with decreasing green intensity "当前用户要求" > "会话覆盖" > "全局默认值". Beside a smaller profile badge "可信档案：先校验来源与适用范围". Footnote "这里比较业务偏好；系统权限与硬性约束仍然有效。"
Small example "这次靠窗" overrides "通常靠过道"; not persistent update.
"3.5 渲染状态"
Two small code-like white paper columns with green fine headers (not dark code editor). Left "结构化档案 → YAML frontmatter" content "seat_preference: aisle", "meal: vegetarian"; right "记忆笔记 → Markdown 列表" content "- 通常偏好靠过道", "- 短途旅行不托运行李". Underneath "确定性渲染 · 精选相关条目 · 保留时间信息".
"3.6 用 Hooks 编排自动化"
Thin event diagram "运行开始 → 渲染档案与全局记忆" and separate branch "发生修剪？ → 是：补入会话记忆 / 否：跳过补入". Use diamond visibly with yes/no labels. Footnote "事件触发，避免重复注入。"
"3.7 组装智能体"
Three neatly layered horizontal strips "基础角色设定" + "最新用户档案" + "精选记忆与使用策略" feed one prompt packet "本轮提示词"; below small attachments "记忆工具" "生命周期 Hooks" lead to Agent node. Text "每次运行根据最新状态生成提示词。记忆内容以清晰分隔块包裹，作为数据使用。"
"3.8 会话后记忆整合"
One full-width quality-gate rail "耐用性 → 去重 → 冲突解决 → 无虚构校验 → 更新全局". Small associated labels "仅本次不晋升" "不引入新事实" "每条一句话". End arrow returns to "状态对象" with footer "整合成功后，清空会话暂存区。"
Do not shrink this into an unreadable infographic: retain 8 clear small headings and readable text, use entire tall canvas.

## 第 4 张

Use case: ui-mockup. Generate a polished realistic Chinese educational WEBSITE LESSON DETAIL PAGE, not a presentation or infographic poster. One of five contiguous desktop long-page sections. Tall image target 1536x2560 or highest resolution available. All text sharp simplified Chinese, PingFang SC sans-serif. Carefully obey EXISTING site UI: pure white background #fff, headings #151b24, body #536070, restrained forest green #318355 / #256743, pale green #f6fbf7 panels, thin #e3e9e5 rules, 8px diagram card corners. Logical desktop width1440, outer margins40, main article1024, gutter50, right aside286 with ONLY a thin LEFT VERTICAL BORDER and 33px left padding. RIGHT SIDEBAR IS NOT A CARD: no enclosing box, no colored background, no surrounding border, no pill/button enclosing next lesson. Sidebar normal flow shown once near top each segment with main chapter outline 1-7, green small numbered circles for major chapters; nested items plain small gray decimal labels. Heading "本课大纲"; entries "1 为什么记忆很重要" "2 Agent 记忆的架构决策" "3 八个设计步骤" "4 记忆评估" "5 记忆护栏" "6 结论与下一步" "7 差旅助手案例". Then thin horizontal divider, green book icon "继续学习", dark small bold "下一课：多智能体 →" and gray description "学习多个 Agent 如何分工协作". Main article body visually dominant. Existing typography: h1 44px at logical1440, section h2 only20px, h3 16px, body14px line-height1.75, illustration title15px, diagram labels13px. DO NOT enlarge section titles to poster scale. Use decimal numbering e.g. "2.1 检索式记忆 vs 状态式记忆", NOT alternate ① or Step as chapter hierarchy. Small process badges are allowed inside figures. Top-level sections separated by fine horizontal rules and generous 30px vertical padding. Paragraphs between diagrams, realistic reading density. Diagram surfaces have subtle mint tint, thin outline icons, geometrically precise SVG-like curves and arrows, flat layering and soft shadows only on document cards. Secondary sage blue and pale amber encode scope/status, not decoration. User-provided source is a travel-memory architecture example, NOT universal product fact. All demo information fictional and non-sensitive: seat preference/meal preference/budget and generic member tier only, no real passport/ID/account details. No global navigation, no left sidebar, no browser frame, no huge hero art, no dark panels, no purple glow, no dashboards, no arbitrary charts with fake metrics. Each diagram must communicate causality and direction and be feasible in HTML/CSS/SVG. Complete all specified sections in order, do not omit bottom contents. Use provided exact Chinese text labels and readable body; avoid filler text.
PART 4/5: chapters4,5,6 in order. No repeat hero/header. Match reference image exactly in frame, typography, palette. Right sidebar plain with thin left rule.
"4. 记忆评估（Memory Evals）"
Text "记忆系统是一条提取、整合与注入的流水线。评估应覆盖端到端，并关注跨时间的变化：过去的记忆只应在相关时帮助当前任务。"
Creative large evaluation visual title "把同一个用户，放进连续的时间里测试". Horizontal timeline with three dated chat cards "会话 A：通常靠过道" → "会话 B：这次靠窗" → "会话 C：恢复默认". Beneath each small expected result chips "捕获长期偏好" "仅覆盖当前行程" "仍优先靠过道". Above a continuous green arc connecting A to C labeled "长期记忆应保留"; B small amber isolated scope bracket "临时覆盖". No invented measured scores.
Three compact rubric columns:
"蒸馏 · 捕获质量" rows "精确率" "召回率" "敏感写入拦截".
"注入 · 使用质量" rows "时效正确性" "是否覆盖当前意图" "Token 效率".
"整合 · 更新质量" rows "去重质量" "冲突解决" "是否引入新事实".
Small footer label "评估维度，不代表实测结果".
Subheading "让测试覆盖真实失败方式"
Three horizontal slim rows "策略 A/B：相关度 vs 相关度 + 时效" / "偏好漂移：模拟同一用户随时间变化" / "对抗样本：敏感写入与指令伪装".
Thin neutral metric ribbon "每百轮写入次数 / 用户覆盖偏好的频率 / 正确应用所需轮数 / 敏感写入拦截率". No fake chart data.
"5. 记忆护栏（Memory Guardrails）"
Text "记忆会进入模型上下文。错误或恶意内容一旦被反复使用，就可能持续影响后续判断。"
Main defense-in-depth diagram: left 3 small note cards "敏感信息" "伪装成系统规则" "过时偏好"; center through three large but elegant inline checkpoints "捕获检查" → "整合检查" → "注入检查"; green safe route reaches "本轮上下文". At every checkpoint a tiny amber reject branch leads to lower "拒绝 / 不晋升 / 不注入" bins. Ensure data packets never imply user memory becomes system authority. Each checkpoint has distinct icon and labels:
capture "批准字段 · 拒绝敏感载荷";
consolidate "无虚构 · 去重 · 冲突规则";
inject "相关性 · 时效 · 数据边界".
Under graphic a selected safe memory tag "通常靠过道" in a document boundary labeled "参考数据", separate from "系统规则" above it with no merge arrow.
Three short numbered body paragraphs, restrained 16px headings:
"5.1 蒸馏检查" text "限制可写字段，拦截敏感内容与指令形状载荷。"
"5.2 整合检查" text "不添加源笔记中不存在的事实，按明确规则处理冲突、重复与失效。"
"5.3 注入检查" text "筛选相关、有效的记忆，使用清晰数据边界。分隔符有帮助，但不能单独保证安全。"
Green left-rule callout "可能改变行为的记忆，要经过捕获、整合与注入三次检查。"
"6. 结论与下一步"
Text "并非每个智能体在第一天就需要长期记忆。最好的记忆系统是“窄而有意”的：针对具体任务，明确能记什么、不能记什么。"
Simple editorial decision card (not CTA), title "先问一个试金石问题" body "记住上一次交互，是否能实质性地帮助它更好或更快地完成任务？" branch "是 → 从简单记忆流水线开始" and "不明确 → 先验证收益".
Small iteration loop with four nodes and returning arrow "基础方案 → 收集真实失败 → 针对性改进 → 重跑评估". Tiny note "必要时再评估微调专用记忆模型".
Ending quote "从简单开始，严格评估，审慎演化。"
Do NOT show page footer yet: next and last part contains case study and footer.

## 第 5 张

Use case: ui-mockup. Generate a polished realistic Chinese educational WEBSITE LESSON DETAIL PAGE, not a presentation or infographic poster. One of five contiguous desktop long-page sections. Tall image target 1536x2560 or highest resolution available. All text sharp simplified Chinese, PingFang SC sans-serif. Carefully obey EXISTING site UI: pure white background #fff, headings #151b24, body #536070, restrained forest green #318355 / #256743, pale green #f6fbf7 panels, thin #e3e9e5 rules, 8px diagram card corners. Logical desktop width1440, outer margins40, main article1024, gutter50, right aside286 with ONLY a thin LEFT VERTICAL BORDER and 33px left padding. RIGHT SIDEBAR IS NOT A CARD: no enclosing box, no colored background, no surrounding border, no pill/button enclosing next lesson. Sidebar normal flow shown once near top each segment with main chapter outline 1-7, green small numbered circles for major chapters; nested items plain small gray decimal labels. Heading "本课大纲"; entries "1 为什么记忆很重要" "2 Agent 记忆的架构决策" "3 八个设计步骤" "4 记忆评估" "5 记忆护栏" "6 结论与下一步" "7 差旅助手案例". Then thin horizontal divider, green book icon "继续学习", dark small bold "下一课：多智能体 →" and gray description "学习多个 Agent 如何分工协作". Main article body visually dominant. Existing typography: h1 44px at logical1440, section h2 only20px, h3 16px, body14px line-height1.75, illustration title15px, diagram labels13px. DO NOT enlarge section titles to poster scale. Use decimal numbering e.g. "2.1 检索式记忆 vs 状态式记忆", NOT alternate ① or Step as chapter hierarchy. Small process badges are allowed inside figures. Top-level sections separated by fine horizontal rules and generous 30px vertical padding. Paragraphs between diagrams, realistic reading density. Diagram surfaces have subtle mint tint, thin outline icons, geometrically precise SVG-like curves and arrows, flat layering and soft shadows only on document cards. Secondary sage blue and pale amber encode scope/status, not decoration. User-provided source is a travel-memory architecture example, NOT universal product fact. All demo information fictional and non-sensitive: seat preference/meal preference/budget and generic member tier only, no real passport/ID/account details. No global navigation, no left sidebar, no browser frame, no huge hero art, no dark panels, no purple glow, no dashboards, no arbitrary charts with fake metrics. Each diagram must communicate causality and direction and be feasible in HTML/CSS/SVG. Complete all specified sections in order, do not omit bottom contents. Use provided exact Chinese text labels and readable body; avoid filler text.
PART 5/5: chapter7 full case study plus final standard course footer. No repeated page hero.
"7. 案例演示：差旅助手智能体"
Text "把档案、会话记忆、长期记忆和整合任务串进一次完整的差旅服务。以下为教学用虚构案例。"
Hero compact itinerary chat window showing user "帮我安排下周出差。这次想靠窗休息；以后短途优先高铁。" Beneath highlight spans: amber "这次靠窗 → 会话覆盖" and green "以后短途优先高铁 → 长期候选". This single utterance drives all following diagrams.
Large main teaching diagram is a SIX-STAGE journey with precise numbered stages, organized as TWO ROWS of three elegant windows, serpentine flow with down arrow between right edges and returning arc from final bottom-left to initial top-left. Stage1 top-left → Stage2 top-middle → Stage3 top-right ↓ Stage4 bottom-right → Stage5 bottom-middle → Stage6 bottom-left ↑ back to1.
Card1 "1 会话开始前", small closed archive dossier "状态对象", "profile：素食", "全局：通常靠过道".
Card2 "2 新会话开始", document assembly "档案 + 精选全局记忆 → 本轮上下文"; small "YAML + Markdown".
Card3 "3 会话进行中", speech quotation from hero, two candidate sticky notes with amber/green differentiation, "保存记忆工具 → 会话暂存区".
Card4 "4 上下文被修剪", older message cards fade offscreen, pinned note "本次：靠窗" reenters active window; caption "修剪后重新注入必要会话记忆".
Card5 "5 会话结束", small filter "异步整合", preserve green "短途优先高铁", hold amber "本次靠窗：不晋升"; "去重 · 冲突处理 · 无虚构".
Card6 "6 下一次运行", clean updated archive "通常靠过道" "短途优先高铁"; conversation "继续使用更新后的状态". Green loop label "跨会话积累，临时覆盖不扩散".
Make these cards large enough for all labels, arrowheads consistent and no confusing crosses. Use ample whitespace between cards. Main full article diagram height ~700 logical.
Subheading "同一句话，分成两种不同寿命的记忆"
Three-column comparison table headers "用户表达" "本次会话" "下一次会话"; row1 "这次想靠窗休息" | "覆盖座位默认值" | "不沿用本次例外"; row2 "以后短途优先高铁" | "写入候选并确认适用范围" | "整合后作为长期默认"; row3 "原有：通常靠过道" | "被本次覆盖，仍保留" | "仍是适用行程的默认值".
Subheading "把案例映射回设计步骤"
A refined 3-row reference ledger, not dense paragraphs: "状态对象与作用域 → 第 1 步" / "注入、渲染与 Hooks → 第 2、4 步" / "蒸馏与整合 → 第 3、5、6 步". Here these numbers refer clearly to case six-step diagram, label "案例中的阶段", do not falsely map earlier eight steps. Better text directly "状态对象与作用域 → 会话开始前" / "注入、渲染与 Hooks → 新会话与修剪之后" / "蒸馏与整合 → 对话进行中与会话结束". Use this wording instead of ambiguous step numbers.
Short paragraph "长期记忆提供默认理解，会话记忆承接当前变化。两者通过清晰的捕获、暂存与整合流程协作，让助手既保持本轮连贯，也能跨会话持续理解用户。"
Large restrained green left-rule statement "记住该记的，也允许用户此刻有所不同。"
Existing footer: thin horizontal separator, left file icon next to "本课产出" and small body "一份包含记忆形态、作用域、生命周期、评估与护栏的设计方案"; right compact forest green button "进入下一课 →". No marketing banners, no new sections after footer.
