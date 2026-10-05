import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { papers } from "@/content/ai-papers/papers";
import PaperDetailLayout from "@/components/ai-papers/detail/PaperDetailLayout";
import PaperHero from "@/components/ai-papers/detail/PaperHero";
import PaperSection from "@/components/ai-papers/detail/PaperSection";
import PaperProse from "@/components/ai-papers/detail/PaperProse";
import AttentionDemo from "@/components/ai-papers/transformer/AttentionDemo";
import styles from "@/components/ai-papers/transformer/transformer.module.css";

export const metadata: Metadata = {
  title: "Transformer 图解：Attention Is All You Need | JiaXuan GAO",
  description: "通过交互图解理解 Transformer：自注意力、Q/K/V、多头注意力、编码器与解码器，以及原论文的机器翻译实验。",
  alternates: { canonical: "/ai-papers/transformer" }
};

const paper = papers.find((item) => item.slug === "transformer")!;
const contents = [{ id: "problem", title: "为什么需要它" }, { id: "attention", title: "注意力图解" }, { id: "architecture", title: "整体结构" }, { id: "results", title: "结果与边界" }];
const original = "https://arxiv.org/html/1706.03762v7";

export default function TransformerPage() {
  return (
    <PaperDetailLayout paper={paper} contents={contents} hero={
      <PaperHero paper={paper} authors="Ashish Vaswani 等 8 位作者" publication="NeurIPS · 2017" description="理解一个词，不一定要沿着句子逐个传递信息。Transformer 让不同位置直接交换信息，用注意力重新组织序列建模。先看一个小例子，再拆开它的完整结构。" visual={
        <div className={styles.heroArt} role="img" aria-label="句子中四个词通过注意力相互联系，形成带上下文的表示。">
          <div className={styles.artLabel}><span>ATTENTION IS ALL YOU NEED</span><span>2017</span></div>
          <div className={styles.heroTokens}>{["小猫", "坐在", "温暖的", "垫子上"].map((word) => <span key={word}>{word}</span>)}</div>
          <svg className={styles.connections} viewBox="0 0 400 84" fill="none" aria-hidden="true">{[50,150,250,350].flatMap((x) => [50,150,250,350].map((end) => <path key={`${x}-${end}`} d={`M${x} 0 C${x} 40 ${end} 44 ${end} 84`} stroke="currentColor" strokeWidth={x === end ? 2 : 1} opacity={x === end ? .8 : .25} />))}</svg>
          <div className={styles.heroResult}>每个位置，都能参考其他位置。</div>
          <p>自注意力连接示意 · 线条不表示真实模型权重</p>
        </div>
      } />
    }>
      <PaperSection id="problem" number="01" label="背景问题" title="读懂一句话，为什么一定要排队？">
        <PaperProse>
          <p>想象你和同学一起翻译一句话。读到“它”时，你可能需要回头看前面的名词；理解一个动作时，也可能需要参考句末的信息。<strong>词的含义常常依赖上下文，而不只是它旁边的词。</strong></p>
          <p>论文关注的一个瓶颈是：循环神经网络通常沿序列逐步计算，后一个位置依赖前一个位置的状态，因此单个样本内的计算不容易完全并行。距离很远的信息，也要经过多次传递。</p>
          <h3>把“依次传话”换成“直接交流”</h3>
          <p>Transformer 用自注意力让一个位置直接参考其他位置。可以把它想成同学们同时摊开整句话：每个人根据自己的问题，挑选值得参考的信息。这个比喻帮助理解信息流；模型实际处理的是向量，不是人的阅读策略。</p>
          <blockquote><p>这篇论文的突破，是用注意力替代序列建模中的循环和卷积结构；注意力机制本身在此之前已经存在。</p></blockquote>
          <p>依据：<a href={`${original}#S1`} target="_blank" rel="noopener noreferrer">原论文 §1–2：研究动机与背景</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id="attention" number="02" label="核心机制" title="注意力，就是有选择地汇总信息" description="选一个词，观察它如何给其他位置分配权重；再试试遮住右侧位置。">
        <AttentionDemo />
        <PaperProse>
          <h3>Q、K、V 各自做什么？</h3>
          <ul><li><strong>Q · Query：</strong>当前位置用于发起查询的向量，可以类比“我需要什么信息”。</li><li><strong>K · Key：</strong>每个位置用于匹配查询的向量，可以类比“我有哪些可供匹配的特征”。</li><li><strong>V · Value：</strong>最终被汇总的信息向量。匹配程度决定取多少，内容来自 V。</li></ul>
          <p>自注意力中的 Q、K、V 都由同一序列的表示分别投影得到。先计算 Q 与 K 的点积，再按维度缩放、经 softmax 转成权重，最后对 V 加权求和。</p>
        </PaperProse>
        <div className={styles.formula} aria-label="注意力等于 Q 乘 K 的转置除以根号 d k，经过 softmax 后乘 V">Attention(Q, K, V) = softmax(QKᵀ / √dₖ) V</div>
        <PaperProse>
          <h3>为什么还要“多头”？</h3>
          <p>只做一次汇总，可能把不同关系混在一起。多头注意力使用多组学到的投影，分别计算，再把结果拼接并投影。不同头可以捕捉不同关系，但并不是预先指定某个头只能看语法、另一个只能看指代。</p>
          <p>依据：<a href={`${original}#S3.SS2`} target="_blank" rel="noopener noreferrer">原论文 §3.2：注意力公式与多头机制</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id="architecture" number="03" label="模型结构" title="一边理解输入，一边生成输出" description="原论文提出的是编码器—解码器结构，主要用于机器翻译。下面按信息流方向简化展示。">
        <figure className={styles.figure}>
          <div className={styles.architecture}>
            <div className={styles.stack}><span className={styles.stackLabel}>ENCODER / 理解原句</span><h3>编码器</h3><div className={styles.layer}>输入词向量 + 位置编码</div><div className={styles.stackLayers}><span className={styles.stackLabel}>以下模块堆叠 6 层</span><div className={styles.layer}>多头自注意力</div><div className={styles.layer}>逐位置前馈网络</div></div><p>每个子层都有残差连接与层归一化。</p><div className={styles.layer}>带上下文的输入表示</div></div>
            <div className={styles.stack}><span className={styles.stackLabel}>DECODER / 写出译文</span><h3>解码器</h3><div className={styles.layer}>右移的目标词向量 + 位置编码</div><div className={styles.stackLayers}><span className={styles.stackLabel}>以下模块堆叠 6 层</span><div className={styles.layer}>带因果遮罩的自注意力</div><div className={`${styles.layer} ${styles.crossLayer}`}>交叉注意力：参考编码器输出</div><div className={styles.layer}>逐位置前馈网络</div></div><div className={styles.layer}>线性层 + softmax → 下一个词</div></div>
            <div className={styles.flowNote}>编码器输出 <ArrowRight size={17} aria-hidden="true" /> 提供交叉注意力的 K、V；Q 来自解码器</div>
          </div>
          <figcaption>依据原论文图 1 重绘的简化示意，按从上到下的信息流排列；解码器各子层也包含残差连接与层归一化。</figcaption>
        </figure>
        <PaperProse>
          <h3>两个容易漏掉的细节</h3>
          <p><strong>位置信息需要补进去。</strong>自注意力本身没有循环带来的先后顺序，论文把位置编码加到词向量上，让模型利用序列顺序。</p>
          <p><strong>训练并行，不等于生成时同时输出整句。</strong>训练时，右移的目标序列配合因果遮罩，可以同时计算多个位置的预测；推理时，这个自回归解码器仍然逐步生成后续词。</p>
          <p>依据：<a href={`${original}#S3`} target="_blank" rel="noopener noreferrer">原论文 §3 与图 1：完整模型结构</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id="results" number="04" label="实验与边界" title="更好的翻译结果，更容易并行的训练">
        <PaperProse><p>论文在 WMT 2014 机器翻译任务上验证这套结构。下面展示英语到德语任务的测试结果，分数来自原论文表 2；BLEU 衡量译文与参考译文的匹配程度，不能当作通用智能分数。</p></PaperProse>
        <div className={styles.results}><div className={styles.result}><span>Transformer · Base</span><strong>27.3 BLEU</strong><p>8 张 P100 GPU<br />训练约 12 小时</p></div><div className={styles.result}><span>Transformer · Big</span><strong>28.4 BLEU</strong><p>8 张 P100 GPU<br />训练约 3.5 天</p></div></div>
        <PaperProse>
          <p>训练时长依据 §5.2，属于论文当时的硬件与实验设置。<a href={`${original}#S6.SS1`} target="_blank" rel="noopener noreferrer">查看原论文 §6.1 与表 2</a>。</p>
          <h3>读完后，记住这三个边界</h3>
          <ul><li><strong>标题不表示网络里只有注意力。</strong>模型仍包含前馈网络、词嵌入、位置编码、残差连接和归一化。</li><li><strong>直接交流也有代价。</strong>标准全局自注意力需要考虑位置两两之间的关系，注意力矩阵大小随序列长度平方增长。长输入的成本依然是问题。</li><li><strong>论文验证的是具体任务。</strong>翻译成绩支持这种架构的有效性，并不直接证明它具有人类式理解，也不证明注意力权重就是完整的推理解释。</li></ul>
          <blockquote><p>最值得带走的思路：先让相关信息高效地相遇，再学习怎样组合它们。</p></blockquote>
        </PaperProse>
      </PaperSection>
    </PaperDetailLayout>
  );
}
