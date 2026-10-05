"use client";

import { useState } from "react";
import { ArrowRight, ListOrdered, MessageSquareText, RefreshCw } from "lucide-react";
import styles from "./instructgpt.module.css";

const stages = [
  { short: "SFT", title: "人写示范", icon: MessageSquareText, heading: "先看一份符合要求的答案", description: "标注员为提示写出理想回答，模型用监督学习模仿这些示范。此时直接训练的是生成回答的模型。", input: "提示 + 人类示范回答", output: "初步会遵循指令的 SFT 模型" },
  { short: "RM", title: "人排优劣", icon: ListOrdered, heading: "同一个问题，哪份回答更好？", description: "让模型生成多个候选回答，标注员比较并排序。另一个奖励模型学习这种相对偏好；它输出分数，并不负责写最终答案。", input: "提示 + 候选回答 + 偏好排序", output: "能预测偏好的奖励模型 RM" },
  { short: "PPO", title: "模型练习", icon: RefreshCw, heading: "把评价信号变成模型的行为变化", description: "从 SFT 模型出发，生成回答，用奖励模型评分，再通过 PPO 更新生成模型。奖励模型在这一轮优化中固定，不是每次都请人现场打分。", input: "提示 + 固定的奖励模型", output: "进一步贴近偏好的生成模型" }
];

export default function TrainingFlow() {
  const [active, setActive] = useState(0);
  const [choice, setChoice] = useState<"A" | "B" | null>(null);
  const stage = stages[active];
  return (
    <figure className={styles.figure}>
      <div className={styles.training}>
        <div className={styles.figureTop}><span>一条指令，三种学习信号</span><span>点击步骤查看</span></div>
        <div className={styles.stageButtons} role="group" aria-label="选择训练阶段">
          {stages.map((item, index) => <button key={item.short} type="button" aria-pressed={active === index} aria-controls="training-stage" onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")} / {item.short}</span><item.icon size={24} strokeWidth={1.5} aria-hidden="true" /><strong>{item.title}</strong></button>)}
        </div>
        <div className={styles.prompt}><span>示例指令</span><p>用三句话通知同事：周三下午两点，在会议室 A 开项目复盘会，请提前准备进展。</p></div>
        <div id="training-stage" className={styles.stagePanel} aria-live="polite">
          <h3>{stage.heading}</h3><p>{stage.description}</p>
          {active === 0 ? <div className={styles.answer}><span>人类示范</span><p>项目复盘会定于周三下午两点举行。<br />地点是会议室 A。<br />请大家提前整理项目进展，准时参加。</p></div> : active === 1 ? <>
            <div className={styles.answers}>
              <button className={styles.answerChoice} type="button" aria-pressed={choice === "A"} onClick={() => setChoice("A")}><span>回答 A</span><p>会议通知应该写清楚时间、地点、议题和参加人员，语气简洁、礼貌。</p><strong>选择 A</strong></button>
              <button className={styles.answerChoice} type="button" aria-pressed={choice === "B"} onClick={() => setChoice("B")}><span>回答 B</span><p>周三下午两点召开项目复盘会。<br />请到会议室 A 参加。<br />请提前准备项目进展。</p><strong>选择 B</strong></button>
            </div>
            <p className={styles.feedback} role="status">{choice === null ? "试着选择更符合这条指令的回答。" : choice === "B" ? "B 直接完成了通知任务，也满足三句话的要求。这种相对偏好可用于训练奖励模型。" : "A 给出了写作建议，却没有写出要求的通知。这个例子中，B 更符合任务和格式要求。"}</p>
          </> : <div className={styles.ppoLoop}><span>生成回答</span><ArrowRight size={18} aria-hidden="true" /><span>RM 评分</span><ArrowRight size={18} aria-hidden="true" /><span>更新策略</span><p>同时用 KL 惩罚约束模型偏离 SFT 参考策略的程度，避免只顾追逐奖励。</p></div>}
          <div className={styles.io}><div><span>用什么训练</span><p>{stage.input}</p></div><div><span>得到什么</span><p>{stage.output}</p></div></div>
        </div>
      </div>
      <figcaption>根据论文图 2 重绘的教学流程。通知及候选回答为原创示例；点击选择仅用于演示，不会上传标注数据或实际训练模型。</figcaption>
    </figure>
  );
}
