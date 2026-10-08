import type { Metadata } from "next";
import { papers } from "@/content/ai-papers/papers";
import PaperDetailLayout from "@/components/ai-papers/detail/PaperDetailLayout";
import PaperHero from "@/components/ai-papers/detail/PaperHero";
import PaperSection from "@/components/ai-papers/detail/PaperSection";
import PaperProse from "@/components/ai-papers/detail/PaperProse";
import PromptDemo from "@/components/ai-papers/gpt-3/PromptDemo";
import styles from "@/components/ai-papers/gpt-3/gpt-3.module.css";

export const metadata: Metadata = {
  title: "GPT-3 图解：少样本示例怎样指定任务 | JiaXuan GAO",
  description: "通过可切换的提示词图解理解 GPT-3 的零样本、单样本与少样本评估，以及论文中的任务结果、数据污染和能力边界。",
  alternates: { canonical: "/ai-papers/gpt-3" }
};

const paper = papers.find((item) => item.slug === "gpt-3")!;
const original = "https://arxiv.org/html/2005.14165";
const contents = [
  { id: "question", title: "研究问题" },
  { id: "prompt", title: "三种提示" },
  { id: "evidence", title: "实验结果" },
  { id: "limits", title: "能力边界" }
];

export default function GPT3Page() {
  return (
    <PaperDetailLayout paper={paper} contents={contents} hero={
      <PaperHero
        paper={paper}
        authors="Tom B. Brown 等 31 位作者 · OpenAI"
        publication="2020 · arXiv v4"
        description="如果每遇到一个新任务都要重新收集数据、微调模型，语言模型很难灵活使用。GPT-3 论文探索另一条路：把任务说明和少量示例写进输入，让一个已预训练的模型直接接着完成任务。"
        visual={
          <div className={styles.heroArt} role="img" aria-label="预训练后的同一个模型读取任务说明与示例，再续写答案；评估时模型参数不更新。">
            <div className={styles.heroTop}><span>IN-CONTEXT LEARNING</span><span>2020</span></div>
            <div className={styles.heroSteps}>
              <div className={styles.heroStep}><span>01 / 预训练</span><strong>获得通用语言能力</strong></div>
              <div className={styles.heroStep}><span>02 / 输入上下文</span><strong>说明任务 · 展示示例</strong></div>
              <div className={styles.heroStep}><span>03 / 继续预测</span><strong>生成目标答案</strong></div>
            </div>
            <p>新任务放进文本上下文，评估时不更新参数。</p>
          </div>
        }
      />
    }>
      <PaperSection id={contents[0].id} number="01" label={contents[0].title} title="遇到新任务，还必须重新训练吗？">
        <PaperProse>
          <p>传统的“预训练，再针对任务微调”通常需要为每项任务准备大量带答案的数据。换一个任务，就可能要再收集样本、更新模型参数。论文关心的是：<strong>能否只通过文字说明和少量示例，让同一个模型适应不同任务？</strong></p>
          <p>作者训练了从 1.25 亿到 1750 亿参数的八种自回归语言模型。最大的模型称为 GPT-3，使用 2048 token 的上下文窗口。在论文的零样本、单样本和少样本评估中，模型读取输入并预测后续文本，<strong>不为每个测试任务做梯度更新或微调</strong>。</p>
          <h3>“少样本”发生在使用时</h3>
          <p>这不代表 GPT-3 只看几条数据就完成了预训练。论文中的各模型预训练了 3000 亿 token；“少样本”说的是测试某个具体任务时，放进当前输入的示例数量。示例会改变本次输入，却不会直接改写模型权重。</p>
          <blockquote><p>研究重点是：模型规模增大后，能否更有效地利用输入文本里的任务线索。</p></blockquote>
          <p>依据：<a href={`${original}#S1`} target="_blank" rel="noopener noreferrer">原论文 §1：研究动机</a>、<a href={`${original}#S2.SS1`} target="_blank" rel="noopener noreferrer">§2.1 与表 2.1：模型规模</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[1].id} number="02" label={contents[1].title} title="不给例子、给一个、给几个：输入变了什么？" description="切换三种设置，观察说明、示例和待完成问题怎样共同组成一次输入。">
        <PromptDemo />
        <PaperProse>
          <h3>示例是任务说明的一部分</h3>
          <p>零样本只给自然语言指令；单样本再加一组示例；少样本加入多组“输入 → 答案”。论文在少样本实验中通常放入约 10–100 组示例，具体数量受任务长度和上下文窗口限制。最终问题之后不写答案，让模型预测下一段文本。</p>
          <p>可把这些示例理解为“现场展示格式和规律”。模型也许会利用预训练时学到的知识识别任务，也可能在上下文中适应某个新模式；论文并未证明它在推理时从零学会了所有新技能。</p>
          <p>依据：<a href={`${original}#S2`} target="_blank" rel="noopener noreferrer">原论文 §2 与图 2.1：四种任务设置</a>、<a href={`${original}#S2.SS4`} target="_blank" rel="noopener noreferrer">§2.4：评估方式</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[2].id} number="03" label={contents[2].title} title="示例有帮助，但结果因任务而异">
        <PaperProse>
          <p>论文测试了问答、翻译、阅读理解、常识推理等多类任务。下面两组数字来自原论文表 3.3，均为 1750 亿参数 GPT-3 在各数据集的评估分数；它们属于<strong>不同任务，不能把分数互相比较</strong>。</p>
        </PaperProse>
        <figure className={styles.evidence}>
          <div className={styles.evidenceGrid}>
            <div className={styles.evidenceCard}>
              <span>封闭书本问答 / TRIVIAQA</span><h3>知识问答</h3>
              <div className={styles.scoreRow}><span>零样本</span><strong>64.3</strong></div>
              <div className={styles.scoreRow}><span>单样本</span><strong>68.0</strong></div>
              <div className={styles.scoreRow}><span>少样本</span><strong>71.2</strong></div>
            </div>
            <div className={styles.evidenceCard}>
              <span>封闭书本问答 / NATURAL QUESTIONS</span><h3>自然问题</h3>
              <div className={styles.scoreRow}><span>零样本</span><strong>14.6</strong></div>
              <div className={styles.scoreRow}><span>单样本</span><strong>23.0</strong></div>
              <div className={styles.scoreRow}><span>少样本</span><strong>29.9</strong></div>
            </div>
          </div>
          <figcaption>图 02 · 原论文表 3.3 的两列数据，按相同数据集内的三种设置对照。TriviaQA 的少样本分数来自测试服务器；其他报告位置与评估细节见论文 §2.4、§3.2。这里的数字不是本站交互演示的输出。</figcaption>
        </figure>
        <PaperProse>
          <h3>表现提升，不等于处处领先</h3>
          <p>在这两项任务里，增加示例都提高了分数。更广泛的实验显示，少样本能力会随模型规模提高，但并非每个任务都如此：论文在 SuperGLUE 的少样本测试中得到平均 71.8，低于其列出的微调方法最佳结果 89.0。两者训练条件不同，这组比较说明的是当时的能力差距，不能单独用来判定哪种方法总是更好。</p>
          <p>依据：<a href={`${original}#S3.SS2`} target="_blank" rel="noopener noreferrer">原论文 §3.2 与表 3.3：问答结果</a>、<a href={`${original}#S3.SS7`} target="_blank" rel="noopener noreferrer">§3.7 与表 3.8：SuperGLUE</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[3].id} number="04" label={contents[3].title} title="读懂这项进展，也要看清它的边界">
        <PaperProse>
          <ul>
            <li><strong>不擅长所有推理任务。</strong>论文中 WiC 的少样本准确率为 49.4%，约在随机水平；ANLI 等自然语言推断任务也仍困难。流畅的生成不保证理解了句子间的关系。</li>
            <li><strong>评测可能受到训练数据污染。</strong>预训练语料包含大量网页内容，可能与测试集重叠。作者的去重流程还出现过漏删问题，因此另做“干净子集”分析，并对有疑虑的结果作标记或不报告。</li>
            <li><strong>上下文适应不等于推理时重训练。</strong>论文无法明确区分：模型究竟学到了全新任务，还是识别了预训练中见过的相似模式。</li>
            <li><strong>生成质量与成本仍有限制。</strong>长文本可能重复或失去连贯性；大模型推理昂贵，也可能继承训练数据中的偏见。</li>
          </ul>
          <blockquote><p>最重要的变化，是把“告诉模型怎样做”从更新参数，部分转移到了组织输入文本。</p></blockquote>
          <p>依据：<a href={`${original}#S4`} target="_blank" rel="noopener noreferrer">原论文 §4：测试集污染</a>、<a href={`${original}#S5`} target="_blank" rel="noopener noreferrer">§5：局限</a>、<a href={`${original}#S6`} target="_blank" rel="noopener noreferrer">§6：更广泛的影响</a>。</p>
        </PaperProse>
      </PaperSection>
    </PaperDetailLayout>
  );
}
