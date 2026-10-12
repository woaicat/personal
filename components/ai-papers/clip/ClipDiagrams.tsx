import styles from "./clip.module.css";

const labels = ["猫", "汽车", "树"];

function MatchMatrix({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.matrix} ${compact ? styles.matrixCompact : ""}`} aria-hidden="true">
      <span className={styles.matrixCorner}>图 × 文</span>
      {labels.map((label) => <span className={styles.matrixColumn} key={`text-${label}`}>{label}文字</span>)}
      {labels.map((label, row) => (
        <div className={styles.matrixRow} key={`image-${label}`}>
          <span className={styles.matrixRowLabel}>{label}图</span>
          {labels.map((column, col) => <span className={row === col ? styles.match : styles.nonMatch} key={column}>{row === col ? "✓" : "·"}</span>)}
        </div>
      ))}
    </div>
  );
}

export function ClipCardDiagram() {
  return (
    <div className={styles.card} role="img" aria-label="讲解示意：三张图片与三段文字组成九种配对，CLIP 学习提高三组真实配对的相似度，降低其余错误配对的相似度。">
      <div className={styles.cardCaption}><span>对比学习</span><span>示意 · 非论文样本</span></div>
      <MatchMatrix compact />
      <div className={styles.cardLegend}><span className={styles.legendMatch}>✓ 真配对</span><span>· 其他组合</span></div>
    </div>
  );
}

export function ClipHeroDiagram() {
  return (
    <div className={styles.hero} role="img" aria-label="CLIP 训练机制示意：图像编码器和文字编码器分别把一批图片和文字变成可比较的向量。比较所有图文组合，沿矩阵对角线的真实配对更接近，其余组合更远。图中的猫、汽车、树仅是讲解示意。">
      <div className={styles.heroTop}><span>CLIP / TRAINING</span><span>图文配对示意</span></div>
      <div className={styles.encoders} aria-hidden="true">
        <div><span className={styles.encoderIcon}>▧</span><strong>图片</strong><small>图像编码器</small></div>
        <span className={styles.encoderArrow}>↘</span>
        <span className={styles.encoderCenter}>共同的比较空间</span>
        <span className={styles.encoderArrow}>↙</span>
        <div><span className={styles.encoderIcon}>≡</span><strong>文字</strong><small>文字编码器</small></div>
      </div>
      <MatchMatrix />
      <p className={styles.heroBottom}><span className={styles.legendMatch}>✓ 对角线：真实配对</span><span>其余：错误配对</span></p>
    </div>
  );
}

export function ClipTrainingDiagram() {
  return (
    <figure className={styles.trainingFigure}>
      <div className={styles.trainingDiagram} role="img" aria-label="讲解示意：同一批三张图片和三段文字分别编码后，两两比较形成三乘三矩阵。真实配对位于对角线，训练让它们相似度更高，让其余配对更低。">
        <div className={styles.trainingInputs} aria-hidden="true">
          <div><small>一批图片</small><span>猫图</span><span>汽车图</span><span>树图</span></div>
          <div><small>各自编码</small><strong>图像向量</strong><strong>文字向量</strong></div>
          <div><small>一批文字</small><span>“一只猫”</span><span>“一辆汽车”</span><span>“一棵树”</span></div>
        </div>
        <div className={styles.trainingArrow} aria-hidden="true">↓ 两两比较相似度</div>
        <MatchMatrix />
        <div className={styles.trainingRule} aria-hidden="true"><strong>✓ 真实配对更近</strong><span>· 错误配对更远</span></div>
      </div>
      <figcaption>图 01 · 根据原论文 §2.3、图 1 与图 3 绘制。猫、汽车、树是讲解示意；格子不代表论文样本或实测分数。</figcaption>
    </figure>
  );
}

export function ClipZeroShotDiagram() {
  return (
    <figure className={styles.zeroShotFigure}>
      <div className={styles.zeroShotDiagram} role="img" aria-label="零样本分类示意：新图片与事先写好的三句候选描述分别编码并比较相似度。示例中猫的描述最相近，于是模型在这三项里选择猫；条形长短不是真实模型分数。">
        <div className={styles.queryImage} aria-hidden="true"><span>▧</span><strong>一张新图片</strong><small>图像编码器</small></div>
        <span className={styles.queryArrow} aria-hidden="true">→</span>
        <div className={styles.candidates} aria-hidden="true">
          <div className={styles.candidateWinner}><span>“一张猫的照片”</span><i /><strong>最相近 ✓</strong></div>
          <div><span>“一张汽车的照片”</span><i /><small>较远</small></div>
          <div><span>“一张树的照片”</span><i /><small>较远</small></div>
        </div>
      </div>
      <figcaption>图 02 · 根据原论文 §3.1.2、图 1 绘制。示例描述和条形长度仅为机制示意，不是论文测试图片或相似度数值。</figcaption>
    </figure>
  );
}
