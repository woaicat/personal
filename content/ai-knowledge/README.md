# AI 知识库内容维护

AI 知识库以 `content/ai-knowledge/articles/*.md` 为唯一文章数据源，与个人网站首页的 CSV 数据分开维护。文章列表、分类筛选、精选内容和热门推荐都从 Markdown 头部字段自动生成。

## 日常更新流程

1. 创建草稿：

   ```bash
   npm run content:new -- article-slug
   ```

   外链文章可以在创建时写入链接：

   ```bash
   npm run content:new -- article-slug --external https://example.com/article
   ```

2. 修改新文件的标题、摘要、分类、作者、图片和正文。
3. 本地开发环境会显示 `draft`，生产构建只展示 `published`。
4. 发布前把 `status` 改为 `published`，执行：

   ```bash
   npm run content:check
   ```

5. `npm run check` 和 `npm run check:deploy` 已自动包含内容校验。

## 字段规范

```md
---
title: "文章标题"
description: "用于卡片展示的简短摘要"
category: "方法论"
section: "AI产品落地"
subsection: "评测驱动迭代"
date: "2026-07-10"
author: "jiaxuan"
readCount: "0"
image: "/images/article-lake-1.png"
featured: false
status: "draft"
externalUrl: "https://example.com/article"
---
```

- `category`：文章内容类型，可选值为导读、产品经理、方法论、技术基础、Agent、案例库、放下碗。
- `author`：站内原创统一填写 `jiaxuan`；发布在个人外部平台的文章使用 `猫猫观察员的AI思考`。第三方原文保留真实来源名称。
- `section/subsection`：必须来自 `site.json` 的知识体系分类。
- `date`：优先填写原文发布日期；无法确认时填写知识库收录日期。
- `image`：必须指向 `public/ai-knowledge/images` 中真实存在的图片。
- `status`：只允许 `draft` 或 `published`。
- `externalUrl`：选填；填写后文章卡片直接跳到 HTTPS 原文，不生成站内详情页。
- 没有 `externalUrl` 的文章必须在头部字段之后提供 Markdown 正文。

## 热门推荐

热门推荐完全由文章字段生成，不在组件中重复维护。需要在 4 篇已发布文章中分别填写：

```yaml
hotRank: 1
hotSummary: "用于首页热门区域的一句话推荐理由。"
```

`hotRank` 必须且只能覆盖 1、2、3、4，不能重复。`content:check` 会阻止缺项、重复排名或草稿进入热门推荐。

## 自动校验范围

`npm run content:check` 会检查：

- 必填字段、未知字段和日期格式；
- 分类及二级分类是否合法；
- 图片是否存在且没有越出指定目录；
- 外链是否为 HTTPS、是否重复；
- 站内文章是否有正文；
- 热门推荐是否恰好为 4 篇且排名连续。

模板文件位于 `content/ai-knowledge/templates/article.md`。网站导航、栏目和页脚等全站配置继续在 `content/ai-knowledge/site.json` 中维护。
