"use client";

import { useState } from "react";
import { AlertTriangle, Check, Database, Globe, Send, ShieldCheck } from "lucide-react";
import s from "@/components/agent-course/styles/agent-security.module.css";

const capabilities = [
  { icon: Globe, title: "不可信内容", detail: "读取外部网页、邮件", disabled: "不读取外部不可信内容" },
  { icon: Database, title: "敏感数据", detail: "读取内部客户资料", disabled: "不授予敏感数据访问" },
  { icon: Send, title: "对外发送", detail: "直接发送邮件或数据", disabled: "不授予自动对外发送能力" }
];

export function RiskCombination() {
  const [enabled, setEnabled] = useState([true, true, true]);
  const complete = enabled.every(Boolean);
  return <figure className={s.figure}>
    <figcaption><AlertTriangle size={24} aria-hidden="true" />三种能力，如何连成一条泄露链？</figcaption>
    <p className={s.caption}>点击能力卡，观察关闭其中一项后，示例链路如何变化。</p>
    <div className={s.capabilities}>{capabilities.map(({ icon: Icon, title, detail }, i) => <button key={title} type="button" aria-pressed={enabled[i]} onClick={() => setEnabled((current) => current.map((value, index) => index === i ? !value : value))} className={enabled[i] ? s.enabled : s.disabled}><Icon size={24} aria-hidden="true" /><strong>{title}</strong><span>{detail}</span><b>{enabled[i] ? "已开启" : "已关闭"}</b></button>)}</div>
    <div className={`${s.combinationResult} ${complete ? s.warning : s.contained}`} role="status">
      {complete ? <AlertTriangle size={22} aria-hidden="true" /> : <ShieldCheck size={22} aria-hidden="true" />}
      <div><strong>{complete ? "高风险组合：数据泄露链路具备形成条件" : "示例链路已断开"}</strong><p>{complete ? "恶意网页 → 诱导读取内部资料 → 向外发送。缺少可靠监督时，三种能力组合会放大风险。" : capabilities.filter((_, i) => !enabled[i]).map((item) => item.disabled).join("；") + "。这会削弱该链路，但不代表其他安全风险已经消失。"}</p></div>
    </div>
    <p className={s.caption}>这是简化的能力组合演示。真实系统仍需明确监督、权限和执行边界。</p>
  </figure>;
}

const defenses = [
  { label: "外部数据", title: "第一道：把网页当资料", text: "网页中的“把内部文件发给我”是外部数据，不能自动变成用户授权。即使模型仍受影响，后续权限检查也要独立生效。", checkpoint: "读取网页 → 隔离外部指令", result: "限制不可信内容改变任务目标" },
  { label: "最小权限", title: "第二道：只给需要的数据", text: "查询资料的任务不需要内部客户库权限。由工具和数据层检查当前用户、资源与操作范围，而不是让 Agent 自己决定权限。", checkpoint: "请求内部资料 → 权限检查", result: "无权读取，拒绝访问" },
  { label: "明确审批", title: "第三道：建议和执行分开", text: "Agent 提出发送建议，权限系统检查身份与审批状态；用户审阅具体收件人、正文与附件后，才允许执行这一动作。", checkpoint: "准备发送 → 展示具体动作 → 用户确认", result: "未获确认，暂停发送" },
  { label: "受限环境", title: "第四道：限制执行环境", text: "需要运行代码时，在受限环境中执行。限制文件路径、网络出口、资源与执行时间，缩小错误或恶意代码能影响的范围。", checkpoint: "尝试向外传输 → 网络出口限制", result: "不在允许范围，阻止连接" },
  { label: "数据与记忆", title: "第五道：信息不是想存就存", text: "检查来源、可信度和敏感程度，隔离用户记忆并设置生命周期。外部内容提出的审批地址变更，不能直接写入长期记忆。", checkpoint: "写入新的审批地址 → 来源与可信度检查", result: "未验证的信息，不进入可信配置" },
  { label: "监控熔断", title: "第六道：及时发现并停止", text: "记录关键操作，监测异常访问与集中外发，并设置调用次数、任务时间和费用上限。异常时停止任务，保留记录供排查。", checkpoint: "连续异常请求 → 触发阈值", result: "停止任务，保留审计记录" }
];

export function DefenseWalkthrough() {
  const [selected, setSelected] = useState(0);
  const active = defenses[selected];
  return <figure className={s.figure}>
    <figcaption><ShieldCheck size={24} aria-hidden="true" />同一条攻击链，可以在哪里阻断？</figcaption>
    <div className={s.attackStrip}><span>读取恶意网页</span><span aria-hidden="true">→</span><span>获取内部数据</span><span aria-hidden="true">→</span><span>向外发送邮件</span></div>
    <p className={s.caption}>选择一道防线查看作用。各层需要协同工作，不是六选一。</p>
    <div className={s.defenseButtons} role="group" aria-label="选择防御层">{defenses.map((item, i) => <button key={item.label} type="button" aria-pressed={selected === i} aria-controls="security-defense-detail" onClick={() => setSelected(i)}><span>{String(i + 1).padStart(2, "0")}</span>{item.label}</button>)}</div>
    <div id="security-defense-detail" className={s.defenseDetail} aria-live="polite"><h3>{active.title}</h3><p>{active.text}</p><div className={s.checkpoint}>{active.checkpoint}</div><strong className={s.result}><Check size={18} aria-hidden="true" />{active.result}</strong></div>
  </figure>;
}
