import type { Metadata } from "next";
import { papers } from "@/content/ai-papers/papers";
import PaperDetailLayout from "@/components/ai-papers/detail/PaperDetailLayout";
import PaperHero from "@/components/ai-papers/detail/PaperHero";
import PaperSection from "@/components/ai-papers/detail/PaperSection";
import PaperProse from "@/components/ai-papers/detail/PaperProse";
import { RagHeroDiagram, RagMethodDiagram } from "@/components/ai-papers/rag/RagDiagrams";
import styles from "@/components/ai-papers/rag/rag.module.css";

export const metadata: Metadata = {
  title: "RAG 论文图解：先检索，再生成 | JiaXuan GAO",
  description: "图解 Lewis 等人提出的 Retrieval-Augmented Generation：DPR 检索、BART 生成、RAG-Sequence 与 RAG-Token 的区别，以及原论文的实验结果和边界。",
  alternates: { canonical: "/ai-papers/rag" }
};

const paper = papers.find((item) => item.slug === "rag")!;
const original = "https://arxiv.org/html/2005.11401";
const contents = [
  { id: "question", title: "研究问题" },
  { id: "method", title: "检索与生成" },
  { id: "variants", title: "两种 RAG" },
  { id: "evidence", title: "实验证据" },
  { id: "limits", title: "适用边界" }
];

export default function RagPage() {
  return (
    <PaperDetailLayout paper={paper} contents={contents} hero={
      <PaperHero
        paper={paper}
        authors="Patrick Lewis 等 12 位作者"
        publication="NeurIPS 2020 · arXiv v4（2021-04-12）"
        description="RAG 让生成模型在回答前查阅外部文本。论文把稠密检索器与预训练的序列生成模型结合，并比较整段回答与每个词如何综合检索到的材料。"
        visual={<RagHeroDiagram />}
      />
    }>
      <PaperSection id={contents[0].id} number="01" label={contents[0].title} title="语言模型记住了知识，为什么还需要查资料？">
        <PaperProse>
          <p>预训练语言模型的参数里包含大量事实，但这些事实不容易逐条检查或更新。遇到需要具体知识的问题时，只依靠参数生成答案，还可能出现看似流畅却不准确的内容。</p>
          <p>这篇论文要解决的是：<strong>能否让通用生成模型在作答时访问可读、可替换的外部知识，同时保留自由生成文本的能力？</strong>作者把模型参数称为“参数化记忆”，把维基百科文本索引称为“非参数化记忆”。RAG 通过检索连接两者。</p>
          <p>这里的“外部知识”在原论文中有具体范围：主要实验使用 <strong>2018 年 12 月的英文维基百科快照</strong>，切分为约 2100 万个、每个约 100 词的片段。它并不等于实时联网搜索。</p>
          <p>依据：<a href={`${original}#S1`} target="_blank" rel="noopener noreferrer">原论文 §1：动机</a>、<a href={`${original}#S3`} target="_blank" rel="noopener noreferrer">§3：知识来源与实验设置</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[1].id} number="02" label={contents[1].title} title="先找相关片段，再让模型据此生成答案" description="检索并不是把一个片段直接贴到答案里；论文把多条候选片段当作潜在证据，综合各条生成路径。">
        <RagMethodDiagram />
        <PaperProse>
          <h3>DPR 找到候选片段</h3>
          <p>稠密片段检索器 DPR 把问题编码成查询向量，在预先建立的维基百科片段向量索引中寻找相近内容，取得 Top-K 候选。每个候选片段都有相应的检索概率。论文使用最大内积搜索，并在训练中尝试 Top-5 或 Top-10。</p>
          <h3>BART 读取问题和片段</h3>
          <p>作者采用预训练的 BART-large 作为生成器。对每条候选路径，模型把问题与该片段拼接起来，预测答案。最终预测综合了“这个片段被检索到的概率”和“在这个片段条件下生成答案的概率”。片段在训练中是潜变量：训练样本给出问题与目标答案，<strong>没有逐条标注应该检索哪篇文章</strong>。</p>
          <p>需要留意“端到端训练”的具体含义：论文微调查询编码器与 BART 生成器；文档编码器和已建立的索引保持固定。这既降低重建索引的成本，也限制了索引表示随任务更新的能力。</p>
          <p>依据：<a href={`${original}#S2`} target="_blank" rel="noopener noreferrer">原论文 §2 与图 1：模型、检索器和训练</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[2].id} number="03" label={contents[2].title} title="同一批片段，按整句还是按每个词综合？">
        <PaperProse>
          <p><strong>RAG-Sequence</strong> 先分别计算“如果使用片段 z，整段答案 y 的概率”，再按各片段的检索概率加权求和。它的概率模型让一条潜在片段负责整段答案，但最终仍对多条候选路径求和，并非硬性选定一篇文章。</p>
          <p><strong>RAG-Token</strong> 则在生成答案的每个词时，都对候选片段的下一词预测求和。这让不同位置的预测可以受不同片段影响。候选集合来自同一次输入检索；它不是每生成一个词就重新检索维基百科。</p>
          <p>可以把差异想成：Sequence 对“整句话”评估证据路径，Token 对“接下来的这个词”评估证据路径。论文图 2 展示了生成海明威相关题目时，不同书名位置对应的文档权重变化；这说明两种概率分解的含义，不等于模型能自动给每个词提供可靠引用。</p>
          <p>依据：<a href={`${original}#S2.SS1`} target="_blank" rel="noopener noreferrer">原论文 §2.1：两种概率模型</a>、<a href={`${original}#S4.SS3`} target="_blank" rel="noopener noreferrer">§4.3 与图 2：生成示例</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[3].id} number="04" label={contents[3].title} title="原论文的结果支持了什么？">
        <PaperProse>
          <p>在开放域问答中，作者使用 Exact Match（答案完全匹配率）评估。下表摘录原论文表 1 中 <strong>同一测试集</strong> 上的 DPR 与 RAG-Sequence；只在每一行内比较，单位为百分点。</p>
        </PaperProse>
        <figure className={styles.results}>
          <table>
            <caption>开放域问答 Exact Match（%）· 原论文表 1</caption>
            <thead><tr><th scope="col">测试集</th><th scope="col">DPR</th><th scope="col">RAG-Sequence</th><th scope="col">差值</th></tr></thead>
            <tbody>
              <tr><th scope="row">Natural Questions</th><td>41.5</td><td><strong>44.5</strong></td><td>+3.0</td></tr>
              <tr><th scope="row">WebQuestions</th><td>41.1</td><td><strong>45.2</strong></td><td>+4.1</td></tr>
              <tr><th scope="row">CuratedTrec</th><td>50.6</td><td><strong>52.2</strong></td><td>+1.6</td></tr>
            </tbody>
          </table>
        </figure>
        <PaperProse>
          <p>这不是“所有基准都超过 DPR”：在 TriviaQA 的标准测试集上，DPR 为 57.9，RAG-Sequence 为 56.8；论文在另一种 TQA-Wiki 划分上也报告了结果，不能混为一组。</p>
          <p>生成任务显示了另一种收益。在开放式 MS-MARCO 问答中，RAG-Sequence 相比只用 BART 的基线，ROUGE-L 从 38.2 提升到 40.8，BLEU-1 从 41.6 到 44.2。Jeopardy 问题生成的人类成对评价中，42.7% 的样本认为 RAG-Token 更符合事实，7.1% 认为 BART 更符合事实；其余样本包含两者都好、都差或无多数意见，不能把 42.7% 说成“事实正确率”。</p>
          <p>论文还做了索引替换实验：面对一组在 2016 至 2018 年发生变化的世界领导人问题，替换为对应年份的维基百科索引后，模型的回答会随知识源改变。这证明外部记忆可替换，但并不保证所有新知识都能被正确检索、引用或生成。</p>
          <p>依据：<a href={`${original}#S4`} target="_blank" rel="noopener noreferrer">原论文 §4、表 1～4：任务结果</a>、<a href={`${original}#S4.SS5`} target="_blank" rel="noopener noreferrer">§4.5：索引替换与消融</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[4].id} number="05" label={contents[4].title} title="RAG 有外部记忆，也仍会受证据质量约束">
        <PaperProse>
          <ul>
            <li><strong>检索到不等于答对。</strong>查询、片段切分和索引覆盖范围都会影响候选材料；生成器也可能没有准确使用材料。论文的结果是特定模型、任务和数据集上的表现。</li>
            <li><strong>可检查片段不等于逐句可追溯。</strong>检索文本使来源更容易观察，但这篇论文没有证明生成答案的每项陈述都能可靠地归因于某个片段。</li>
            <li><strong>外部知识本身可能有误或有偏见。</strong>作者在 Broader Impact 中明确指出维基百科以及其他外部知识源不可能完全准确、没有偏见。</li>
            <li><strong>“更新知识”有范围。</strong>索引替换实验展示了不重新训练生成器也能改变部分时变问题的回答，并不是对实时性、全量更新或纠错率的保证。</li>
          </ul>
          <blockquote><p>这篇论文的核心贡献，是把“可检索的文本记忆”和“可生成的参数记忆”放进同一个可微调的概率模型，并展示这种组合在若干知识密集任务上的价值。</p></blockquote>
          <p>产品启发：如果把 RAG 用在真实知识库问答，除了生成质量，还应单独检验检索召回、来源归因、知识更新和无证据时的回答策略。这是从论文机制推导出的设计建议，不是论文已验证的产品结论。</p>
          <p>依据：<a href={`${original}#S6`} target="_blank" rel="noopener noreferrer">原论文 §6：讨论</a>、<a href={original} target="_blank" rel="noopener noreferrer">Broader Impact：知识源风险</a>。</p>
        </PaperProse>
      </PaperSection>
    </PaperDetailLayout>
  );
}
