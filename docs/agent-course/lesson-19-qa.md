# 第十九课 Agent 参与支付和交易 · 快速检查

日期：2026-09-29

## 实现范围

- 按三张参考图实现正文，顶部至本课要点、右侧大纲、继续学习和正文一级、二级标题按用户要求复用统一规范。
- 新增第 19 课目录、元数据、正文与专属样式，衔接第 18 → 19 课，继续使用既有本地学习进度。
- 保留第 18 课已有的页脚处理，仅修正其右侧下一课入口；课程回顾课数由目录动态计算。

## 检查结果

- 修改文件 ESLint、`npm run typecheck`、`git diff --check` 通过。
- 本地 `/zero-to-one/agent/19` 正常加载，显示三个一级章节、MPP / APOP / 支付宝方案与授权治理内容。
- 八个大纲锚点全部存在；实际点击 APOP 大纲后对应章节到达视口顶部。
- 实际点击第 18 课右侧下一课可进入第 19 课；从第 19 课返回目录再进入第 19 课正常。
- 桌面 CSS 视口 1586 × 992，页面 `scrollWidth = clientWidth = 1571`；手机 CSS 视口 390 × 844，`scrollWidth = clientWidth = 375`，均无整页横向溢出。差值 15px 为滚动条宽度。
- 手机正文流程转为纵向，箭头随方向调整；检查正文元素未发现超出视口右边界的元素。
- 浏览器 error 日志为空，无 Next.js 错误覆盖层。
- 固定框架与章节标题使用原有组件 / CSS，不新增页面级颜色、字号或间距覆盖；新正文为服务器组件，无新增浏览器存储或外部 API。

## 视觉证据

- 原图：`output/agent-course/lesson-19-ui/` 内三张图片。
- 首屏：`/tmp/lesson19-desktop-overview.png`、`/tmp/lesson19-mobile-overview.png`。
- 正文：`/tmp/lesson19-desktop-mpp.png`、`/tmp/lesson19-desktop-apop.png`、`/tmp/lesson19-desktop-governance.png`。
- 并列对照：`/tmp/lesson19-overview-comparison.jpg`、`/tmp/lesson19-mpp-apop-comparison.jpg`、`/tmp/lesson19-governance-comparison.jpg`。
- 统一框架、标题层级、留白与最后一课收束方式是用户指定的设计差异；其余正文卡片、流程、付款闸门、意图校验及授权对照按参考图组织。

## 检查边界

按用户要求做快速检查，未执行全面 E2E、生产构建、逐像素比对或协议事实调研。参考图片作为正文内容输入，浏览器截图仅用于本地布局核对。

final result: passed
