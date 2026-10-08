"use client";

import { useState } from "react";
import styles from "./gpt-3.module.css";

const examples = [
  { input: "这家店的服务很周到。", output: "积极" },
  { input: "等了一小时，饭还是凉的。", output: "消极" },
  { input: "讲解清楚，我很快就学会了。", output: "积极" }
];

const modes = [
  { name: "零样本", count: 0, note: "只有任务说明；模型需要从说明中判断应当怎样续写。" },
  { name: "单样本", count: 1, note: "多给一组输入与答案，展示标签和格式。" },
  { name: "少样本", count: 3, note: "几组示例共同呈现规律；这里用 3 组便于阅读。" }
];

export default function PromptDemo() {
  const [selected, setSelected] = useState(0);
  const mode = modes[selected];

  return (
    <figure className={styles.figure}>
      <div className={styles.demo}>
        <div className={styles.modeButtons} role="group" aria-label="选择上下文示例数量">
          {modes.map((item, index) => (
            <button key={item.name} type="button" aria-pressed={selected === index} aria-controls="gpt3-prompt" onClick={() => setSelected(index)}>
              <span>{item.name}</span><small>{item.count} 组示例</small>
            </button>
          ))}
        </div>

        <div className={styles.flow}>
          <div className={styles.context} id="gpt3-prompt" aria-live="polite" aria-atomic="true">
            <div className={styles.panelTop}><span>INPUT / 输入文本</span><strong>{mode.name}</strong></div>
            <p className={styles.instruction}>任务：判断下面的评价是「积极」还是「消极」。只输出一个标签。</p>
            {examples.slice(0, mode.count).map((example) => (
              <div className={styles.example} key={example.input}>
                <span>评价：{example.input}</span><strong>标签：{example.output}</strong>
              </div>
            ))}
            <div className={styles.question}><span>评价：这部电影让我想再看一遍。</span><strong>标签：<i aria-hidden="true">▍</i></strong></div>
          </div>
          <div className={styles.bridge} aria-hidden="true"><span>→</span></div>
          <div className={styles.model}>
            <span>同一个预训练模型</span>
            <strong>参数不变</strong>
            <p>只改变输入中的说明与示例；模型根据上下文预测后续文本。</p>
            <div className={styles.answer}>可能续写：<b>积极</b></div>
          </div>
        </div>
        <p className={styles.modeNote} role="status">{mode.note}</p>
      </div>
      <figcaption>图 01 · 情绪分类是本站原创的提示词示意，答案并非 GPT-3 的实测输出。论文的少样本评估通常放入约 10–100 组示例，实际数量受任务与 2048 token 上下文窗口限制。</figcaption>
    </figure>
  );
}
