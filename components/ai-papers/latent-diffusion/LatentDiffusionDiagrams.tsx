import styles from "./latent-diffusion.module.css";

const pixels = Array.from({ length: 36 }, (_, index) => <span key={index} />);
const latents = Array.from({ length: 16 }, (_, index) => <span key={index} />);

function PixelGrid({ compact = false }: { compact?: boolean }) {
  return <span className={compact ? styles.smallPixelGrid : styles.pixelGrid} aria-hidden="true">{pixels}</span>;
}

function LatentGrid({ noisy = false }: { noisy?: boolean }) {
  return <span className={`${styles.latentGrid} ${noisy ? styles.noisy : ""}`} aria-hidden="true">{latents}</span>;
}

export function LatentDiffusionCardDiagram() {
  return (
    <div className={styles.card} role="img" aria-label="两阶段机制示意：先用编码器把图片压缩为保留空间结构的潜表示；生成时从潜空间噪声逐步去噪，再由解码器还原为新图片。">
      <div className={styles.cardRow}>
        <span className={styles.cardLabel}>先学压缩</span>
        <PixelGrid compact /><span className={styles.cardArrow}>→</span><span className={styles.cardChip}>编码器 E</span><span className={styles.cardArrow}>→</span><LatentGrid />
      </div>
      <div className={styles.cardRow}>
        <span className={styles.cardLabel}>再学生成</span>
        <LatentGrid noisy /><span className={styles.cardArrow}>→</span><span className={styles.cardChip}>潜空间去噪</span><span className={styles.cardArrow}>→</span><span className={styles.cardChip}>解码器 D</span><span className={styles.cardArrow}>→</span><PixelGrid compact />
      </div>
    </div>
  );
}

export function LatentDiffusionHeroDiagram() {
  return (
    <div className={styles.hero} role="img" aria-label="潜扩散的两个阶段。第一阶段，真实图片通过编码器成为较小的潜表示，解码器学习还原图片。第二阶段，从随机的潜空间噪声出发，UNet 反复预测和去除噪声，最后由解码器将潜表示还原成新图片。网格大小仅为示意。">
      <div className={styles.heroTopline}><span>LATENT DIFFUSION</span><span>两阶段 · 机制示意</span></div>
      <div className={styles.heroPhase}>
        <small>01 · 先训练图像压缩器</small>
        <div className={styles.heroTrack}>
          <div className={styles.heroNode}><PixelGrid /><strong>真实图片</strong></div>
          <span className={styles.heroArrow}>编码 E →</span>
          <div className={styles.heroNode}><LatentGrid /><strong>潜表示 z</strong></div>
          <span className={styles.heroArrow}>解码 D →</span>
          <div className={styles.heroNode}><PixelGrid /><strong>重建图片</strong></div>
        </div>
      </div>
      <div className={styles.heroDivider} aria-hidden="true" />
      <div className={styles.heroPhase}>
        <small>02 · 再在潜空间学习生成</small>
        <div className={styles.heroTrack}>
          <div className={styles.heroNode}><LatentGrid noisy /><strong>随机噪声</strong></div>
          <span className={styles.heroArrow}>UNet 多步去噪 →</span>
          <div className={styles.heroNode}><LatentGrid /><strong>新潜表示</strong></div>
          <span className={styles.heroArrow}>解码 D →</span>
          <div className={styles.heroNode}><PixelGrid /><strong>新图片</strong></div>
        </div>
      </div>
    </div>
  );
}

export function LatentDiffusionMethodDiagram() {
  return (
    <figure className={styles.method}>
      <div className={styles.methodFlow} role="img" aria-label="训练与生成流程：先训练编码器和解码器，让图片可被压缩和重建；固定压缩器后，在潜表示上加噪并训练 UNet 预测噪声；生成时从随机潜空间噪声多步去噪，再通过解码器得到新图。">
        <div className={styles.methodStage}><small>先学会保留图像要点</small><strong>图片 → E → z → D → 重建</strong><span>压缩器和还原器先训练好；空间尺寸缩小，但尽量保留可感知细节。</span></div>
        <span className={styles.methodArrow} aria-hidden="true">↓</span>
        <div className={styles.methodStage}><small>再学会在 z 上去噪</small><strong>z + 噪声 → UNet 预测噪声</strong><span>固定第一阶段，训练扩散模型；反复去噪的工作发生在潜空间。</span></div>
        <span className={styles.methodArrow} aria-hidden="true">↓</span>
        <div className={styles.methodStage}><small>生成新图片时</small><strong>随机噪声 → 多步去噪 → D → 图片</strong><span>生成过程从随机潜变量开始，不需要先给它一张待复制的原图。</span></div>
      </div>
      <figcaption>图 01 · 根据原论文 §3 与图 3 重绘的两阶段流程。网格和箭头只表达关系，不代表真实像素、潜变量数值或生成结果。</figcaption>
    </figure>
  );
}
