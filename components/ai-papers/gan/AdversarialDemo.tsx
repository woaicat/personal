"use client";

import { useState } from "react";
import styles from "./gan.module.css";

const stages = [
  { name: "训练判别器", role: "更新 D · 固定 G", title: "先让判别器学会分辨来源", description: "真实样本和生成样本一起交给 D。训练时知道它们的来源：真实样本应判为真，生成样本应判为假。这一步只更新判别器的参数。", feedback: "真实 / 生成的来源标签 → 计算误差 → 更新 D" },
  { name: "训练生成器", role: "更新 G · 固定 D", title: "再让生成器沿着反馈改进", description: "G 生成一批样本，送进 D。希望 D 更倾向于把这些样本判为真；误差的梯度穿过 D，传回 G。这一步固定 D 的参数，但仍通过 D 计算梯度。", feedback: "D 的判断 → 梯度穿过 D → 更新 G" },
  { name: "生成新样本", role: "无需更新参数", title: "训练完成，只留下生成器就能出图", description: "输入新的随机噪声 z，G 就能生成样本。这里不再训练，也不需要判别器逐张审核；不同的噪声提供不同的生成输入。", feedback: "新的随机输入 → 已训练的 G → 新样本" }
];

export default function AdversarialDemo() {
  const [step, setStep] = useState(0);
  const stage = stages[step];
  return (
    <figure className={styles.figure}>
      <div className={styles.demo}>
        <div className={styles.controls} role="group" aria-label="选择 GAN 流程阶段">
          {stages.map((item, index) => <button key={item.name} type="button" aria-pressed={step === index} aria-controls="gan-stage" onClick={() => setStep(index)}><span>0{index + 1}</span>{item.name}</button>)}
        </div>
        <div id="gan-stage" aria-live="polite" aria-atomic="true">
          <div className={styles.flow}>
            <div className={styles.node}><small>INPUT</small><strong>随机噪声 z</strong><span>提供生成的起点</span></div>
            <span className={styles.arrow} aria-hidden="true">→</span>
            <div className={`${styles.node} ${step === 1 ? styles.active : ""}`}><small>GENERATOR</small><strong>生成器 G</strong><span>{step === 1 ? "参数正在更新" : step === 0 ? "参数保持不变" : "使用训练后的参数"}</span></div>
            <span className={styles.arrow} aria-hidden="true">→</span>
            <div className={styles.node}><small>OUTPUT</small><strong>生成样本</strong><span>G(z)</span></div>
          </div>
          {step !== 2 ? <div className={styles.judgeRow}>
            <div className={styles.sources}><span>生成样本 G(z)</span>{step === 0 && <span>真实样本 x</span>}</div>
            <span className={styles.arrow} aria-hidden="true">→</span>
            <div className={`${styles.node} ${step === 0 ? styles.active : ""}`}><small>DISCRIMINATOR</small><strong>判别器 D</strong><span>{step === 0 ? "参数正在更新" : "参数固定 · 梯度仍可通过"}</span></div>
            <span className={styles.arrow} aria-hidden="true">→</span>
            <div className={styles.verdict}><strong>来自真实数据？</strong><span>输出概率，提供学习信号</span></div>
          </div> : <div className={styles.inference}>这一阶段不需要判别器 D</div>}
          <div className={styles.feedback}>{stage.feedback}</div>
          <div className={styles.explanation}><small>{stage.role}</small><h3>{stage.title}</h3><p>{stage.description}</p></div>
        </div>
      </div>
      <figcaption>图 01 · 根据论文方法绘制的流程示意。按钮只切换讲解状态，不运行真实模型；训练中反复交替前两步。</figcaption>
    </figure>
  );
}
