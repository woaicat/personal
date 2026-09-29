import {
  AlertTriangle, ArrowRight, BarChart3, Bot, Building2,
  CheckCircle2, CircleHelp, Clock3, Code2, Coffee, CreditCard,
  Database, Eye, FileText, Globe, KeyRound, Lightbulb, Network,
  Plane, Play, Search, Settings, ShieldCheck, ShoppingCart,
  Store, TrendingUp, UserRound, Wallet, type LucideIcon
} from "lucide-react";
import type { ReactNode } from "react";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import AgentLessonShell, { AgentLessonSection } from "@/components/agent-course/AgentLessonShell";
import common from "@/components/agent-course/styles/agent-course.module.css";
import s from "@/components/agent-course/styles/agent-payment.module.css";

type Step = { icon: LucideIcon; title: string; text?: string };

function Icon({ icon: Symbol, size = 25 }: { icon: LucideIcon; size?: number }) {
  return <Symbol size={size} strokeWidth={1.8} aria-hidden="true" />;
}

function Card({ icon, title, children, className = "" }: {
  icon: LucideIcon; title: string; children?: ReactNode; className?: string;
}) {
  return <article className={`${s.card} ${className}`}><span className={s.icon}><Icon icon={icon} /></span><div><h4>{title}</h4>{children}</div></article>;
}

function Flow({ steps, compact = false, label }: { steps: Step[]; compact?: boolean; label: string }) {
  return <ol className={`${s.flow} ${compact ? s.compactFlow : ""}`} aria-label={label}>{steps.map(({ icon, title, text }, index) => <li key={title}>
    <div className={s.flowCard}><Icon icon={icon} /><strong>{title}</strong>{text && <span>{text}</span>}</div>
    {index < steps.length - 1 && <ArrowRight className={s.arrow} size={18} aria-hidden="true" />}
  </li>)}</ol>;
}

function Note({ icon = Lightbulb, title, children }: { icon?: LucideIcon; title: string; children?: ReactNode }) {
  return <div className={s.note}><Icon icon={icon} /><div><strong>{title}</strong>{children && <p>{children}</p>}</div></div>;
}

function Subsection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <div className={common.lessonSubsection} id={id}><h3>{title}</h3>{children}</div>;
}

const limits: Step[] = [
  { icon: Wallet, title: "金额上限" }, { icon: Clock3, title: "有效期限" },
  { icon: Store, title: "商户范围" }, { icon: Settings, title: "服务范围" }
];

function Limits({ includeAction = false }: { includeAction?: boolean }) {
  const items = includeAction ? [...limits.map(item => item.title === "有效期限" ? { ...item, title: "有效时间" } : item), { icon: FileText, title: "可执行动作" }] : limits;
  return <ul className={includeAction ? s.limitCards : s.limitPills}>{items.map(({ icon, title }) => <li key={title}><Icon icon={icon} size={20} /><span>{title}</span></li>)}</ul>;
}

export default function AgentNineteenthLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  return <AgentLessonShell detail={detail}>
    <AgentLessonSection id="section-1" title="1. 当今支付流程存在的问题">
      <p>现有的在线支付流程主要为人类用户设计，依赖网页界面、人工判断和交互操作。Agent 在参与支付时，会遇到一系列障碍。</p>
      <div className={s.twoColumns}>
        <div className={s.panel}><Card icon={UserRound} title="人类的购买路径"><p>通过网页逐步完成购买</p></Card>
          <Flow compact label="人类的购买路径" steps={[
            { icon: FileText, title: "看网页" }, { icon: Search, title: "读价格" },
            { icon: UserRound, title: "登录" }, { icon: CreditCard, title: "填写支付信息" },
            { icon: ShoppingCart, title: "点击购买" }
          ]} />
        </div>
        <div className={`${s.panel} ${s.warningPanel}`}><Card icon={AlertTriangle} title="Agent 遇到的问题"><p>缺乏统一的接口和标准化流程</p></Card>
          <div className={s.problemGrid}>{[
            { icon: Eye, title: "价格藏在界面里" }, { icon: Network, title: "网站流程各不相同" },
            { icon: ShieldCheck, title: "验证码和跳转" }, { icon: CircleHelp, title: "难以判断支付条件" }
          ].map(({ icon, title }) => <div className={s.problem} key={title}><Icon icon={icon} size={23} /><strong>{title}</strong></div>)}</div>
        </div>
      </div>
      <Note title="Agent 需要结构化信息：金额、币种、收款方、有效期、支付证明。">只有将这些关键信息以结构化的方式提供，Agent 才能在明确的规则下完成支付决策与执行。</Note>
    </AgentLessonSection>

    <AgentLessonSection id="section-2" title="2. 已有的解决方案">
      <p>目前，业界已经出现了一些面向 Agent 支付的解决方案，从不同角度解决机器支付所需的协议、身份与商业落地问题。</p>
      <div className={s.threeColumns}>
        <Card icon={FileText} title="MPP"><p className={s.cardSummary}>机器与服务如何协商付款</p><p>定义机器可理解的支付要求、支付证明和服务收据，建立标准化的交互流程。</p></Card>
        <Card icon={ShieldCheck} title="APOP"><p className={s.cardSummary}>身份、用户意图与支付授权</p><p>围绕 Agent 的身份认证、用户意图表达和支付授权，提供开放的协议框架。</p></Card>
        <Card icon={Settings} title="支付宝 AI 支付"><p className={s.cardSummary}>开发者可接入的商业产品</p><p>基于支付宝的能力，提供面向 Agent 的支付接入方案，支持真实的商业场景。</p></Card>
      </div>

      <Subsection id="section-2-1" title="2.1 MPP">
        <p>MPP（Machine Payment Protocol）定义了机器与服务之间的支付协商流程，包含支付要求、支付证明和服务收据三个核心要素。</p>
        <div className={s.threeColumns}>
          <Card icon={FileText} title="Challenge"><p>服务方声明价格、币种、收款方、有效期等条件。</p></Card>
          <Card icon={ShieldCheck} title="Credential"><p>Agent 基于授权生成的可验证、受限支付凭证。</p></Card>
          <Card icon={CheckCircle2} title="Receipt"><p>服务方确认收款并返回服务交付的凭证。</p></Card>
        </div>
        <Flow compact label="MPP 支付协商流程" steps={[
          { icon: Play, title: "请求服务" }, { icon: FileText, title: "HTTP 402 报价" },
          { icon: ShieldCheck, title: "检查授权" }, { icon: CreditCard, title: "提交支付证明" },
          { icon: CheckCircle2, title: "验证并交付" }
        ]} />
        <h4 className={s.blockHeading}>MPP 的工作原理</h4>
        <p className={s.copy}>MPP 通过结构化的支付协商流程，将支付请求、支付证明和服务收据串联起来，在执行真实支付前进行严格的权限检查与验证。</p>
        <div className={s.authorizationNote}><Note icon={ShieldCheck} title="支付上限不要只写在 Prompt 里">支付权限需要以结构化、可验证的方式下发，而不是只依赖自然语言的 Prompt。这样才能在执行时被系统检查和强制约束。</Note><Limits /></div>

        <h4 className={s.blockHeading}>MPP 付款流程（有明确的付款闸门）</h4>
        <p className={s.copy}>在完成商户验证之前，Agent 不会执行写库、付费调用或正式创建订单，确保资金安全和可控。</p>
        <div className={s.paymentGate}>
          <div className={s.gatePreparation}><Flow label="提交支付证明前的准备" steps={[
            { icon: Bot, title: "Agent 检查授权", text: "检查金额、期限、商户和服务范围" },
            { icon: FileText, title: "提交一次性支付证明", text: "基于授权生成本次支付的证明" }
          ]} /><ArrowRight className={s.gateArrow} size={18} aria-hidden="true" /></div>
          <div className={s.gateExecution}><div className={s.gateWarning}><AlertTriangle size={18} aria-hidden="true" /><strong>付款验证前，不执行写库、付费调用或正式创建订单</strong></div><Flow label="商户验证与服务交付" steps={[
            { icon: ShieldCheck, title: "商户验证", text: "验证支付证明和授权范围" },
            { icon: CheckCircle2, title: "服务交付并返回 Receipt", text: "完成服务并返回不可篡改的收据" }
          ]} /></div>
        </div>
        <h4 className={s.blockHeading}>Agent 支付案例</h4>
        <p className={s.copy}>MPP 让 Agent 可以在明确的授权范围内完成真实的支付和交易。以下是两个典型的应用案例。</p>
        <div className={s.twoColumns}>
          <Card icon={Database} title="一分钱一次的 API"><p>通过 Session 预留资金 → 每次请求发送签名 IOU → 结束后累计结算，适合高频、低金额的 API 调用场景。</p><span className={s.benefit}><TrendingUp size={17} aria-hidden="true" />降低微支付逐笔结算成本</span></Card>
          <Card icon={FileText} title="只购买一篇文章"><p>按次付款，获取单篇内容，无需订阅整月。</p><p>让 Agent 可以根据任务需要，灵活购买所需的内容。</p></Card>
        </div>
      </Subsection>

      <Subsection id="section-2-2" title="2.2 APOP 智能体支付开放协议框架">
        <p>APOP 在 MPP 的基础上，进一步提供从身份、意图到支付授权的完整框架，帮助 Agent 更安全、更可控地完成支付和交易。</p>
        <div className={s.fourColumns}>
          <Card icon={UserRound} title="智能体身份"><p>标识 Agent 的身份，建立可信的参与主体。</p></Card>
          <Card icon={FileText} title="用户意图"><p>将用户的自然语言需求结构化为可执行的意图。</p></Card>
          <Card icon={ShieldCheck} title="用户身份"><p>确认真实用户身份，防止冒用和滥用。</p></Card>
          <Card icon={Settings} title="支付授权"><p>检查金额、商户、期限等权限，生成可验证的支付授权。</p></Card>
        </div>
        <ol className={s.intentFlow} aria-label="APOP 身份与授权流程">{["识别 Agent", "结构化表达用户意图", "确认真实用户", "检查金额与权限"].map((item, index) => <li key={item}><strong>{item}</strong>{index < 3 && <ArrowRight size={17} aria-hidden="true" />}</li>)}</ol>
        <h4 className={s.blockHeading}>意图校验示例</h4>
        <p className={s.copy}>当搜索结果超出用户的原始意图时，APOP 会阻止交易并要求重新确认，避免不符合用户预期的支付。</p>
        <div className={s.intentExample}>
          <Card icon={UserRound} title="用户要求"><p>500 元以内订酒店</p></Card><ArrowRight className={s.arrow} size={18} aria-hidden="true" />
          <Card icon={Search} title="搜索结果"><p>1,200 元</p></Card><ArrowRight className={s.arrow} size={18} aria-hidden="true" />
          <Card icon={AlertTriangle} title="超出用户意图，停止交易并重新确认" className={s.warningCard}><p>需要用户重新确认或调整条件后再继续。</p></Card>
        </div>
        <h4 className={s.blockHeading}>真实交易场景</h4>
        <p className={s.copy}>APOP 已经可以在多个真实场景中支持 Agent 完成支付和交易，例如：</p>
        <ul className={s.scenarios}>{[
          { icon: Plane, title: "机票" }, { icon: Building2, title: "境外酒店" },
          { icon: Coffee, title: "车载咖啡" }, { icon: FileText, title: "生活缴费" },
          { icon: Globe, title: "跨境出行" }
        ].map(({ icon, title }) => <li key={title}><Icon icon={icon} size={22} /><strong>{title}</strong></li>)}</ul>
      </Subsection>

      <Subsection id="section-2-3" title="2.3 支付宝的 AI 支付开放平台">
        <p>基于 MPP 和 APOP 的思路，支付宝进一步提供面向 AI 场景的支付开放平台，让 Agent 能够在用户授权下，安全、合规地完成真实支付和交易。</p>
        <div className={s.twoColumns}>
          <div className={s.platformPanel}><div className={s.platformHeading}><h4>Agent Pay｜替用户向商家购买</h4><span>Agent → 商家</span></div><p className={s.copy}>购买机票、商品和现实服务</p><Flow label="Agent Pay 购买流程" steps={[
            { icon: CircleHelp, title: "理解需求并选商品" }, { icon: FileText, title: "创建订单" },
            { icon: UserRound, title: "用户确认授权" }, { icon: CreditCard, title: "支付宝付款" },
            { icon: CheckCircle2, title: "交易结果返回 Agent" }
          ]} /></div>
          <div className={s.platformPanel}><div className={s.platformHeading}><h4>Machine Pay｜Agent 购买机器服务</h4><span>Agent → 机器服务</span></div><p className={s.copy}>购买 API、数字内容和算力</p><Flow label="Machine Pay 购买流程" steps={[
            { icon: Code2, title: "请求 API" }, { icon: FileText, title: "HTTP 402 + Payment-Needed" },
            { icon: UserRound, title: "用户确认并付款" }, { icon: ShieldCheck, title: "Payment-Proof" },
            { icon: Settings, title: "商户验证并交付" }
          ]} /></div>
        </div>
      </Subsection>
    </AgentLessonSection>

    <AgentLessonSection id="section-3" title="3. Agent 参与支付和交易带来的变化和问题">
      <p>当 Agent 能够真正参与支付和交易时，商业模式、用户授权、风险控制和责任划分都会发生新的变化。</p>
      <div className={s.threeColumns}>
        <Card icon={Database} title="支付从界面走向协议"><p>支付不再依赖人为操作界面，而是基于协议完成，Agent 可以在后台自主发起、比较并完成支付。</p></Card>
        <Card icon={BarChart3} title="订阅转向按调用付费"><p>除了按月订阅，更多服务会转向按实际调用次数付费，Agent 让这种按需付费的模式更加普遍。</p></Card>
        <Card icon={UserRound} title="支付与身份分离"><p>支付可以使用独立的授权凭证完成，而不直接暴露用户的主身份，提升安全性与灵活性。</p></Card>
      </div>
      <Subsection id="section-3-1" title="3.1 授权不能只写在 Prompt 里">
        <p>为了保证安全，支付授权需要结构化、可验证，并且有明确的边界，不能只依赖自然语言的 Prompt。</p>
        <div className={s.governance}>
          <div className={s.governanceLimits}><Card icon={ShieldCheck} title="明确的授权边界"><p>在授权时需要设置清晰的限制条件，避免 Agent 超出预期进行支付。</p></Card><Limits includeAction /></div>
          <div className={s.authorizationComparison}><h4>三种方案的授权方式对比</h4><div className={s.threeColumns}>
            <Card icon={KeyRound} title="MPP"><p>受限制的委托密钥</p></Card>
            <Card icon={FileText} title="APOP"><p>结构化意图与支付授权</p></Card>
            <Card icon={ShieldCheck} title="支付宝"><p>用户确认、身份验证、交易留痕</p></Card>
          </div></div>
          <Note icon={CheckCircle2} title="模型可以做决策，但模型不能拥有无限支付权限。">只有在明确的授权范围内，Agent 才能进行支付和交易。</Note>
        </div>
      </Subsection>
      <Subsection id="section-3-2" title="3.2 退款与争议处理">
        <p>当出现退款、争议或交易问题时，需要可追溯的完整链路，还原谁授权、Agent 理解了什么、为什么购买、谁负责履约和争议。</p>
        <Flow label="可追溯的交易链路" steps={[
          { icon: UserRound, title: "用户意图", text: "用户提出需求并给予授权" },
          { icon: Bot, title: "Agent 决策", text: "模型理解需求并选择服务" },
          { icon: FileText, title: "授权记录", text: "记录授权范围和执行过程" },
          { icon: Store, title: "商户履约", text: "商家提供服务并完成交付" },
          { icon: CreditCard, title: "付款凭证", text: "生成可查的支付和交易凭证" }
        ]} />
        <Note title="Agent 支付不只是增加一个付款按钮，而是让软件开始主动发现、比较、购买服务，并参与真实交易。">这将带来全新的产品形态和商业机会，也需要我们建立更完善的授权、风控和争议处理机制。</Note>
      </Subsection>
    </AgentLessonSection>
  </AgentLessonShell>;
}
