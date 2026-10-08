import type { Metadata } from "next";
import { papers } from "@/content/ai-papers/papers";
import PaperDetailLayout from "@/components/ai-papers/detail/PaperDetailLayout";
import PaperHero from "@/components/ai-papers/detail/PaperHero";
import PaperSection from "@/components/ai-papers/detail/PaperSection";
import PaperProse from "@/components/ai-papers/detail/PaperProse";
import { ViTHeroDiagram, ViTMethodDiagram } from "@/components/ai-papers/vit/ViTDiagrams";
import styles from "@/components/ai-papers/vit/vit.module.css";

export const metadata: Metadata = {
  title: "ViT 图解：把图像切成 token，交给 Transformer | JiaXuan GAO",
  description: "从 patch 切分、位置编码到分类 token，图解 Vision Transformer 的工作方式，并核对大规模预训练的实验结果与适用边界。",
  alternates: { canonical: "/ai-papers/vit" }
};

const paper = papers.find((item) => item.slug === "vit")!;
const original = "https://arxiv.org/html/2010.11929";
const contents = [
  { id: "question", title: "研究问题" },
  { id: "mechanism", title: "图像变成 token" },
  { id: "evidence", title: "实验结果" },
  { id: "limits", title: "适用边界" }
];

export default function ViTPage() {
  return (
    <PaperDetailLayout paper={paper} contents={contents} hero={
      <PaperHero
        paper={paper}
        authors="Alexey Dosovitskiy 等 12 位作者 · Google Research"
        publication="ICLR 2021 · arXiv v2（2021-06-03）"
        description="ViT 把图像切成一串 patch token，再交给标准 Transformer 编码器处理。它几乎不预设卷积的局部结构；效果的关键，是足够大的预训练数据和之后的迁移。"
        visual={<ViTHeroDiagram />}
      />
    }>
      <PaperSection id={contents[0].id} number="01" label={contents[0].title} title="少了卷积的先验，Transformer 还能看懂图像吗？">
        <PaperProse>
          <p>卷积神经网络（CNN）并不是从零开始认识图像：卷积层会优先处理局部邻域，而且同一组卷积核会在不同位置重复使用。Transformer 则把输入当成一串 token，通过自注意力学习不同位置之间的关系。</p>
          <p>作者的问题很直接：<strong>如果把图像分成小块，像处理词语一样交给标准 Transformer，能不能不靠复杂的视觉专用模块，也做好图像分类？</strong>论文把这套方法称为 Vision Transformer（ViT）。</p>
          <p>答案要加上条件。在中等规模数据集上训练时，ViT 的准确率会比相近规模的 ResNet 低几个百分点；当预训练数据扩展到 1400 万至 3 亿张图像，再迁移到较小的识别任务时，表现明显改善。</p>
          <blockquote><p>这篇论文要说明的不是“卷积没有用”，而是：数据足够大时，模型可以从数据中学到许多视觉关系，不必把所有视觉先验都写进网络结构。</p></blockquote>
          <p>依据：<a href={`${original}#S1`} target="_blank" rel="noopener noreferrer">原论文 §1：研究动机与数据规模</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[1].id} number="02" label={contents[1].title} title="先把一张图片改写成一串向量" description="图像 patch 对应输入 token；位置向量补上空间位置信息，分类 token 汇总整张图的表示。">
        <ViTMethodDiagram />
        <PaperProse>
          <h3>切块、投影、加位置</h3>
          <p>设图片大小为 H × W，每个 patch 是 P × P 像素，那么 Transformer 接收的 patch 数量是 <strong>N = HW / P²</strong>。举例来说，224 × 224 的图片使用 16 × 16 的 patch，会得到 14 × 14 = 196 个 patch。这个数字是便于理解的算术示例，不是单独的实验结果。</p>
          <p>每个 patch 先展平，再经过可学习的线性投影，变成 D 维向量。模型给这些向量加上可学习的位置编码，并在序列开头放入一个可学习的 <strong>[CLS] 分类 token</strong>。经过多层标准 Transformer 编码器后，取最后一层的 [CLS] 表示交给分类头预测类别。</p>
          <h3>图像结构从哪里来？</h3>
          <p>ViT 的自注意力可以让任意两个 patch 交换信息，但它不像 CNN 那样预设哪些 patch 是相邻的。论文使用一维可学习位置编码；作者观察到模型会从数据中学出行列与距离关系。微调到更高分辨率时，patch 数量会增加，论文通过二维插值调整预训练的位置编码。</p>
          <p>依据：<a href={`${original}#S3.SS1`} target="_blank" rel="noopener noreferrer">原论文 §3.1：ViT 结构</a>、<a href={`${original}#S3.SS2`} target="_blank" rel="noopener noreferrer">§3.2：高分辨率微调</a>、<a href={`${original}#S4.SS5`} target="_blank" rel="noopener noreferrer">§4.5：位置编码与注意力分析</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[2].id} number="03" label={contents[2].title} title="预训练数据越大，ViT 越能发挥优势">
        <PaperProse>
          <p>作者用不同规模的数据做预训练，再把模型迁移到图像识别基准。规模从 ImageNet 的 130 万张图像，到 ImageNet-21k 的 1400 万张，再到 JFT-300M 的 3.03 亿张。下表选取原论文表 2 中 ViT-H/14 与 BiT-L（ResNet-152×4 基线）在 JFT-300M 上预训练后的三项结果。</p>
        </PaperProse>
        <figure className={styles.results}>
          <table>
            <caption>准确率（%），在 JFT-300M 上预训练；柱长使用 0–100% 标尺。</caption>
            <thead><tr><th scope="col">基准任务</th><th scope="col">ViT-H/14</th><th scope="col">BiT-L</th></tr></thead>
            <tbody>
              <tr>
                <th scope="row">ImageNet</th>
                <td className={styles.score}><div className={styles.scoreValue}><span>ViT-H/14 · JFT</span><strong>88.55 ± 0.04</strong></div><span className={styles.scoreTrack}><span style={{ width: "88.55%" }} /></span></td>
                <td className={`${styles.score} ${styles.baseline}`}><div className={styles.scoreValue}><span>BiT-L · JFT</span><strong>87.54 ± 0.02</strong></div><span className={styles.scoreTrack}><span style={{ width: "87.54%" }} /></span></td>
              </tr>
              <tr>
                <th scope="row">CIFAR-100</th>
                <td className={styles.score}><div className={styles.scoreValue}><span>ViT-H/14 · JFT</span><strong>94.55 ± 0.04</strong></div><span className={styles.scoreTrack}><span style={{ width: "94.55%" }} /></span></td>
                <td className={`${styles.score} ${styles.baseline}`}><div className={styles.scoreValue}><span>BiT-L · JFT</span><strong>93.51 ± 0.08</strong></div><span className={styles.scoreTrack}><span style={{ width: "93.51%" }} /></span></td>
              </tr>
              <tr>
                <th scope="row">VTAB · 19 项任务</th>
                <td className={styles.score}><div className={styles.scoreValue}><span>ViT-H/14 · JFT</span><strong>77.63 ± 0.23</strong></div><span className={styles.scoreTrack}><span style={{ width: "77.63%" }} /></span></td>
                <td className={`${styles.score} ${styles.baseline}`}><div className={styles.scoreValue}><span>BiT-L · JFT</span><strong>76.29 ± 1.70</strong></div><span className={styles.scoreTrack}><span style={{ width: "76.29%" }} /></span></td>
              </tr>
            </tbody>
          </table>
        </figure>
        <PaperProse>
          <p className={styles.resultsNote}>表中是原论文报告的均值 ± 标准差，来自三次微调运行；只在同一基准任务内比较数值，不把不同任务的准确率横向比较。表 2 还报告了 ImageNet-ReaL 90.72%、CIFAR-10 99.50% 等结果。</p>
          <h3>准确率之外，还比较了预训练计算量</h3>
          <p>在 JFT-300M 上更受控的规模研究中，作者报告：在五个数据集的平均性能与计算量折中上，ViT 达到同等表现所需的预训练计算量约为 ResNet 的 1/2 至 1/4。作者也提醒，优化器、训练时长和权重衰减等设置会影响效率比较，因此这不是对所有训练条件都成立的定律。</p>
          <p>依据：<a href={`${original}#S4.SS2`} target="_blank" rel="noopener noreferrer">原论文 §4.2 与表 2：基准结果</a>、<a href={`${original}#S4.SS4`} target="_blank" rel="noopener noreferrer">§4.4：计算量受控的规模研究</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[3].id} number="04" label={contents[3].title} title="它的优势，建立在规模和任务范围上">
        <PaperProse>
          <ul>
            <li><strong>数据较少时，CNN 的先验仍然有价值。</strong>在较小预训练数据集上，ViT 更容易过拟合；作者发现卷积对小数据训练有帮助，较大的数据集则让 ViT 学到足够多的视觉模式。</li>
            <li><strong>最强结果依赖大规模预训练。</strong>领先的 ViT-H/14 结果使用了含 3.03 亿张图像的 JFT-300M。论文也报告了 ImageNet-21k 预训练模型，但不同训练数据和规模会带来结果差异。</li>
            <li><strong>核心评估仍是图像分类与迁移。</strong>VTAB 包含多类视觉数据，但评估形式仍是分类。作者把目标检测、分割等视觉任务列为后续挑战，不能把本论文当成 ViT 已经在所有视觉任务上胜出。</li>
            <li><strong>自监督结果还只是初步尝试。</strong>遮盖 patch 预测让 ViT-B/16 在 ImageNet 上达到 79.9%，比从头训练高约 2 个百分点，但仍比监督预训练低约 4 个百分点。</li>
          </ul>
          <blockquote><p>ViT 证明的是：在足够大的数据上预训练，再迁移到多个图像识别任务，标准 Transformer 可以成为很强的视觉模型；它没有证明卷积在小数据或所有任务里都多余。</p></blockquote>
          <p>依据：<a href={`${original}#S4.SS3`} target="_blank" rel="noopener noreferrer">原论文 §4.3：预训练数据需求</a>、<a href={`${original}#S4.SS6`} target="_blank" rel="noopener noreferrer">§4.6：自监督实验</a>、<a href={`${original}#S5`} target="_blank" rel="noopener noreferrer">§5：结论与后续挑战</a>。</p>
        </PaperProse>
      </PaperSection>
    </PaperDetailLayout>
  );
}
