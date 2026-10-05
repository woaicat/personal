"use client";

import { useState } from "react";
import styles from "./transformer.module.css";

const tokens = ["小猫", "坐在", "温暖的", "垫子上"];
// Hand-set two-dimensional vectors for teaching, not learned model parameters.
const queries = [[1.2, .4], [.7, 1.2], [-.3, 1.4], [.2, 1.5]];
const keys = [[1.4, .1], [.3, 1], [-.4, 1.2], [.8, 1.5]];

export default function AttentionDemo() {
  const [selected, setSelected] = useState(0);
  const [masked, setMasked] = useState(false);
  const scores = keys.map((key, index) => masked && index > selected ? -Infinity : (queries[selected][0] * key[0] + queries[selected][1] * key[1]) / Math.sqrt(2));
  const maximum = Math.max(...scores);
  const exponentials = scores.map((score) => Math.exp(score - maximum));
  const total = exponentials.reduce((sum, value) => sum + value, 0);
  const weights = exponentials.map((value) => value / total);

  return (
    <figure className={styles.figure}>
      <div className={styles.attentionDemo}>
        <div className={styles.figureTop}><span>动手试 · 一个位置，如何参考整句话？</span><span>01 / SELF-ATTENTION</span></div>
        <p className={styles.hint}>先选择一个词，把它作为当前查询 Q。</p>
        <div className={styles.tokens} role="group" aria-label="选择查询词">
          {tokens.map((token, index) => <button type="button" key={token} aria-pressed={selected === index} aria-controls="attention-weights" onClick={() => setSelected(index)}><small>位置 {index + 1}</small>{token}</button>)}
        </div>
        <label className={styles.maskControl}><input type="checkbox" checked={masked} onChange={(event) => setMasked(event.target.checked)} />加上因果遮罩：不看右侧位置</label>
        <div className={styles.weightPanel} id="attention-weights" aria-live="polite" aria-atomic="true">
          <h3>“{tokens[selected]}”把多少注意力分给每个位置？</h3>
          {tokens.map((token, index) => <div className={styles.weightRow} key={token}><span>{token}</span><div className={styles.track}><div style={{ width: `${weights[index] * 100}%` }} /></div><span>{masked && index > selected ? "遮住" : `${(weights[index] * 100).toFixed(1)}%`}</span></div>)}
          <p>{masked ? "右侧位置的分数先设为负无穷，再做 softmax，因此权重为 0。训练解码器时，还要把目标序列右移，避免看到待预测的答案。" : "这些权重之和为 100%（显示值有四舍五入）。接下来，模型按这些比例混合各位置的 V 向量，得到当前位置的新表示。"}</p>
        </div>
      </div>
      <figcaption>教学示意：按短语分成 4 个位置，用手工设置的二维 Q、K 实际计算权重；不是论文模型的分词、参数或可解释性结论。</figcaption>
    </figure>
  );
}
