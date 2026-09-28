"use client";

import { useState } from "react";
import { Bot, CheckCircle2, CircleUserRound, FileText, RefreshCw } from "lucide-react";
import s from "@/components/agent-course/styles/agent-skill.module.css";

export default function SkillConfirmationDemo() {
  const [selected, setSelected] = useState("会议纪要整理");
  const [confirmed, setConfirmed] = useState(false);
  const [choosing, setChoosing] = useState(false);

  return <div className={s.demo} aria-label="Skill 召回确认的交互示例">
    <p className={s.demoLabel}>交互示例 · 仅演示选择与确认</p>
    <div className={s.userMessage}><CircleUserRound size={25} aria-hidden="true" /><span>把会议记录整理成纪要。</span></div>
    <div className={s.agentMessage}><Bot size={25} aria-hidden="true" /><div>
      <strong>准备使用：{selected}</strong><p>输出摘要、议题结论、待办与未决事项。</p>
      <div className={s.actions}>
        <button type="button" className={s.confirmButton} onClick={() => { setConfirmed(true); setChoosing(false); }}><CheckCircle2 size={18} aria-hidden="true" />确认使用</button>
        <button type="button" aria-expanded={choosing} onClick={() => { setChoosing(!choosing); setConfirmed(false); }}><RefreshCw size={18} aria-hidden="true" />换一个 Skill</button>
      </div>
      {choosing && <div className={s.skillOptions} aria-label="选择示例 Skill">{["会议纪要整理", "行动项提取"].map(name => <button type="button" key={name} aria-pressed={selected === name} onClick={() => { setSelected(name); setChoosing(false); setConfirmed(false); }}>{name}</button>)}</div>}
      <p className={s.demoFeedback} role="status">{confirmed ? `已确认 ${selected}。本次演示完成，没有执行真实任务。` : choosing ? "选择更合适的技能，再确认使用。" : "中途可以更换或纠正，确认后再开始任务。"}</p>
    </div></div>
    <div className={s.citation}><FileText size={20} aria-hidden="true" /><span>{confirmed ? `本次引用：${selected}` : "任务结束时展示本次引用的 Skill"}</span></div>
  </div>;
}
