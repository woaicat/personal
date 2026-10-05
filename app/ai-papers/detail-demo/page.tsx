import type { Metadata } from "next";
import { BrainCircuit, Monitor } from "lucide-react";
import { papers } from "@/content/ai-papers/papers";
import PaperDetailLayout from "@/components/ai-papers/detail/PaperDetailLayout";
import PaperHero from "@/components/ai-papers/detail/PaperHero";
import PaperSection from "@/components/ai-papers/detail/PaperSection";
import PaperProse from "@/components/ai-papers/detail/PaperProse";
import CollaborationFigure from "@/components/ai-papers/detail/demo/CollaborationFigure";
import styles from "@/components/ai-papers/detail/demo/demo.module.css";

export const metadata: Metadata = {
  title: "论文详情页样式预览 | JiaXuan GAO",
  description: "论文图解新详情页的组件与排版预览，以《人机共生》内容节选展示阅读效果。",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } }
};

const paper = papers.find((item) => item.slug === "licklider")!;
const contents = [
  { id: "idea", title: "核心思想" },
  { id: "collaboration", title: "图解协作" },
  { id: "takeaways", title: "启发与边界" }
];

export default function PaperDetailDemoPage() {
  return (
    <PaperDetailLayout paper={paper} preview contents={contents} hero={
      <PaperHero paper={paper} authors="J. C. R. Licklider" publication="IRE · 1960" description="计算机不只替人执行已经想好的任务，也可以参与问题形成、方案探索和决策。这篇发表于 1960 年的论文，描绘了一种持续往返的人机合作。" visual={
        <div className={styles.heroArt} role="img" aria-label="人负责目标与判断，计算机负责计算与反馈，双方持续往返协作。">
          <div className={styles.artTop}><span>MAN–COMPUTER SYMBIOSIS</span><span>1960</span></div>
          <div className={styles.artNodes}>
            <div className={styles.artNode}><BrainCircuit size={36} strokeWidth={1.3} aria-hidden="true" /><strong>人</strong><span>目标 · 判断</span></div>
            <svg className={styles.artArrow} viewBox="0 0 48 44" fill="none" aria-hidden="true"><path d="M3 13h39m-7-7 7 7-7 7M45 31H6m7-7-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div className={styles.artNode}><Monitor size={36} strokeWidth={1.3} aria-hidden="true" /><strong>计算机</strong><span>计算 · 反馈</span></div>
          </div>
          <p className={styles.artCaption}>让计算机成为思考过程的一部分。</p>
        </div>
      } />
    }>
      <PaperSection {...contents[0]} number="01" label="核心思想" title="从执行任务，到参与思考">
        <PaperProse>
          <p>假设你正在解决一个复杂问题。按照论文所描述的传统计算机使用方式，你通常要先把事情想明白：要算什么、按什么步骤算、可能出现哪些情况，再让程序员把这些步骤写成程序。</p>
          <p>但真正复杂的问题，往往不会一开始就完全清晰。人可能先看一部分数据，才产生新的想法；先尝试一个方案，才知道下一步应该问什么。Licklider 因此提出：<strong>计算机应该进入人的思考过程，帮助人形成问题，而不只是执行已经定义好的任务。</strong></p>
          <h3>为什么“来回合作”很重要？</h3>
          <p>人提出一个大致问题，计算机及时查资料、做计算或执行模拟；人看到反馈后调整自己的想法，再让计算机继续处理。答案就在这样的持续互动中逐渐形成。</p>
          <blockquote><p>可以把这个思想概括为：人决定往哪里想，计算机帮助展开这个想法可能带来的结果。</p></blockquote>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[1].id} number="02" label="图解协作" title="一个问题，如何在人与计算机之间流动？" description="把持续往返的合作拆开，可以看到三个相互衔接的步骤。">
        <CollaborationFigure />
      </PaperSection>

      <PaperSection id={contents[2].id} number="03" label="启发与边界" title="值得保留的思想，也有需要记住的前提">
        <PaperProse>
          <h3>这篇论文带来的启发</h3>
          <ul>
            <li><strong>帮助人形成问题。</strong>有价值的计算支持，也可以发生在人还没有想清楚问题的时候。</li>
            <li><strong>减少准备工作的负担。</strong>检索、整理、计算和转换信息，都可能影响思考的效率。</li>
            <li><strong>让反馈及时发生。</strong>如果交流足够自然、及时，人和计算机才能保持持续互动。</li>
          </ul>
          <h3>不要把研究设想当成实验结论</h3>
          <p>《人机共生》主要提出一种合作愿景和实现条件，并没有报告一套已经建成的共生系统。它对人与计算机能力的判断，也受到当时技术条件的影响。</p>
          <p>读这篇论文时，可以把它当成一个思考起点：<strong>除了更快地执行指令，计算机还能怎样帮助人把问题想清楚？</strong></p>
        </PaperProse>
      </PaperSection>
    </PaperDetailLayout>
  );
}
