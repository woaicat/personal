# 第 11 课 Hook 与 Sandbox 视觉验收

- source visual truth: `/Users/gaojiaxuan/Downloads/ChatGPT Image 2026年9月14日 11_08_16.png`
- source pixels: `971 × 1619`
- implementation screenshot: Codex 内嵌浏览器 tab 1，`http://127.0.0.1:3000/zero-to-one/agent/11`，已于 2026-09-14 以与参考图同宽的桌面视图捕获并作视觉对照；该浏览器捕获未持久化为工作区文件。
- implementation viewport: desktop reference-width comparison and `390px` mobile-width comparison
- state: 初次进入课程第 11 课，未触发其他交互状态

## 对照结果

- 字体与层级：沿用详情页的统一标题、说明、元信息、要点、正文与右侧大纲规格；第 11 课未引入新的全局字体或字号体系。
- 布局与节奏：保留主栏 / 右侧大纲的桌面双栏，以及移动端单栏规则。Hook 与 Sandbox 都按截图的章节次序呈现。
- 颜色与令牌：沿用课程既有绿色强调色、浅绿提示面、细边框和 8px 圆角。
- 图标与内容：使用项目既有 Lucide 线性图标；全部内容为可访问的 HTML 文本和结构化图解，没有新增外部图片资源。
- 用户指定偏离：`1.1` 的 A「事件触发机制」与 B「典型案例」改为纵向两块；`2.1`–`2.4` 也改为逐块纵向排列，避免截图式横向压缩。
- 交互：右侧“2.4 使用 Sandbox 需要注意什么”大纲链接已验证跳至 `#section-2-4`；“进入下一课”已验证目标为真实课程顺序的 `/zero-to-one/agent/12`。
- 响应式：桌面与 `390px` 宽度均已浏览器检查；页面根节点未出现横向溢出。浏览器控制台无 error。

## Comparison history

1. 初次实现后，类型检查与 lint 发现未使用的 `Code2` 图标；移除后重新构建成功。
2. 在桌面与移动视图视觉检查后，没有发现需要修复的 P0、P1 或 P2 布局问题。
3. 根据浏览器批注复查后，发现 1.1 与 1.3 只保留了概念节点，未还原参考图的关键流程关系。已将 1.1 改为“纵向事件链 → Hook 判断菱形 → 执行 / 阻止分支”，并将 1.3 改为完整的“任务开始 → Hook → 思考 / 工具执行 → Hook → 任务完成”时序链；在桌面评论视图再次检查，无页面横向溢出，浏览器控制台无 error。

## Findings

无遗留的 P0、P1 或 P2 问题。参考图中的 A/B 横排和 Sandbox 多栏展示已按用户要求有意改为单列阅读，不作为设计偏差。

## Implementation checklist

- [x] 第 11 课课程元数据、右侧大纲和真实下一课
- [x] Hook / Sandbox / 差异三段正文与可视化内容
- [x] A/B 与 2.1–2.4 的单列阅读布局
- [x] 桌面、移动端与大纲锚点检查

final result: passed
