import styles from "./vit.module.css";

const patchTiles = Array.from({ length: 16 }, (_, index) => <span key={index} />);

export function ViTCardDiagram() {
  return (
    <div className={styles.cardArt} role="img" aria-label="图像切成 patch，编码为 token 序列后交给 Transformer，最终由分类 token 预测类别。">
      <div className={styles.cardImage}>
        <div className={styles.cardPatchGrid} aria-hidden="true">{patchTiles}</div>
        <small>图像块</small>
      </div>
      <span className={styles.cardArrow} aria-hidden="true">→</span>
      <div className={styles.cardTokens}>
        <small>Token 序列</small>
        <div><b>[CLS]</b><span>P₁</span><span>P₂</span><span>…</span></div>
        <span>加入位置向量</span>
      </div>
      <span className={styles.cardArrow} aria-hidden="true">→</span>
      <div className={styles.cardOutput}>
        <strong>Transformer</strong>
        <small>[CLS] → 类别</small>
      </div>
    </div>
  );
}

export function ViTHeroDiagram() {
  return (
    <div className={styles.heroArt} role="img" aria-label="一张 224 乘 224 图像被切成 196 个 16 乘 16 的 patch，每个 patch 加位置向量并与 CLS token 一起送入 Transformer 编码器，CLS 表示用于分类。">
      <div className={styles.artTopline}><span>IMAGE → PATCH TOKENS</span><span>ViT-B/16 · 示意</span></div>
      <div className={styles.heroFlow}>
        <div className={styles.heroImageStage}>
          <div className={styles.heroPatchGrid} aria-hidden="true">{patchTiles}</div>
          <strong>224 × 224</strong>
          <small>图像切成 16 × 16 块</small>
        </div>
        <span className={styles.heroArrow} aria-hidden="true">→</span>
        <div className={styles.heroTokenStage}>
          <small>Token 序列</small>
          <div className={styles.heroTokens} aria-hidden="true"><b>[CLS]</b><span>P₁</span><span>P₂</span><span>P₃</span><i>…</i><span>P₁₉₆</span></div>
          <strong>196 个 patch + 1 个分类 token</strong>
          <small>每个 token 加上位置向量</small>
        </div>
        <span className={styles.heroArrow} aria-hidden="true">→</span>
        <div className={styles.heroEncoderStage}>
          <strong>Transformer</strong>
          <span>Self-attention</span>
          <span>MLP × L 层</span>
          <small>[CLS] → 图像类别</small>
        </div>
      </div>
      <p className={styles.heroCaption}>先切块，再让不同位置交换信息。</p>
    </div>
  );
}

export function ViTMethodDiagram() {
  return (
    <figure className={styles.methodFigure}>
      <div className={styles.methodFlow} role="img" aria-label="Vision Transformer 信息流：图像分块并线性投影，加入位置向量和 CLS token，经过多层自注意力与 MLP，取最终 CLS 表示进行分类。">
        <div className={styles.methodStage}>
          <small>01 · 切成 patch</small>
          <div className={styles.methodPatchGrid} aria-hidden="true">{patchTiles}</div>
          <strong>输入图像</strong>
          <span>H × W × C</span>
        </div>
        <span className={styles.methodArrow} aria-hidden="true">→</span>
        <div className={styles.methodStage}>
          <small>02 · 投影并加入位置</small>
          <div className={styles.methodTokenRow} aria-hidden="true"><b>[CLS]</b><span>P₁</span><span>P₂</span><i>…</i></div>
          <strong>每块映射为 D 维向量</strong>
          <span>加上可学习的位置向量</span>
        </div>
        <span className={styles.methodArrow} aria-hidden="true">→</span>
        <div className={styles.methodStage}>
          <small>03 · 编码并分类</small>
          <div className={styles.encoderStack} aria-hidden="true"><span>Self-attention</span><span>MLP</span><i>重复 L 层</i></div>
          <strong>最终 [CLS] 表示</strong>
          <span>送入分类头预测类别</span>
        </div>
      </div>
      <figcaption>图 01 · 依据原论文图 1 重绘的信息流示意。点阵只表示图像被切块，不是实际图片或模型注意力结果。</figcaption>
    </figure>
  );
}
