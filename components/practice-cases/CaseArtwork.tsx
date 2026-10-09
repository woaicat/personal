import type { PracticeCaseArtwork } from "@/content/practice-cases/cases";
import HysetArtwork from "./HysetArtwork";
import PromptInjectionArtwork from "./PromptInjectionArtwork";
import DataAgentArtwork from "./DataAgentArtwork";

type Props = { kind: PracticeCaseArtwork; variant?: "feature" | "card" };

// 三幅插图共用蓝图网格、纸白图形和暖橙节点，分别对应评测、路由与工作流。
export default function CaseArtwork({ kind, variant = "card" }: Props) {
  if (kind === "hyset") return <HysetArtwork />;
  if (kind === "prompt-injection") return <PromptInjectionArtwork />;
  if (kind === "data-agent") return <DataAgentArtwork />;

  const prefix = `${kind}-${variant}`;

  return (
    <svg viewBox="0 0 540 426" preserveAspectRatio="xMidYMid slice" role="img" aria-label={kind === "evaluation" ? "对话评测与结果核验示意图" : kind === "routing" ? "模型路由与成本分流示意图" : "线索调研与人工审核工作流示意图"}>
      <defs>
        <pattern id={`${prefix}-dots`} width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#a9c0ff" opacity=".65" /></pattern>
        <linearGradient id={`${prefix}-paper`} x1="0" x2="1" y1="0" y2="1"><stop stopColor="#f5f7e9" /><stop offset="1" stopColor="#cde2d8" /></linearGradient>
      </defs>
      <rect x="27" y="54" width="486" height="318" fill="none" stroke="#9db8ff" strokeWidth="1.5" opacity=".76" />
      <path d="M27 109h486M27 213h486M27 317h486M108 54v318M216 54v318M324 54v318M432 54v318" fill="none" stroke="#a7bfff" opacity=".23" />
      <path d="M40 80h82M418 344h82" stroke="#d7e5ff" strokeWidth="1.5" />
      <circle cx="46" cy="80" r="4" fill="#ee7655" /><circle cx="494" cy="344" r="4" fill="#ee7655" />
      <rect x="65" y="126" width="68" height="13" fill={`url(#${prefix}-dots)`} />
      <rect x="414" y="279" width="66" height="13" fill={`url(#${prefix}-dots)`} />

      {kind === "evaluation" && <>
        <rect x="71" y="143" width="138" height="164" fill={`url(#${prefix}-paper)`} />
        <path d="M88 166h64M88 179h92M88 194h72" stroke="#173caa" strokeWidth="3" strokeLinecap="round" />
        <rect x="88" y="216" width="103" height="29" rx="14" fill="#fff" stroke="#173caa" strokeWidth="2" />
        <circle cx="100" cy="230" r="4" fill="#ee7655" /><path d="M113 230h56" stroke="#173caa" strokeWidth="2" />
        <rect x="98" y="257" width="93" height="29" rx="14" fill="#fff" stroke="#173caa" strokeWidth="2" />
        <circle cx="111" cy="271" r="4" fill="#ee7655" /><path d="M124 271h48" stroke="#173caa" strokeWidth="2" />
        <path d="M210 224h60" stroke="#fff" strokeWidth="2.5" strokeDasharray="7 6" /><circle cx="270" cy="224" r="9" fill="#ee7655" />
        <circle cx="321" cy="224" r="56" fill="#dce9de" /><circle cx="321" cy="224" r="36" fill="none" stroke="#173caa" strokeWidth="2" />
        <path d="M300 226l14 14 28-32" fill="none" stroke="#173caa" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M377 224h32M408 224v-55M408 224v65" fill="none" stroke="#fff" strokeWidth="2.5" />
        <rect x="409" y="137" width="73" height="62" fill={`url(#${prefix}-paper)`} /><path d="M421 175l14-14 12 9 21-24" fill="none" stroke="#173caa" strokeWidth="3" />
        <rect x="409" y="257" width="73" height="56" fill={`url(#${prefix}-paper)`} /><path d="M421 274h48M421 286h38M421 298h22" stroke="#173caa" strokeWidth="3" />
      </>}

      {kind === "routing" && <>
        <rect x="61" y="145" width="114" height="142" fill={`url(#${prefix}-paper)`} />
        <path d="M77 165h65M77 180h82M77 195h52" stroke="#173caa" strokeWidth="3" strokeLinecap="round" />
        <rect x="77" y="217" width="81" height="49" fill="#fff" stroke="#173caa" strokeWidth="2" /><path d="M87 231h53M87 243h38M87 255h49" stroke="#173caa" strokeWidth="2" />
        <path d="M175 216h60" stroke="#fff" strokeWidth="2.5" strokeDasharray="7 6" /><circle cx="234" cy="216" r="10" fill="#ee7655" />
        <circle cx="284" cy="216" r="42" fill="#dce9de" /><path d="M267 216h34m-15-15 15 15-15 15" fill="none" stroke="#173caa" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M326 216h26M352 216v-60M352 216v63M352 156h36M352 279h36" fill="none" stroke="#fff" strokeWidth="2.5" />
        <circle cx="352" cy="216" r="6" fill="#ee7655" />
        <rect x="388" y="124" width="100" height="70" fill={`url(#${prefix}-paper)`} /><path d="M403 143h48M403 154h66M403 170h42" stroke="#173caa" strokeWidth="3" /><circle cx="473" cy="171" r="7" fill="#ee7655" />
        <rect x="388" y="246" width="100" height="70" fill={`url(#${prefix}-paper)`} /><path d="M403 265h48M403 276h62M403 292h38" stroke="#173caa" strokeWidth="3" /><circle cx="473" cy="292" r="7" fill="#ee7655" />
        <path d="M402 338h53" stroke="#d7e5ff" strokeWidth="2" /><circle cx="392" cy="338" r="5" fill="#ee7655" />
      </>}

      {kind === "workflow" && <>
        <rect x="60" y="167" width="104" height="102" fill={`url(#${prefix}-paper)`} /><circle cx="111" cy="194" r="15" fill="#fff" stroke="#173caa" strokeWidth="2" /><path d="M82 240c5-26 55-26 59 0M77 252h69" fill="none" stroke="#173caa" strokeWidth="3" />
        <path d="M164 217h53" stroke="#fff" strokeWidth="2.5" strokeDasharray="7 6" /><circle cx="218" cy="217" r="8" fill="#ee7655" />
        <rect x="222" y="100" width="112" height="95" fill={`url(#${prefix}-paper)`} /><path d="M238 122h77M238 135h56M238 151h77M238 164h47" stroke="#173caa" strokeWidth="3" />
        <rect x="222" y="238" width="112" height="95" fill={`url(#${prefix}-paper)`} /><path d="M238 260h77M238 273h51M238 289h77M238 302h42" stroke="#173caa" strokeWidth="3" />
        <path d="M218 217v-69h4M218 217v69h4M334 148h25v69M334 286h25v-69M359 217h36" fill="none" stroke="#fff" strokeWidth="2.5" /><circle cx="359" cy="217" r="9" fill="#ee7655" />
        <rect x="395" y="141" width="103" height="152" fill={`url(#${prefix}-paper)`} /><path d="M410 163h72M410 177h54M410 196h72M410 209h68" stroke="#173caa" strokeWidth="3" />
        <rect x="410" y="228" width="73" height="43" fill="#fff" stroke="#173caa" strokeWidth="2" /><path d="M423 249l8 8 15-19" fill="none" stroke="#ee7655" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M453 250h20" stroke="#173caa" strokeWidth="2" />
      </>}
    </svg>
  );
}
