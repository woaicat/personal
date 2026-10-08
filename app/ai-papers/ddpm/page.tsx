import type { Metadata } from "next";
import { papers } from "@/content/ai-papers/papers";
import PaperDetailLayout from "@/components/ai-papers/detail/PaperDetailLayout";
import PaperHero from "@/components/ai-papers/detail/PaperHero";
import PaperSection from "@/components/ai-papers/detail/PaperSection";
import PaperProse from "@/components/ai-papers/detail/PaperProse";
import { DdpmHeroDiagram, DdpmProcessDiagram } from "@/components/ai-papers/ddpm/DdpmDiagrams";
import styles from "@/components/ai-papers/ddpm/ddpm.module.css";

export const metadata: Metadata = {
  title: "DDPM 图解：从噪声一步步生成图片 | JiaXuan GAO",
  description: "从生成图片的背景出发，图解 DDPM 的逐步加噪、反向生成、预测噪声的训练方法，以及论文的 CIFAR10 实验和适用边界。",
  alternates: { canonical: "/ai-papers/ddpm" }
};

const paper = papers.find((item) => item.slug === "ddpm")!;
const contents = [
  { id: "problem", title: "研究问题" },
  { id: "process", title: "双向过程" },
  { id: "training", title: "怎样训练" },
  { id: "evidence", title: "实验结果" },
  { id: "progressive", title: "逐步成形" },
  { id: "limits", title: "适用边界" }
];

export default function DdpmPage() {
  return (
    <PaperDetailLayout paper={paper} contents={contents} hero={
      <PaperHero
        paper={paper}
        authors="Jonathan Ho、Ajay Jain、Pieter Abbeel"
        publication="NeurIPS 2020 · arXiv v2（2020-12-16）"
        description="先把真实图片一步步加噪，直到它近似随机噪声；再训练模型学习相反的过程，从噪声逐步生成新图片。"
        visual={<DdpmHeroDiagram />}
      />
    }>
      <PaperSection id={contents[0].id} number="01" label={contents[0].title} title="给模型一团噪声，它能自己生成图片吗？">
        <PaperProse>
          <p><strong>这篇论文要验证：一条从随机噪声慢慢走向清晰图片的路径，能否生成质量足够好的图像。</strong>例如训练数据里有许多不同的卧室照片，我们希望模型学会这些照片的共同规律，再生成一张训练集中没有的新卧室。论文研究的是这种不提供文字提示或类别标签的生成方式，称为“无条件生成”。</p>
          <p>在 2020 年，这并不是唯一的生成路线：GAN 等模型已经能画出逼真的图片。扩散模型也早已有人提出，但作者指出，当时还没有充分展示它能生成高质量样本。这篇论文要证明这条路线可以工作，并找到更有效的训练方法。</p>
          <p>一个容易想象的入口是把照片慢慢盖上雪花噪点：每次只加一点，最后几乎看不出原图。如果模型学会每一步怎样往回走，就可以从一团随机噪声出发，逐步得到一张新图。这个“盖噪点”的比喻只帮助理解流程；实际操作的是图片像素上的数值。</p>
          <p>依据：<a href="https://arxiv.org/html/2006.11239#S1" target="_blank" rel="noopener noreferrer">原论文 §1：研究背景与目标</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[1].id} number="02" label={contents[1].title} title="加噪与生成，为什么是两个相反的方向？">
        <PaperProse>
          <p><strong>加噪把已知图片逐步变成噪声；生成则从新抽取的噪声出发，学习一步步还原出图片。</strong>前者用来制造训练材料，后者才是生成新图时真正执行的过程。</p>
        </PaperProse>
        <DdpmProcessDiagram />
        <PaperProse>
          <h3>正向：把清楚的图片逐步打乱</h3>
          <p>从一张真实图片开始，按预先设好的强度，每一步加入少量高斯噪声，也就是数值服从钟形分布的随机扰动。走到末端时，原图信号几乎消失，剩下的状态接近普通随机噪声。正向规则是固定的，不需要神经网络学习。</p>
          <h3>反向：学习怎样走回一小步</h3>
          <p>模型看到当前带噪的图片和它所处的步骤，估计下一步该怎样让图片更清楚。生成时，它从<strong>新抽取的随机噪声</strong>开始，连续执行这些反向步骤，最后得到新图片；它并不是取某张训练照片直接倒放。论文用同一个网络处理不同步骤，并把步骤信息一起交给网络。</p>
          <p>这里的中间状态仍与原图片有相同的空间尺寸。后来的潜扩散模型把去噪搬到压缩后的潜空间；<strong>这篇 DDPM 论文是在图片空间中研究扩散与去噪。</strong></p>
          <p>依据：<a href="https://arxiv.org/html/2006.11239#S2" target="_blank" rel="noopener noreferrer">原论文 §2 与图 2：正向和反向过程</a>、<a href="https://arxiv.org/html/2006.11239#S4" target="_blank" rel="noopener noreferrer">§4：网络与实验设置</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[2].id} number="03" label={contents[2].title} title="模型怎样学会从噪声中找回图片？">
        <PaperProse>
          <p><strong>训练时先记下自己加了什么噪声，再让网络从带噪图片中把这份噪声预测出来。</strong>预测越接近真实加入的噪声，这次练习的误差就越小。这比直接要求网络凭空“画出好图片”有更明确的练习答案。</p>
          <p>每次练习先取一张真实图片，再随机选一个加噪步骤。论文利用已知的加噪规则，可以直接算出该步骤的带噪图片，不必每次从第一步加到最后一步。网络收到带噪图片和步骤编号，输出它认为被加入的噪声；训练目标就是缩小预测与实际噪声的差距。</p>
          <p>不同步骤的噪声量不同，所以模型既要处理几乎清晰的图，也要处理信号很弱的图。论文采用简化的噪声预测损失，去掉原始概率目标中对不同步骤的权重。作者的实验发现，这种取舍改善了样本质量指标，但它并不意味着模型在所有评价指标上都更好。</p>
          <p>生成时仍需从随机噪声出发，反复调用网络，按论文的反向采样公式更新图像。论文实验使用 <strong>1000 步</strong>；训练时随机抽一步练习，不等于生成时只做一步。</p>
          <p>依据：<a href="https://arxiv.org/html/2006.11239#S2" target="_blank" rel="noopener noreferrer">原论文 §2：可直接取得任意加噪步骤</a>、<a href="https://arxiv.org/html/2006.11239#S3.SS2" target="_blank" rel="noopener noreferrer">§3.2：预测噪声与采样算法</a>、<a href="https://arxiv.org/html/2006.11239#S3.SS4" target="_blank" rel="noopener noreferrer">§3.4：简化训练目标</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[3].id} number="04" label={contents[3].title} title="实验说明：样本质量和概率指标能同时最好吗？">
        <PaperProse>
          <p><strong>这组实验显示，简化训练目标明显改善了生成图片的分布质量，但概率指标略逊于原始目标。</strong>下表只比较论文表 1 中同一研究团队的两个无条件 CIFAR10 模型，不把不同任务或数据集的数字混在一起。</p>
        </PaperProse>
        <figure className={styles.results}>
          <table>
            <caption>原论文表 1 · 无条件 CIFAR10；FID 和 NLL 越低越好，IS 越高越好</caption>
            <thead><tr><th scope="col">训练目标</th><th scope="col">FID ↓</th><th scope="col">IS ↑</th><th scope="col">NLL 上界 ↓</th></tr></thead>
            <tbody>
              <tr><th scope="row">原始变分目标 L</th><td>13.51</td><td>7.67</td><td><strong>≤ 3.70</strong></td></tr>
              <tr><th scope="row">简化噪声预测目标</th><td><strong>3.17</strong></td><td><strong>9.46</strong></td><td>≤ 3.75</td></tr>
            </tbody>
          </table>
        </figure>
        <PaperProse>
          <p>FID 比较生成样本与真实样本在特征分布上的差距，越低通常越好；IS 是另一项样本质量与多样性指标，越高越好。表中简化目标的 FID 从 13.51 降到 3.17，IS 从 7.67 升到 9.46。NLL 上界则是论文报告的概率建模指标，以每维比特数衡量，越低越好；这里原始目标的 3.70 略优于简化目标的 3.75。因此<strong>“样本质量指标更好”和“概率指标更好”不能画等号。</strong></p>
          <p>论文还报告：简化目标的 FID 3.17，是按当时惯例相对 CIFAR10 训练集计算；相对测试集计算则为 5.24。它在论文发表时很有竞争力，但不能把 3.17 直接说成今天所有图像生成任务的最佳分数。表 2 的消融实验也支持“预测噪声 + 简化目标”这组设计对样本质量有帮助。</p>
          <p>依据：<a href="https://arxiv.org/html/2006.11239#S4.SS1" target="_blank" rel="noopener noreferrer">原论文 §4.1 与表 1：样本质量</a>、<a href="https://arxiv.org/html/2006.11239#S4.SS2" target="_blank" rel="noopener noreferrer">§4.2 与表 2：训练目标消融</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[4].id} number="05" label={contents[4].title} title="一张图片是怎样逐步成形的？">
        <PaperProse>
          <p><strong>论文展示的中间结果通常先出现大轮廓，随后才补出细节。</strong>这让“逐步生成”不只是流程图上的箭头：模型每做一些反向步骤，就能对最终图片作一次估计，看到画面如何变化。</p>
          <p>例如论文的渐进生成图中，早期估计只显出整体形状，后期才逐渐有清楚的纹理。作者还从压缩角度分析这一点：从粗到细的信息可以逐步恢复，而用于无损还原的很多信息对应人眼不易察觉的变化。这是论文对自身模型的分析，不代表每一步都能被解释成一个稳定的语义编辑动作。</p>
          <p>依据：<a href="https://arxiv.org/html/2006.11239#S4.SS3" target="_blank" rel="noopener noreferrer">原论文 §4.3 与图 5、图 6：渐进压缩和生成</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[5].id} number="06" label={contents[5].title} title="这种生成方法还有什么边界？">
        <PaperProse>
          <p><strong>这篇论文证明了高质量无条件生成的潜力，也留下了速度、控制方式和评价指标上的限制。</strong>它为后续研究提供了基础，但本身不是一个“输入文字就出图”的完整产品。</p>
          <ul>
            <li><strong>生成需要多次计算。</strong>论文的实验采用 1000 个反向步骤，出一张图要反复运行网络。训练时只抽一个步骤来算损失，并不会自动缩短采样链。</li>
            <li><strong>本页展示的是无条件生成。</strong>论文的主要图像质量结果没有使用文字提示；不能把后来模型的文字控制能力归到这篇实验上。</li>
            <li><strong>一个分数不能说明所有质量。</strong>FID 反映样本总体分布，NLL 上界反映另一种建模目标；两者在论文的两个训练设置中出现了取舍。</li>
            <li><strong>生成模型也会带来社会风险。</strong>作者讨论了伪造图像和训练数据偏见；样本质量提高不会自动消除这些问题。</li>
          </ul>
          <p>产品启发：若把扩散模型用于真实创作工具，应同时测试成图质量、单张耗时、可控性和误用风险。这是从论文结果提出的评估建议，不是论文已完成的产品验证。</p>
          <p>依据：<a href="https://arxiv.org/html/2006.11239#S4" target="_blank" rel="noopener noreferrer">原论文 §4：实验设置与指标</a>、<a href="https://arxiv.org/html/2006.11239#S6" target="_blank" rel="noopener noreferrer">§6 与 Broader Impact：结论和影响</a>。</p>
        </PaperProse>
      </PaperSection>
    </PaperDetailLayout>
  );
}
