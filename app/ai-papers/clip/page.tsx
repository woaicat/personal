import type { Metadata } from "next";
import { papers } from "@/content/ai-papers/papers";
import PaperDetailLayout from "@/components/ai-papers/detail/PaperDetailLayout";
import PaperHero from "@/components/ai-papers/detail/PaperHero";
import PaperSection from "@/components/ai-papers/detail/PaperSection";
import PaperProse from "@/components/ai-papers/detail/PaperProse";
import { ClipHeroDiagram, ClipTrainingDiagram, ClipZeroShotDiagram } from "@/components/ai-papers/clip/ClipDiagrams";
import styles from "@/components/ai-papers/clip/clip.module.css";

export const metadata: Metadata = {
  title: "CLIP 图解：让图片与文字学会对齐 | JiaXuan GAO",
  description: "从图文配对训练到零样本图片分类，图解 CLIP 怎样用自然语言作为视觉学习信号，并核对论文实验、提示词影响与适用边界。",
  alternates: { canonical: "/ai-papers/clip" }
};

const paper = papers.find((item) => item.slug === "clip")!;
const original = "https://arxiv.org/html/2103.00020";
const contents = [
  { id: "problem", title: "研究问题" },
  { id: "training", title: "图文配对训练" },
  { id: "zero-shot", title: "零样本分类" },
  { id: "evidence", title: "实验结果" },
  { id: "limits", title: "适用边界" }
];

export default function ClipPage() {
  return (
    <PaperDetailLayout paper={paper} contents={contents} hero={
      <PaperHero
        paper={paper}
        authors="Alec Radford、Jong Wook Kim 等 12 位作者"
        publication="ICML 2021 · arXiv v1（2021-02-26）"
        description="CLIP 让图像编码器和文字编码器在海量图文配对中学习：相配的图和文更接近，不相配的更远。学成后，它能把新任务的类别写成文字，与图片直接比较。"
        visual={<ClipHeroDiagram />}
      />
    }>
      <PaperSection id={contents[0].id} number="01" label={contents[0].title} title="为什么只认固定类别，会限制视觉模型？">
        <PaperProse>
          <p><strong>固定标签只能教会模型在预先列好的选项中选择；新概念往往还要重新收集标注图片。</strong>传统图像分类模型可能学会判断一张图属于 ImageNet 的哪一类，却不能只靠一句新的类别描述，就自动增加一个分类选项。</p>
          <p>作者想利用图片周围本来就存在的文字，例如标题或描述。文字可以表达物体，也可以表达动作、场景和更细的区别。模型若能从这些图文关系中学习，之后就有机会用自然语言告诉它“这次要分什么”。这里的“自然语言监督”就是用文字和图片的对应关系提供训练信号，并不意味着文字总是准确或完整。</p>
          <p>为检验这条路线，作者从互联网公开来源构建了约 <strong>4 亿组图文配对</strong>，称作 WIT。收集时使用约 50 万个查询词，并限制每个查询收录的配对数量，以扩大覆盖面。这个数据集主要依赖英语文本；规模大也不能保证没有噪声、偏差或重复内容。</p>
          <p>依据：<a href={`${original}#S1`} target="_blank" rel="noopener noreferrer">原论文 §1：固定类别的问题</a>、<a href={`${original}#S2.SS2`} target="_blank" rel="noopener noreferrer">§2.2：WIT 数据构建</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[1].id} number="02" label={contents[1].title} title="图片和文字，怎样在训练时找到彼此？">
        <PaperProse>
          <p><strong>同一批图片与文字两两比较，训练模型认出哪张图对应哪段文字。</strong>CLIP 有两个编码器：图像编码器把图片变成一组数，文字编码器把文字变成一组数。这样的数字表示叫“向量”；两个向量可以计算相似度，判断它们在学到的表示空间里有多接近。</p>
        </PaperProse>
        <ClipTrainingDiagram />
        <PaperProse>
          <p>图中用三张图和三句话讲解：两两组合会得到 <strong>3 × 3 = 9</strong> 个格子，只有对角线的三格是真配对。论文实际训练时，一批有 N 组图文，就比较 N × N 个组合：提高 N 组真实配对的相似度，压低其余 N² − N 组错误配对的相似度。优化时同时从“图找文”和“文找图”两个方向计算损失。</p>
          <p>作者起初尝试让模型逐词生成图片旁的文字，但这件事既难又耗计算。改为判断整段文字与哪张图相配后，论文图 2 显示：在其 ImageNet 零样本迁移比较中，相比“预测文字中有哪些词”的基线，对比学习目标的学习效率又提高约 4 倍。这是特定训练比较中的效率，不是说所有 CLIP 推理都快 4 倍。</p>
          <p><strong>CLIP 在这里学习的是“哪些图文相配”，不是生成描述或生成图片。</strong>示意图的“猫、汽车、树”也只是帮助看懂矩阵；真实训练数据更大、更杂。依据：<a href={`${original}#S2.SS3`} target="_blank" rel="noopener noreferrer">原论文 §2.3：训练目标</a>、<a href={`${original}#S2.F3`} target="_blank" rel="noopener noreferrer">图 3：核心计算</a>、<a href={`${original}#S1.F2`} target="_blank" rel="noopener noreferrer">图 2：训练效率比较</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[2].id} number="03" label={contents[2].title} title="没有新任务的训练图片，怎么给新图片分类？">
        <PaperProse>
          <p><strong>先把要比较的类别写成几句候选文字，再看新图片与哪句最相近。</strong>例如要在“猫、汽车、树”之间选择，可以分别写成“一张猫的照片”“一张汽车的照片”“一张树的照片”。文字编码器先处理这些描述；图像编码器处理待分类图片；模型选择相似度最高的一项。</p>
        </PaperProse>
        <ClipZeroShotDiagram />
        <PaperProse>
          <p>论文把这种做法叫“零样本迁移”：<strong>对目标数据集，不用它的标注图片再训练模型</strong>。但 CLIP 已经在大规模图文数据上预训练过，也必须先有人给出候选类别或描述；“零样本”不是从未见过图片，更不是无需定义任务。</p>
          <h3>写法为何会改变结果？</h3>
          <p>单写一个词有时太含糊。比如英文 <em>boxer</em> 既可能是拳击手，也可能是拳师犬；加上“某种宠物的照片”更容易指定所需含义。作者发现，默认句式“{"A photo of a {label}."}”在 ImageNet 上比只写类别名提高约 1.3 个百分点；再组合多种描述，另有约 3.5 个百分点的提升。<strong>因此分类结果不仅取决于图片，还取决于候选文字怎样写。</strong></p>
          <p>依据：<a href={`${original}#S3.SS1.SSS2`} target="_blank" rel="noopener noreferrer">原论文 §3.1.2：零样本分类</a>、<a href={`${original}#S3.SS1.SSS4`} target="_blank" rel="noopener noreferrer">§3.1.4 与图 4：提示词和集成</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[3].id} number="04" label={contents[3].title} title="实验结果说明 CLIP 到底学到了什么？">
        <PaperProse>
          <p><strong>它学到了可迁移的图文表示，能够在不少新数据集上直接做分类，但各任务表现差别很大。</strong>先看论文的几组证据，注意它们的比较对象并不相同。</p>
        </PaperProse>
        <figure className={styles.results}>
          <table>
            <caption>原论文中三组不同的评估。手机端可左右滑动查看完整表格。</caption>
            <thead><tr><th scope="col">比较</th><th scope="col">论文结果</th><th scope="col">能说明什么</th></tr></thead>
            <tbody>
              <tr><th scope="row">ImageNet 零样本分类</th><td>CLIP 76.2%；此前 Visual N-Grams 11.5%</td><td>在同一数据集上，图文训练路线的零样本表现大幅提升；两者方法和时代也不同。</td></tr>
              <tr><th scope="row">27 个数据集的简单监督基线</th><td>CLIP 在 16 个数据集胜出</td><td>它常可竞争，但没有在所有数据集超过监督分类器。</td></tr>
              <tr><th scope="row">同一 CLIP 表示的分类方式</th><td>多数数据集零样本仍低 10–25 个百分点</td><td>图像表示已学到信息，用文字把任务说准确仍有明显提升空间。</td></tr>
            </tbody>
          </table>
          <figcaption>前两行分别来自原论文表 1、图 5；第三行来自图 8。表中不是一次统一实验，不能把不同基线直接横向排名。</figcaption>
        </figure>
        <PaperProse>
          <p>在 ImageNet 上，论文所用的最大 CLIP 模型约 <strong>76.2%</strong> 的零样本 top-1 准确率，接近原版、使用 128 万张标注训练图像的 ResNet-50。top-1 是只看模型排在第一位的类别是否正确。这不意味着 CLIP 达到当时所有视觉模型的最佳水平，也不意味着它没有用过大量图片；它没有使用的是这个目标数据集的标注训练样本。</p>
          <p>换到不同任务，结果会分化。作者在 27 个数据集上把零样本 CLIP 与“先提取 ResNet-50 图像特征，再用目标数据标注训练线性分类器”的简单基线比较，CLIP 在 16 个数据集胜出。论文还比较自然分布变化下的稳定性，但这些结果来自所选基准，不能直接推断真实产品环境的可靠性。</p>
          <p>依据：<a href={`${original}#S3.T1`} target="_blank" rel="noopener noreferrer">原论文表 1：ImageNet 零样本结果</a>、<a href={`${original}#S3.F5`} target="_blank" rel="noopener noreferrer">图 5：27 个数据集</a>、<a href={`${original}#S3.F8`} target="_blank" rel="noopener noreferrer">图 8：零样本与线性分类器</a>、<a href={`${original}#S3.SS3`} target="_blank" rel="noopener noreferrer">§3.3：分布变化</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[4].id} number="05" label={contents[4].title} title="哪些图片任务不能放心交给 CLIP？">
        <PaperProse>
          <p><strong>当任务需要精细辨别、计数，或图片分布与训练资料差得很远时，零样本表现可能明显下降。</strong>论文提到车型、花卉品种、飞机型号等细粒度分类，以及图中物体计数，都是弱项。若要判断“图中最近的一辆车有多远”这类训练语料里不常见的任务，结果甚至可能接近随机猜测。</p>
          <p>分布变化也不能一概而论。论文报告 CLIP 对一些自然照片的分布变化更稳，但对 MNIST 手写数字，零样本准确率只有约 88%，甚至不如直接在像素上训练的简单分类器。作者指出，训练集中几乎没有类似 MNIST 的图像。<strong>见过很多互联网图片，不等于能识别所有形式的图片。</strong></p>
          <p>还有两个使用前提：其一，分类只能从预设的候选描述里选，无法像图片描述模型那样自由写出答案；其二，候选文字会影响判断，因此要检验不同措辞。论文也检查了训练和评测图片可能重复的问题，但检测器无法证明已找全所有重复样本。</p>
          <p>作者在更广泛影响一节提醒了偏见和监控用途的风险。用一句文字就能临时创建分类器，降低了试用门槛，也让不合适的分类任务更容易被部署。产品启发是：在具体人群、场景和候选描述上单独评估准确率与误用风险；这是一条基于论文边界提出的建议，并非论文已经完成的产品验证。</p>
          <p>依据：<a href={`${original}#S5`} target="_blank" rel="noopener noreferrer">原论文 §5：数据重叠分析</a>、<a href={`${original}#S6`} target="_blank" rel="noopener noreferrer">§6：局限</a>、<a href={`${original}#S7`} target="_blank" rel="noopener noreferrer">§7：更广泛影响</a>。</p>
        </PaperProse>
      </PaperSection>
    </PaperDetailLayout>
  );
}
