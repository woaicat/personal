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
4. 根据后续 7 条内容批注，新增第 1 节开场、1.2 的 Prompt 与 Hook 解释、2.2 的沙箱实验室说明；替换三个 Hook 案例和最终总结，并删除误删数据提示及其结论。浏览器检查确认新增文案均已出现、删除文案均已移除，控制台无 error。

## Findings

无遗留的 P0、P1 或 P2 问题。参考图中的 A/B 横排和 Sandbox 多栏展示已按用户要求有意改为单列阅读，不作为设计偏差。

## Implementation checklist

- [x] 第 11 课课程元数据、右侧大纲和真实下一课
- [x] Hook / Sandbox / 差异三段正文与可视化内容
- [x] A/B 与 2.1–2.4 的单列阅读布局
- [x] 桌面、移动端与大纲锚点检查

final result: passed

---

# 第 13 课成本优化：第 3、5 节复核

- source visual truth: `/var/folders/y8/2ksmwl8100q83bcd3sglr9hw0000gn/T/codex-clipboard-09f3890a-8a5f-40aa-a670-02e2e589456f.png`（第 3 节，1516 × 442）与 `/var/folders/y8/2ksmwl8100q83bcd3sglr9hw0000gn/T/codex-clipboard-eb2da32b-c5bd-4ac2-9b1e-2f857aeeeca6.png`（第 5 节，1518 × 398）。
- implementation screenshot: `/tmp/lesson13-after-s3-top.png`、`/tmp/lesson13-after-s5-top.png` 与修正后的 `/tmp/lesson13-after-5-reflow.png`；浏览器地址为 `http://127.0.0.1:3000/zero-to-one/agent/13`。
- implementation viewport: CSS `1600 × 691`，截图 `2880 × 1244`，device pixel ratio `1.8`；对照图与实现图已分别裁切到内容区域并合成为 `/tmp/lesson13-qa-comparison.png` 进行比较。
- state: 第 13 课初始浏览状态，分别定位到第 3、5 节顶部。

## 对照结果

- 字体与层级：沿用详情页既有字体与章节层级；五个卡片标题、说明文字和可视化文字均保持独立层级。
- 布局与节奏：第 3 节为五个独立卡片并列展示；第 5 节按 3 + 2 换行，5.4、5.5 位于第二行，卡片内部内容按参考图分行；窄屏通过两列、一列响应式收拢。
- 颜色与令牌：沿用课程绿色强调色、浅绿色信息面、蓝色变化内容面、细边框和圆角。
- 图标与内容：使用项目已有 Lucide 图标实现文档、人员、勾选、菱形、箭头等可视化；未改造 3.1–3.5、5.1–5.5 序号，正文与图解文案按参考图落地。
- 浏览器结构检查：第 3、5 节各显示五个卡片标题；旧的纵向长条结构已移除。

## Findings

用户复核发现第 5 节五列布局下 5.5 的灰度比例图横向溢出；已将第 5 节改为 3 + 2 换行。最新浏览器检查确认 5.4、5.5 均完整显示，页面 `scrollWidth` 与 `clientWidth` 相等。由于参考图是无侧栏的宽幅内容截图，而详情页保留右侧课程大纲，当前实现按主内容区复现卡片结构与图解；这是页面框架差异，不是本次局部实现偏差。

final result: passed

---

# 人工智能论文图解 · 设计验收

## 对照材料

- 目录页绿色参考图：`/Users/gaojiaxuan/.codex/generated_images/01a0cd26-b146-71d3-a6d1-06fe0453571d/exec-da269c0b-df57-4cc6-80b1-f01ec9513a0a.png`
- 解读页绿色参考图：`/Users/gaojiaxuan/.codex/generated_images/01a0cd26-b146-71d3-a6d1-06fe0453571d/exec-c8a58144-18e9-4145-acdf-a31cdfe5d1c9.png`
- 参考图尺寸均为 1487 × 1058；实现图在浏览器 1440 px 桌面视口下导出为 1425 × 1013。比较时按视口宽度观察整体比例、首屏密度、留白和模块次序，没有做逐像素重合检查。

## 最终实现截图

| 页面 | 桌面 | 手机 |
| --- | --- | --- |
| 论文目录 | `output/ai-papers-qa/catalog-1440-final.png` | `output/ai-papers-qa/catalog-390-final.png` |
| AlexNet 解读 | `output/ai-papers-qa/alexnet-1440-final.png` | `output/ai-papers-qa/alexnet-390-final.png` |
| 卷积交互局部 | 桌面解读页向下滚动可见 | `output/ai-papers-qa/alexnet-lab-390-final.png` |

## 核对结果

- **颜色与装饰：** 延续参考图的浅绿、米白、深绿文字和细描边；去掉用户不喜欢的大叶片及手写英文装饰。
- **目录结构：** 保留从上到下逐篇追加的论文列表，按首次公开年份排序；新论文只需加入数据列表。首篇 AlexNet 有可进入的解读页，其余 11 篇先提供原论文入口。
- **解读结构：** 保留参考图的宽松排版、分段阅读和图解卡片。参考图展示 Transformer；本轮按开发范围替换成 AlexNet，并将逐层结构导览放到首个阅读区。
- **桌面首屏：** 调整目录顶部留白和解读页章节顺序后，目录首屏可看到前两篇论文，AlexNet 首屏可看到结构导览入口。
- **手机布局：** 目录卡片与文字按窄屏重排；论文流程图可横向滑动并提供提示；卷积示例中的输入、卷积核、输出改为垂直排列。
- **交互：** 验证目录主题筛选、进入 AlexNet、逐层选择、切换卷积核、选择输出格和 ReLU 开关；浏览器错误日志为空。
- **文案与年份：** 页脚显示 2026。猫图和小矩阵均明确标注为教学示意，不暗示运行了原始 AlexNet 模型。

## 验证

- `npm run check:deploy`：通过，包含 lint、类型检查、内容检查与生产构建。
- `git diff --check`：通过。
- 本地生产预览：`http://127.0.0.1:3000/ai-papers` 与 `http://127.0.0.1:3000/ai-papers/alexnet`。

**final result: passed**

---

# 人工智能论文图解 · 目录批注与易读性修订（2026-09-23）

- 按目录页三条浏览器批注，删除「从 AlexNet 开始」按钮、「首篇图解可阅读 · 后续论文持续补充」说明和「首篇图解」标签。AlexNet 卡片与目录条目仍提供明确的解读入口。
- 在 AlexNet 论文基本信息与正文导航之间加入「小学生也能看懂的解释」，用四段纯文字解释图片数字、卷积、汇总分类和训练过程；收窄桌面阅读宽度。
- 同步把逐层导览、top-5 错误率、问题描述、卷积实验说明及「过拟合」相关文案改为更容易理解的措辞。
- 最终截图：`output/ai-papers-qa/catalog-feedback-1440.png`、`catalog-feedback-390.png`、`alexnet-explanation-1440.png`、`alexnet-explanation-390.png`（均在同一目录下）。
- 在桌面 1440 × 900 与手机 390 × 844 视口检查；手机页面 `scrollWidth` 与 `clientWidth` 相等，浏览器错误日志为空；`npm run check:deploy` 通过。

**final result: passed**
