import styles from "./ddpm.module.css";

const cells = Array.from({ length: 25 }, (_, index) => <span key={index} />);

function ImageTile({ state, label }: { state: "clear" | "mixed" | "noise"; label: string }) {
  return <span className={styles.tileWrap}><span className={`${styles.tile} ${styles[state]}`} aria-hidden="true">{cells}</span><strong>{label}</strong></span>;
}

function ProcessRow({ reverse = false, compact = false }: { reverse?: boolean; compact?: boolean }) {
  return (
    <div className={`${styles.row} ${compact ? styles.compact : ""}`}>
      <ImageTile state={reverse ? "noise" : "clear"} label={reverse ? "随机噪声" : "真实图片"} />
      <span className={styles.arrow} aria-hidden="true">→</span>
      <ImageTile state="mixed" label="中间状态" />
      <span className={styles.arrow} aria-hidden="true">→</span>
      <ImageTile state={reverse ? "clear" : "noise"} label={reverse ? "新图片" : "近似噪声"} />
    </div>
  );
}

export function DdpmCardDiagram() {
  return (
    <div className={styles.card} role="img" aria-label="DDPM 机制示意。正向把真实图片逐步加噪，直到接近随机噪声；反向从新抽取的随机噪声逐步去噪，生成新图片。方格仅表示状态变化，不是真实实验图片。">
      <div className={styles.cardLine}><small>固定加噪</small><ProcessRow compact /></div>
      <div className={styles.cardLine}><small>学习去噪</small><ProcessRow reverse compact /></div>
    </div>
  );
}

export function DdpmHeroDiagram() {
  return (
    <div className={styles.hero} role="img" aria-label="DDPM 的两个方向：真实图片经固定的逐步加噪过程变成近似随机噪声；模型学习相反方向，从新抽取的随机噪声逐步生成新图片。方格仅为机制示意。">
      <div className={styles.topline}><span>DIFFUSION / DDPM</span><span>过程示意</span></div>
      <div className={styles.phase}><span className={styles.phaseLabel}>01 · 正向规则固定</span><ProcessRow /><p>每一步加少量噪声，原图信息逐渐消失</p></div>
      <div className={styles.divider} />
      <div className={styles.phase}><span className={styles.phaseLabel}>02 · 反向网络学习</span><ProcessRow reverse /><p>从新噪声出发，重复去噪得到新图片</p></div>
    </div>
  );
}

export function DdpmProcessDiagram() {
  return (
    <figure className={styles.method}>
      <div className={styles.methodPanel} role="img" aria-label="两条方向相反的路径。训练材料：真实图片经固定规则逐步加噪到近似噪声。生成过程：从新抽取的噪声开始，模型逐步预测噪声并更新，最终得到新图片。中间格子与步数只作示意。">
        <div className={styles.methodHeading}><span>已知图片</span><span>加噪 / 训练材料</span><span>近似噪声</span></div>
        <ProcessRow />
        <div className={styles.methodBridge}>反向网络学习每一步如何往回走 ↓</div>
        <ProcessRow reverse />
        <div className={styles.methodHeading}><span>新抽取噪声</span><span>去噪 / 生成</span><span>新图片</span></div>
      </div>
      <figcaption>图 01 · 根据原论文 §2、§3 重绘。方格和箭头仅说明正反两个方向，不代表论文的真实样本、噪声强度或 1000 步的完整过程。</figcaption>
    </figure>
  );
}
