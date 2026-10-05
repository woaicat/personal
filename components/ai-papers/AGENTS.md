# 论文图解开发约定

- 本次新增的详情页标准仍处于 Demo 待确认阶段，预览路径为 `/ai-papers/detail-demo`。
- 只对后续新增详情页应用；不要为统一样式而改动既有 Licklider、AlexNet、Scaling Laws 页面。
- 新页面使用 `detail/` 下的 `PaperDetailLayout`、`PaperHero`、`PaperSection`、`PaperProse`。模板与尺寸见 `detail/README.md`。
- 标题、正文、列表、引用、图注的字体、字号、行高和间距统一由 `detail/paper-detail.module.css` 管理。每篇专属 CSS 只处理图解或交互的布局与状态，并引用公共 CSS 变量。
- 页头、原文入口、翻页导航和页脚由公共组件负责，不在文章中复制。只链接已有 `explainerUrl` 的相邻论文。
- 正文和页面框架默认使用服务端组件；需要交互时只将交互图解设为客户端组件。
- Demo 内容是现有论文的示例节选，不计入正式目录；保留 noindex，未确认前不推广为正式页面。
- 验证桌面和手机排版、键盘操作、图解交互及导航；禁止为了统一组件而修改历史文章。
