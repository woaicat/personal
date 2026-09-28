import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  AlertTriangle, ArrowDown, ArrowRight, Ban, BarChart3, CheckCircle2,
  Code2, Database, ExternalLink, FileText, Folder, GitBranch, Layers3,
  Lightbulb, Link2, List, PanelsTopLeft, Pencil, RefreshCw, Scissors,
  Search, Settings, Shield, Star, Tag, Target, Terminal, TestTube2,
  UsersRound, type LucideIcon
} from "lucide-react";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import AgentLessonShell, { AgentLessonSection } from "@/components/agent-course/AgentLessonShell";
import SkillConfirmationDemo from "@/components/agent-course/lessons/SkillConfirmationDemo";
import s from "@/components/agent-course/styles/agent-skill.module.css";

type ContentSection = { title: string; body: string };

function tidy(body: string) {
  return body.trim().replace(/^---\s*\n/, "").replace(/\n---\s*$/, "").trim();
}

function sections(markdown: string, level: 2 | 3): ContentSection[] {
  const expression = new RegExp(`^${"#".repeat(level)} (.+)$`, "gm");
  const codeBlocks = Array.from(markdown.matchAll(/```[\s\S]*?```/g));
  const matches = Array.from(markdown.matchAll(expression)).filter(heading => !codeBlocks.some(block =>
    (heading.index ?? 0) >= (block.index ?? 0) && (heading.index ?? 0) < (block.index ?? 0) + block[0].length
  ));
  return matches.map((match, index) => ({
    title: match[1].replace(/skill/g, "Skill").replace("Workflow三", "Workflow 三"),
    body: tidy(markdown.slice((match.index ?? 0) + match[0].length, matches[index + 1]?.index ?? markdown.length))
  }));
}

function Markdown({ children }: { children: string }) {
  return <div className={s.copy}><ReactMarkdown remarkPlugins={[remarkGfm]} components={{
    table: ({ children }) => <div className={s.tableScroll} tabIndex={0} role="region" aria-label="课程内容对照表，可横向滚动"><table>{children}</table></div>,
    pre: ({ children }) => <pre tabIndex={0}>{children}</pre>
  }}>{children}</ReactMarkdown></div>;
}

function Icon({ icon: Symbol }: { icon: LucideIcon }) {
  return <span className={s.icon}><Symbol size={25} strokeWidth={1.8} aria-hidden="true" /></span>;
}

function Note({ children }: { children: ReactNode }) {
  return <div className={s.note}><CheckCircle2 size={25} strokeWidth={1.8} aria-hidden="true" /><strong>{children}</strong></div>;
}

function Card({ icon, title, children, number }: { icon?: LucideIcon; title: string; children: ReactNode; number?: number }) {
  return <article className={s.card}>{icon ? <Icon icon={icon} /> : <span className={s.number}>{number}</span>}<div className={s.cardContent}><h3>{title}</h3>{children}</div></article>;
}

function Subsection({ section, id, children }: { section: ContentSection; id: string; children?: ReactNode }) {
  return <div className={s.subsection} id={id}><h3>{section.title}</h3>{children ?? <Markdown>{section.body}</Markdown>}</div>;
}

function Branch({ root, nodes }: { root: string; nodes: Array<[LucideIcon, string, string?]> }) {
  return <div className={s.branch}><strong className={s.branchRoot}>{root}</strong><div className={s.branchNodes}>{nodes.map(([Symbol, label, text]) => <div className={s.branchNode} key={label}><ArrowDown className={s.branchArrow} size={16} aria-hidden="true" /><Symbol size={25} strokeWidth={1.8} aria-hidden="true" /><div><strong>{label}</strong>{text && <span>{text}</span>}</div></div>)}</div></div>;
}

function PaperCut() {
  return <svg className={s.paperCut} viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="4">{Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="50" cy="25" rx="9" ry="19" transform={`rotate(${i * 45} 50 50)`} />)}<circle cx="50" cy="50" r="12" /><circle cx="50" cy="50" r="5" /></g></svg>;
}

function Characteristics({ body }: { body: string }) {
  const parts = body.split(/\n\n(?=\*\*特点)/);
  const icons = [FileText, Lightbulb, Layers3];
  return <><div className={s.cardList}>{parts.map((part, index) => {
    const [heading, ...copy] = part.split("\n\n");
    return <Card key={heading} icon={icons[index]} title={heading.replace(/\*\*/g, "").replace(/^特点[一二三]：/, "")}><Markdown>{copy.join("\n\n")}</Markdown></Card>;
  })}</div><Branch root="发布网站 Skill" nodes={[[Terminal, "命令行工具"], [Database, "Git 工具"], [Layers3, "代码检查 Skill"]]} /></>;
}

function ScissorsComparison({ body }: { body: string }) {
  const paragraphs = body.split("\n\n");
  const tool = paragraphs.find(p => p.startsWith("> **剪刀")) ?? "";
  const skill = paragraphs.find(p => p.startsWith("> **剪窗花")) ?? "";
  const remaining = paragraphs.filter(p => p !== tool && p !== skill).join("\n\n");
  return <><div className={s.comparison}><div className={s.toolComparison}><Scissors size={54} strokeWidth={1.6} aria-hidden="true" /><div><h4>工具：剪刀</h4><Markdown>{tool.replace(/^> /, "")}</Markdown></div></div><div className={s.skillComparison}><PaperCut /><div><h4>Skill：剪窗花</h4><Markdown>{skill.replace(/^> /, "")}</Markdown></div><div className={s.materials}>{["剪刀", "刻刀", "红纸"].map(x => <span key={x}>{x}</span>)}</div></div></div><Markdown>{remaining}</Markdown></>;
}

function FiveLayers({ body }: { body: string }) {
  const [intro, rest = ""] = body.split("各层分工：");
  const tree = intro.match(/```[\s\S]*?```/)?.[0] ?? "";
  const layers = rest.trim().split(/\n\n(?=\*\*第[一二三四五]层)/);
  const icons = [Tag, List, Folder, Code2, FileText];
  const overview = [["元信息", "name + description，决定是否正确召回"], ["指令", "步骤、判断标准、停止条件、常见坑"], ["参考资料", "规范、术语、优秀案例，外置按需读"], ["脚本与工具", "确定性的操作交给代码"], ["示例", "输入 / 输出，锚定质量与风格"]];
  return <><Markdown>{intro.replace(tree, "")}</Markdown><div className={s.structure}><Markdown>{tree}</Markdown><ol>{overview.map(([title, text], i) => <li key={title}><span>{i + 1}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ol></div><div className={s.cardList}>{layers.map((layer, index) => {
    const [heading, ...copy] = layer.split("\n\n");
    return <Card icon={icons[index]} title={heading.replace(/\*\*/g, "")} key={heading}><Markdown>{copy.join("\n\n")}</Markdown></Card>;
  })}</div><Note>描述写得含糊，Skill 写得再好也召不回来。</Note></>;
}

function ProgressiveLoading({ body }: { body: string }) {
  const prose = body.replace(/```[\s\S]*?```/, "");
  const stages: Array<[LucideIcon, string, string]> = [[FileText, "第一层：name + description", "常驻，成本极低"], [List, "第二层：SKILL.md 主指令", "命中后才加载"], [Folder, "第三层：reference / scripts", "执行中用到才读取"]];
  return <><div className={s.loading}>{stages.map(([icon, title, detail], i) => <div key={title}><Card icon={icon} title={title}><p className={s.smallCopy}>{detail}</p></Card>{i < 2 && <div className={s.loadingArrow}><ArrowDown size={19} aria-hidden="true" /><span>{i === 0 ? "判定相关" : "执行需要"}</span></div>}</div>)}</div><Markdown>{prose}</Markdown><div className={s.twoColumns}><Card icon={Target} title="每次都要遵守 → 放进主指令"><p className={s.smallCopy}>必须始终遵守的规则、风格与约束，放在 SKILL.md 中。</p></Card><Card icon={FileText} title="本次大概率用不上 → 外置成文件"><p className={s.smallCopy}>不常用的示例、脚本与参考资料，需要时再读取。</p></Card></div><Note>省上下文的前提，是 Skill 自己也要省着用上下文。</Note></>;
}

function DeploymentExample({ body }: { body: string }) {
  const match = body.match(/```markdown\n([\s\S]*?)```/);
  if (!match) return <Markdown>{body}</Markdown>;
  const example = match[1];
  const [metadata, workflowAndRest = ""] = example.split("## 工作流程");
  const [workflow, judgmentsAndRest = ""] = workflowAndRest.split("## 判断标准");
  const [judgments, precautions = ""] = judgmentsAndRest.split("## 注意");
  const [intro, conclusion] = body.split(match[0]);
  return <><Markdown>{intro}</Markdown><div className={s.codeWindow}><div className={s.codeHeader}><FileText size={19} aria-hidden="true" /><strong>SKILL.md</strong><span>完整示例</span></div><div className={s.codeBody}><Markdown>{`\`\`\`yaml\n${metadata.trim()}\n\`\`\``}</Markdown><h4>工作流程</h4><Markdown>{workflow}</Markdown><h4>判断标准</h4><div className={s.judgments}><Markdown>{judgments}</Markdown></div><h4>注意事项</h4><div className={s.warning}><AlertTriangle size={22} aria-hidden="true" /><Markdown>{precautions}</Markdown></div></div></div><Markdown>{conclusion}</Markdown></>;
}

const benefits = [FileText, PanelsTopLeft, FileText, UsersRound, BarChart3];
const writing = [Search, Target, List, GitBranch, Pencil, Code2, Settings, Ban, TestTube2, Database];

function ToolDifferences({ body }: { body: string }) {
  const [table, more = ""] = body.split("还有三个容易忽略的区别：");
  const items = more.trim().split(/\n(?=- )/);
  const icons = [AlertTriangle, Database, GitBranch];
  return <><Markdown>{table}</Markdown><p className={s.smallCopy}>还有三个容易忽略的区别：</p><div className={s.cardList}>{items.map((item, i) => {
    const match = item.match(/^- \*\*(.+?)\*\*：([\s\S]*)/);
    return match ? <Card key={match[1]} icon={icons[i]} title={match[1]}><Markdown>{match[2]}</Markdown></Card> : <Markdown key={i}>{item}</Markdown>;
  })}</div></>;
}

function ModelManagement({ body }: { body: string }) {
  const items = body.split(/\n(?=- )/).map(item => item.replace(/^- /, ""));
  const titles = ["意图识别", "区分相似 Skill", "无匹配时不硬套"];
  const icons = [Target, FileText, Ban];
  return <div className={s.modelGrid}>{items.map((item, i) => <Card key={titles[i]} icon={icons[i]} title={titles[i]}><Markdown>{item}</Markdown></Card>)}</div>;
}

function NumberedCards({ items, icons }: { items: ContentSection[]; icons: LucideIcon[] }) {
  return <div className={s.cardList}>{items.map((item, i) => <Card key={item.title} icon={icons[i]} title={`${i + 1}. ${item.title.replace(/^\d+\.\d+\s+/, "")}`}><Markdown>{item.body}</Markdown></Card>)}</div>;
}

function EngineeringManagement({ body }: { body: string }) {
  const items = body.split(/\n(?=- )/).map(item => item.trim());
  const icons = [FileText, Search, Shield, Tag];
  return <><div className={s.cardList}>{items.map((item, index) => {
    const match = item.match(/^- \*\*(.+?)\*\*：([\s\S]*)/);
    return match ? <Card key={match[1]} icon={icons[index]} title={match[1]}><Markdown>{match[2]}</Markdown></Card> : <Markdown key={index}>{item}</Markdown>;
  })}</div><div className={s.duplicateExample}><strong>示例：检测到相似的 Skill</strong><div><span>周报生成</span><span>工作汇报撰写</span><ArrowRight size={22} aria-hidden="true" /><b>合并或明确边界</b></div></div></>;
}

function ManagementLoop({ body }: { body: string }) {
  const [metrics, actions = ""] = body.split("配套动作：");
  const items = actions.trim().split(/\n(?=\d\. )/);
  const icons = [Database, BarChart3, RefreshCw];
  return <><Markdown>{metrics}</Markdown><div className={s.panel}><h4>评测与优化的闭环流程</h4><div className={s.loop}>{items.map((item, index) => {
    const match = item.match(/^\d\. \*\*(.+?)\*\*：([\s\S]*)/);
    return <div className={s.loopStep} key={index}><Card icon={icons[index]} title={match?.[1] ?? "配套动作"}><Markdown>{match?.[2] ?? item}</Markdown></Card>{index < 2 && <ArrowRight size={22} aria-hidden="true" />}</div>;
  })}</div></div></>;
}

export default async function AgentSeventeenthLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  const source = await readFile(path.join(process.cwd(), "content/agent-course/lesson-17.md"), "utf8");
  const top = sections(source, 2);
  const one = sections(top[0].body, 3);
  const two = sections(top[1].body, 3);
  const three = sections(top[2].body, 3);
  const four = sections(top[3].body, 3);
  const five = sections(top[4].body, 3);
  const opening = tidy(source.slice(source.indexOf("你有没有"), source.indexOf("## 1.")));
  const [summary, questionsAndSources = ""] = top[5].body.split("> **课后思考题**");
  const [questions, sources = ""] = questionsAndSources.split("**素材来源与延伸阅读**：");
  const questionLines = questions.split("\n").filter(line => /^> \d\./.test(line)).map(line => line.replace(/^> \d\.\s*/, ""));
  const summaryLines = summary.split("\n").filter(line => /^\| [1-5]\./.test(line)).map(line => line.split("|").slice(1, 3).map(x => x.trim()));
  const summaryEnding = tidy(tidy(summary.slice(summary.lastIndexOf("\n|"))).split("\n\n").slice(1).join("\n\n"));
  const sourceNotes = sources.trim().split("\n").filter(line => line.startsWith("- "));
  const sourceLinks = ["https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills", "https://agentskills.io/", "https://www.anthropic.com/engineering/writing-tools-for-agents"];

  return <AgentLessonShell detail={detail}>
    <div className={s.opening}><Markdown>{opening}</Markdown></div>
    <AgentLessonSection id="section-1" title={top[0].title}>
      <Subsection section={one[0]} id="section-1-1" />
      <Subsection section={one[1]} id="section-1-2"><Characteristics body={one[1].body} /></Subsection>
      <Subsection section={one[2]} id="section-1-3"><ScissorsComparison body={one[2].body} /></Subsection>
      <Subsection section={one[3]} id="section-1-4"><ToolDifferences body={one[3].body} /></Subsection>
      <Subsection section={one[4]} id="section-1-5"><Markdown>{one[4].body}</Markdown><Branch root="这件事的正确做法能不能被说清楚？" nodes={[[FileText, "Prompt", "只干一次的需求"], [Settings, "Skill", "重复且需要灵活判断"], [GitBranch, "Workflow", "一步不能错的固定步骤"]]} /></Subsection>
    </AgentLessonSection>
    <AgentLessonSection id="section-2" title={top[1].title}>
      <Subsection section={two[0]} id="section-2-1"><Markdown>{two[0].body}</Markdown><div className={s.miniGrid}>{[[Tag, "名字", "会议纪要整理"], [FileText, "场景", "会议记录整理"], [List, "步骤", "结论 / 议题 / 待办"], [CheckCircle2, "验收标准", "结构完整，信息准确"]].map(([icon, title, text]) => <Card key={String(title)} icon={icon as LucideIcon} title={title as string}><p className={s.smallCopy}>{text as string}</p></Card>)}</div></Subsection>
      <Subsection section={two[1]} id="section-2-2"><FiveLayers body={two[1].body} /></Subsection>
      <Subsection section={two[2]} id="section-2-3"><ProgressiveLoading body={two[2].body} /></Subsection>
      <Subsection section={two[3]} id="section-2-4"><DeploymentExample body={two[3].body} /></Subsection>
    </AgentLessonSection>
    <AgentLessonSection id="section-3" title={top[2].title}><NumberedCards items={three} icons={benefits} /><Note>从个人会做，走向组织可复用。</Note></AgentLessonSection>
    <AgentLessonSection id="section-4" title={top[3].title}><NumberedCards items={four} icons={writing} /><Note>真实需求 → 观察失败 → 修改描述与指令 → 回归验证</Note></AgentLessonSection>
    <AgentLessonSection id="section-5" title={top[4].title}>
      <Markdown>{tidy(top[4].body.slice(0, top[4].body.indexOf("### ")))}</Markdown>
      <Subsection section={five[0]} id="section-5-1"><EngineeringManagement body={five[0].body} /></Subsection>
      <Subsection section={five[1]} id="section-5-2"><SkillConfirmationDemo /><Markdown>{five[1].body}</Markdown><div className={s.miniGrid}>{[[Search, "直接检索", "搜索、浏览 Skill 库"], [List, "显式指定", "选中 Skill 后发起任务"], [Star, "常用置顶 / 场景分组", "按项目、部门和频率组织"]].map(([icon, title, text]) => <Card key={String(title)} icon={icon as LucideIcon} title={title as string}><p className={s.smallCopy}>{text as string}</p></Card>)}</div></Subsection>
      <Subsection section={five[2]} id="section-5-3"><ModelManagement body={five[2].body} /></Subsection>
      <Subsection section={five[3]} id="section-5-4"><ManagementLoop body={five[3].body} /></Subsection>
    </AgentLessonSection>
    <AgentLessonSection id="section-6" title="6. 本课小结"><div className={s.cardList}>{summaryLines.map(([title, body], index) => <Card key={title} number={index + 1} title={title.replace(/^\d\. /, "")}><Markdown>{body}</Markdown></Card>)}</div><div className={s.note}><CheckCircle2 size={25} strokeWidth={1.8} aria-hidden="true" /><Markdown>{summaryEnding}</Markdown></div></AgentLessonSection>
    <AgentLessonSection id="section-7" title="7. 课后思考题"><p className={s.questionIntro}>结合你的实际工作，思考并完成以下问题。它们没有标准答案，重在把所学应用到真实场景。</p><div className={s.cardList}>{questionLines.map((question, index) => <article className={s.card} key={question}><span className={s.questionNumber}>{String(index + 1).padStart(2, "0")}</span><div className={s.cardContent}><Markdown>{question}</Markdown><p className={s.exerciseHint}><FileText size={18} aria-hidden="true" />{["产出：元信息、指令、参考、脚本、示例", "检查：做什么 / 适用 / 不适用", "检查：重复、控制、区分", "思考：隐性经验如何成为组织资产"][index]}</p></div></article>)}</div><div className={s.references}><h3><Link2 size={25} strokeWidth={1.8} aria-hidden="true" />素材来源与延伸阅读</h3><div>{sourceNotes.slice(0, 3).map((note, i) => <a href={sourceLinks[i]} key={note} target="_blank" rel="noreferrer"><FileText size={20} aria-hidden="true" /><Markdown>{note.replace(/^- /, "")}</Markdown><ExternalLink size={18} aria-hidden="true" /></a>)}</div><Markdown>{sourceNotes[3]?.replace(/^- /, "") ?? ""}</Markdown></div></AgentLessonSection>
  </AgentLessonShell>;
}
