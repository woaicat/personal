"use client";

import { useState } from "react";
import { ArrowRight, BrainCircuit, Monitor, RotateCcw } from "lucide-react";
import styles from "./demo.module.css";

const steps = [
  { title: "人提出问题", role: "人的工作", icon: BrainCircuit, heading: "先有一个值得探索的问题。", body: "人设定目标、提出假设，并决定接下来需要了解什么。问题可以暂时不完整，在探索中逐步变清晰。", example: "比如：这几种方案，哪一种更值得继续研究？" },
  { title: "计算机展开", role: "计算机的工作", icon: Monitor, heading: "把资料和可能性，及时展开。", body: "计算机帮助检索信息、整理材料、执行计算或模拟，把可以程序化的工作接过去，让人能更快看到反馈。", example: "比如：整理各方案的数据，展示不同条件下的结果。" },
  { title: "人调整判断", role: "回到人的思考", icon: RotateCcw, heading: "看过反馈，再决定下一步。", body: "人评价结果是否有意义，修正原来的假设，再提出新的问题。人与计算机持续往返，共同推进对问题的理解。", example: "比如：发现一个遗漏的条件，再请计算机重新比较。" }
];

export default function CollaborationFigure() {
  const [selected, setSelected] = useState(0);
  const current = steps[selected];
  const Icon = current.icon;

  return (
    <figure className={styles.figure}>
      <div className={styles.diagram}>
        <div className={styles.diagramTop}><span>人机协作循环</span><span>选择一个步骤，看看各自的工作</span></div>
        <div className={styles.steps} role="group" aria-label="选择协作步骤">
          {steps.map((step, index) => (
            <button key={step.title} type="button" aria-pressed={index === selected} aria-controls="collaboration-explanation" onClick={() => setSelected(index)}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
              <step.icon size={26} strokeWidth={1.5} aria-hidden="true" />
              <span>{step.title}</span><ArrowRight className={styles.stepArrow} size={17} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className={styles.loopLine}><RotateCcw size={15} aria-hidden="true" /><span>新的判断，带来新的问题</span></div>
        <div className={styles.explanation} id="collaboration-explanation" aria-live="polite" aria-atomic="true">
          <div className={styles.explanationIcon}><Icon size={30} strokeWidth={1.5} aria-hidden="true" /></div>
          <div><p className={styles.role}>{current.role}</p><h3>{current.heading}</h3><p>{current.body}</p><p className={styles.example}>{current.example}</p></div>
        </div>
      </div>
      <figcaption>图 01 · 人机协作循环。根据论文思想绘制的概念示意，非原论文配图。</figcaption>
    </figure>
  );
}
