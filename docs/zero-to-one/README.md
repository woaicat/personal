# 从 0 到 1：课程与实战案例

「从 0 到 1」下有两个独立板块：

| 板块 | 地址 | 内容职责 |
| --- | --- | --- |
| Agent 课程 | `/zero-to-one/agent` | 按课学习、课程进度与课内互动 |
| 实战案例 | `/zero-to-one/practice-cases` | 外部文章、课程和视频的策展目录与定期推荐 |

两个目录页共用 `components/zero-to-one/ZeroToOneHeader.tsx`。导航使用站内 `Link`，点击「实战案例」会在当前标签页切换页面；案例原文是外部链接，会在新标签页打开。课程详情页仍保持原有沉浸式阅读布局。

## 文件分工

```text
app/zero-to-one/agent/                 # 已有 Agent 课程路由
app/zero-to-one/practice-cases/        # 实战案例路由与页面元数据
components/agent-course/              # 课程页面、课内互动和样式
components/practice-cases/            # 案例页、筛选交互、插图和样式
components/zero-to-one/               # 两板块共用导航
content/agent-course/                 # 课程大纲与课文
content/practice-cases/cases.ts        # 案例资料、标签与推荐项
docs/agent-course/                    # 课程文档
docs/zero-to-one/                     # 两板块的维护约定
```

## 新增与维护案例

1. 阅读原文，核对链接、英文原题、作者或发布方。`title` 应直接翻译 `originalTitle`，不要改写成提炼式标题；价值点写在 `summary`。
2. 在 `content/practice-cases/cases.ts` 增加一条资料：稳定 `id`、中文标题、原题、来源、形式、原文链接、简介、标签及插图类型。简介建议 3–4 行，说明实践背景、做法与值得参考的地方；没有读到的事实不要写。
3. 标签从 `practiceCaseTags` 中选择；只有至少一篇案例使用的标签才会出现在筛选区。新增标签先加入词表，再用于案例，避免近义词重复。
4. 轮换「本期推荐」时仅修改 `featuredPracticeCaseId`。被推荐的文章仍保留在完整目录的末尾，避免两处内容紧挨着重复。
5. 插图在 `components/practice-cases/CaseArtwork.tsx` 维护。保留统一的蓝图网格、纸白面板与暖橙节点；新增内容可以复用现有图案，若增加图案类型须同步更新 `PracticeCaseArtwork` 类型。

## 开发约定

- 路由页面和推荐内容保持服务端渲染，只有标签筛选组件使用客户端状态。
- 外链使用 `target="_blank"` 与 `rel="noopener noreferrer"`；站内导航使用 `next/link`。
- 标题、链接及标签从内容数据生成，避免在组件中复制案例信息。
- 修改后运行 `npm run lint`、`npm run typecheck`，并在桌面与手机宽度检查中文换行、筛选结果、站内导航及外链。

## 首批资料来源

- [Token Spend Out of Control? The Case for Smarter Routing](https://blog.bytebytego.com/p/token-spend-out-of-control-the-case) — ByteByteGo
- [How DoorDash Built a Testing System to Evaluate LLMs](https://blog.bytebytego.com/p/how-doordash-built-a-testing-system) — ByteByteGo
- [How we built LangChain’s GTM Agent](https://www.langchain.com/blog/how-we-built-langchains-gtm-agent) — LangChain
