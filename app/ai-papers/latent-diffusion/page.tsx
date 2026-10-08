import type { Metadata } from "next";
import { papers } from "@/content/ai-papers/papers";
import PaperDetailLayout from "@/components/ai-papers/detail/PaperDetailLayout";
import PaperHero from "@/components/ai-papers/detail/PaperHero";
import PaperSection from "@/components/ai-papers/detail/PaperSection";
import PaperProse from "@/components/ai-papers/detail/PaperProse";
import { LatentDiffusionHeroDiagram, LatentDiffusionMethodDiagram } from "@/components/ai-papers/latent-diffusion/LatentDiffusionDiagrams";
import styles from "@/components/ai-papers/latent-diffusion/latent-diffusion.module.css";

export const metadata: Metadata = {
  title: "潜扩散模型图解：先压缩，再生成 | JiaXuan GAO",
  description: "通俗图解潜扩散模型 LDM：为什么离开像素空间、自动编码器与潜空间去噪如何接力、文字条件怎样控制生成，以及论文中的效率实验和适用边界。",
  alternates: { canonical: "/ai-papers/latent-diffusion" }
};

const paper = papers.find((item) => item.slug === "latent-diffusion")!;
const original = "https://arxiv.org/html/2112.10752";
const contents = [
  { id: "problem", title: "研究问题" },
  { id: "two-stages", title: "两阶段方法" },
  { id: "conditioning", title: "如何控制生成" },
  { id: "evidence", title: "实验结果" },
  { id: "limits", title: "适用边界" }
];

export default function LatentDiffusionPage() {
  return (
    <PaperDetailLayout paper={paper} contents={contents} hero={
      <PaperHero
        paper={paper}
        authors="Robin Rombach、Andreas Blattmann、Dominik Lorenz、Patrick Esser、Björn Ommer"
        publication="CVPR 2022 · arXiv v2（2022-04-13）"
        description="潜扩散模型先学会把图片压缩并还原，再在较小的潜空间中训练扩散模型。生成时，它从潜空间噪声逐步去噪，最后由解码器还原出新图片。"
        visual={<LatentDiffusionHeroDiagram />}
      />
    }>
      <PaperSection id={contents[0].id} number="01" label={contents[0].title} title="为什么不直接在每个像素上生成图片？">
        <PaperProse>
          <p><strong>因为扩散模型需要反复去噪；如果每一步都处理整张高分辨率图片，训练和生成都很贵。</strong>扩散模型可以从噪声逐步生成图片，但一次去噪不足以完成任务，神经网络要连续运行许多次。</p>
          <p>一张图片的像素既包含主体、布局和颜色，也包含很多人几乎看不出的细微变化。作者认为，直接在像素空间计算，会让模型把大量算力花在这些不太影响观感的细节上。论文的问题是：<strong>能否先换到一个更小、仍能保留重要视觉信息的空间，再在那里完成去噪？</strong></p>
          <p>这里的“潜空间”就是由编码器学出来的压缩表示。它不是把图片粗暴缩成缩略图；模型还要学会从这份表示重建图片。压缩得太少，计算负担仍重；压得太多，丢掉的细节无法凭空找回。</p>
          <p>依据：<a href={`${original}#S1`} target="_blank" rel="noopener noreferrer">原论文 §1、图 1 与图 2：问题和压缩取舍</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[1].id} number="02" label={contents[1].title} title="先压缩，再去噪：两个模型怎样接力？" description="第一阶段学习图片与潜表示之间的转换；第二阶段固定转换器，在潜表示上学习生成。">
        <LatentDiffusionMethodDiagram />
        <PaperProse>
          <h3>第一阶段：学会压缩和还原</h3>
          <p>编码器 E 把真实图片变成较小的潜表示 z；解码器 D 再把 z 还原成图片。训练这对模型时，作者既要求重建图像在观感上接近原图，也用局部判别训练帮助保留真实纹理。之后训练扩散模型时，这个压缩空间保持固定。</p>
          <p>论文把空间下采样倍数记为 <strong>f</strong>。例如 f=4 时，256 × 256 图片对应的潜表示宽高是 64 × 64；这是尺寸换算示例。潜表示还有自己的通道数，因此不能简单说“总数据量必定缩为 1/16”。</p>
          <h3>第二阶段：只在潜空间里学去噪</h3>
          <p>训练时，模型先取得图片的潜表示，给它加入不同程度的噪声，再让 UNet 预测噪声。UNet 是一种能同时结合局部与整体信息的图像网络。生成时则从随机的潜空间噪声开始，反复去噪得到新的 z，最后由解码器 D 一次性还原成图片。</p>
          <p>想象整理一幅画：先学会用一张较小的“结构草图”保留主体和布局，再在草图层面反复调整，最后展开成完整画面。这只是帮助理解的示意；论文实际使用的是连续数值表示，不是人工绘制的草图。</p>
          <p>依据：<a href={`${original}#S3.SS1`} target="_blank" rel="noopener noreferrer">原论文 §3.1：感知压缩</a>、<a href={`${original}#S3.SS2`} target="_blank" rel="noopener noreferrer">§3.2：潜空间扩散</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[2].id} number="03" label={contents[2].title} title="文字提示怎样影响正在生成的图像？">
        <PaperProse>
          <p><strong>模型先把文字变成一组可供读取的向量，再让去噪网络在生成过程中参考它们。</strong>论文把这套连接方式称为交叉注意力：图像潜表示中的位置可以从文字表示里取与自己相关的信息。</p>
          <p>比如输入“红色杯子在桌上”，文字编码器会把这些词变成表示；UNet 在多步去噪时，便可参考与“杯子”“红色”“桌上”相关的信息。这是机制讲解示意，不是论文展示的某张生成图片，也不保证每个词都被准确落实。</p>
          <p>论文还研究了其他条件输入。文字和布局等可以借助交叉注意力；超分辨率、图像修补等与图像位置一一对应的条件，则可以把条件图与潜表示沿通道拼接。<strong>条件并不是直接替代去噪过程，而是在每一步影响它。</strong></p>
          <p>依据：<a href={`${original}#S3.SS3`} target="_blank" rel="noopener noreferrer">原论文 §3.3 与图 3：条件机制</a>、<a href={`${original}#S4.SS3`} target="_blank" rel="noopener noreferrer">§4.3：文字与布局生成</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[3].id} number="04" label={contents[3].title} title="实验显示：省了多少计算，画质如何？">
        <PaperProse>
          <p><strong>在论文的图像修补设置里，潜空间模型训练和采样都更快，样本分布指标也更好。</strong>图像修补是把图片被遮住的区域补出来。下表摘自原论文表 6：对比直接在像素上去噪的 LDM-1，和空间下采样 4 倍、使用 VQ 型压缩器的 LDM-4。VQ 会把连续表示归入一组学得的编码。该组比较固定了模型参数量。</p>
        </PaperProse>
        <figure className={styles.results}>
          <table>
            <caption>图像修补实验 · 原论文表 6；吞吐量越高越快，FID 越低越好</caption>
            <thead><tr><th scope="col">指标</th><th scope="col">像素空间 LDM-1</th><th scope="col">潜空间 LDM-4</th></tr></thead>
            <tbody>
              <tr><th scope="row">训练吞吐量（张/秒）</th><td>0.11</td><td><strong>0.33</strong></td></tr>
              <tr><th scope="row">512 × 512 采样吞吐量（张/秒）</th><td>0.07</td><td><strong>0.34</strong></td></tr>
              <tr><th scope="row">第 6 轮验证集 FID</th><td>24.74</td><td><strong>14.99</strong></td></tr>
            </tbody>
          </table>
        </figure>
        <PaperProse>
          <p>在这组条件下，LDM-4 每秒训练约 3 倍图片，512 × 512 采样每秒约 4.9 倍图片。FID 衡量的是生成样本与真实样本的整体特征分布差距，越低通常越好；它不能告诉我们单张图片是否忠实于某个指令。表 6 的不同实验设置会影响速度，因此这些倍数不是所有硬件、任务或模型都适用的加速承诺。</p>
          <p>“压得越小越好”也没有得到支持。论文图 6、图 7 对比不同下采样倍数：f=1、2 的训练推进慢，f=32 则因过度压缩而限制画质；f=4、8 在所测图像生成任务上取得较好的效率与质量平衡。</p>
          <p>文字生成任务提供了另一类证据：论文在 LAION 数据上训练文字条件模型，并在 MS-COCO 上评估。表 2 中，加入无分类器引导（一种在采样时加强文字提示影响的策略）的 LDM-KL-8-G 的 FID 为 12.63，未加入该引导的 LDM-KL-8 为 23.31。这个比较也包含了引导策略的影响，不能把改进全部归因于“在潜空间扩散”。</p>
          <p>依据：<a href={`${original}#S4.SS1`} target="_blank" rel="noopener noreferrer">原论文 §4.1 与图 6、7：压缩倍数</a>、<a href={`${original}#S4.SS5`} target="_blank" rel="noopener noreferrer">§4.5 与表 6：修补效率</a>、<a href={`${original}#S4.SS3`} target="_blank" rel="noopener noreferrer">§4.3 与表 2：文字生成</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[4].id} number="05" label={contents[4].title} title="潜空间更省算力，哪些问题仍然存在？">
        <PaperProse>
          <p><strong>压缩并没有让生成变成一步完成，也可能丢掉任务需要的精确像素信息。</strong>论文指出，多步采样仍比 GAN 慢；当任务要求像素级精确时，编码器能否完整重建图片会成为上限。作者尤其提醒超分辨率任务可能受此影响。</p>
          <ul>
            <li><strong>质量取决于第一阶段。</strong>如果压缩器没有保存某些细节，后面的去噪网络无法保证把原有细节准确恢复。f=4、8 的优势来自论文所测数据和配置。</li>
            <li><strong>条件生成不等于完全可控。</strong>交叉注意力提供了一种接入文字或布局的方法；论文展示了多类生成任务，但没有证明任意复杂指令都能被准确遵循。</li>
            <li><strong>降低成本也带来使用风险。</strong>作者讨论了篡改图像、虚假信息、训练数据隐私及偏见等问题；降低生成门槛不会自动解决这些风险。</li>
          </ul>
          <blockquote><p>这篇论文的核心不是“把图片缩小后再放大”，而是把压缩学习和生成学习分开：让昂贵的多步去噪发生在更合适的表示空间，最后再回到像素空间。</p></blockquote>
          <p>产品启发：在真实图像产品中，除了看成图观感，还应按任务检查细节保真、提示词遵循、单张生成耗时和潜在误用。这是根据论文机制提出的评估建议，不是论文已经完成的产品验证。</p>
          <p>依据：<a href={`${original}#S5`} target="_blank" rel="noopener noreferrer">原论文 §5：局限与社会影响</a>、<a href={`${original}#S6`} target="_blank" rel="noopener noreferrer">§6：结论</a>。</p>
        </PaperProse>
      </PaperSection>
    </PaperDetailLayout>
  );
}
