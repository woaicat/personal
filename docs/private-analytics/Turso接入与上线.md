# Turso 接入与上线

## 当前进度

2026-09-29：所有者已完成 Turso 注册和登录。`codex/private-analytics` 已实现 Turso libSQL 异步适配器；所有者已创建专用测试库，URL及Token已通过隐藏输入保存在本地忽略文件。云端已建表并通过实际读写、鉴权、网站/页面统计验证；生产环境没有发布。本地服务现连接云端测试库，原SQLite与模拟数据保留在本机。

本方案只需要现有 Vercel 与 Turso，不增加独立账号系统、埋点服务或其他付费服务。Turso Free 当前为 $0，包含5GB存储、每月5亿行读取和1000万行写入；套餐及计费以账号实际显示为准，不启用超额付费或升级。[官方价格](https://turso.tech/pricing)

## 1. 创建免费的专用测试数据库

在 Turso 控制台创建专用数据库，建议名称 `personal-analytics-test`，选择 Free 套餐下的 **libSQL** 数据库，区域尽量靠近现有 Vercel 函数区域。当前代码使用 `@libsql/client`，不要选择另一套 Turso Database Rust 引擎；若界面只提供新引擎，先核对类型再操作。官方仍支持 libSQL 的 SDK。[SDK说明](https://docs.turso.tech/sdk/ts/reference)

创建后在数据库详情取得 **Database URL**（以 `libsql://` 或 `https://` 开头，可包含区域子域名，如 `数据库名.aws-ap-northeast-1.turso.io`）并生成仅用于该测试数据库的读写 **数据库 Token**。不使用组织级或账号管理Token。若设置Token有效期，应记录到期时间，过期前轮换；正式生产再单独确定轮换策略。

官方 CLI 的 libSQL 建库方式是 `turso db create personal-analytics-test`；不要带创建新引擎的 `--tursodb` 标记。本步骤也可以直接在控制台完成，不要求安装CLI。[官方入门](https://docs.turso.tech/quickstart)

## 2. 保存测试连接（不要发送 Token 到聊天）

先停止正在运行的本地开发服务。在项目目录的终端运行：

```sh
npm run analytics:turso:configure
npm run analytics:turso:init
npm run dev
```

第一个命令交互读取URL，并隐藏输入Token，写入被Git忽略、权限0600的 `.env.local`。保留管理员密码哈希、密钥以及原SQLite文件，把存储切换为Turso并设置 `ANALYTICS_DATA_MODE=test`，禁用Preview采集。第二个命令在云端测试库建表，第一次只接受空的专用数据库，不清除已有数据，也不上传本地模拟数据。脚本仅供本地终端，不在构建期间自动运行。

如果尚未配置本地管理员密码，先运行 `npm run analytics:setup`。这个命令会恢复本地SQLite模式，再运行Turso配置命令即可。已有测试密码不需要为了接入数据库而更改；正式管理员密码在生产准备阶段设置。

连接后访问 `/admin`，首次会重新登录：管理员会话存放在对应数据库，原SQLite会话不会迁移。统计页标识“云端测试数据”，空库显示暂无数据。使用未登录的另一个浏览器访问几个公共页面，验证PV、UV、心跳、页面切换及退出后时长；管理员自己的已登录浏览默认排除。

若需要恢复原模拟数据预览，停服务，将 `.env.local` 中 `ANALYTICS_STORAGE` 改回 `local-sqlite`、`ANALYTICS_DATA_MODE` 保持 `test` 后重启。原SQLite文件和模拟数据一直保留；`analytics:demo`不能操作Turso。

## 3. 云端测试验收

- 首次浏览、刷新及页面切换增加PV；重复发送同一事件或序号不增加PV。
- 同一浏览器跨页面/跨日的全周期UV仍去重；多个标签共享单次访问，时长按有效区间并集计算。
- 并发写入依靠数据库写事务；登录/采集限流依靠原子UPSERT共享状态。事务开始的锁冲突有限重试，不重放提交结果不明的事务。
- 登录、退出、会话过期及重启后持久化正常；未登录无法读取后台数据。
- 无配置、无Token、错误类型或未初始化库显示不可用；公共页面继续正常，错误不显示为零访问。
- 记录真实远程响应时延、读取/写入行数和一次访问的事件数量，确认免费额度与实际流量匹配。当前后台每30秒刷新，并读取所选范围内原始记录在服务端聚合；长时间范围可能增加行读取和内存。先实测，必要时再增加缓存或聚合表，不能仅凭PV估算数据库开销。

15项自动测试使用真实SDK本地libSQL库验证存储契约、并发限流、去重及地址校验。另已完成真实远程小规模读写及鉴权验证；这不等于长期流量、额度和大范围查询性能已验证。

## 4. 生产准备（另一步）

云端测试通过后再创建独立的空生产数据库，建议名称 `personal-analytics-prod`，单独Token与密钥。正式库初始化需要另行执行受控迁移，当前测试初始化脚本不会操作 `production` 模式。开发或Preview不能连接正式数据库，也不能复用正式Token；代码无法从URL判断人为配置错的库，应依靠独立命名、连接配置和核对隔离。

Vercel Production 服务端变量：

| 变量 | 值/用途 |
| --- | --- |
| ANALYTICS_STORAGE | turso |
| ANALYTICS_DATA_MODE | production |
| TURSO_DATABASE_URL | 正式libSQL库URL |
| TURSO_AUTH_TOKEN | 正式数据库专用Token |
| ADMIN_PASSWORD_HASH | 正式管理员密码scrypt哈希 |
| ADMIN_SESSION_SECRET | 独立随机密钥，至少32字符 |
| ANALYTICS_ID_SECRET | 独立随机密钥，至少32字符，保持稳定以维持UV口径 |
| ANALYTICS_ENABLED | true，验收后明确开启 |
| ANALYTICS_PREVIEW_ENABLED | false；不把正式变量关联Preview |
| ANALYTICS_DEV_ENABLED | false |

秘密只在服务端读取，不加 `NEXT_PUBLIC_`，不进入Git、截图或客户端代码。正式密码只保存哈希；Cookie和数据库Token均不向公开前端提供。现有SQL只保存访客HMAC标识、粗粒度地域及设备类别，不持久化原始IP或完整UA。

正式上线前仍需补齐：可信Vercel入口的地域编码及中文映射（目前真实采集地域为“未知”）、实际读写与响应时延验证、Token轮换/备份恢复方案、异常采集观察、生产域名和正式采集起点。保留策略目前不自动删除统计历史，过期限流和登录会话按需约每小时清理一次。

生产发布需所有者明确授权。正式库从发布后的首条有效访问开始统计；本地假数据、测试库数据以及旧Vercel Analytics数据均不导入。

## 地址校验修复（2026-09-29）

配置脚本及运行时原先仅允许 `数据库名.turso.io`，会误拒绝带区域子域名的真实Turso地址。现已允许合法的多级 `.turso.io` 子域名，同时保留TLS、域名边界、无嵌入凭据/端口/路径/查询参数等限制。新增CLI回归测试及运行时用例，共15项测试与代码检查通过。配置失败发生在写入前，原本地配置保持不变；重新运行配置命令即可，不需要因本次校验错误重新生成Token。

## 云端连接验证记录（2026-09-29）

- 测试库初始化及重复初始化成功，`analytics_schema`记录结构版本1。Turso云端接口拒绝 `PRAGMA user_version=1`（SQL_PARSE_ERROR: SQL not allowed statement），因此使用普通元数据表标记版本；本地SQLite保留PRAGMA兼容原实现，并写相同标记。不依赖云端可写PRAGMA。
- 使用测试浏览器及公共SDK访问第17课与Agent课程目录，服务器采集响应204。全站UV 1/PV 2，两个页面分别UV 1/PV 1；页面筛选保留全站排行榜。不是上传本地模拟记录，云端初始PV为0。
- 云端保存3段有效活动，累计原始区间41129ms，网站会话时长落在<1分钟档。真实浏览会增加/改变此处测试数据，不代表生产访客。
- 管理员登录200，统计响应200且数据源为 `turso-test`，私有响应 `private, no-store`；未登录401，退出200且退出后统计请求401。密码与Token不出现在验证日志、文档或源码。
- 15项测试、ESLint/TypeScript/内容检查、65页面生产构建通过。浏览器未捕获页面脚本错误。开发服务已恢复，后台标记云端测试数据；切换数据库后原SQLite登录会话不会沿用，应重新登录。

还未配置正式库、Vercel生产变量或发布生产；地域解析、实际用量/大范围性能、正式密码与密钥、备份恢复仍按生产准备阶段落实。
