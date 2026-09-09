# 内置 image_gen 提示词

## 下篇

Use case: ui-mockup. Create a high-fidelity Chinese educational website detail page, production-ready visual design reference, NOT a poster. This is one of THREE continuous vertical segments of lesson 8. Render a tall 1536x2560 image with crisp readable Chinese. Existing site rules must be obeyed: pure white #fff background; dark navy #151b24 headings, gray #536070 body, forest green #318355 and #256743 accent, pale green #f6fbf7 panel fills, fine #e3e9e5 borders, 8px corners, PingFang SC clean sans serif. 1440px logical desktop, 40px outer margins, 1024px main content, 50px gutter, 286px right TOC. Keep consistent width throughout. Header title 44px logical, body 16px logical line height 1.8, sections 24px, diagrams labeled 15px. Editorial document layout with paragraphs BETWEEN diagrams, ample but not wasteful whitespace. Thin line icons. No global navigation, no browser chrome, no device mockups, no side-left menu, no dark large blocks, no purple gradients. Creative visualizations are precise flat vector-like UI components with subtle depth/soft shadows, not stock illustrations or cartoon characters. Main column diagrams must stay within article width. Right sidebar near top: "本课大纲", with "1 上下文窗口大小", "2 上下文由什么组成", "3 如何控制上下文" and indented "硬截断 / 压缩 / 历史信息检索", "4 不同产品是怎么做的". Below thin divider "继续学习", "下一课：管理记忆 →". Right column lower down mostly white. The four numbered content sections occur ONCE across the 3 segments. Preserve supplied exact Chinese headings and key statements; diagram labels concise and legible. No lorem ipsum. Realistic enough for later frontend implementation.
SEGMENT 3 OF 3: final continuous article portion, start at "2）压缩" (subsection of section 3), no repeat page title. Match reference image exactly in visual language, main width, sidebar. Tall detailed desktop page at highest available resolution, ample vertical room, target 1536x2816. Right sidebar section 3 highlighted initially. Do not remove lower sections to make fit.
Subheading "2）压缩"
Text "内容太多以后，把历史信息总结一下。原来有 30,000 Token 的历史信息，可以提炼成 3,000 Token，再带着这份总结继续执行任务。"
Large creative visual centerpiece "把一桌材料，整理成一页会议纪要". Left stack of 8 visible detailed paper sheets in a translucent window, tags "历史对话" "工具日志" "用户要求" "关键决策"; large caption "30,000 Token". Gentle converging green curves and a narrow compression bottleneck lead to one clean structured green outlined summary page on right labelled "3,000 Token", clearly listing "目标与约束" "关键决策" "已完成事项" "待办与阻碍". Behind summary only 1-2 pale outlines. Green labels preserved versus faded expendable detail. Below ratio "体积缩小，关键状态继续传递" and footnote "教学示例，压缩可能丢失细节". No mechanical photoreal compressor; elegant information flow.
Text "像一场很长的会议进行到一半，把前半场的结论整理成一页会议纪要，接下来带着这页纪要继续讨论。"
Two equal columns:
"固定压缩" text "当前上下文使用量达到 90%，就进行一次压缩。" slim 0%-100% usage gauge 90% threshold dotted line labelled "90% · 示例阈值", downward arrow second much shorter bar "压缩后继续". Footnote "阈值由产品策略决定".
"动态压缩" text "根据任务复杂度与信息类型，决定保留多少细节。" three rows with visual retention indicators: "用户要求 · 尽量完整保留" all 5 green blocks; "关键决策 · 保留依据" 4 green blocks; "工具日志 · 提炼结果" 2 green blocks. caption "复杂任务保留更多细节，简单任务提炼结论".
Pullquote "哪些信息可以忘，哪些信息绝对不能忘。"
Subheading "3）历史信息检索"
Text "不把所有历史信息一直放在上下文里，先存起来，需要的时候再找回来。"
Large elegant archive-to-window diagram: left archive drawers icon and stacked past records "外部历史存储" "已保存的几百轮对话"; right bordered active context window with recent 3 conversation cards "当前上下文". Inside active window small bubble "这个问题之前好像聊过". A numbered arrow going LEFT from current window to archive labeled "① 搜索相关历史", one highlighted record pulled from archive to center labelled "相关片段", arrow RIGHT into current window labeled "② 回填当前上下文", right bottom green model action "③ 继续推理". Arrows direction must be correct. Archive visually large but finite current window small, demonstrate storage not model window expansion. Caption "历史可以留在外部，单次模型窗口仍然有限。"
Compact five-item limitations arranged two-column simple bullets: "搜索需要额外时间" "可能搜不到关键信息" "可能召回无用内容" "可能缺少当时语境" "检索结果也占用窗口".
Closing text "历史检索解决了「存不下」的问题，却又带来了「能不能准确找回来」的问题。"
SECTION "4、不同产品是怎么做的？"
Text "现实中的 Agent 产品，通常会组合使用上面几种方法，具体实现也会不断变化。"
Restrained table, 3 columns "产品" "上下文处理" "阅读提示":
"DeepSeek 网页版" | "具体策略待核实" | "不将滑动窗口视为已证实实现"
"Codex" | "自动压缩后继续执行" | "窗口与阈值依模型、配置而定"
"Claude Code" | "压缩历史，保留重要状态" | "200K / 1M 等，依模型与配置而定"
Small reference links below table "参考：OpenAI Agent Loop ↗   Claude Code 官方文档 ↗"; tiny note "产品机制以当前官方说明为准".
Final large but tasteful green left-rule conclusion "管理上下文窗口，就是管理注意力。" text "Agent 每一步能看到什么、忘掉什么、压缩什么、什么时候重新找回来，都会直接影响它接下来的判断。"
Existing course footer thin border top, left file icon with "本课产出" and "明确上下文组成、预算与控制策略"; right solid green "进入下一课 →". No invented quizzes, no pricing, no login.

## 上篇

Use case: ui-mockup. Create a high-fidelity Chinese educational website detail page, production-ready visual design reference, NOT a poster. This is one of THREE continuous vertical segments of lesson 8. Render a tall 1536x2560 image with crisp readable Chinese. Existing site rules must be obeyed: pure white #fff background; dark navy #151b24 headings, gray #536070 body, forest green #318355 and #256743 accent, pale green #f6fbf7 panel fills, fine #e3e9e5 borders, 8px corners, PingFang SC clean sans serif. 1440px logical desktop, 40px outer margins, 1024px main content, 50px gutter, 286px right TOC. Keep consistent width throughout. Header title 44px logical, body 16px logical line height 1.8, sections 24px, diagrams labeled 15px. Editorial document layout with paragraphs BETWEEN diagrams, ample but not wasteful whitespace. Thin line icons. No global navigation, no browser chrome, no device mockups, no side-left menu, no dark large blocks, no purple gradients. Creative visualizations are precise flat vector-like UI components with subtle depth/soft shadows, not stock illustrations or cartoon characters. Main column diagrams must stay within article width. Right sidebar near top: "本课大纲", with "1 上下文窗口大小", "2 上下文由什么组成", "3 如何控制上下文" and indented "硬截断 / 压缩 / 历史信息检索", "4 不同产品是怎么做的". Below thin divider "继续学习", "下一课：管理记忆 →". Right column lower down mostly white. The four numbered content sections occur ONCE across the 3 segments. Preserve supplied exact Chinese headings and key statements; diagram labels concise and legible. No lorem ipsum. Realistic enough for later frontend implementation.
SEGMENT 1 OF 3: TOP OF PAGE, include header, introduction, complete section 1. All text and diagrams below fit within this single tall image.
Header back link "← 返回课程目录"; large "第 8 课  管理上下文窗口"; subtitle "管理上下文窗口，就是管理注意力。"; small metadata "系列：从 0 到 1 设计一个 Agent".
Below thin divider "✦ 本课要点": "理解模型窗口与 Agent 上下文预算的区别" / "看懂上下文如何组装，以及截断、压缩与检索" / "决定这一轮到底应该让模型看到什么".
INTRO: "当我们向 ChatGPT、Codex、豆包、WorkBuddy 这些 AI 应用发出一句请求时，模型真正收到的内容，通常远远不止我们刚刚输入的这一句话。"
Primary editorial diagram title "一句请求背后，是一整张工作台". A large pale-green subtle dotted-grid flat desk/window surface: left a stack of six slim labelled sheets "系统提示词" "可用工具" "历史对话" "工具结果" "任务状态" "最新请求". Arrange sheets elegantly converging with hairline arrows into a center focused rectangular desktop window. In the focal window a bright contract document labelled "当前任务：审核合同", surrounding unrelated history sheets faded OUTSIDE the spotlight. Window caption "上下文 Context". Right small arrow to "Agent" and "判断 → 行动". Distinguish a visual spotlight that emphasizes relevant files without claiming automatic perfect filtering. Under figure "桌面上的资料越多，不一定越好。"
Paragraph "这些信息放在一起，就组成了当前的上下文（Context）。Agent 会基于这些上下文，判断自己现在应该做什么、调用什么工具、下一步怎么行动。"
Paragraph "如果当前任务需要的是一份合同，但桌子上同时堆着几十份历史对话、工具说明、旧任务记录和无关材料，Agent 就需要从一大堆信息里找到真正重要的东西。"
Green left-rule pullquote "管理上下文，本质上就是管理 Agent 的注意力。"
SECTION TITLE "1、上下文窗口大小".
Subheading "模型自己的上下文窗口".
Text "模型一次能够看到的信息是有限的。这个限制通常被称为上下文窗口（Context Window）。你可以把它理解成模型的「工作台大小」。工作台再大，也不可能无限大。"
Text "上下文越长，需要计算和保存的信息也越多，会影响显存、计算量和推理速度。不同模型支持的 Token 上限也不同。"
Creative capacity diagram: outlined horizontal container title "128K Token 窗口 · 教学示例", filled green left segment "输入 96K", hatched pale-green right segment "预留输出 32K", widths exactly 75%/25%, bracket total 128K; below bold "输入 + 输出，共同占用窗口". Caption "128K 资料塞满窗口后，就没有空间继续生成。"
Subheading "智能体自己的上下文窗口".
Text "用户的请求理论上可以不断延续，但模型的窗口有限。Agent 因此需要管理自己的上下文预算，在成本、速度、任务连续性与信息干扰之间做取舍。"
Nested rectangle graphic outer "模型容量上限", inner green outline "Agent 本轮预算" containing slim segments "固定指令" "任务资料" "近期历史", outer remaining hatched "输出与安全余量". This is a second separate diagram rather than mixing two numeric models. Caption "产品使用预算，不等于模型容量上限。"
Two small restrained product rows: "Codex：窗口与压缩阈值依模型及配置而定" and "Claude Code：200K / 1M 等，依模型与配置而定". Tiny footnote "以当前产品与官方文档为准".
Ending highlighted sentence "这一轮到底应该让模型看到什么。"


## 中篇

Use case: ui-mockup. Create a high-fidelity Chinese educational website detail page, production-ready visual design reference, NOT a poster. This is one of THREE continuous vertical segments of lesson 8. Render a tall 1536x2560 image with crisp readable Chinese. Existing site rules must be obeyed: pure white #fff background; dark navy #151b24 headings, gray #536070 body, forest green #318355 and #256743 accent, pale green #f6fbf7 panel fills, fine #e3e9e5 borders, 8px corners, PingFang SC clean sans serif. 1440px logical desktop, 40px outer margins, 1024px main content, 50px gutter, 286px right TOC. Keep consistent width throughout. Header title 44px logical, body 16px logical line height 1.8, sections 24px, diagrams labeled 15px. Editorial document layout with paragraphs BETWEEN diagrams, ample but not wasteful whitespace. Thin line icons. No global navigation, no browser chrome, no device mockups, no side-left menu, no dark large blocks, no purple gradients. Creative visualizations are precise flat vector-like UI components with subtle depth/soft shadows, not stock illustrations or cartoon characters. Main column diagrams must stay within article width. Right sidebar near top: "本课大纲", with "1 上下文窗口大小", "2 上下文由什么组成", "3 如何控制上下文" and indented "硬截断 / 压缩 / 历史信息检索", "4 不同产品是怎么做的". Below thin divider "继续学习", "下一课：管理记忆 →". Right column lower down mostly white. The four numbered content sections occur ONCE across the 3 segments. Preserve supplied exact Chinese headings and key statements; diagram labels concise and legible. No lorem ipsum. Realistic enough for later frontend implementation.
SEGMENT 2 OF 3: CONTINUATION of the article, start directly at section 2 with no repeat hero/header. Match supplied reference image's layout, typography, green tones and diagram styling. Large crisp tall image.
SECTION "2、智能体的上下文由什么组成？"
Paragraph "一个 Agent 的上下文，通常会包含很多不同类型的信息。随着任务不断执行，这些信息会越来越多。"
Centerpiece diagram "把信息组装成这一轮的上下文". A beautiful large pale green engineering canvas, left grouped document cards, center flowing connectors, right a single tall ordered stack within a thin green bordered viewport called "发送给模型". Three color groups:
top deep green fixed prefix "系统提示词" "工具名称与说明" with small lock icons and bracket "固定前缀";
middle muted sage "用户请求" "历史对话" "工具调用记录" "工具返回结果";
bottom soft amber "当前任务计划" "已完成进度" "文件 / 知识库 / 网页资料".
All 9 labelled components must be clearly shown. A subtle "Token" measuring ruler next to final stack. No claim this is universally mandated exact order: caption "示意结构，按任务和接口组织".
Paragraph "比如一个 Agent 连续调用了 20 次工具，如果每一次工具返回的完整结果都一直留在上下文里，窗口很快就会变得非常拥挤。"
A slim growing message strip "第 1 次调用 → 第 10 次调用 → 第 20 次调用" with increasingly dense filled narrow document stacks, ending "工具结果也占窗口".
Subheading "尽量把固定不变的内容放在前面。"
Diagram "提示词缓存 Prompt Caching": three horizontal request rows labelled "第 1 轮" "第 2 轮" "第 3 轮". Each same-length left green prefix block labelled "系统提示词 + 工具说明", vertical translucent green outline aligning identical prefix across all 3 rows; small lock icon "复用相同前缀". Right different length pale segments labelled "本轮变化内容". First row "建立缓存"; following two rows "复用前缀". Short footnote "命中缓存还需满足模型与接口的缓存规则".
Text "系统提示词、工具说明等内容，在很多轮请求里都不会发生变化。把固定内容放在前面，有助于利用提示词缓存，减少重复计算、降低成本并提升响应速度。"
Section divider.
SECTION "3、智能体如何控制上下文？"
Text "用户继续聊天、Agent 调用工具、工具返回结果、任务继续执行……如果什么都不处理，上下文一定会越来越长。"
Three elegant small inline chips "硬截断" "压缩" "历史信息检索". First highlighted green.
Subheading "1）硬截断"
Text "最简单粗暴的方法，就是直接丢掉一部分历史信息。"
Subhead "滑动窗口"
Text "永远只保留最近几轮对话。假设只保留最近 3 轮，第 4 轮进来以后，第 1 轮就会被挤出去。"
Large vivid precise motion storyboard with TWO separate horizontal rails:
row A label "第 3 轮结束" green outlined viewport encloses 3 cards "第 1 轮" "第 2 轮" "第 3 轮".
row B label "第 4 轮进入" faded dashed "第 1 轮" OUTSIDE on left, green outlined viewport encloses EXACTLY "第 2 轮" "第 3 轮" "第 4 轮"; last card enters right with arrow, old first card exits left with arrow and tiny text "离开当前上下文". A subtle green arrow indicates viewport moving one step right, no ambiguous 4 cards inside. Caption "窗口往前走，旧信息被挤出去。"
Subhead "固定轮次截断"
Text "比如最多允许 5 轮对话。达到限制以后，直接开启一个新的上下文，之前的信息全部清空。"
Small separated sequence "1 → 2 → 3 → 4 → 5" enclosed in faded old window, arrow across a break marked "清空", new blank green window "新上下文" containing card "第 1 轮".
Bottom pale amber outlined warning with small icon, no bright red: bold "真的会忘。" text "实现简单、成本低。但如果前面的信息之后又变得重要，单靠当前上下文已经找不回来了。"
Do not repeat sections 1 or 4. Right sidebar shows section 2 active and 3 nearby.
