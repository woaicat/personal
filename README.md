# 个人作品集（Next.js + Vercel）

这是一个可直接部署到 Vercel 的 Next.js 项目。首页作品集数据保存在 TypeScript 中；AI 知识库、论文图解和课程内容按模块存放在独立的内容目录中。目前没有在线内容管理后台或服务端内容数据库。

## 技术栈

- Next.js 15 (App Router)
- React 19
- TypeScript

## 页面模块与内容位置

| 模块 | 路由 | 页面与内容入口 |
| --- | --- | --- |
| 个人作品集 | `/` | `app/page.tsx`、`components/PortfolioClient.tsx`、`components/portfolio/`、`lib/content.ts` |
| AI 知识库 | `/ai-knowledge` | `app/ai-knowledge/`、`components/ai-knowledge/`、`content/ai-knowledge/` |
| 论文图解 | `/ai-papers` | `app/ai-papers/`、`components/ai-papers/`、`content/ai-papers/papers.ts` |
| SQL 学习 | `/sql-learning` | `app/sql-learning/`、`components/sql-learning/`、`content/sql-learning/`、`lib/sql-learning/` |
| 从 0 到 1 设计一个 Agent | `/zero-to-one/agent` | `app/zero-to-one/agent/`、`components/agent-course/`、`content/agent-course/`、`lib/agent-course/` |
| Personal Space | `/personal-space` | `app/personal-space/`、`components/personal-space/`、`public/personal-space/` |

## 目录约定

按职责分层，再按业务模块分组。路由名称可以与内部模块名称不同。

| 目录 | 职责 |
| --- | --- |
| `app/` | 路由、布局、元数据、参数处理及接口入口 |
| `components/<模块>/` | 页面组件、交互组件及配套 CSS Module；章节专属组件可放在 `lessons/` |
| `lib/<模块>/` | 内容查询、业务逻辑、类型和存储操作；浏览器存储放在 `storage/` |
| `content/<模块>/` | 课程目录、正文配置、Markdown 和静态业务数据 |
| `public/<模块>/` | 页面使用的图片及静态资源 |
| `docs/<模块>/` | 需求文档、设计说明与模块维护记录 |

- 跨职责目录引用使用 `@/` 别名；同目录文件可以使用相对路径。
- 组件默认归属业务模块；多个模块确实复用后，再提取到 `components/shared/`。
- 路由文件组合页面组件，不承载长篇正文或存储逻辑；纯内容文件不操作浏览器存储。
- 课程专属 JSX 保留在组件中，不为数据化而拆分复杂布局。
- 首页路由负责组装页面数据，课程章节正文可以保留在章节专属组件中。

Agent 课程设计基线见 [docs/agent-course/design.md](docs/agent-course/design.md)。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`

## 构建与启动

```bash
npm run build
npm run start
```

## 部署前检查（建议每次上线前执行）

```bash
npm run check:deploy
```

该命令会依次执行类型检查和生产构建。

## 数据维护

### 首页作品集

首页路由 `app/page.tsx` 调用 `getPortfolioData()`，实际渲染数据来自 `lib/content.ts`，类型定义在 `lib/types.ts`。个人介绍、联系信息、文章、项目、首页知识库卡片和媒体推荐目前都由该文件提供；网站运行时不会直接读取根目录 CSV。

`articles_data.csv` 有一条专用同步流程，可用作文章卡片的编辑输入：

1. 编辑 `articles_data.csv`（列名保持：`标题,标签,跳转链接,摘要,发布日期`）
2. 执行同步命令：

```bash
npm run sync:articles
```

3. 该命令会将 CSV 内容写入 `lib/content.ts` 中的：
- `articles.cards`
- `articles.filters`
- `articles.intro.stats`（文章数、专题数）

同步后请检查 `lib/content.ts` 的差异。`projects_data.csv`、`knowledge_data.csv` 和 `media_data.csv` 当前没有代码读取或同步入口，编辑这些文件不会改变网站对应栏目；它们目前只是未接入的 CSV 文件，不是网站数据源。

### 独立内容模块

AI 知识库详情页使用 `content/ai-knowledge/articles/` 下的 Markdown 和 `content/ai-knowledge/site.json`，不通过首页 CSV 维护：

```bash
npm run content:new -- article-slug
npm run content:check
```

- `content:new`：按统一模板创建一篇草稿。
- `content:check`：检查字段、分类、图片、HTTPS 外链、正文和热门推荐排名。
- 详细规则见 `content/ai-knowledge/README.md`。

论文目录数据在 `content/ai-papers/papers.ts`；SQL 课程在 `content/sql-learning/`；Agent 课程目录和正文数据在 `content/agent-course/`，章节专属 JSX 位于 `components/agent-course/lessons/`。

## 环境变量

复制 `.env.example` 为 `.env.local`（本地）或在 Vercel 中配置：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 部署到 Vercel

1. 将该目录推送到 GitHub 仓库
2. 在 Vercel 导入仓库
3. Framework Preset 选择 `Next.js`
4. 保持默认构建设置即可部署
5. 在 Vercel 项目设置里补充 `NEXT_PUBLIC_SITE_URL`

## 安全部署

- 已内置基础安全响应头：`X-Frame-Options`、`X-Content-Type-Options`、`Referrer-Policy`、`Permissions-Policy` 和最小 CSP。
- 已对 `/api/*` 做轻量限流，当前实现是无外部依赖的内存级别限流，适合基础防刷，不适合作为强一致的生产级防护。
- 已对明显恶意 UA 和不支持的方法做基础拦截。
- 如果后续增加登录、写入接口或后台管理，建议再补一层 Vercel Firewall / WAF、验证码、持久化限流和鉴权。
