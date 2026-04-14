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
