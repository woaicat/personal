import type { Metadata } from "next";
import { papers } from "@/content/ai-papers/papers";
import PaperDetailLayout from "@/components/ai-papers/detail/PaperDetailLayout";
import PaperHero from "@/components/ai-papers/detail/PaperHero";
import PaperSection from "@/components/ai-papers/detail/PaperSection";
import PaperProse from "@/components/ai-papers/detail/PaperProse";
import {
  ChainOfThoughtAblationDiagram,
  ChainOfThoughtHeroDiagram,
  ChainOfThoughtMethodDiagram,
  ChainOfThoughtResults
} from "@/components/ai-papers/chain-of-thought/ChainOfThoughtDiagrams";

export const metadata: Metadata = {
  title: "思维链提示图解：让模型先写步骤再答题 | JiaXuan GAO",
  description: "图解思维链提示论文：少样本示例怎样加入中间步骤，PaLM 540B 等模型在算术、常识与符号任务中的实验结果，以及规模依赖和错误推理链的边界。",
  alternates: { canonical: "/ai-papers/chain-of-thought" }
};

const paper = papers.find((item) => item.slug === "chain-of-thought")!;
const original = "https://arxiv.org/html/2201.11903";
const contents = [
  { id: "problem", title: "研究问题" },
  { id: "method", title: "提示方法" },
  { id: "evidence", title: "实验结果" },
  { id: "ablation", title: "为什么是中间步骤" },
  { id: "limits", title: "适用边界" }
];

export default function ChainOfThoughtPage() {
  return (
    <PaperDetailLayout paper={paper} contents={contents} hero={
      <PaperHero
        paper={paper}
        authors="Jason Wei、Xuezhi Wang 等 9 位作者"
        publication="NeurIPS 2022 · arXiv v6（2023-01-10）"
        description="给大模型看几道示例题时，不只写题目和答案，还写出从题目走到答案的中间步骤。模型遇到新题便可能沿用这种格式，先生成步骤，再给出答案。"
        visual={<ChainOfThoughtHeroDiagram />}
      />
    }>
      <PaperSection id={contents[0].id} number="01" label={contents[0].title} title="为什么示范了答案，模型还是会做错多步题？">
        <PaperProse>
          <p><strong>因为一道题可能要先找出几个数量关系，再依次计算；只看“题目→答案”的示例，没有展示这条路径。</strong>例如“3 盒饼干，每盒 4 块，吃掉 5 块”，要先得到总数 12，再减去 5，答案才是 7。直接写一个数字，可能漏掉其中一步。</p>
          <p>少样本提示，就是在新问题前放几道已经解好的例题，让语言模型照着这些例题继续写。它改变的是模型本次看到的输入，并不重新训练模型参数。论文指出，普通少样本示例在算术、常识和符号推理等任务上仍可能表现不佳。</p>
          <p>作者提出把例题改成“三段式”：<strong>题目、中间步骤、最终答案</strong>。论文称中间步骤为“思维链”（chain of thought），指写在文本里的连续推导。它让读者能检查模型写出的路径，但不能单凭这段文字证明模型内部真的按人类方式思考。</p>
          <p>依据：<a href={`${original}#S1`} target="_blank" rel="noopener noreferrer">原论文 §1：研究动机</a>、<a href={`${original}#S2`} target="_blank" rel="noopener noreferrer">§2：思维链提示</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[1].id} number="02" label={contents[1].title} title="把步骤写进示例，模型会收到什么输入？">
        <PaperProse>
          <p><strong>它先看到若干带解题步骤的完整例子，再看到一题尚未作答的新题。</strong>每个例子都把“为什么这样算”写在答案之前。模型继续生成时，便有机会先模仿步骤的形式，逐步处理新题，最后写出答案。</p>
        </PaperProse>
        <ChainOfThoughtMethodDiagram />
        <PaperProse>
          <p>图中的饼干和糖果是自编示意，用来展示输入与输出的位置。论文的算术实验通常使用 <strong>8 道带步骤的示例</strong>，并把同一组示例用于多个算术数据集；AQuA 是选择题，使用的是 4 道示例。这样比较时，核心改变是示例是否包含中间推导，而不是为目标任务微调模型。</p>
          <p>这里有一个容易混淆的地方：<strong>本文研究的是“给几道写好步骤的例题”</strong>。它没有测试只对新题加一句“请一步步思考”、却不给示例的写法。论文在图 1 里直接并排展示了普通提示与思维链提示的格式差异。</p>
          <p>依据：<a href={`${original}#S0.F1`} target="_blank" rel="noopener noreferrer">原论文图 1：两种提示格式</a>、<a href={`${original}#S3.SS1`} target="_blank" rel="noopener noreferrer">§3.1：算术实验设置</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[2].id} number="03" label={contents[2].title} title="同一个模型，写出步骤后真的更容易答对吗？">
        <PaperProse>
          <p><strong>在论文所测的大模型和多步任务上，是的；但增益取决于题目和模型规模。</strong>下面先固定 PaLM 540B，只比较普通少样本提示与带中间步骤的少样本提示。答对率表示该数据集里最终答案正确的题目比例。</p>
        </PaperProse>
        <ChainOfThoughtResults />
        <PaperProse>
          <p>GSM8K 是多步数学应用题集：PaLM 540B 从普通提示的 <strong>17.9%</strong> 提升到思维链提示的 <strong>56.9%</strong>，增加 39.0 个百分点。SVAMP 从 69.4% 到 79.0%；ASDiv 从 72.1% 到 73.9%。同一种方法在不同题集上的增益差别很大，不能把 GSM8K 的提升套用到所有数学题。</p>
          <p>论文还在常识任务和符号任务上测试了这种格式。部分常识任务有提升，但 CSQA 的增益很小；在“逐次翻转硬币”等人为设计的符号任务里，大模型对比示例更长的测试序列也有一定迁移。不过符号实验是结构明确的玩具任务，不等于现实世界的复杂推理已解决。</p>
          <h3>模型越大，增益越稳吗？</h3>
          <p>在论文测试的模型和算术题集里，小模型往往只生成流畅但不合逻辑的步骤，成绩可能还不如普通提示；明显增益主要出现在约千亿参数级的模型。这个观察是这些模型与基准上的实验结果，不能拿参数量当作今天所有模型的通用门槛。</p>
          <p>依据：<a href={`${original}#A2.T2`} target="_blank" rel="noopener noreferrer">原论文附录 B 表 2：算术答对率</a>、<a href={`${original}#S3.F4`} target="_blank" rel="noopener noreferrer">图 4：模型规模与收益</a>、<a href={`${original}#S4`} target="_blank" rel="noopener noreferrer">§4：常识任务</a>、<a href={`${original}#S5`} target="_blank" rel="noopener noreferrer">§5：符号任务</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[3].id} number="04" label={contents[3].title} title="提升来自多写了文字，还是来自步骤的顺序？">
        <PaperProse>
          <p><strong>论文的消融实验支持“答案之前的自然语言步骤”起了作用，单纯多生成文字并不能解释全部增益。</strong>消融实验就是一次只改提示的某个部分，看结果怎样变化。</p>
        </PaperProse>
        <ChainOfThoughtAblationDiagram />
        <PaperProse>
          <p>作者试了几种替代写法：只写算式，在 GSM8K 这类语义复杂的题上帮助有限；让模型多生成一些圆点，表现接近普通提示；先给答案再补步骤，也没有得到类似的增益。相比之下，先用自然语言说明数量关系、再给答案，更能帮助所测大模型处理难题。</p>
          <p>这不表示“只有自然语言步骤有用”。论文附录指出，对于只需一两步的算术题，直接写算式也能改善表现。合理的结论是：<strong>步骤是否有帮助，与题目是否需要先理解、再分解有关。</strong></p>
          <p>依据：<a href={`${original}#S3.SS3`} target="_blank" rel="noopener noreferrer">原论文 §3.3 与图 5：消融实验</a>、<a href={`${original}#A1.SS4`} target="_blank" rel="noopener noreferrer">附录 A.4：只写公式的边界</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[4].id} number="05" label={contents[4].title} title="看起来有条理的步骤，可以直接相信吗？">
        <PaperProse>
          <p><strong>不能。步骤可能写得流畅却算错、理解错题目，甚至碰巧得到正确答案。</strong>论文人工检查了 LaMDA 137B 在 GSM8K 上的 50 个“最终答对”的样本，其中有 2 个推导过程并不正确；另检查了 50 个“最终答错”的样本，既发现细小计算错误，也发现明显的语义理解或连贯性错误。这是小规模人工分析，不是所有模型的错误率。</p>
          <p>作者还明确留下一个开放问题：可见的思维链模仿了人类写解题过程的形式，却不能证明神经网络内部实际如何得出答案。页面中的流程图因此只画“输入示例和输出文本”的关系，不把可见步骤画成模型内部真实思路。</p>
          <p>实际使用还要考虑成本。论文所测明显收益主要依赖非常大的模型；生成更多步骤也会增加输出长度和计算开销。例题质量、题目复杂度和目标任务都会影响效果。产品启发是对目标题集同时检查最终答案和关键步骤，并记录输出成本；这是根据论文边界提出的评估建议，并非论文已完成的产品验证。</p>
          <p>依据：<a href={`${original}#S3.SS2`} target="_blank" rel="noopener noreferrer">原论文 §3.2：结果与错误分析</a>、<a href={`${original}#S3.SS4`} target="_blank" rel="noopener noreferrer">§3.4：示例变动</a>、<a href={`${original}#S6`} target="_blank" rel="noopener noreferrer">§6：讨论与局限</a>。</p>
        </PaperProse>
      </PaperSection>
    </PaperDetailLayout>
  );
}
