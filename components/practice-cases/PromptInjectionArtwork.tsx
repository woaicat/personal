// 用强烈的攻击轨迹与权限边界，表现外部邮件试图诱导 Agent 触及敏感资料。
export default function PromptInjectionArtwork() {
  return (
    <svg viewBox="0 0 540 426" preserveAspectRatio="xMidYMid slice" role="img" aria-label="带警示标记的恶意邮件发出橙色攻击路径，在触及敏感资料前被蓝色权限边界拦截">
      <defs>
        <linearGradient id="prompt-injection-blue" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#2158d4" />
          <stop offset=".55" stopColor="#123eaf" />
          <stop offset="1" stopColor="#08256f" />
        </linearGradient>
      </defs>
      <rect width="540" height="426" fill="url(#prompt-injection-blue)" />
      <path d="M0 0H261L135 426H0Z" fill="#3267df" opacity=".42" />
      <path d="M313 0H540V426H401Z" fill="#071d61" opacity=".52" />
      <path d="M-25 365L142 0M44 426L213 0" stroke="#8cadff" strokeWidth="2" opacity=".22" />
      <path d="M418 0L540 154M479 0L540 73" stroke="#a5bdff" strokeWidth="2" opacity=".2" />
      <circle cx="71" cy="69" r="41" fill="none" stroke="#b7c9ff" strokeWidth="2" opacity=".42" />
      <circle cx="71" cy="69" r="5" fill="#ee7655" />

      <g transform="translate(42 121) rotate(-10 119 83)">
        <rect x="11" y="12" width="238" height="166" rx="14" fill="#061e68" opacity=".42" />
        <rect width="238" height="166" rx="14" fill="#f5f5ee" stroke="#cad7e8" strokeWidth="3" />
        <path d="M0 45L119 112L238 45" fill="none" stroke="#1641ad" strokeWidth="5" strokeLinejoin="round" />
        <path d="M0 45V15Q0 0 15 0H223Q238 0 238 15V45L119 112Z" fill="#f3a47e" stroke="#f07a53" strokeWidth="3" />
        <path d="M24 128H111M24 142H151" stroke="#91a8bb" strokeWidth="7" strokeLinecap="round" />
        <path d="M180 115L215 135L180 152Z" fill="#e4543c" />
        <path d="M43 20L58 46H28Z" fill="#fff3e8" stroke="#c94233" strokeWidth="3" strokeLinejoin="round" />
        <path d="M43 28V37" stroke="#c94233" strokeWidth="3" strokeLinecap="round" />
        <circle cx="43" cy="42" r="2" fill="#c94233" />
      </g>

      <path d="M268 205L303 171L296 211L331 188" fill="none" stroke="#ffb096" strokeWidth="21" strokeLinejoin="miter" strokeLinecap="square" />
      <path d="M268 205L303 171L296 211L331 188" fill="none" stroke="#e94d38" strokeWidth="12" strokeLinejoin="miter" strokeLinecap="square" />
      <path d="M282 -30C358 77 396 142 371 218C347 300 313 364 267 457" fill="none" stroke="#071e65" strokeWidth="89" strokeLinecap="round" />
      <path d="M282 -30C358 77 396 142 371 218C347 300 313 364 267 457" fill="none" stroke="#7da3ff" strokeWidth="55" strokeLinecap="round" />
      <path d="M282 -30C358 77 396 142 371 218C347 300 313 364 267 457" fill="none" stroke="#2554c6" strokeWidth="31" strokeLinecap="round" />

      <path d="M316 139L303 121M289 166L268 159M317 254L300 272M370 133L380 113" stroke="#ffb096" strokeWidth="7" strokeLinecap="round" />
      <circle cx="364" cy="211" r="38" fill="#f5f5ee" stroke="#092a85" strokeWidth="7" />
      <path d="M351 198L377 224M377 198L351 224" stroke="#e94d38" strokeWidth="9" strokeLinecap="round" />

      <g transform="translate(403 116) rotate(8 56 80)">
        <rect x="8" y="9" width="112" height="164" rx="10" fill="#05194f" opacity=".5" />
        <rect width="112" height="164" rx="10" fill="#f5f5ee" stroke="#abc5ff" strokeWidth="4" />
        <path d="M0 31H112" stroke="#1641ad" strokeWidth="4" />
        <circle cx="56" cy="72" r="19" fill="#d8e6de" stroke="#1641ad" strokeWidth="3" />
        <path d="M29 119C30 96 82 96 84 119" fill="none" stroke="#1641ad" strokeWidth="4" strokeLinecap="round" />
        <path d="M24 137H88M24 148H69" stroke="#94aab8" strokeWidth="5" strokeLinecap="round" />
      </g>
      <path d="M427 324V313A13 13 0 0 1 453 313V324M423 324H457V348H423Z" fill="none" stroke="#b9cdff" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="440" cy="336" r="3" fill="#ee7655" />
    </svg>
  );
}
