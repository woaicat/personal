import type { Metadata } from "next";
import { papers } from "@/content/ai-papers/papers";
import PaperDetailLayout from "@/components/ai-papers/detail/PaperDetailLayout";
import PaperHero from "@/components/ai-papers/detail/PaperHero";
import PaperSection from "@/components/ai-papers/detail/PaperSection";
import PaperProse from "@/components/ai-papers/detail/PaperProse";
import TrainingFlow from "@/components/ai-papers/instructgpt/TrainingFlow";
import styles from "@/components/ai-papers/instructgpt/instructgpt.module.css";

export const metadata: Metadata = {
  title: "InstructGPT 图解：用人类反馈教模型遵循指令 | JiaXuan GAO",
  description: "用交互流程理解 InstructGPT：监督微调 SFT、偏好排序与奖励模型、PPO，以及人类反馈强化学习的实验结果和边界。",
  alternates: { canonical: "/ai-papers/instructgpt" }
};

const paper = papers.find((item) => item.slug === "instructgpt")!;
const original = "https://arxiv.org/html/2203.02155v1";
const contents = [{ id: "problem", title: "核心问题" }, { id: "training", title: "三步训练" }, { id: "reward", title: "奖励与约束" }, { id: "results", title: "结果与边界" }];

export default function InstructGPTPage() {
  return (
    <PaperDetailLayout paper={paper} contents={contents} hero={
      <PaperHero paper={paper} authors="Long Ouyang 等 20 位作者 · OpenAI" publication="2022" description="会预测下一个词，不等于会完成用户的任务。InstructGPT 在 GPT-3 的基础上，用人类示范、偏好比较和强化学习，把“怎样回答更符合要求”变成训练信号。" visual={
        <div className={styles.heroArt}>
          <div className={styles.heroLabel}><span>LEARNING FROM HUMAN FEEDBACK</span><span>2022</span></div>
          <ol className={styles.heroSteps}><li><small>01</small><strong>先看人怎么答</strong><small>SFT</small></li><li><small>02</small><strong>再学人怎么选</strong><small>RM</small></li><li><small>03</small><strong>根据反馈练习</strong><small>PPO</small></li></ol>
          <p className={styles.heroCaption}>从“接着写”，走向“按要求做”。</p>
        </div>
      } />
    }>
      <PaperSection id={contents[0].id} number="01" label={contents[0].title} title="模型写得通顺，为什么还是不好用？">
        <PaperProse>
          <p>你让一位助手“用三句话写一份会议通知”，他却写了一篇《怎样写好会议通知》。文章可能很流畅，也没有明显的语法错误，但你要的成品没有出现。</p>
          <p>这个原创小例子展示了两种目标的差别：<strong>文字像不像一段自然文本，与回答有没有完成任务，是两回事。</strong>预训练让模型从大量文本中学习预测后续内容，而用户更关心指令、事实和约束有没有被满足。</p>
          <h3>给模型的，不只是更多文字</h3>
          <p>InstructGPT 沿用 GPT-3 的架构，通过微调改变回答行为。可以类比带新人：先给工作范例，再一起比较好坏，最后让他在评价反馈下反复练习。模型并没有真的理解老师的心意；这些指导被转换成了训练数据和优化目标。</p>
          <blockquote><p>问题从“哪段续写更像训练文本”，转向“对于这条指令，人更希望得到哪种回答”。</p></blockquote>
          <p>依据：<a href={`${original}#S1`} target="_blank" rel="noopener noreferrer">原论文 §1：研究动机</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[1].id} number="02" label={contents[1].title} title="示范、比较、练习：三步把反馈接进训练" description="点击三个阶段，观察训练数据、训练对象和输出如何变化。第二步还可以亲手做一次偏好选择。">
        <TrainingFlow />
        <PaperProse>
          <h3>三步的分工，不要混在一起</h3>
          <p><strong>SFT 学习“怎么回答”；RM 学习“哪份更好”；PPO 则利用 RM 的评分继续调整回答模型。</strong>人类不需要为强化学习中的每一次生成都现场打分，奖励模型把已有的比较经验推广到新回答。</p>
          <p>这也不是一次对话中的即时学习。这里描述的是离线训练流程；网页上的选择只是帮助理解，既没有连接模型训练，也不会改变真实模型。</p>
          <p>依据：<a href={`${original}#S3.SS1`} target="_blank" rel="noopener noreferrer">原论文 §3.1 与图 2：三阶段方法</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[2].id} number="03" label={contents[2].title} title="写答案的模型，与评答案的模型">
        <div className={styles.roles}><div className={styles.role}><span>POLICY / 生成策略</span><h3>负责回答</h3><p>输入提示，生成后续文本。SFT 和 PPO 都会更新它；完成训练后，用它来回复用户。</p></div><div className={styles.role}><span>REWARD MODEL / 奖励模型</span><h3>负责评分</h3><p>输入提示和候选回答，输出一个标量分数。训练目标是预测人类偏好，不是直接判定事实真伪。</p></div></div>
        <PaperProse>
          <h3>为什么不能只追求高分？</h3>
          <p>继续用带新人的比喻：假如考核只奖励“看起来很完整”，新人就可能写得越来越长，却没有解决问题。奖励只是目标的近似，评分高不保证回答真的好。</p>
          <p>论文在强化学习目标中加入 <strong>KL 惩罚</strong>，约束新策略相对 SFT 参考策略的偏离；还尝试混入预训练数据上的学习更新，缓解部分通用任务表现下降，这个版本称为 <strong>PPO-ptx</strong>。这些措施是在管理训练取舍，并不等于保证正确或安全。</p>
          <p>依据：<a href={`${original}#S3.SS5`} target="_blank" rel="noopener noreferrer">原论文 §3.5：奖励模型、PPO 与 PPO-ptx</a>。</p>
        </PaperProse>
      </PaperSection>

      <PaperSection id={contents[3].id} number="04" label={contents[3].title} title="更符合人的偏好，不一定需要更大的模型">
        <PaperProse><p>论文最醒目的结果，是在其 API 提示分布的人类评估中，标注员更偏好 1.3B InstructGPT 的回答，而不是 175B GPT-3 的回答。</p></PaperProse>
        <figure className={styles.figure}><div className={styles.result}><div className={styles.comparison}><div><strong>1.3B</strong><span>InstructGPT<br />经过人类反馈微调</span></div><span>对比</span><div><strong>175B</strong><span>GPT-3<br />预训练基线</span></div></div><p>在这项人类偏好评估中，更小的 InstructGPT 获得了更好的评价。</p></div><figcaption>依据原论文摘要与图 1。B 表示十亿参数；这里展示的是模型规模，不是胜率，也不能据此推断所有任务的能力高低。</figcaption></figure>
        <PaperProse>
          <h3>这个结果说明了什么？</h3>
          <p>训练目标和反馈方式，会影响模型是否好用。评估一个助手时，除了知识量和通用测试成绩，也应该观察它是否完成真实任务、满足格式要求，以及有没有加入未经支持的信息。这是从论文得到的产品启发，不是额外的实验结论。</p>
          <h3>还没有解决的问题</h3>
          <ul><li><strong>偏好有来源。</strong>模型主要贴近参与标注者和研究者的评价标准，不能把它等同于所有人的价值观。</li><li><strong>更受欢迎不等于更真实。</strong>奖励模型可能学到表面特征，InstructGPT 也仍会编造事实、误解指令或顺着错误前提回答。</li><li><strong>微调存在取舍。</strong>PPO-ptx 缓解了部分任务退化，但不能据此声称所有原有能力都被完整保留。</li></ul>
          <blockquote><p>把“好回答”讲清楚、写成示范、做成比较，再检验模型究竟学到了什么。</p></blockquote>
          <p>依据：<a href={`${original}#S4`} target="_blank" rel="noopener noreferrer">原论文 §4：实验结果</a>、<a href={`${original}#S5`} target="_blank" rel="noopener noreferrer">§5：讨论与局限</a>。</p>
        </PaperProse>
      </PaperSection>
    </PaperDetailLayout>
  );
}
