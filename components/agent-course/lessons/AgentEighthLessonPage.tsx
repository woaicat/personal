import {
  Archive,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  CircleAlert,
  ClipboardList,
  FileText,
  Gauge,
  KeyRound,
  Layers3,
  ListChecks,
  LockKeyhole,
  MessageSquareText,
  Sparkles,
  Wrench
} from "lucide-react";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import AgentLessonShell, { AgentLessonSection } from "@/components/agent-course/AgentLessonShell";
import s from "@/components/agent-course/styles/agent-context.module.css";

const contextSources = [
  { icon: KeyRound, label: "系统提示词" },
  { icon: Wrench, label: "可用工具" },
  { icon: MessageSquareText, label: "历史对话" },
  { icon: FileText, label: "工具结果" },
  { icon: ListChecks, label: "任务状态" },
  { icon: ArrowRight, label: "最新请求" }
];

const assemblyGroups = [
  {
    tone: "fixed",
    title: "固定不变的基础信息",
    items: ["系统提示词", "工具名称与说明"]
  },
  {
    tone: "history",
    title: "对话与执行过程信息",
    items: ["用户请求", "历史对话", "工具调用记录", "工具返回结果"]
  },
  {
    tone: "task",
    title: "当前任务相关信息",
    items: ["当前任务计划", "已完成进度", "文件 / 知识库 / 网页资料"]
  }
];

const retentionRows = [
  { label: "用户要求 · 尽量完整保留", filled: 5 },
  { label: "关键决策 · 保留依据", filled: 4 },
  { label: "工具日志 · 提炼结果", filled: 2 }
];

const limitationItems = [
  "搜索需要额外时间",
  "可能搜不到关键信息",
  "可能召回无用内容",
  "可能缺少当时语境",
  "检索结果也占用窗口"
];

function ContextWorkbench() {
  return (
    <figure className={`${s.diagram} ${s.contextDiagram}`} aria-label="上下文把桌面资料聚焦给 Agent">
      <div className={s.workbench}>
        <div className={s.workbenchSources}>
          {contextSources.map(({ icon: Icon, label }) => (
            <div className={s.sourceCard} key={label}><Icon aria-hidden="true" size={16} strokeWidth={1.8} /><span>{label}</span></div>
          ))}
        </div>
        <div className={s.workbenchConnector} aria-hidden="true">
          <ArrowRight className={s.workbenchArrow} size={26} strokeWidth={1.6} />
        </div>
        <div className={s.agentNode}><Bot aria-hidden="true" size={27} strokeWidth={1.6} /><strong>Agent</strong><span>判断 → 行动</span></div>
      </div>
    </figure>
  );
}

function CapacityDiagram() {
  return (
    <figure className={s.capacityDiagram} aria-label="上下文窗口输入与输出共同占用容量">
      <div className={s.capacityBar}><span>输入 96K</span><span>预留输出 32K</span></div>
      <div className={s.capacityBracket}><span /><strong>128K</strong><span /></div>
      <strong className={s.capacityRule}>输入 + 输出，共同占用窗口</strong>
      <figcaption>128K 资料塞满后，就没有空间继续生成。</figcaption>
    </figure>
  );
}

function BudgetDiagram() {
  return (
    <figure className={s.budgetDiagram} aria-label="智能体上下文窗口上限与本轮占用容量的关系">
      <div className={s.budgetOuter}>
        <strong>智能体上下文窗口上限</strong>
        <div className={s.budgetInner}>
          <b>本轮占用容量</b>
          <div className={s.budgetItems}><span><FileText size={14} />固定指令</span><span><Layers3 size={14} />任务资料</span><span><MessageSquareText size={14} />近期历史</span></div>
        </div>
        <div className={s.budgetReserve}>输出与安全余量</div>
      </div>
      <figcaption>智能体上下文窗口上限不直接等于模型上下文窗口上限。</figcaption>
    </figure>
  );
}

function AssemblyDiagram() {
  return (
    <figure className={s.assemblyDiagram} aria-label="上下文组装示意图">
      <div className={s.diagramTitle}>把信息组装成这一轮的上下文</div>
      <div className={s.assemblyCanvas}>
        <div className={s.assemblyGroups}>
          {assemblyGroups.map((group) => (
            <div className={`${s.assemblyGroup} ${s[`assemblyGroup${group.tone}`]}`} key={group.title}>
              <strong>{group.title}</strong>
              {group.items.map((item, index) => <span key={item}>{index < 2 && group.tone === "fixed" ? <LockKeyhole size={13} /> : <FileText size={13} />}{item}</span>)}
            </div>
          ))}
        </div>
        <div className={s.assemblyConnectors} aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div className={s.modelViewport}>
          <strong>发送给模型</strong>
          <div className={s.viewportStack}>
            {assemblyGroups.flatMap((group) => group.items).map((item, index) => (
              <span className={index < 2 ? s.viewportFixed : index > 5 ? s.viewportTask : undefined} key={item}>{index < 2 ? <LockKeyhole size={13} /> : <FileText size={13} />}{item}</span>
            ))}
          </div>
          <div className={s.viewportLabels}><span>固定前缀</span><span>动态变化的内容</span><span>任务相关的补充信息</span></div>
        </div>
        <div className={s.tokenRuler}><span>Token</span><i /><i /><i /><i /></div>
      </div>
    </figure>
  );
}

function ToolGrowthDiagram() {
  return (
    <figure className={s.growthDiagram} aria-label="工具调用次数增加后上下文逐渐拥挤">
      <div className={s.diagramTitle}>随着工具调用次数增加，上下文会越来越拥挤</div>
      <div className={s.growthSteps}>
        {["第 1 次调用", "第 10 次调用", "第 20 次调用"].map((label, index) => (
          <div className={s.growthStep} key={label}><strong>{label}</strong><div className={s.documentStack}>{Array.from({ length: index === 0 ? 1 : index === 1 ? 4 : 8 }).map((_, itemIndex) => <span key={itemIndex}><FileText size={16} /></span>)}</div><small>{index === 0 ? "工具结果占用少量 Token" : index === 1 ? "工具结果占用较多 Token" : "工具结果也占窗口"}</small></div>
        ))}
      </div>
    </figure>
  );
}

function CacheDiagram() {
  return (
    <figure className={s.cacheDiagram} aria-label="提示词缓存复用固定前缀">
      <div className={s.diagramTitle}>提示词缓存 Prompt Caching</div>
      <div className={s.cacheRows}>
        {["第 1 轮", "第 2 轮", "第 3 轮"].map((round, index) => (
          <div className={s.cacheRow} key={round}><strong>{round}</strong><span className={s.cachePrefix}>系统提示词 + 工具说明</span><span className={s.cacheChanged}>本轮变化内容</span><b>{index === 0 ? "建立缓存" : "复用前缀"}</b></div>
        ))}
      </div>
      <div className={s.cacheLock}><LockKeyhole size={15} />复用相同前缀</div>
      <figcaption>命中缓存还需满足模型与接口的缓存规则。</figcaption>
    </figure>
  );
}

function SlidingWindowDiagram() {
  return (
    <figure className={s.slidingDiagram} aria-label="滑动窗口保留最近三轮对话">
      <div className={s.slidingRow}><strong>第 3 轮结束</strong><div className={s.windowRail}><span>第 1 轮</span><span>第 2 轮</span><span>第 3 轮</span></div><em>当前上下文<br />（最近 3 轮）</em></div>
      <div className={s.slidingRow}><strong>第 4 轮进入</strong><div className={`${s.windowRail} ${s.windowRailMoved}`}><i>第 1 轮</i><span>第 2 轮</span><span>第 3 轮</span><span className={s.entered}>第 4 轮</span></div><em>当前上下文<br />（最近 3 轮）</em></div>
      <div className={s.slidingLegend}><ArrowLeft size={16} />离开当前上下文 <span>窗口向前走，旧信息被挤出去。</span><ArrowRight size={16} /></div>
      <figcaption>窗口往前走，旧信息被挤出去。</figcaption>
    </figure>
  );
}

function ResetWindowDiagram() {
  return (
    <figure className={s.resetDiagram} aria-label="固定轮次达到限制后清空并开启新上下文">
      <div className={s.resetOld}><small>旧上下文（最多 5 轮）</small><div>{[1, 2, 3, 4, 5].map((item) => <span key={item}>第 {item} 轮</span>)}</div></div>
      <div className={s.resetBreak}><ArrowRight size={20} /><strong>清空</strong><ArrowRight size={20} /></div>
      <div className={s.resetNew}><small>新上下文</small><span>第 1 轮</span></div>
    </figure>
  );
}

function CompressionDiagram() {
  return (
    <figure className={s.compressionDiagram} aria-label="把一桌材料压缩成一页会议纪要">
      <div className={s.diagramTitle}>把一桌材料，整理成一页会议纪要</div>
      <div className={s.compressionFlow}>
        <div className={s.materialPile}><div className={s.pileSheets}>{Array.from({ length: 7 }).map((_, index) => <i style={{ transform: `translate(${index * 6}px, ${index * -3}px)` }} key={index} />)}</div><div className={s.materialPaper}><span>历史对话</span><span>工具日志</span><span>用户要求</span><span>关键决策</span><b>30,000 Token</b></div></div>
        <div className={s.compressionBottleneck}><svg className={s.convergeSvg} viewBox="0 0 220 160" preserveAspectRatio="none" aria-hidden="true"><path className={s.flowArea} d="M0 24 C46 24 66 57 108 78 C153 102 175 136 220 136 L220 24 C175 24 153 57 108 78 C66 99 46 136 0 136 Z" /><path d="M0 24 C46 24 66 57 108 78 C153 102 175 136 220 136" /><path d="M0 80 C47 80 70 80 108 80 C151 80 175 80 220 80" /><path d="M0 136 C46 136 66 103 108 82 C153 58 175 24 220 24" /></svg><span>压缩<br />提炼总结</span><ArrowRight size={25} /></div>
        <div className={s.summaryPaper}><strong><ClipboardList size={18} />会议纪要</strong><span><Check size={14} />目标与约束</span><span><Check size={14} />关键决策</span><span><Check size={14} />已完成事项</span><span><Check size={14} />待办与阻碍</span><b>3,000 Token</b></div>
      </div>
      <div className={s.compressionFoot}>体积缩小，关键状态继续传递</div>
      <figcaption>教学示例，压缩可能丢失细节。</figcaption>
    </figure>
  );
}

function FixedCompressionDiagram() {
  return (
    <div className={s.fixedCompression}>
      <Gauge aria-hidden="true" size={22} /><h4>固定压缩</h4>
      <p>当前上下文使用量达到 90%，就进行一次压缩。</p>
      <div className={s.usageLabel}><span>当前使用量</span><b>90% · 示例阈值</b></div>
      <div className={s.usageBar}><span /></div><div className={s.usageScale}><span>0%</span><span>100%</span></div>
      <ArrowDown className={s.compressArrow} aria-hidden="true" size={26} />
      <div className={s.shortUsageBar}><span /></div><strong>压缩后继续</strong>
      <small>阈值由产品策略决定。</small>
    </div>
  );
}

function DynamicCompressionDiagram() {
  return (
    <div className={s.dynamicCompression}>
      <Sparkles aria-hidden="true" size={22} /><h4>动态压缩</h4>
      <p>根据任务复杂度与信息类型，决定保留多少细节。</p>
      <div className={s.retentionList}>{retentionRows.map((row) => <div className={s.retentionRow} key={row.label}><span>{row.label}</span><div>{Array.from({ length: 5 }).map((_, index) => <i className={index < row.filled ? s.retained : undefined} key={index} />)}</div></div>)}</div>
      <small>复杂任务保留更多细节，简单任务提炼结论。</small>
    </div>
  );
}

function RetrievalDiagram() {
  return (
    <figure className={s.retrievalDiagram} aria-label="从外部历史存储检索并回填当前上下文">
      <div className={s.archiveZone}><strong>外部历史存储</strong><small>已保存的几百轮对话</small><div className={s.archiveBody}><Archive size={40} strokeWidth={1.3} /><div>{[1, 2, 3, 4, 5].map((item) => <span className={item === 3 ? s.archiveSelected : undefined} key={item}><FileText size={13} />历史对话记录 {item}</span>)}</div></div></div>
      <div className={s.retrievePath}><div><span>① 搜索相关历史</span><ArrowLeft size={25} /></div><strong>相关片段</strong><div><ArrowRight size={25} /><span>② 回填当前上下文</span></div></div>
      <div className={s.currentContext}><strong>当前上下文</strong><div className={s.chatCards}><span>我之前问过类似的问题吗？</span><b>这个问题之前好像聊过</b><span>是的，基于之前的讨论…</span></div><div className={s.continueAction}><Bot size={18} />③ 继续推理</div></div>
      <figcaption>历史可以留在外部，单次模型窗口仍然有限。</figcaption>
    </figure>
  );
}

export default function AgentEighthLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  return (
    <AgentLessonShell detail={detail}>
      <div className={s.lessonEightIntro}>
        <p>当我们向 ChatGPT、Codex、豆包、WorkBuddy 这些 AI 应用发出一句请求时，模型真正收到的内容，通常远远不止我们刚刚输入的这一句话。</p>
        <p>它看到的内容可能包括：系统提示词、当前可以使用的工具、历史对话、历史工具调用结果、当前任务的状态，以及用户最新发出的一句话。这些信息放在一起，就组成了当前的<strong>上下文（Context）</strong>。</p>
        <ContextWorkbench />
        <p>Agent 会基于这些上下文，判断自己现在应该做什么、调用什么工具、下一步怎么行动。</p>
        <p>你可以把上下文想象成 Agent 此刻摆在桌面上的所有资料。桌面上的资料越多，不一定越好。如果当前任务需要的是一份合同，但桌子上同时堆着几十份历史对话、工具说明、旧任务记录和无关材料，Agent 就需要从一大堆信息里找到真正重要的东西。</p>
        <p className={s.attentionQuote}>管理上下文，本质上就是管理 Agent 的注意力。</p>
      </div>

      <AgentLessonSection id="section-1" title="1. 上下文窗口大小">
        <h3 className={s.eighthSubheading}>模型自己的上下文窗口</h3>
        <p>模型一次能够看到的信息是有限的。这个限制通常被称为<strong>上下文窗口（Context Window）</strong>。你可以把它理解成模型的「工作台大小」。工作台再大，也不可能无限大。</p>
        <p>模型需要同时处理上下文中的所有 Token。上下文越长，需要计算和保存的信息也越多，会影响显存、计算量和推理速度。不同模型支持的 Token 上限也不同，有的支持几十万 Token，有的可以达到百万 Token。</p>
        <CapacityDiagram />
        <p>上下文窗口通常同时包含输入和输出。比如一个模型支持 128K Token，并不意味着你可以塞进去 128K Token 的资料，然后再让它继续输出大量内容。模型之前看到的内容，以及接下来准备生成的内容，都要占用这个窗口。</p>
        <h3 className={s.eighthSubheading}>智能体自己的上下文窗口</h3>
        <p>用户的请求理论上可以不断延续，但模型的窗口有限。上下文越长，成本越高，响应可能越慢，输出质量也可能下降；当历史信息超出模型自身窗口后，还需要有办法保持对话的连续性。</p>
        <p>所以很多 Agent 产品会设置自己的上下文窗口大小。设计 Agent 时，不光要知道模型窗口有多大，还需要考虑：<strong>这一轮到底应该让模型看到什么。</strong></p>
        <BudgetDiagram />
      </AgentLessonSection>

      <AgentLessonSection id="section-2" title="2. 智能体的上下文由什么组成？">
        <div className={s.contextCopy}>
          <p>智能体需要设置一个自己的上下文窗口大小，因为用户的请求理论上是无限的，但是：</p>
          <p>1、模型自己的上下文是有限的，上下文越长，成本越高，响应可能越慢，输出的质量也会下降，同时还可能让模型被大量无关信息干扰</p>
          <p>2、当历史信息大小超出模型自身上下文大小之后，需要有办法保持对话的连续性</p>
          <p>智能体的上下文窗口容量不直接等于模型的上下文窗口。</p>
        </div>
        <AssemblyDiagram />
        <p>比如一个 Agent 连续调用了 20 次工具，如果每一次工具返回的完整结果都一直留在上下文里，窗口很快就会变得非常拥挤。</p>
        <ToolGrowthDiagram />
        <h3 className={s.eighthSubheading}>尽量把固定不变的内容放在前面。</h3>
        <p>系统提示词、工具说明等内容，在很多轮请求里都不会发生变化。把固定内容放在前面，有助于利用<strong>提示词缓存（Prompt Caching）</strong>，减少重复计算、降低成本并提升响应速度。</p>
        <CacheDiagram />
        <p className={s.mutedNote}>缓存是否命中，还需要满足具体模型与接口的缓存规则。</p>
      </AgentLessonSection>

      <AgentLessonSection id="section-3" title="3. 智能体如何在有限窗口中处理无限上下文">
        <div className={s.contextCopy}>
          <p>上面已经提到，模型能够处理的上下文有限。而 Agent 在运行过程中会不断产生新的信息：用户继续聊天、Agent 调用工具、工具返回结果、任务继续执行……</p>
          <p>如果什么都不处理，上下文一定会越来越长。所以不同的 AI 应用，会采用不同的上下文控制策略。</p>
          <p>比如：</p>
          <ul>
            <li>最多保留多少轮对话</li>
            <li>上下文达到多少 Token 后开始压缩</li>
          </ul>
          <p>常见的方法大概有下面几种：</p>
        </div>

        <section className={s.eighthSubsection} id="section-3-1" aria-labelledby="section-3-1-title">
          <h3 id="section-3-1-title">3.1 硬截断</h3>
          <p>最简单粗暴的方法，就是直接丢掉一部分历史信息。</p>
          <h4>滑动窗口</h4>
          <p>永远只保留最近几轮对话。假设只保留最近 3 轮，第 4 轮进来以后，第 1 轮就会被挤出去。</p>
          <SlidingWindowDiagram />
          <h4>固定轮次截断</h4>
          <p>比如最多允许 5 轮对话。达到限制以后，直接开启一个新的上下文，之前的信息全部清空。</p>
          <ResetWindowDiagram />
          <div className={s.warning}><CircleAlert size={19} /><p><strong>真的会忘。</strong>实现简单、成本低。但如果前面的信息之后又变得重要，单靠当前上下文已经找不回来了。</p></div>
        </section>

        <section className={s.eighthSubsection} id="section-3-2" aria-labelledby="section-3-2-title">
          <h3 id="section-3-2-title">3.2 压缩</h3>
          <p>内容太多以后，把历史信息总结一下。原来有 30,000 Token 的历史信息，可以提炼成 3,000 Token，再带着这份总结继续执行任务。</p>
          <CompressionDiagram />
          <p>这有点像你开了一个很长的会议。会议进行到一半，桌面上的材料已经堆满了，于是有人把前半场的结论整理成一页会议纪要，接下来大家只拿着这页纪要继续讨论。</p>
          <div className={s.compressionMethods}><FixedCompressionDiagram /><DynamicCompressionDiagram /></div>
          <p className={s.attentionQuote}>哪些信息可以忘，哪些信息绝对不能忘。</p>
        </section>

        <section className={s.eighthSubsection} id="section-3-3" aria-labelledby="section-3-3-title">
          <h3 id="section-3-3-title">3.3 历史信息检索</h3>
          <p>不把所有历史信息一直放在上下文里，先存起来，需要的时候再找回来。</p>
          <p>比如 Agent 之前和用户已经聊了几百轮。这些内容全部保存到外部存储中，当前上下文只保留最近的内容。当 Agent 发现“这个问题之前好像聊过”，它就去历史记录里搜索相关信息，再把搜索结果放回当前上下文。</p>
          <RetrievalDiagram />
          <p>从这个角度看，Agent 能够使用的历史信息几乎可以无限延长。忘掉也没关系，需要的时候再查。但历史检索解决了「存不下」的问题，却又带来了「能不能准确找回来」的问题。</p>
          <div className={s.limitations}><strong>历史检索的局限性：</strong><div>{limitationItems.map((item, index) => <span key={item}><b>{index + 1}</b>{item}</span>)}</div></div>
          <p>检索出来的内容可能缺少当时的语境，检索结果本身也会占用新的上下文；实际系统还需要处理搜索耗时、召回质量与失败兜底。</p>
        </section>
      </AgentLessonSection>

      <AgentLessonSection id="section-4" title="4. 不同产品是怎么做的？">
        <p>现实中的 Agent 产品，通常会组合使用上面几种方法，具体实现也会不断变化。</p>
        <div className={s.productTableWrap}><table className={s.productTable}><thead><tr><th>产品</th><th>上下文处理</th><th>阅读提示</th></tr></thead><tbody><tr><th>Codex</th><td>自动压缩后继续执行</td><td>窗口与阈值依模型、配置而定</td></tr><tr><th>Claude Code</th><td>压缩历史，保留重要状态</td><td>200K / 1M 等，依模型与配置而定</td></tr></tbody></table></div>
        <div className={s.references}><a href="https://openai.com/index/unrolling-the-codex-agent-loop/" target="_blank" rel="noreferrer">参考：OpenAI Agent Loop ↗</a><a href="https://code.claude.com/docs/en/how-claude-code-works" target="_blank" rel="noreferrer">Claude Code 官方文档 ↗</a><small>产品机制以当前官方说明为准。</small></div>
        <div className={s.finalAttention}><strong>管理上下文窗口就是管理注意力。</strong><p>Agent 每一步能看到什么、忘掉什么、压缩什么、什么时候重新找回来，都会直接影响它接下来的判断。</p></div>
      </AgentLessonSection>
    </AgentLessonShell>
  );
}
