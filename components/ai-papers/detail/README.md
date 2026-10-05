# 新增论文详情页模板（Demo 待确认）

本地预览：`/ai-papers/detail-demo`。仅影响以后新增的详情页，不迁移现有三篇。

## 四个公共组件

| 组件 | 负责内容 |
| --- | --- |
| PaperDetailLayout | 顶部导航、吸顶页内目录、页面宽度、原文入口、上一篇/下一篇、页脚 |
| PaperHero | 论文标题、原文标题、作者、发表信息、简介；可选的右侧图解 |
| PaperSection | 章节编号、标签、二级标题、简介、间距与锚点；图解与正文共用同一内容宽度 |
| PaperProse | 正文段落、三级标题、列表、强调、引用、链接、图片与图注 |

页面外框最大宽度 1240px，正文、章节标题、目录和图解统一为最大 800px，左右对齐，不再提供图解独立加宽模式。字体沿用 Space Grotesk / 苹方 / 系统无衬线字体。

目录滚动到顶部后吸附在站点导航下方，阅读正文时持续可见；手机端保持单行，超出宽度可横向滑动。章节锚点预留两层导航高度，跳转后标题不会被遮挡。若站点导航高度调整，同步更新 `--detail-header-height`。

| 项目 | 桌面端 | 手机端（≤720px） |
| --- | --- | --- |
| 文章标题 | 48px | 32px |
| 章节标题 | 32px | 26px |
| 小标题 | 22px | 20px |
| 正文 / 行高 | 16px / 1.9 | 16px / 1.9 |
| 辅助信息、图注 | 14px | 14px |
| 章节间距 | 64px | 44px |

代码使用 rem 支持用户字体偏好；表中 px 按默认 16px 根字号换算。统一数值位于 `paper-detail.module.css`，文章不要覆盖这些变量。图解中的文字也应引用公共变量。

## 最小页面模板

在 `app/ai-papers/<slug>/page.tsx` 中创建新页面，并从 `content/ai-papers/papers.ts` 读取已登记的论文。页面 metadata 使用自身标题、描述和 canonical。确认文章可阅读后才添加 `explainerUrl`。

```tsx
import { papers } from "@/content/ai-papers/papers";
import PaperDetailLayout from "@/components/ai-papers/detail/PaperDetailLayout";
import PaperHero from "@/components/ai-papers/detail/PaperHero";
import PaperSection from "@/components/ai-papers/detail/PaperSection";
import PaperProse from "@/components/ai-papers/detail/PaperProse";

const paper = papers.find((item) => item.slug === "替换为已登记的slug")!;
const contents = [{ id: "idea", title: "核心思想" }];

export default function Page() {
  return (
    <PaperDetailLayout
      paper={paper}
      contents={contents}
      hero={<PaperHero paper={paper} authors="作者" publication="会议或期刊 · 年份" />}
    >
      <PaperSection id="idea" number="01" label="核心思想" title="章节标题">
        <PaperProse>
          <p>正文内容。<strong>需要强调的结论。</strong></p>
          <h3>小标题</h3>
          <p>进一步解释。</p>
        </PaperProse>
      </PaperSection>
    </PaperDetailLayout>
  );
}
```

只在 `PaperHero` 的 `visual`、`PaperSection` 的 children 中加入专属图解。整页保持一个 h1，章节用 h2，正文小标题用 h3。不要复制 Demo 的示例内容、`preview` 开关或 noindex 到正式文章。
