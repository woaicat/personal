import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Bot,
  Check,
  CircleX,
  ClipboardCheck,
  Database,
  FileCode2,
  FileLock2,
  FileText,
  FolderLock,
  HardDrive,
  KeyRound,
  LockKeyhole,
  Network,
  Play,
  ShieldCheck,
  SlidersHorizontal,
  TerminalSquare,
  Wrench
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import AgentLessonShell, { AgentLessonSection } from "@/components/agent-course/AgentLessonShell";
import s from "@/components/agent-course/styles/agent-hook-sandbox.module.css";

type IconDetail = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const hookStages = ["用户发起任务", "Agent 开始工作", "准备调用工具", "执行工具", "获得工具结果", "继续思考", "准备结束任务"];

const hookExamples: IconDetail[] = [
  { icon: Bot, title: "客服 Agent", description: "遇款前检查金额是否超限" },
  { icon: Database, title: "数据分析 Agent", description: "执行 SQL 前禁止 DELETE / DROP" },
  { icon: FileText, title: "内容发布 Agent", description: "正式发布前做敏感词与格式检查" }
];

const hookMoments: IconDetail[] = [
  { icon: Play, title: "运行开始前", description: "加载用户身份、初始化环境、检查权限" },
  { icon: Wrench, title: "工具调用前", description: "检查工具、参数、权限和风险" },
  { icon: FileCode2, title: "工具调用后", description: "记录日志、检查结果、清理异常" },
  { icon: ShieldCheck, title: "运行结束前", description: "检查结果是否完成，是否遗漏步骤、保存记录" }
];

const sandboxSections: IconDetail[] = [
  { icon: FolderLock, title: "文件权限", description: "/project 可读写；/tmp 可临时写；/system 和用户目录禁止访问。" },
  { icon: Network, title: "网络权限", description: "只允许白名单域名；限制外传下载；记录访问行为。" },
  { icon: TerminalSquare, title: "系统权限", description: "限制可运行命令、进程和系统级操作。" },
  { icon: SlidersHorizontal, title: "资源限制", description: "设置 CPU、内存、运行时间与磁盘容量上限。" }
];

const sandboxChecks = ["默认最小权限", "按任务逐步放开", "隔离不同用户", "敏感信息不进上下文", "记录凭证和调用数据"];

function FlowArrow() {
  return <ArrowRight className={s.flowArrow} aria-hidden="true" size={17} strokeWidth={1.7} />;
}

function HookExample({ icon: Icon, title, description }: IconDetail) {
  return <article className={s.hookExample}><Icon aria-hidden="true" size={25} strokeWidth={1.65} /><div><h4>{title}</h4><p>{description}</p></div></article>;
}

function HookLifecycle() {
  return <div className={s.hookLifecycle} role="img" aria-label="Hook 在任务开始、工具调用和任务结束的关键节点运行">
    {hookStages.map((stage, index) => (
      <div className={s.hookLifecycleItem} key={stage}>
        <span className={index === 1 || index === 2 || index === 4 || index === 6 ? s.hookTag : s.lifecycleNode}>{index === 1 || index === 2 || index === 4 || index === 6 ? "Hook" : stage}</span>
        {index < hookStages.length - 1 ? <FlowArrow /> : null}
      </div>
    ))}
  </div>;
}

function SandboxBoundary() {
  return <div className={s.sandboxBoundary} role="img" aria-label="Sandbox 将 Agent 的可访问资源限制在安全边界内">
    <div className={s.sandboxSafe}><ShieldCheck aria-hidden="true" size={29} strokeWidth={1.55} /><strong>安全范围内<br />（可访问）</strong><ul><li>创建文件</li><li>运行代码</li><li>安装部分依赖</li><li>修改项目代码</li></ul></div>
    <FlowArrow />
    <div className={s.sandboxBox}><Bot aria-hidden="true" size={32} strokeWidth={1.55} /><strong>Sandbox</strong><span>受限制的执行环境</span></div>
    <FlowArrow />
    <div className={s.sandboxDanger}><AlertTriangle aria-hidden="true" size={29} strokeWidth={1.55} /><strong>安全范围外<br />（不可访问）</strong><ul><li>系统文件</li><li>用户私人文件</li><li>公司私密数据</li><li>任意互联网地址</li></ul></div>
  </div>;
}

function SandboxSection({ icon: Icon, title, description }: IconDetail) {
  return <article className={s.sandboxSection}><Icon aria-hidden="true" size={23} strokeWidth={1.65} /><h3>{title}</h3><p>{description}</p></article>;
}

export default function AgentEleventhLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  return (
    <AgentLessonShell detail={detail}>
      <AgentLessonSection id="section-1" title="1. Hook">
        <p>Hook 可以理解成一种事件触发机制：当程序运行到某个特定节点时，自动执行提前写好的逻辑。</p>

        <div className={s.subsection} id="section-1-1">
          <h3>1.1 什么是 Hook？</h3>
          <div className={s.hookIntroStack}>
            <article className={s.hookPanel}>
              <h4>A. 事件触发机制</h4>
              <div className={s.hookTriggerVisual} aria-label="Agent 准备调用工具时，Hook 检查工具和参数并决定允许或阻止">
                <div className={s.triggerSteps}>{["用户发起任务", "Agent 开始工作", "准备调用工具", "执行工具", "获得工具结果", "继续思考", "准备结束任务"].map((item) => <span key={item}>{item}</span>)}</div>
                <ArrowDown aria-hidden="true" size={18} />
                <div className={s.hookDecision}><span>准备调用工具</span><span>Hook：检查工具和参数</span><strong>允许执行？</strong><div><span><Check aria-hidden="true" size={15} />执行工具</span><span><CircleX aria-hidden="true" size={15} />阻止执行</span></div></div>
              </div>
            </article>
            <article className={s.hookPanel}>
              <h4>B. 典型案例</h4>
              <div className={s.hookExampleStack}>{hookExamples.map((item) => <HookExample {...item} key={item.title} />)}</div>
              <p className={s.panelFootnote}>Hook 就像提前设置好的自动开关，事件发生时会自动运行。</p>
            </article>
          </div>
        </div>

        <div className={s.subsection} id="section-1-2">
          <h3>1.2 为什么 Agent 需要 Hook？</h3>
          <div className={s.hookContrast}>
            <article><h4>Prompt：告诉 Agent 应该怎么做</h4><p>“请只删除临时文件，不要删除重要数据。”</p><span>容易被忽略或绕过。</span></article>
            <article><h4>Hook：在关键节点强制执行规则</h4><div className={s.hookRuleFlow}><span>Agent：我要删除 data.csv</span><FlowArrow /><span>PreToolUse Hook</span><FlowArrow /><ul><li>文件是否允许删除</li><li>当前用户有无权限</li><li>是否属于保护目录</li></ul><FlowArrow /><div><b><Check size={14} />通过 → 执行</b><b><CircleX size={14} />不通过 → 拒绝</b></div></div></article>
          </div>
          <p className={s.insight}><ShieldCheck aria-hidden="true" size={16} />很多重要规则不能只依赖 Prompt，而要做到每次都强制执行。</p>
        </div>

        <div className={s.subsection} id="section-1-3">
          <h3>1.3 Hook 是怎么工作的？</h3>
          <HookLifecycle />
          <div className={s.momentGrid}>{hookMoments.map(({ icon: Icon, title, description }) => <article key={title}><Icon aria-hidden="true" size={23} strokeWidth={1.65} /><h4>{title}</h4><p>{description}</p></article>)}</div>
        </div>

        <div className={s.subsection} id="section-1-4">
          <h3>1.4 使用 Hook 需要注意什么？</h3>
          <div className={s.twoNotes}><article><AlertTriangle aria-hidden="true" size={25} /><h4>别什么都塞进 Hook</h4><p>Hook 适合明确、稳定、可程序化判断的规则，例如禁止修改系统文件、限制文件大小、记录工具调用日志。复杂理解和灵活判断，仍应交给 Agent 自己处理。</p></article><article><Wrench aria-hidden="true" size={25} /><h4>要定义 Hook 失败后怎么办</h4><p>根据场景选择合适的失败策略：继续运行、直接拒绝，或要求人工确认。涉及安全、资金、删除数据等高风险动作时，失败即放弃往往更重要。</p></article></div>
        </div>
      </AgentLessonSection>

      <AgentLessonSection id="section-2" title="2. Sandbox">
        <p>Sandbox 是给 Agent 提供一个受限制的执行环境，用来限制它能在哪里活动、能接触到什么资源。</p>
        <div className={s.sandboxStack}>
          <div className={s.subsection} id="section-2-1"><h3>2.1 什么是 Sandbox？</h3><SandboxBoundary /></div>
          <div className={s.subsection} id="section-2-2"><h3>2.2 为什么 Agent 需要 Sandbox？</h3><div className={s.riskFlow}>{["读取代码", "修改文件", "执行终端", "安装依赖", "运行命令", "访问网络"].map((item) => <span key={item}>{item}</span>)}</div><div className={s.riskContrast}><span><AlertTriangle size={16} />用户：把测试数据清理一下</span><FlowArrow /><span><AlertTriangle size={16} />Agent 错误执行：rm -rf data/</span></div><p className={s.insight}><ShieldCheck aria-hidden="true" size={16} />即使 Agent 做出了错误决定，影响范围依然被限制在安全区域内。</p></div>
          <div className={s.subsection} id="section-2-3"><h3>2.3 Sandbox 是怎么工作的？</h3><div className={s.sandboxSectionStack}>{sandboxSections.map((item) => <SandboxSection {...item} key={item.title} />)}</div></div>
          <div className={s.subsection} id="section-2-4"><h3>2.4 使用 Sandbox 需要注意什么？</h3><div className={s.sandboxAdvice}><article><LockKeyhole aria-hidden="true" size={25} /><h4>默认给最小权限</h4><p>先给完成任务所需的最小权限，再根据需要逐步扩大。</p></article><article><KeyRound aria-hidden="true" size={25} /><h4>Sandbox 和审批配合使用</h4><p>沙箱内的低风险操作可自动执行，越过边界或涉及敏感信息时交给人工审批。</p></article><article><HardDrive aria-hidden="true" size={25} /><h4>注意凭证和敏感数据</h4><ul>{sandboxChecks.map((item) => <li key={item}>{item}</li>)}</ul></article></div></div>
        </div>
      </AgentLessonSection>

      <AgentLessonSection id="section-3" title="3. Hook 和 Sandbox 有什么区别？">
        <div className={s.differenceGrid}><article><h3>Hook</h3><div><Bot aria-hidden="true" size={21} /><FlowArrow /><span>Hook</span><FlowArrow /><ClipboardCheck aria-hidden="true" size={21} /></div><p><strong>控制的是：</strong>这个动作要不要执行<br /><strong>发生在：</strong>关键节点时检查</p></article><article><h3>Sandbox</h3><div><Bot aria-hidden="true" size={21} /><FlowArrow /><span>Sandbox</span><FlowArrow /><FileLock2 aria-hidden="true" size={21} /></div><p><strong>控制的是：</strong>这个动作最多能影响多大范围<br /><strong>发生在：</strong>执行环境中始终生效</p></article></div>
        <p className={s.differenceSummary}>Hook 在关键节点前检查，拦截或记录 Agent 的活动；Sandbox 则划定 Agent 真正可以活动的边界。两者配合，才能在增强自主能力的同时把风险控制在相对可控的范围内。</p>
      </AgentLessonSection>
    </AgentLessonShell>
  );
}
