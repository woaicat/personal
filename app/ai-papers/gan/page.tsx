import type { Metadata } from "next";
import { papers } from "@/content/ai-papers/papers";
import PaperDetailLayout from "@/components/ai-papers/detail/PaperDetailLayout";
import PaperHero from "@/components/ai-papers/detail/PaperHero";
import PaperSection from "@/components/ai-papers/detail/PaperSection";
import PaperProse from "@/components/ai-papers/detail/PaperProse";
import AdversarialDemo from "@/components/ai-papers/gan/AdversarialDemo";
import styles from "@/components/ai-papers/gan/gan.module.css";

export const metadata: Metadata = {
  title: "GAN 图解：生成器与判别器如何在对抗中学习 | JiaXuan GAO",
  description: "通过交互图解理解 2014 年 GAN 论文：生成器、判别器、交替训练、学习目标，以及生成质量与多样性的边界。",
  alternates: { canonical: "/ai-papers/gan" }
};

const paper = papers.find((item) => item.slug === "gan")!;
const original = "https://proceedings.neurips.cc/paper_files/paper/2014/file/f033ed80deb0234979a61f95710dbe25-Paper.pdf";
const contents = [
  { id: "problem", title: "核心问题" },
  { id: "adversarial", title: "对抗图解" },
  { id: "objective", title: "学习目标" },
  { id: "results", title: "结果与边界" }
];

export default function GANPage() {
  return (
    <PaperDetailLayout paper={paper} contents={contents} hero={
      <PaperHero paper={paper} authors="Ian J. Goodfellow 等 8 位作者" publication="NIPS 2014" description="一方学习生成，另一方学习辨别。GAN 把两个神经网络放进同一场训练，让生成器借助判别器的反馈，逐渐学会产生接近真实数据的新样本。" visual={
        <div className={styles.heroArt}>
          <div className={styles.heroLabel}><span>LEARNING THROUGH ADVERSARIES</span><span>2014</span></div>
          <div className={styles.heroPair}><div><b>G</b><span>生成器<br />学习创造样本</span></div><span aria-hidden="true">⇄</span><div><b>D</b><span>判别器<br />学习分辨来源</span></div></div>
          <p>对手的反馈，也可以成为学习的信号。</p>
        </div>
      } />
    }>
      <PaperSection id={contents[0].id} number="01" label={contents[0].title} title="会认一张图片，怎样才能学会生成图片？">
        <PaperProse>
          <p>想象两位练习画画的搭档：一位不断画出新的手写数字，另一位把这些画和真实的手写数字放在一起，判断每一张来自哪里。画得太生硬，会被轻易识别；辨别得更细，又能给画画的人提供新的改进方向。</p>
          <p>这是理解 GAN 的一个比喻。实际训练中，两位搭档都是神经网络：<strong>生成器 G 把随机噪声变成样本，判别器 D 估计样本来自真实数据的概率。</strong>它们优化不同的目标，学习信号通过数值计算与梯度传递。</p>
          <h3>没有一张唯一的“标准答案”</h3>
          <p>输入一份随机噪声，并不存在一张必须逐像素照着画的目标图片。生成器要学习的是数据分布：既让单个结果像真的，也能覆盖数据中不同的样子，而不是记住一张最容易过关的图。</p>
          <blockquote><p>把“怎样才像真实数据”这件事，交给一个也在学习的判别器来提供反馈。</p></blockquote>
          <p>依据：<a href={`${original}#page=1`} target="_blank" rel="noopener noreferrer">原论文 §1：对抗训练的动机</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[1].id} number="02" label={contents[1].title} title="轮流进步：这一步，到底在更新谁？" description="切换三个阶段，观察生成器、判别器与学习信号的关系。深色边框表示这一阶段正在更新的网络。">
        <AdversarialDemo />
        <PaperProse>
          <h3>固定参数，不等于切断反馈</h3>
          <p>训练 G 时，D 像一把暂时固定的尺子。它自己的参数不变，但仍参与计算，让我们知道 G 往哪个方向调整，能够提高 D 对生成样本的判断。这不是把“真 / 假”两个字直接传给 G，而是反向传播可用于更新参数的梯度。</p>
          <p>算法交替进行若干次 D 更新与一次 G 更新，论文实验采用每轮一次 D 更新。两者共同演进，评价标准也随着训练变化。</p>
          <p>依据：<a href={`${original}#page=3`} target="_blank" rel="noopener noreferrer">原论文 §3 与图 1</a>、<a href={`${original}#page=4`} target="_blank" rel="noopener noreferrer">算法 1</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[2].id} number="03" label={contents[2].title} title="同一个判断，对应两个相反的目标">
        <div className={styles.objectives}>
          <div className={styles.objective}><h3>D：把来源分对</h3><p>对真实样本输出更高的概率，对生成样本输出更低的概率。</p><code>最大化 E[log D(x)]<br />+ E[log(1 − D(G(z)))]</code></div>
          <div className={styles.objective}><h3>G：让样本更像真的</h3><p>调整生成方式，让 D 更倾向于把生成样本判断为真实数据。</p><code>原始目标：最小化<br />E[log(1 − D(G(z)))]</code></div>
        </div>
        <PaperProse>
          <p>这里的 E 表示对样本取期望，训练时用一批样本估计；x 来自真实数据，z 来自噪声分布。上面的两项目标组成论文的极小极大博弈。</p>
          <h3>一开始太容易被识破，怎么办？</h3>
          <p>早期生成样本很差，原始 G 目标可能提供很弱的梯度。论文提出改为<strong>最大化 log D(G(z))</strong>，在训练早期提供更强的学习信号，同时保留相同的理想平衡点。</p>
          <h3>为什么经常听到“最后是 50%”？</h3>
          <p>在论文的理想理论条件下，如果生成分布与真实分布完全相同，最优判别器对来源就无法区分，输出为 1/2。但反过来并不成立：一个没有学好的 D 也可能到处输出 50%。<strong>单看判别概率，不能证明生成质量已经足够好。</strong>有限容量的神经网络训练也不受这一理论结果直接保证。</p>
          <p>依据：<a href={`${original}#page=3`} target="_blank" rel="noopener noreferrer">原论文 §3：训练目标</a>、<a href={`${original}#page=4`} target="_blank" rel="noopener noreferrer">§4：理论分析</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[3].id} number="04" label={contents[3].title} title="能生成新样本之后，还要追问什么？">
        <div className={styles.datasets} aria-label="论文实验数据集"><span>MNIST · 手写数字</span><span>TFD · 人脸</span><span>CIFAR-10 · 自然图像</span></div>
        <PaperProse>
          <p>论文在这些图像数据集上展示生成样本，并进行定量评估，为这种训练框架提供了初步证据。生成阶段只需对 G 做一次前向计算，无需运行马尔可夫链。</p>
          <h3>像真的，也要足够丰富</h3>
          <p>假设生成器总画同一种很好看的“8”，单张图片可能过关，却漏掉其他数字与笔迹。这是理解多样性问题的一个例子。论文已讨论多个噪声输入映射到相同输出的风险，以及 G 与 D 训练配合的重要性。</p>
          <h3>早期证据，不是终点</h3>
          <p>论文也指出其基于 Parzen 窗口的似然估计存在局限，不能简单用一个估计分数决定生成模型的全部优劣。原始方法依赖可微的生成过程，文中的图像实验也不能直接证明它适用于离散文本生成。</p>
          <blockquote><p>产品启发：评价生成系统，要同时看单个结果的质量、整体结果的多样性，以及训练是否稳定。一个评分器的认可，只是证据的一部分。</p></blockquote>
          <p>依据：<a href={`${original}#page=6`} target="_blank" rel="noopener noreferrer">原论文 §5–6：实验、优势与局限</a>。上面的画数字场景与产品启发为辅助理解的原创说明。</p>
        </PaperProse>
      </PaperSection>
    </PaperDetailLayout>
  );
}
