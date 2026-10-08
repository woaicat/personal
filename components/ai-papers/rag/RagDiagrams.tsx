import styles from "./rag.module.css";

export function RagCardDiagram() {
  return (
    <div className={styles.card} role="img" aria-label="问题经过稠密检索得到多个相关片段；每个片段与问题一起交给生成模型，综合各条路径的预测得到答案。">
      <div className={styles.cardQuery}><small>输入</small><strong>问题 x</strong></div>
      <span className={styles.arrow} aria-hidden="true">→</span>
      <div className={styles.cardSearch}><small>DPR 检索</small><div><span>z₁</span><span>z₂</span><span>z₃</span></div></div>
      <span className={styles.arrow} aria-hidden="true">→</span>
      <div className={styles.cardAnswer}><small>BART 生成</small><strong>答案 y</strong></div>
    </div>
  );
}

export function RagHeroDiagram() {
  return (
    <div className={styles.hero} role="img" aria-label="输入问题送入 DPR 检索器，从维基百科索引找出多个带权重的片段；问题与各片段分别送入 BART，最后综合预测得到答案。这是依据论文图 1 绘制的机制示意。">
      <div className={styles.topline}><span>RETRIEVE → GENERATE</span><span>机制示意</span></div>
      <div className={styles.heroQuery}>问题 <strong>x</strong></div>
      <div className={styles.down} aria-hidden="true">↓</div>
      <div className={styles.heroRetriever}><strong>DPR 检索器</strong><span>维基百科片段索引</span></div>
      <div className={styles.down} aria-hidden="true">↓ Top-K + 相关性权重</div>
      <div className={styles.heroPassages}><span>片段 z₁</span><span>片段 z₂</span><span>片段 z₃</span></div>
      <div className={styles.down} aria-hidden="true">↓ 问题 + 每个片段</div>
      <div className={styles.heroGenerator}><strong>BART 生成器</strong><span>分别预测，按检索权重综合</span></div>
      <div className={styles.down} aria-hidden="true">↓</div>
      <div className={styles.heroAnswer}>生成答案 <strong>y</strong></div>
    </div>
  );
}

export function RagMethodDiagram() {
  return (
    <figure className={styles.method}>
      <div className={styles.methodFlow} role="img" aria-label="论文图 1 的信息流：问题编码为查询向量，在固定的维基百科片段索引中寻找 Top-K；每个候选片段分别与问题拼接输入 BART；检索概率与生成概率共同决定答案。">
        <div className={styles.stage}><small>01 · 找材料</small><strong>问题 x → DPR</strong><span>查询向量匹配片段向量</span></div>
        <span className={styles.methodArrow} aria-hidden="true">→</span>
        <div className={styles.stage}><small>02 · 多条候选路径</small><div className={styles.docStack}><span>z₁ · 权重 p₁</span><span>z₂ · 权重 p₂</span><span>z₃ · 权重 p₃</span></div><span>每个片段都与问题一起进入 BART</span></div>
        <span className={styles.methodArrow} aria-hidden="true">→</span>
        <div className={styles.stage}><small>03 · 综合预测</small><strong>生成答案 y</strong><span>对候选文档的预测加权求和</span></div>
      </div>
      <figcaption>图 01 · 根据论文图 1 重绘。三个片段及 p₁～p₃ 仅示意候选路径与权重，不代表真实检索结果；论文训练时使用 Top-5 或 Top-10。</figcaption>
    </figure>
  );
}
