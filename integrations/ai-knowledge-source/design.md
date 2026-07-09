---
version: alpha
name: AI-product-manager-knowledge-base-design
description: "A calm editorial knowledge-base homepage for AI product managers. The visual system combines a clean white reading canvas with deep teal, soft lavender, and mint brand surfaces, rounded editorial modules, cinematic landscape imagery, and compact Chinese content cards. It should feel like a serious personal knowledge archive: practical, structured, trustworthy, and still warm enough to invite exploration."

colors:
  brand-deep: "#003f3b"
  brand-deeper: "#001d1d"
  brand-mid: "#006a63"
  brand-lavender: "#b8a4ed"
  brand-mint: "#a4d4c5"
  brand-soft: "#e7f3f1"
  action-orange: "#f05a2a"
  action-orange-hover: "#dc4820"
  ink: "#05302e"
  ink-strong: "#002a29"
  text-muted: "#5e7472"
  text-soft: "#7e918f"
  canvas: "#fbfcfb"
  surface: "#ffffff"
  surface-soft: "#f5f8f7"
  surface-raised: "#ffffff"
  hairline: "#e4ecea"
  hairline-soft: "#eef3f2"
  inverse-ink: "#ffffff"
  inverse-muted: "#c7dad7"
  hero-scrim: "#000000"
  shadow-soft: "rgba(0, 40, 38, 0.08)"
  shadow-card: "rgba(0, 40, 38, 0.10)"

typography:
  logo:
    fontFamily: "ui-rounded, SF Pro Rounded, Arial Rounded MT Bold, PingFang SC, Noto Sans SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: 30px
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: 0
  display-xl:
    fontFamily: "ui-rounded, SF Pro Rounded, Arial Rounded MT Bold, PingFang SC, Noto Sans SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: 48px
    fontWeight: 800
    lineHeight: 1.18
    letterSpacing: 0
  display-lg:
    fontFamily: "ui-rounded, SF Pro Rounded, Arial Rounded MT Bold, PingFang SC, Noto Sans SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: 34px
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: 0
  section-title:
    fontFamily: "PingFang SC, Noto Sans SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: 28px
    fontWeight: 800
    lineHeight: 1.30
    letterSpacing: 0
  card-title:
    fontFamily: "PingFang SC, Noto Sans SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 800
    lineHeight: 1.45
    letterSpacing: 0
  list-title:
    fontFamily: "PingFang SC, Noto Sans SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 800
    lineHeight: 1.45
    letterSpacing: 0
  nav:
    fontFamily: "PingFang SC, Noto Sans SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1.40
    letterSpacing: 0
  body:
    fontFamily: "PingFang SC, Noto Sans SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.70
    letterSpacing: 0
  body-sm:
    fontFamily: "PingFang SC, Noto Sans SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.60
    letterSpacing: 0
  caption:
    fontFamily: "PingFang SC, Noto Sans SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: 0
  numeric:
    fontFamily: "Inter, DIN Alternate, PingFang SC, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.20
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  hero: 18px
  pill: 9999px
  full: 9999px

spacing:
  hair: 1px
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 40px
  page-gutter: 24px

assets:
  hero: "插图/顶部头图.png"
  article-landscape-1: "插图/ChatGPT Image 2026年7月6日 22_52_03 (1).png"
  article-landscape-2: "插图/ChatGPT Image 2026年7月6日 22_52_03 (2).png"
  article-landscape-3: "插图/ChatGPT Image 2026年7月6日 22_52_03 (3).png"
  article-landscape-4: "插图/ChatGPT Image 2026年7月6日 22_52_03 (4).png"
  article-landscape-5: "插图/ChatGPT Image 2026年7月6日 22_52_03 (5).png"
  article-landscape-6: "插图/ChatGPT Image 2026年7月6日 22_52_03 (6).png"

components:
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
    height: 78px
    padding: "0 {spacing.page-gutter}"
  nav-search:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-soft}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
    border: "1px solid {colors.hairline}"
  button-primary:
    backgroundColor: "{colors.brand-mid}"
    textColor: "{colors.inverse-ink}"
    typography: "{typography.nav}"
    rounded: "{rounded.pill}"
    padding: "13px 24px"
  button-accent:
    backgroundColor: "{colors.action-orange}"
    textColor: "{colors.inverse-ink}"
    typography: "{typography.nav}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  hero-feature:
    backgroundColor: "{colors.brand-deeper}"
    textColor: "{colors.inverse-ink}"
    rounded: "{rounded.hero}"
    minHeight: 320px
    overflow: hidden
  recommendation-panel:
    backgroundColor: "{colors.brand-deep}"
    textColor: "{colors.inverse-ink}"
    rounded: "{rounded.hero}"
    padding: "{spacing.xl}"
  tab-selected:
    backgroundColor: "{colors.brand-mid}"
    textColor: "{colors.inverse-ink}"
    typography: "{typography.nav}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  tab-default:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  article-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
    border: "1px solid {colors.hairline}"
    shadow: "0 10px 28px {colors.shadow-soft}"
  content-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
    border: "1px solid {colors.hairline}"
  footer:
    backgroundColor: "{colors.brand-deep}"
    textColor: "{colors.inverse-ink}"
    typography: "{typography.body-sm}"
    rounded: "28px 28px 0 0"
    padding: "48px 72px 28px"
---

## Overview

这个页面是一个面向 AI 产品经理的个人知识库首页。整体视觉不是传统技术博客的冷灰风格，而是用 **深墨绿主色 + 薰衣草紫与薄荷绿辅助主色 + 白色内容画布 + 大图卡片** 建立一种“专业、有积累、可持续阅读”的感觉。

页面首屏是最强品牌表达：顶部导航保持白底轻量，下面是一张深色大 Hero。Hero 左侧用人物工作场景作为情绪锚点，叠加大号圆润中文标题；右侧是深墨绿推荐榜单，把“知识体系”的主题转化成可点击的学习路径。首屏之后，页面回到白色阅读画布，通过频道标签、文章卡片、AI 情报、专题入口和页脚完成内容导航。

**Key Characteristics:**
- 深墨绿 `{colors.brand-deep}` 是品牌核心色，用于推荐榜、选中标签、页脚和局部强调。
- 薰衣草紫 `{colors.brand-lavender}` 与薄荷绿 `{colors.brand-mint}` 是辅助主色，用于专题卡、徽标、插图底色和轻量强调。
- 页面背景使用接近白色的 `{colors.canvas}`，内容卡片使用 `{colors.surface}`，整体干净但不冰冷。
- Hero 标题与站点 Logo 使用圆润无衬线字体，形成“专业但不尖锐”的知识库气质。
- 常规导航、正文、卡片标题延续中文无衬线字体，保证内容密度和阅读效率。
- 主 CTA 使用橙色 `{colors.action-orange}`，只出现在“开始探索”等强行动入口，避免到处抢注意力。
- 卡片圆角偏大但克制，主要圆角集中在 12px-18px，页脚顶部圆角更大，形成收束感。
- 图片是页面的主要视觉资产：Hero 用人物场景，文章卡用山水/城市/抽象场景，统一带轻微电影感。

## Colors

### Brand

- **Brand Deep** (`{colors.brand-deep}`): 页面最重要的品牌色。用于右侧热门推荐面板、页脚背景、选中标签，以及部分按钮底色。
- **Brand Deeper** (`{colors.brand-deeper}`): Hero 图片暗部与深色遮罩的基底，保证白色大标题始终可读。
- **Brand Mid** (`{colors.brand-mid}`): 更明亮的墨绿色，用于主按钮、分类选中态、小标签强调。它比页脚色更适合小面积交互。
- **Brand Lavender** (`{colors.brand-lavender}`): 柔和紫色主辅助色。用于专题/特性卡、学习路径提示、方法论模块的柔和背景，不用于大面积页脚或主 CTA。
- **Brand Mint** (`{colors.brand-mint}`): 薄荷绿主辅助色。用于插图点缀、小徽标、成功感提示和轻量信息卡，适合和深墨绿一起形成更清新的知识库气质。
- **Brand Soft** (`{colors.brand-soft}`): 浅绿色辅助面，用于 hover、轻提示、选中态的浅背景版本。

### Accent

- **Action Orange** (`{colors.action-orange}`): 顶部“开始探索”按钮的唯一强色。它的职责是行动召唤，不用于文章标签或装饰图形。
- **Action Orange Hover** (`{colors.action-orange-hover}`): 橙色按钮 hover/pressed 状态，轻微加深即可，不需要额外阴影。

### Surface

- **Canvas** (`{colors.canvas}`): 页面主背景。保持接近白色，避免纯白在大面积页面里显得刺眼。
- **Surface** (`{colors.surface}`): 卡片、列表面板、搜索框的基础白色。
- **Surface Soft** (`{colors.surface-soft}`): 分类 tab 默认态、轻量背景块、卡片 hover 底色。
- **Hairline** (`{colors.hairline}`): 卡片边框、面板边框、列表分割线。
- **Hairline Soft** (`{colors.hairline-soft}`): 更弱的内部分割线，用在 AI 情报列表和页脚列分隔。

### Text

- **Ink** (`{colors.ink}`): 主标题、导航、卡片标题。
- **Ink Strong** (`{colors.ink-strong}`): Logo、Hero 外的重要标题、强调链接。
- **Text Muted** (`{colors.text-muted}`): 摘要、描述、次级信息。
- **Text Soft** (`{colors.text-soft}`): 搜索 placeholder、阅读数、日期等弱信息。
- **Inverse Ink** (`{colors.inverse-ink}`): 深色 Hero、推荐榜、页脚上的白色文本。
- **Inverse Muted** (`{colors.inverse-muted}`): 深色区域里的说明文案和二级链接。

## Typography

### Font Family

- **Rounded / Friendly**: `ui-rounded, SF Pro Rounded, Arial Rounded MT Bold, PingFang SC, Noto Sans SC, Microsoft YaHei, system-ui, sans-serif`。用于 Logo、Hero 大标题和重要模块标题，避免尖锐衬线带来的压迫感。
- **Sans / Product UI**: `PingFang SC, Noto Sans SC, Microsoft YaHei, system-ui, sans-serif`。用于导航、正文、卡片、列表和按钮。
- **Numeric**: `Inter, DIN Alternate, PingFang SC, system-ui, sans-serif`。用于阅读量、日期、排行数字等紧凑信息。

### Hierarchy

| Token | Size | Weight | Line Height | Use |
|---|---:|---:|---:|---|
| `{typography.logo}` | 30px | 800 | 1.15 | 站点 Logo：AI 产品经理知识体系 |
| `{typography.display-xl}` | 48px | 800 | 1.18 | Hero 主标题 |
| `{typography.display-lg}` | 34px | 800 | 1.25 | 大模块标题、专题页标题 |
| `{typography.section-title}` | 28px | 800 | 1.30 | AI 情报、放下碗专栏等区块标题 |
| `{typography.card-title}` | 18px | 800 | 1.45 | 文章卡标题 |
| `{typography.list-title}` | 16px | 800 | 1.45 | 榜单、情报、专题条目标题 |
| `{typography.nav}` | 15px | 700 | 1.40 | 顶部导航、标签、按钮 |
| `{typography.body}` | 15px | 400 | 1.70 | 正文摘要、说明文本 |
| `{typography.body-sm}` | 13px | 400 | 1.60 | 卡片摘要、页脚链接 |
| `{typography.caption}` | 12px | 500 | 1.45 | 日期、作者、阅读量、标签 |
| `{typography.numeric}` | 13px | 600 | 1.20 | 数字、排行、阅读量 |

### Principles

- **标题圆润但要有分量。** Logo 和 Hero 使用圆润无衬线字体，内容阅读区继续使用清晰的产品界面字体。
- **中文不使用负字距。** 所有中文文本保持 `letterSpacing: 0`，用字重和字号拉开层级。
- **卡片标题要足够重。** 文章卡标题使用 800 字重，避免在图片和多信息元素中丢失。
- **摘要不要太浅。** 摘要可以用 `{colors.text-muted}`，但不要降到过低对比度，否则知识库会显得不可靠。
- **数字信息要紧凑。** 日期、阅读量、序号用 `{typography.numeric}`，让列表更利落。

## Layout

### Page Structure

1. **Top Visual + Navigation**: 顶部头图横向铺满视口，并延展到导航栏背景；Logo、导航文字在该区域内使用白色。
2. **Hero + Recommendation**: 左侧大图叠字，右侧热门推荐榜单以半透明玻璃层覆盖在同一张头图上。
3. **Category Tabs**: 一行频道筛选标签，选中项为深墨绿，其余为浅灰白。
4. **Article Grid**: 大屏 4 列文章卡，2 行展示核心内容入口。
5. **Lower Content Panels**: 左侧 AI 情报列表，右侧放下碗专栏，形成 60/40 双栏。
6. **Footer**: 深墨绿整块收尾，包含联系信息、资源导航、文章导航、更新归档和图片。

### Container

- Desktop 内容最大宽度建议 1680px-1880px，避免宽屏下内容显得过窄。
- 页面左右 gutter: `{spacing.page-gutter}` 24px 起步，大屏可增至 32px。
- 主内容纵向间距以 `{spacing.section}` 40px 为基础，不需要过大留白；这是知识库首页，信息密度应高于营销落地页。
- Hero 顶部视觉区横向铺满浏览器，不保留外侧白边；页脚可接近全宽但保留基础安全边距。

### Grid

- Article Grid: desktop 4 columns，列间距约 22px，行间距约 24px；详情页相关内容可保持 3 columns。
- Lower Panels: desktop 使用 7/5 或 60/40 双栏，间距 32px。
- Footer: desktop 4 个文字列 + 1 个图片列。文字列之间用 1px 半透明分割线。

### Whitespace

这个设计的留白策略是“卡片内紧凑，区块间清楚”。文章卡内部标题、摘要、元信息之间保持 10px-16px；Hero、文章区、情报区、页脚之间保持 32px-48px。不要把首页做成大段空白的品牌页，它应该首先是可浏览的知识入口。

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 | 无阴影，仅色块区分 | 页面背景、深色页脚、Hero 深色区域 |
| 1 | 1px `{colors.hairline}` 边框 | 普通文章卡、内容面板、搜索框 |
| 2 | `0 10px 28px {colors.shadow-soft}` | 文章卡、下方内容面板 |
| 3 | `0 18px 48px {colors.shadow-card}` | hover 中的卡片、下拉菜单、浮层 |

### Decorative Depth

- Hero 左侧图片必须叠加黑色渐变遮罩，遮罩从左下角和底部增强，保证标题与按钮可读。
- 文章卡图片不需要重阴影，依靠圆角、边框和白色卡片建立层次。
- 页脚不使用阴影，靠深色整块和顶部大圆角完成页面收束。

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---:|---|
| `{rounded.xs}` | 4px | 小标签、图标背景 |
| `{rounded.sm}` | 8px | 缩略图、小按钮、列表图片 |
| `{rounded.md}` | 12px | 分类标签、搜索框、小卡片 |
| `{rounded.lg}` | 16px | 文章卡、内容面板 |
| `{rounded.xl}` | 24px | 大面板、专题容器 |
| `{rounded.hero}` | 18px | 首屏 Hero 大容器 |
| `{rounded.pill}` | 9999px | CTA、搜索框、胶囊按钮 |
| `{rounded.full}` | 9999px | 排名数字、头像、圆形图标 |

### Image Geometry

- Hero 图片按原图宽幅比例展示，桌面端优先使用 `background-size: 100% auto` 保持全景，不做局部放大裁切。
- 文章卡主图比例建议 16:8.5，保持横向风景图质感。
- 情报列表缩略图使用 80px x 56px，圆角 `{rounded.sm}`。
- 专题卡缩略图使用 120px x 86px 左右，和右侧文字保持清晰的横向布局。
- 页脚图片使用 180px x 120px，圆角 `{rounded.md}`，只作为氛围收尾，不抢信息。

## Components

### Top Navigation

**`top-nav`** 在首页叠放于顶部头图之上，高度约 68px；文章详情等非首页场景可回到白色横向导航栏。

- 左侧 Logo 使用 `{typography.logo}` 和 `{colors.ink-strong}`。
- 主导航项：博客、成长指南、方法论、技术基础、Agent、案例库、百宝箱、关于。
- 首页导航文字使用白色，hover 时使用白色下划线；非首页导航默认 `{colors.ink}`，hover 时可使用 `{colors.brand-mid}`。
- 右侧搜索框是低对比胶囊，不要做成大搜索栏；placeholder 类似“搜索文章、资源或关键词”。
- 最右 CTA 使用 `button-accent`，文案为“开始探索”。

### Hero Feature

**`hero-feature`** 是首页的主视觉模块，包含左侧图片叙事和右侧热门推荐。

- 顶部视觉区横向铺满浏览器，两侧不留白；Hero 高度按头图原始全景比例自适应，优先保证图片完整展示。
- 左侧占 68%，右侧占 32%。
- 背景图使用 `assets.hero`，按原图宽高比横向铺满，不使用会裁掉上下内容的强制 cover；人物靠右，标题压在左下区域。
- 整体叠加黑色渐变：左侧约 45%-60% 暗化，底部约 40% 暗化，右侧推荐区不使用完全遮盖图片的实色背景。
- Hero 标题使用 `{typography.display-xl}`，白色，最多 2 行。
- 副标题使用 `{typography.body}`，白色 85%-90% 不透明度。
- Hero 左侧不放“阅读本文”按钮，避免首屏出现过多行动入口；主要行动保留在顶部导航的“开始探索”。
- 底部轮播点居中靠下，当前点为白色长条，其余为白色圆点。

### Recommendation Panel

**`recommendation-panel`** 是 Hero 右侧的热门推荐榜。

- 背景使用半透明 `{colors.brand-deep}` 玻璃层，可叠加轻微径向暗角；透过背景仍应能看到 Hero 图片。
- 顶部只保留标题“热门推荐”，不放“查看更多”按钮，让榜单本身成为点击入口。
- 桌面端只展示 4 条推荐，保证右侧榜单留白充足、不拥挤。
- 每条推荐由圆形序号、标题、摘要组成。
- 序号圆为白底深字，尺寸约 32px。
- 条目之间使用 `rgba(255,255,255,0.10)` 分割线。
- 标题使用 `{typography.list-title}` 和 `{colors.inverse-ink}`。
- 摘要使用 `{typography.caption}` 和 `{colors.inverse-muted}`。

### Category Tabs

**`tab-selected` / `tab-default`** 控制频道筛选。

- 频道包括：推荐、热门、导读、产品经理、方法论、技术基础、Agent、案例库、AI 情报。
- 选中态使用 `{colors.brand-mid}` 背景和白字。
- 默认态使用 `{colors.surface-soft}` 背景和 `{colors.ink}`。
- tab 高度约 48px，圆角 `{rounded.md}`。
- tab 不需要图标，文本本身就是清晰分类。

### Article Card

**`article-card`** 是核心内容入口。

- 卡片背景 `{colors.surface}`，边框 `{colors.hairline}`，圆角 `{rounded.lg}`。
- 图片置顶，比例固定，圆角 `{rounded.md}`。
- 图片左下或下方靠左放分类标签，如“导读”“产品经理”“方法论”“技术基础”“Agent”“案例库”。
- 标题使用 `{typography.card-title}`，颜色 `{colors.ink}`，最多 2 行。
- 摘要使用 `{typography.body-sm}`，颜色 `{colors.text-muted}`，最多 1-2 行。
- 底部元信息一行：作者头像、作者名、日期、阅读量。
- hover: 卡片整体轻微上移 2px，阴影升级到 Level 3，图片不做夸张缩放。

### AI News Panel

**`content-panel.news-panel`** 用于“AI 情报”列表。

- 左侧大面板宽度更大，标题区包含“AI 情报”和“查看更多 >”。
- 每条新闻为：缩略图 + 标题 + 摘要 + 时间。
- 缩略图固定尺寸，避免因为图片比例不同导致行高跳动。
- 时间靠右，使用 `{typography.caption}` 和 `{colors.text-soft}`。
- 列表条目之间使用 `{colors.hairline-soft}` 分割。
- 适合承载快讯、模型发布、产品更新、行业动态。

### Column Panel

**`content-panel.special-column`** 用于“放下碗专栏”。

- 右侧面板标题更有个性，前缀竖线可使用 `{colors.brand-deep}`。
- 面板说明文字保持克制，强调“与你分享经验一起探索产品方法论”。
- 专题条目是横向卡片：左图、右文、右侧箭头。
- 小标签可使用不同浅色底：产品思考、实战复盘、方法论。
- 底部有“查看更多专栏文章 >”链接，右对齐。

### Footer

**`footer`** 是深墨绿色信息收束区。

- 顶部左右圆角较大，建议 28px。
- 背景 `{colors.brand-deep}`，文字白色。
- 内容列：联系我们、常见资源导航、文章导航、更新归档、右侧图片。
- 列标题使用 16px-18px 加粗，链接使用 `{typography.body-sm}`。
- 链接前可以使用小三角或线性图标，但图标必须轻，不要喧宾夺主。
- 版权信息居中放底部，颜色 `{colors.inverse-muted}`。

## Content Model

### Header Navigation

- 博客
- 成长指南
- 方法论
- 技术基础
- Agent
- 案例库
- 百宝箱
- 关于

### Homepage Modules

- Hero 主文案：如何构建面向真实落地的 AI 产品知识体系
- Hero 副文案：从思维到方法，从需求到实现，构建更具 AI 产品核心能力。
- 热门推荐：4 条学习路径或重点文章。
- 核心文章区：8 张文章卡，大屏按 4 个一行展示两行内容入口。
- AI 情报：5 条快讯。
- 放下碗专栏：3 条观点/复盘/方法论文章。
- Footer：联系方式、资源导航、文章导航、更新归档。

## Do's and Don'ts

### Do

- 使用深墨绿作为统一品牌线索，贯穿 Hero、tab、页脚和关键按钮。
- 将 `{colors.brand-lavender}` 和 `{colors.brand-mint}` 作为辅助主色，分配给专题卡、徽标、插图区块和轻提示。
- 保持首页信息密度，让用户一眼能看到知识分类和内容入口。
- Hero 标题使用圆润无衬线字体，强化亲和、清晰、可信的知识库气质。
- 文章卡图片保持统一比例，图片风格可以不同，但色调要干净、沉稳。
- 用边框和轻阴影做卡片层级，不要依赖厚重阴影。
- 把橙色 CTA 留给真正的主行动，例如“开始探索”。
- 每个区块都要有明确标题和可继续浏览的入口。

### Don't

- 不要把页面做成营销落地页的大空白 Hero，知识库首页需要内容可扫读。
- 不要在 `{colors.brand-lavender}`、`{colors.brand-mint}` 和橙色 CTA 之外再引入新的高饱和强调色。
- 不要让文章卡标题低于 16px，否则中文信息会显得拥挤。
- 不要在深色 Hero 上直接放白字而不加遮罩。
- 不要给每张卡片使用不同圆角或不同阴影等级。
- 不要让页脚变成普通白底链接区，深色页脚是页面的重要收束符号。

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---:|---|
| Desktop-XL | 1440px+ | 内容宽度可扩展到 1680px-1880px，Hero 保持左右双栏 |
| Desktop | 1200px | 文章区 4 列，底部内容 2 列 |
| Tablet | 960px | Hero 右侧推荐下移，文章区 2 列，导航收缩 |
| Mobile-L | 768px | 文章区 1 列，底部内容 1 列，页脚列堆叠 |
| Mobile | 560px | 顶部导航仅保留 Logo、搜索入口和菜单按钮，Hero 标题降至 32px |

### Mobile Strategy

- Header: 导航项收进菜单，搜索可变为图标按钮，橙色 CTA 可隐藏到菜单内。
- Hero: 左右双栏改为上下结构。图片区在上，推荐榜在下，整体仍保持一个连续深色模块。
- Hero title: 从 `{typography.display-xl}` 调整到 32px，最多 3 行。
- Category tabs: 横向滚动，不换成多行，避免首屏过高。
- Article cards: 单列展示，图片比例保持 16:9。
- News panel: 每条新闻在移动端保留缩略图，但尺寸降到 72px x 52px。
- Footer: 单列堆叠，列之间用水平分割线；版权信息放最后。

### Touch Targets

- CTA 和 tab 最小高度 44px。
- 文章卡整体可点击，但标题、图片、箭头等视觉元素都应指向同一个文章链接。
- Footer 链接行高不低于 36px，保证移动端可点。

## Implementation Notes

1. 所有图片容器都要定义固定比例，避免加载时页面跳动。
2. Hero 图片在桌面端需要保持全景展示，使用按宽度等比铺满的方式；移动端如空间不足，可在保证主要人物和信息可见的前提下调整位置。
3. 卡片标题限制 2 行，摘要限制 1-2 行，使用 line clamp 保持网格整齐。
4. 推荐榜和 AI 情报列表的数据结构应统一为 `title / summary / category / href / publishedAt`，方便后续动态渲染。
5. Markdown 文章页需要支持标题、列表、引用、图片、代码块和表格，因为知识库内容会以 Markdown 上传。
6. 搜索框可以先作为视觉入口，后续接入全文搜索或静态索引。
7. 首页首屏图片和文章缩略图建议提前压缩，Hero 使用 1600px 宽度版本，卡片图使用 800px 宽度版本即可。

## Known Gaps

- 当前规范基于静态视觉效果图提取，具体 hex 值是视觉近似值，正式实现可根据真实 CSS 或设计源文件微调。
- 截图未展示下拉菜单、搜索结果页、文章详情页、空状态和加载态，因此这些状态只给出方向，不作为最终交互规范。
- 截图未展示移动端页面，响应式规则是根据桌面视觉体系推导。
- 当前图片资源多为氛围图；如果后续内容需要体现真实产品流程，建议补充更多界面截图类素材。
