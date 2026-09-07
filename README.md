# 个人作品集（Next.js + Vercel）

这是一个可直接部署到 Vercel 的完整项目，当前使用静态代码数据渲染页面。

## 技术栈

- Next.js 15 (App Router)
- React 19
- TypeScript

## 目录说明

- `app/page.tsx`：首页入口
- `components/PortfolioClient.tsx`：页面结构与前端交互（顶部 tab 高亮、文章标签筛选）
- `lib/content.ts`：页面静态数据源
- `app/api/content/route.ts`：后端 API 示例（返回当前静态数据）
- `articles_data.csv` / `projects_data.csv` / `knowledge_data.csv` / `media_data.csv`：你可填写的数据模板
- `scripts/sync-articles-from-csv.mjs`：将 `articles_data.csv` 同步回 `lib/content.ts` 的脚本

### 模块目录约定

先按职责分层，再按业务模块分组。当前模块包括 `portfolio`、`ai-knowledge`、`sql-learning` 和 `agent-course`；路由名称可以与内部模块名称不同。

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
- 首页现有 `lib/content.ts`、`lib/types.ts` 和根目录 CSV 保留原维护入口；后续调整应单独验证，不与其他模块迁移混做。

Agent 课程入口为 `app/zero-to-one/agent/`，对应 `components/agent-course/`、`lib/agent-course/`、`content/agent-course/` 和 `public/agent-course/`。需求与设计文档见 [docs/agent-course/需求文档.md](docs/agent-course/需求文档.md) 和 [docs/agent-course/design.md](docs/agent-course/design.md)。

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

## 更新文章内容（CSV 同步方式）

1. 编辑 `articles_data.csv`（列名保持：`标题,标签,跳转链接,摘要,发布日期`）
2. 执行同步命令：

```bash
npm run sync:articles
```

3. 该命令会更新 `lib/content.ts` 中的：
- `articles.cards`
- `articles.filters`
- `articles.intro.stats`（文章数、专题数）

## 维护 AI 知识库

AI 知识库使用独立的 Markdown 内容目录，不通过首页 CSV 维护：

```bash
npm run content:new -- article-slug
npm run content:check
```

- `content:new`：按统一模板创建一篇草稿。
- `content:check`：检查字段、分类、图片、HTTPS 外链、正文和热门推荐排名。
- 详细规则见 `content/ai-knowledge/README.md`。

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

## 重要说明

- 线上部署入口是 Next.js（`app/page.tsx`），不是 `index_副本.html`。
- `index_副本.html` 可作为静态参考稿；如果你希望它成为线上主版本，需要单独切到静态部署方案。

## 安全部署

- 已内置基础安全响应头：`X-Frame-Options`、`X-Content-Type-Options`、`Referrer-Policy`、`Permissions-Policy` 和最小 CSP。
- 已对 `/api/*` 做轻量限流，当前实现是无外部依赖的内存级别限流，适合基础防刷，不适合作为强一致的生产级防护。
- 已对明显恶意 UA 和不支持的方法做基础拦截。
- 如果后续增加登录、写入接口或后台管理，建议再补一层 Vercel Firewall / WAF、验证码、持久化限流和鉴权。

## 下一步（可选）

- 将 `lib/content.ts` 拆分为数据库或 CMS 数据源
- 用 `app/api/content/route.ts` 对接真实后端（Prisma + PostgreSQL / Supabase）
- 增加后台管理页，实现在线编辑文章、项目和知识库内容
