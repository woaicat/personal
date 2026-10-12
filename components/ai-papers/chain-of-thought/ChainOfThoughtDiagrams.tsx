import styles from "./chain-of-thought.module.css";

function Flow({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className={styles.flow} aria-hidden="true">
      <span className={styles.questionNode}>题目</span>
      <span className={styles.arrow}>→</span>
      {detailed ? <><span className={styles.stepNode}>拆条件</span><span className={styles.arrow}>→</span><span className={styles.stepNode}>算关系</span><span className={styles.arrow}>→</span></> : null}
      <span className={styles.answerNode}>答案</span>
    </div>
  );
}

export function ChainOfThoughtCardDiagram() {
  return (
    <div className={styles.card} role="img" aria-label="两种少样本示例格式对比。普通提示给题目和答案；思维链提示在题目与答案之间展示拆条件、算关系的中间步骤。流程只表示提示结构，不表示每次回答都正确。">
      <div className={styles.cardTop}><strong>同一题 · 两种示例格式</strong><span>结构示意</span></div>
      <div className={styles.cardRow}><small>普通提示</small><Flow /></div>
      <div className={styles.cardRow}><small>思维链提示</small><Flow detailed /></div>
    </div>
  );
}

export function ChainOfThoughtHeroDiagram() {
  return (
    <div className={styles.hero} role="img" aria-label="少样本思维链提示机制：把题目、分步过程和答案写进少量示例，放入提示词。参数不变的语言模型接到新题后，按相同格式先生成中间步骤，再给出答案。示意不代表模型总会算对。">
      <div className={styles.heroTop}><span>CHAIN OF THOUGHT</span><span>提示结构示意</span></div>
      <div className={styles.heroExample} aria-hidden="true">
        <small>提示词里的示例</small>
        <div><span>题目</span><i>→</i><span className={styles.highlight}>步骤 1</span><i>→</i><span className={styles.highlight}>步骤 2</span><i>→</i><span>答案</span></div>
      </div>
      <div className={styles.heroModel} aria-hidden="true"><span>↓</span><strong>语言模型</strong><small>参数不变 · 根据示例续写</small><span>↓</span></div>
      <div className={styles.heroNew} aria-hidden="true">
        <small>遇到一道新题</small>
        <div><span>新题</span><i>→</i><span className={styles.highlight}>生成步骤</span><i>→</i><span>最终答案</span></div>
      </div>
      <p>步骤为讲解示意，不能保证推导正确。</p>
    </div>
  );
}

export function ChainOfThoughtMethodDiagram() {
  return (
    <figure className={styles.methodFigure}>
      <div className={styles.methodDiagram} role="img" aria-label="自编算术示意：示例题是三盒饼干每盒四块，吃掉五块；示例写出三乘四等于十二、十二减五等于七，最后答七块。新题是两袋糖每袋六颗，送出三颗；模型参照示例的格式，生成两乘六等于十二、十二减三等于九，再答九颗。这只是解释输入与输出格式，不是论文实验样本。">
        <div className={styles.methodPanel} aria-hidden="true">
          <small>① 提示词中：示范做法</small>
          <strong>3 盒饼干，每盒 4 块，吃掉 5 块，还剩多少？</strong>
          <div className={styles.reasonSteps}><span>先求总数 · 3 × 4 = 12</span><span>再扣除吃掉的 · 12 − 5 = 7</span></div>
          <b>答案：7 块</b>
        </div>
        <div className={styles.methodConnector} aria-hidden="true"><span>↓</span><strong>模型参照格式续写</strong><small>不更新模型参数</small><span>↓</span></div>
        <div className={styles.methodPanel} aria-hidden="true">
          <small>② 新题：先输出步骤，再给答案</small>
          <strong>2 袋糖，每袋 6 颗，送出 3 颗，还剩多少？</strong>
          <div className={styles.reasonSteps}><span>先求总数 · 2 × 6 = 12</span><span>再扣除送出的 · 12 − 3 = 9</span></div>
          <b>答案：9 颗</b>
        </div>
      </div>
      <figcaption>图 01 · 根据原论文 §2 与图 1 自编的输入输出格式示意。题目、步骤和答案不是论文实验样本，也不代表真实模型一定生成这些文字。</figcaption>
    </figure>
  );
}

export function ChainOfThoughtAblationDiagram() {
  return (
    <figure className={styles.ablationFigure}>
      <div className={styles.ablationDiagram} role="img" aria-label="原论文图五的消融实验定性总结：只输出公式、只多生成圆点、先答案后步骤，在困难的GSM8K设置中都未取得完整思维链那样的提升；让自然语言步骤先于答案的提示效果更好。图中线条长度不代表准确率。">
        <div><span>只写公式</span><i className={styles.shortLine} /><small>困难题帮助有限</small></div>
        <div><span>多生成圆点</span><i className={styles.shortLine} /><small>接近普通提示</small></div>
        <div><span>答案后再解释</span><i className={styles.shortLine} /><small>接近普通提示</small></div>
        <div className={styles.ablationWinner}><span>步骤先于答案</span><i className={styles.longLine} /><strong>提升明显</strong></div>
      </div>
      <figcaption>图 02 · 原论文 §3.3、图 5 的定性重绘，针对其所测模型与 GSM8K 等设置；线条只表示相对趋势，不是实验数值。</figcaption>
    </figure>
  );
}

const results = [
  { name: "GSM8K", standard: 17.9, cot: 56.9 },
  { name: "SVAMP", standard: 69.4, cot: 79.0 },
  { name: "ASDiv", standard: 72.1, cot: 73.9 }
];

export function ChainOfThoughtResults() {
  return (
    <figure className={styles.results}>
      <div className={styles.resultTitle}><strong>同一个 PaLM 540B，只换提示格式</strong><span>答对率 · % · 越高越好</span></div>
      <div className={styles.resultRows}>
        {results.map((result) => (
          <div className={styles.resultRow} key={result.name}>
            <strong>{result.name}</strong>
            <div className={styles.resultBars}>
              <div><span>普通</span><i style={{ width: `${result.standard}%` }} /><b>{result.standard.toFixed(1)}%</b></div>
              <div><span>步骤</span><i className={styles.cotBar} style={{ width: `${result.cot}%` }} /><b>{result.cot.toFixed(1)}%</b></div>
            </div>
          </div>
        ))}
      </div>
      <figcaption>图 03 · 原论文附录 B 表 2 的三组算术任务结果。均为 PaLM 540B；“步骤”指少样本思维链提示。条形按 0–100% 比例绘制，其余设置与完整结果见原表。</figcaption>
    </figure>
  );
}
