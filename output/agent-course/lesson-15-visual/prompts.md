# 第十五课详情页效果图提示词

## 生成后的布局约束与修正

### 第二、三张追加约束

```text

CRITICAL HARD GRID: ALL main content from top to bottom must fit x=40 to x=1020 on the 1440px canvas. Right outline lives x=1100..1400. A subtle vertical rule at x=1060 continues the entire height to clearly reserve the right column. The area below the outline is empty white, NOT available for main content. Every section, table, chart and bottom note must share exactly the same right edge x=1020. No full-width modules below the sidebar. Reference screenshots are style references only.
```

### 第一张最终生成提示词

```text
Use case: ui-mockup. Generate a high-fidelity Chinese course-detail webpage design image for lesson 15, continuing an existing Next.js educational website. This is a realistic educational reading page with simple implementable HTML/CSS/SVG teaching diagrams, not an actual commercial monitoring application and not a marketing poster.
Target image dimensions: 1440 x 2400, desktop page at 1440 CSS px wide, tall scroll segment. Crisp readable Simplified Chinese, PingFang SC / clean sans serif. Do not place in a device or browser frame.
Reference 1 is previous lesson 8 visual: use ONLY header typography and calm white/green teaching style, NOT its boxed sidebar. Reference 2 is actual current lesson13 UI: follow its unboxed right-side outline, thin vertical divider, green numbered circles, main-column/aside ratio, linear icons and restrained section treatment. Ignore reference content. The new lesson text and layout rules below take precedence.
Preserve existing course UI: white #fff; primary green #318355, dark green #256743, pale green #edf8f0 and #f6fbf7, headings #171e2c, body #536070, dividers #e3e9e5. 8px corner radius, 1px subtle borders, no gradients, no 3D, no enormous icons, no glows, no decorative cartoon robots. Amber and red only for warning/failure semantic states. Main lesson sections on open white surface with thin horizontal separators, not each in a box. Main layout 40px side margins, main content 1024px wide, 50px gutter, 286px right aside including 33px left padding with fine left border. Main heading 44px, body around14px with 1.72 lineheight, subsection18px, section22px. Comfortable whitespace and legible copy; never crush text into tiny illegible paragraphs.
RIGHT SIDEBAR starts at page top and occupies only upper area, blank white underneath. Heading "本课大纲". FOUR top-level items with green numbered circles, indented subsections in smaller muted gray text:
1 为什么需要可观测性
  1.1 监控agent执行过程 定位问题
  1.2 区分运行成功与任务成功
  1.3 寻找优化空间 支持持续改进
2 需要记录什么
  2.1 记录执行链路
  2.2 保留关键字段
  2.3 汇总核心指标
  2.4 控制监控范围
3 有哪些可用方案
  3.1 LangSmith
  3.2 Langfuse
  3.3 Arize Phoenix
  3.4 Datadog
  3.5 开源工具自建
4 如何开始
Below outline a horizontal separator then a small green outline book icon with "继续学习"; link "下一课：搭建评测飞轮 →"; muted explanation "用样本、指标与评测流程持续改进 Agent。". No enclosing sidebar card, no shadow, no app sidebar menu.
Content is source-authored course copy. Keep exact supplied title/subtitle/section headings and conceptual meaning. Diagrams may compact explanations into accurate labels, but do not invent new sections or commercial features. All numeric mockups must be labeled "教学示例 · 模拟数据". Trace shows only observable operations, not private model thoughts. Dates unnecessary, do not show dates. Use real text labels rather than dense lorem ipsum. Provide one continuous page segment image, no collage and no alternate designs.
THIS IMAGE IS THE FIRST SCROLL SEGMENT, with complete header and sections 1 through 2.1. It must end after 2.1 and NOT include sections 2.2 onwards.
Header at top left: back arrow "返回课程目录"; big "第 15 课  建立可观测性"; subtitle EXACT "无法监控 就无法管理"; muted metadata "预计 15 分钟 · 系列：从 0 到 1 设计一个 Agent". Below thin line, green small star/circle icon "本课要点" and three short bullet lines: "记录执行过程，定位问题与优化空间" / "关联链路、关键字段与核心指标" / "选择适合业务的观测方案". No colored hero banner.
Intro two paragraphs: "Agent 上线以后，我们需要知道：它是否完成了任务，执行过程是否合理，哪里容易出错，以及时间和成本花在了什么地方。" and "建立可观测性，就是记录和分析 Agent 运行时的信息，让这些问题有据可查。"
Section "1. 为什么需要可观测性"
Subsection "1.1 监控agent执行过程 定位问题". Short explanatory text: "Agent 的执行路径可能变化。只保存用户的问题和最终回答，往往不足以解释问题发生在哪里。"
Creative teaching visual: a restrained miniature request investigation view. Top an input bubble "用户：这件商品还能退吗？". A linked horizontal sequence with four stages "查询订单 → 检索规则 → 模型判断 → 返回回答". Underneath align four small cause notes with corresponding stage: "签收时间错误" / "规则已经失效" / "判断错误" / "工具失败仍给出确定回答". Thin lines, simple icons, selected retrieval stage pale amber. Bottom caption "不同原因，需要不同的改进方法。" This is a pedagogical list of POSSIBLE alternative causes, clearly label "可能的问题", not a real trace with simultaneous errors.
Subsection "1.2 区分运行成功与任务成功". Body "接口正常返回、程序没有报错，不能证明用户的问题已经解决。"
Visual: one thin bordered two-column comparison, no nested cards. Left green check "运行结果：成功" with "接口正常 · 无超时 · 无异常"; right amber warning "业务结果：失败" with "错误承诺可以退款". Bottom shared label "同一次客服请求，两个不同的判断维度". Then plain sentence "业务结果需要结合规则、业务状态、人工检查或评测判断。"
Subsection "1.3 寻找优化空间 支持持续改进". Text "比较版本变化前后的表现，确定优先改进的环节。" A simple 3-row comparison "模型版本 → 响应耗时" / "提示词版本 → 工具调用次数" / "任务类型 → 失败比例", arrows to tiny schematic bars, caption "按版本与任务类型比较".
Section "2. 需要记录什么"
Subsection "2.1 记录执行链路". Three aligned definition cells in a single row: "Trace / 一次请求的完整链路"; "Span / 链路中的执行步骤"; "Log / 某个时刻发生的事件".
MAIN VISUAL: mini trace explorer approx900x440, light mode, compact realistic monitoring UI. Label "退货咨询 · Trace 详情", small "教学示例 · 模拟数据". Header tags "Trace ID: tr_demo_015" and "总耗时 4.8s". Left indentation tree rows "退货咨询" root; "模型决定查询订单 0.6s"; "订单查询 0.8s"; "检索退货规则 0.5s" amber selected; "生成判断和解释 2.7s"; "返回用户 0.2s". Middle simple green horizontal waterfall bars against 0s,1s,2s,3s,4s,4.8s axis, timings consistent. Right selected step inspector (within MAIN visual only, not right course outline) "检索退货规则" fields "输入：商品类别、签收时间", "输出：规则文档 v1", amber "提示：规则已过期"; small event row "Log  检索完成". Visual must show parent-child indent and selected step detail, not just 6 cards in a row.
Below tiny teaching notes "同一会话中的多次请求，通过会话标识关联。" and "执行记录呈现系统实际发生的操作，不等于模型内部推理的完整记录。"
Maintain diagram/p text balance with readable Chinese.
CRITICAL HARD GRID: ALL main content from top to bottom must fit x=40 to x=1020 on the 1440px canvas. Right outline lives x=1100..1400. A subtle vertical rule at x=1060 continues the entire height to clearly reserve the right column. The area below the outline is empty white, NOT available for main content. Every section, table, chart and bottom note must share exactly the same right edge x=1020. No full-width modules below the sidebar. Reference screenshots are style references only.
Further mandatory: 本课要点 is on a white background with only a thin divider below, NOT a green background box. Fit all diagrams including section2.1 in the left column EXACTLY like the grid of supplied middle-segment reference. Trace diagram should have waterfall on top and selected-step inspector beneath, not a side-by-side inspector that forces a full-width layout. The RIGHT COLUMN is reserved full height. First reference is the accepted MIDDLE segment of this very same lesson; preserve its grid, font density, and sidebar for this new FIRST segment. For 1.3 show three compact rows of labels with paired short bars, label 教学示例; no decorative chart occupying large space. Keep all supplied section headings accurate and the entire first-segment content included.
```

第一张最终版本使用第二张已生成的效果图与第十三课实际截图作为视觉参考。


生成方式：内置 image_gen。三张图为同一页面的连续阅读片段，不是三种备选设计。

文案来源：`/Users/gaojiaxuan/Desktop/第十五课文案.md`。
视觉来源：`docs/agent-course/design.md`、当前 AgentLessonShell 与 CSS Module、第八课视觉稿与第十三课实际页面截图。

## 第 1 张

```text
Use case: ui-mockup. Generate a high-fidelity Chinese course-detail webpage design image for lesson 15, continuing an existing Next.js educational website. This is a realistic educational reading page with simple implementable HTML/CSS/SVG teaching diagrams, not an actual commercial monitoring application and not a marketing poster.
Target image dimensions: 1440 x 2400, desktop page at 1440 CSS px wide, tall scroll segment. Crisp readable Simplified Chinese, PingFang SC / clean sans serif. Do not place in a device or browser frame.
Reference 1 is previous lesson 8 visual: use ONLY header typography and calm white/green teaching style, NOT its boxed sidebar. Reference 2 is actual current lesson13 UI: follow its unboxed right-side outline, thin vertical divider, green numbered circles, main-column/aside ratio, linear icons and restrained section treatment. Ignore reference content. The new lesson text and layout rules below take precedence.
Preserve existing course UI: white #fff; primary green #318355, dark green #256743, pale green #edf8f0 and #f6fbf7, headings #171e2c, body #536070, dividers #e3e9e5. 8px corner radius, 1px subtle borders, no gradients, no 3D, no enormous icons, no glows, no decorative cartoon robots. Amber and red only for warning/failure semantic states. Main lesson sections on open white surface with thin horizontal separators, not each in a box. Main layout 40px side margins, main content 1024px wide, 50px gutter, 286px right aside including 33px left padding with fine left border. Main heading 44px, body around14px with 1.72 lineheight, subsection18px, section22px. Comfortable whitespace and legible copy; never crush text into tiny illegible paragraphs.
RIGHT SIDEBAR starts at page top and occupies only upper area, blank white underneath. Heading "本课大纲". FOUR top-level items with green numbered circles, indented subsections in smaller muted gray text:
1 为什么需要可观测性
  1.1 监控agent执行过程 定位问题
  1.2 区分运行成功与任务成功
  1.3 寻找优化空间 支持持续改进
2 需要记录什么
  2.1 记录执行链路
  2.2 保留关键字段
  2.3 汇总核心指标
  2.4 控制监控范围
3 有哪些可用方案
  3.1 LangSmith
  3.2 Langfuse
  3.3 Arize Phoenix
  3.4 Datadog
  3.5 开源工具自建
4 如何开始
Below outline a horizontal separator then a small green outline book icon with "继续学习"; link "下一课：搭建评测飞轮 →"; muted explanation "用样本、指标与评测流程持续改进 Agent。". No enclosing sidebar card, no shadow, no app sidebar menu.
Content is source-authored course copy. Keep exact supplied title/subtitle/section headings and conceptual meaning. Diagrams may compact explanations into accurate labels, but do not invent new sections or commercial features. All numeric mockups must be labeled "教学示例 · 模拟数据". Trace shows only observable operations, not private model thoughts. Dates unnecessary, do not show dates. Use real text labels rather than dense lorem ipsum. Provide one continuous page segment image, no collage and no alternate designs.
THIS IMAGE IS THE FIRST SCROLL SEGMENT, with complete header and sections 1 through 2.1. It must end after 2.1 and NOT include sections 2.2 onwards.
Header at top left: back arrow "返回课程目录"; big "第 15 课  建立可观测性"; subtitle EXACT "无法监控 就无法管理"; muted metadata "预计 15 分钟 · 系列：从 0 到 1 设计一个 Agent". Below thin line, green small star/circle icon "本课要点" and three short bullet lines: "记录执行过程，定位问题与优化空间" / "关联链路、关键字段与核心指标" / "选择适合业务的观测方案". No colored hero banner.
Intro two paragraphs: "Agent 上线以后，我们需要知道：它是否完成了任务，执行过程是否合理，哪里容易出错，以及时间和成本花在了什么地方。" and "建立可观测性，就是记录和分析 Agent 运行时的信息，让这些问题有据可查。"
Section "1. 为什么需要可观测性"
Subsection "1.1 监控agent执行过程 定位问题". Short explanatory text: "Agent 的执行路径可能变化。只保存用户的问题和最终回答，往往不足以解释问题发生在哪里。"
Creative teaching visual: a restrained miniature request investigation view. Top an input bubble "用户：这件商品还能退吗？". A linked horizontal sequence with four stages "查询订单 → 检索规则 → 模型判断 → 返回回答". Underneath align four small cause notes with corresponding stage: "签收时间错误" / "规则已经失效" / "判断错误" / "工具失败仍给出确定回答". Thin lines, simple icons, selected retrieval stage pale amber. Bottom caption "不同原因，需要不同的改进方法。" This is a pedagogical list of POSSIBLE alternative causes, clearly label "可能的问题", not a real trace with simultaneous errors.
Subsection "1.2 区分运行成功与任务成功". Body "接口正常返回、程序没有报错，不能证明用户的问题已经解决。"
Visual: one thin bordered two-column comparison, no nested cards. Left green check "运行结果：成功" with "接口正常 · 无超时 · 无异常"; right amber warning "业务结果：失败" with "错误承诺可以退款". Bottom shared label "同一次客服请求，两个不同的判断维度". Then plain sentence "业务结果需要结合规则、业务状态、人工检查或评测判断。"
Subsection "1.3 寻找优化空间 支持持续改进". Text "比较版本变化前后的表现，确定优先改进的环节。" A simple 3-row comparison "模型版本 → 响应耗时" / "提示词版本 → 工具调用次数" / "任务类型 → 失败比例", arrows to tiny schematic bars, caption "按版本与任务类型比较".
Section "2. 需要记录什么"
Subsection "2.1 记录执行链路". Three aligned definition cells in a single row: "Trace / 一次请求的完整链路"; "Span / 链路中的执行步骤"; "Log / 某个时刻发生的事件".
MAIN VISUAL: mini trace explorer approx900x440, light mode, compact realistic monitoring UI. Label "退货咨询 · Trace 详情", small "教学示例 · 模拟数据". Header tags "Trace ID: tr_demo_015" and "总耗时 4.8s". Left indentation tree rows "退货咨询" root; "模型决定查询订单 0.6s"; "订单查询 0.8s"; "检索退货规则 0.5s" amber selected; "生成判断和解释 2.7s"; "返回用户 0.2s". Middle simple green horizontal waterfall bars against 0s,1s,2s,3s,4s,4.8s axis, timings consistent. Right selected step inspector (within MAIN visual only, not right course outline) "检索退货规则" fields "输入：商品类别、签收时间", "输出：规则文档 v1", amber "提示：规则已过期"; small event row "Log  检索完成". Visual must show parent-child indent and selected step detail, not just 6 cards in a row.
Below tiny teaching notes "同一会话中的多次请求，通过会话标识关联。" and "执行记录呈现系统实际发生的操作，不等于模型内部推理的完整记录。"
Maintain diagram/p text balance with readable Chinese.
```

## 第 2 张

```text
Use case: ui-mockup. Generate a high-fidelity Chinese course-detail webpage design image for lesson 15, continuing an existing Next.js educational website. This is a realistic educational reading page with simple implementable HTML/CSS/SVG teaching diagrams, not an actual commercial monitoring application and not a marketing poster.
Target image dimensions: 1440 x 2400, desktop page at 1440 CSS px wide, tall scroll segment. Crisp readable Simplified Chinese, PingFang SC / clean sans serif. Do not place in a device or browser frame.
Reference 1 is previous lesson 8 visual: use ONLY header typography and calm white/green teaching style, NOT its boxed sidebar. Reference 2 is actual current lesson13 UI: follow its unboxed right-side outline, thin vertical divider, green numbered circles, main-column/aside ratio, linear icons and restrained section treatment. Ignore reference content. The new lesson text and layout rules below take precedence.
Preserve existing course UI: white #fff; primary green #318355, dark green #256743, pale green #edf8f0 and #f6fbf7, headings #171e2c, body #536070, dividers #e3e9e5. 8px corner radius, 1px subtle borders, no gradients, no 3D, no enormous icons, no glows, no decorative cartoon robots. Amber and red only for warning/failure semantic states. Main lesson sections on open white surface with thin horizontal separators, not each in a box. Main layout 40px side margins, main content 1024px wide, 50px gutter, 286px right aside including 33px left padding with fine left border. Main heading 44px, body around14px with 1.72 lineheight, subsection18px, section22px. Comfortable whitespace and legible copy; never crush text into tiny illegible paragraphs.
RIGHT SIDEBAR starts at page top and occupies only upper area, blank white underneath. Heading "本课大纲". FOUR top-level items with green numbered circles, indented subsections in smaller muted gray text:
1 为什么需要可观测性
  1.1 监控agent执行过程 定位问题
  1.2 区分运行成功与任务成功
  1.3 寻找优化空间 支持持续改进
2 需要记录什么
  2.1 记录执行链路
  2.2 保留关键字段
  2.3 汇总核心指标
  2.4 控制监控范围
3 有哪些可用方案
  3.1 LangSmith
  3.2 Langfuse
  3.3 Arize Phoenix
  3.4 Datadog
  3.5 开源工具自建
4 如何开始
Below outline a horizontal separator then a small green outline book icon with "继续学习"; link "下一课：搭建评测飞轮 →"; muted explanation "用样本、指标与评测流程持续改进 Agent。". No enclosing sidebar card, no shadow, no app sidebar menu.
Content is source-authored course copy. Keep exact supplied title/subtitle/section headings and conceptual meaning. Diagrams may compact explanations into accurate labels, but do not invent new sections or commercial features. All numeric mockups must be labeled "教学示例 · 模拟数据". Trace shows only observable operations, not private model thoughts. Dates unnecessary, do not show dates. Use real text labels rather than dense lorem ipsum. Provide one continuous page segment image, no collage and no alternate designs.
THIS IMAGE IS MIDDLE SCROLL SEGMENT, covers only sections 2.2, 2.3, 2.4 of same lesson. Do NOT repeat main lesson header/back link/intro or show end-of-course footer. Start at "2.2 保留关键字段", aside remains sticky at top, section2 active. Use sufficient vertical whitespace for this scroll segment, don't scale type huge to fill.
2.2 保留关键字段
"下面是一份适合起步的记录清单，可根据业务增减。"
Render a clean readable 7-row table with three columns "记录对象 | 建议记录的信息 | 主要用途". Pale green table header, thin horizontal separators. Rows:
任务与会话 | 任务标识、会话标识、任务类型、起止时间 | 关联一次运行与多轮对话
版本与配置 | 应用、模型、提示词版本及关键参数 | 比较版本，排查变更影响
模型调用 | 消息与上下文、输出、Token、耗时 | 检查输入与输出
工具调用 | 工具名称、参数、结果、错误、重试 | 判断选择与执行是否正确
检索与记忆 | 资料标识与版本、上下文片段、记忆变化 | 排查缺失、过期或错误信息
执行控制 | 循环、分工、权限、审批、转人工、停止原因 | 检查执行边界
最终结果 | 回答与操作结果、完成状态、反馈与评测 | 判断效果，积累样本
Below pale green quiet note "版本信息不要遗漏" and body "不知道当时使用了哪个版本，就很难解释为什么以前正常、现在却出现问题。"
Add short "自动接入覆盖部分模型与框架调用，业务审批和自定义工具等仍可能需要补充记录。"

2.3 汇总核心指标
"单次记录帮助排查具体问题，汇总指标帮助判断整体表现。"
Main creative visual: elegant embedded mock "Agent 运行概览" light observability dashboard with label "教学示例 · 模拟数据", small top filters "任务类型：退货咨询" "版本：全部". No extra dashboard navigation. Four equal metric tiles in single row with simple sparklines:
"效果 / 任务成功率 / 92.4%";
"速度 / P95 总耗时 / 8.6s";
"成本 / 单次任务成本 / ¥0.032";
"稳定性 / 工具错误率 / 1.8%".
Below tiles one wide line graph titled "任务成功率与版本变化", green success rate line across 6 points with a vertical dashed "提示词版本更新" marker, percentages y-axis90%,95%,100% and x-axis "第1批" through "第6批"; small amber point "待排查", understated. To right within the panel a simple stacked horizontal bar chart "耗时分布" with four categories "模型调用 / 工具执行 / 系统处理 / 等待审批", waiting hatch fill not conflated with active system processing. Below panel a 4-row grouped legend "效果：正确率、满意度、人工接管率" / "速度：首次响应、任务总耗时、步骤耗时" / "成本：模型与工具费用、Token 用量" / "稳定性：错误、超时、重试、执行上限".
Under dashboard create a simple single-line percentile teaching diagram titled "P95 怎么看". 20 small task-duration marks, 19 green and final amber, bracket under first19 "约95%的请求不超过此耗时"; label threshold "8.6s". Plain note "系统处理时间与等待用户、等待审批的时间分开统计。"
Plain important note "先定义成功标准，再计算任务成功率。" and "人工接管率上升，也可能是正确识别了更多高风险任务。"

2.4 控制监控范围
Subheading content visual 2 side-by-side calm sections without heavy panels:
left "内容与权限" three rows "敏感内容 → 脱敏保存" / "密码与密钥 → 不进入日志" / "访问与保留 → 明确人员与期限";
right "采样与保留" pipeline "全部请求" split "普通请求：采样保留" and "失败 / 超时 / 重要操作：优先保留". Use tiny green/amber event rows to illustrate selection not complicated flow.
Bottom pale amber note "整体成功率和错误率，应使用完整计数或经过正确校正的数据。" second line "不要把偏向保留失败请求的样本，当成全部流量。"
End after section2.4 with white breathing room.
```

## 第 3 张

```text
Use case: ui-mockup. Generate a high-fidelity Chinese course-detail webpage design image for lesson 15, continuing an existing Next.js educational website. This is a realistic educational reading page with simple implementable HTML/CSS/SVG teaching diagrams, not an actual commercial monitoring application and not a marketing poster.
Target image dimensions: 1440 x 2400, desktop page at 1440 CSS px wide, tall scroll segment. Crisp readable Simplified Chinese, PingFang SC / clean sans serif. Do not place in a device or browser frame.
Reference 1 is previous lesson 8 visual: use ONLY header typography and calm white/green teaching style, NOT its boxed sidebar. Reference 2 is actual current lesson13 UI: follow its unboxed right-side outline, thin vertical divider, green numbered circles, main-column/aside ratio, linear icons and restrained section treatment. Ignore reference content. The new lesson text and layout rules below take precedence.
Preserve existing course UI: white #fff; primary green #318355, dark green #256743, pale green #edf8f0 and #f6fbf7, headings #171e2c, body #536070, dividers #e3e9e5. 8px corner radius, 1px subtle borders, no gradients, no 3D, no enormous icons, no glows, no decorative cartoon robots. Amber and red only for warning/failure semantic states. Main lesson sections on open white surface with thin horizontal separators, not each in a box. Main layout 40px side margins, main content 1024px wide, 50px gutter, 286px right aside including 33px left padding with fine left border. Main heading 44px, body around14px with 1.72 lineheight, subsection18px, section22px. Comfortable whitespace and legible copy; never crush text into tiny illegible paragraphs.
RIGHT SIDEBAR starts at page top and occupies only upper area, blank white underneath. Heading "本课大纲". FOUR top-level items with green numbered circles, indented subsections in smaller muted gray text:
1 为什么需要可观测性
  1.1 监控agent执行过程 定位问题
  1.2 区分运行成功与任务成功
  1.3 寻找优化空间 支持持续改进
2 需要记录什么
  2.1 记录执行链路
  2.2 保留关键字段
  2.3 汇总核心指标
  2.4 控制监控范围
3 有哪些可用方案
  3.1 LangSmith
  3.2 Langfuse
  3.3 Arize Phoenix
  3.4 Datadog
  3.5 开源工具自建
4 如何开始
Below outline a horizontal separator then a small green outline book icon with "继续学习"; link "下一课：搭建评测飞轮 →"; muted explanation "用样本、指标与评测流程持续改进 Agent。". No enclosing sidebar card, no shadow, no app sidebar menu.
Content is source-authored course copy. Keep exact supplied title/subtitle/section headings and conceptual meaning. Diagrams may compact explanations into accurate labels, but do not invent new sections or commercial features. All numeric mockups must be labeled "教学示例 · 模拟数据". Trace shows only observable operations, not private model thoughts. Dates unnecessary, do not show dates. Use real text labels rather than dense lorem ipsum. Provide one continuous page segment image, no collage and no alternate designs.
THIS IMAGE IS FINAL SCROLL SEGMENT, covers sections3 and4, then lesson footer. Do NOT repeat the course main title/header. Start with "3. 有哪些可用方案", aside sticky at top, section3 active.
Opening short paragraph "不同方案的侧重点不同，需要结合现有技术、部署要求和维护能力选择。"
Present FIVE vertically stacked tidy editorial product rows. Each row has an 18px numbered heading, muted one-line description, and an aligned "特点" and "取舍" comparison. No invented logos, use restrained generic line icons, named product in black. Small "官方文档 ↗" green link on right.
"3.1 LangSmith"
intro "调用链路、性能监控、反馈标注与评测"
特点 "支持 LangChain、LangGraph 及其他框架；运行记录与评测衔接。"
取舍 "商业服务需评估费用；自托管属于企业方案附加选项。"
"3.2 Langfuse"
intro "开源平台，支持云服务与自行部署"
特点 "链路追踪、成本分析、提示词管理和评测集中管理。"
取舍 "自部署需维护存储、备份与升级；部分功能需要商业许可。"
"3.3 Arize Phoenix"
intro "链路追踪、评测、提示词实验与数据集"
特点 "适合检索分析、回答质量检查和实验比较；可自行部署。"
取舍 "仍需维护服务与定义业务指标；采用 ELv2 许可证。"
"3.4 Datadog"
intro "Agent 观测与应用性能监控关联"
特点 "联合排查模型、业务接口与后端服务的问题。"
取舍 "商业平台；按采集规模与功能评估接入和使用成本。"
"3.5 开源工具自建"
intro "按自身需求组合采集、存储、查询与展示工具"
Instead of just list, show simple architecture strip "Agent → OpenTelemetry → [Tempo 链路 / Prometheus 指标 / Loki 日志] → Grafana 看板". Correct three parallel backend branches into dashboard, NOT sequential all3. Thin green connectors, pale simple rectangles. Note "OpenTelemetry 负责采集与传输，不提供完整存储和分析界面。"
Below two plain lines "特点：复用现有监控系统，按需调整数据和展示。" "取舍：提示词、费用计算与质量评测等能力需要额外接入或开发。"
No rating stars, ranking, recommended badges, vendor screenshots or fabricated pricing.

Section "4. 如何开始"
"先列举出最核心的待观测信息，快速建立观测平台，再根据业务需要逐步扩展。"
Small baseline checklist on pale green surface titled "退货咨询：第一版至少看见什么" with 6 items in two rows, "用户问题" "订单与规则" "模型与提示词版本" "最终回答" "耗时" "成本".
Main four-step horizontal numbered track with simple icons, concise explanations under each:
"01 建立看板" "成功率、耗时、成本与错误率"
"02 设置告警" "触发条件明确，处理人员明确"
"03 定位问题" "从异常指标进入具体链路"
"04 建立测试集" "将典型失败案例加入评测集"
At bottom one thin arrow from fourth step curling back below to first, label "验证改进后继续观察". All four steps are equal, do not write 三件事.
Final short paragraph "可观测性提供运行证据，评测依据标准判断质量。把线上问题转化为测试样本，检查后续修改是否有效。"
Footer must follow course shell: horizontal line; outline document icon "本课产出" and muted "一份观测方案：关键步骤与字段、核心指标、平台或自建方案。" To right green button "进入下一课 →".
Clean complete bottom margin.
```
