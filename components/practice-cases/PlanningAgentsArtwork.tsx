// 人与 Agent 的两种视角通过一块可操作的共享规划面相接；三种方案与滑杆来自文中的交互式决策示例。
export default function PlanningAgentsArtwork() {
  return (
    <svg viewBox="0 0 540 426" preserveAspectRatio="xMidYMid slice" role="img" aria-label="人和 Agent 的不同视角被一块跨越中间空隙的共享规划面连接，规划面上能直接比较并调整三种方案">
      <defs>
        <linearGradient id="planning-right" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#2d60d5" />
          <stop offset="1" stopColor="#0a2c82" />
        </linearGradient>
        <linearGradient id="planning-board" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fffdf5" />
          <stop offset="1" stopColor="#e4eee6" />
        </linearGradient>
      </defs>
      <rect width="540" height="426" fill="#f5f5ee" />
      <path d="M0 0H137C117 83 156 139 128 208C107 258 143 323 116 426H0Z" fill="#1945b0" />
      <path d="M419 0H540V426H433C460 343 417 291 446 218C473 149 423 76 419 0Z" fill="url(#planning-right)" />
      <path d="M118 0C96 79 148 137 121 204C94 271 138 343 107 426M430 0C456 80 415 139 440 209C467 284 420 357 445 426" fill="none" stroke="#a6c0ff" strokeWidth="3" opacity=".65" />
      <path d="M22 91c20-21 55-21 75 0M23 116c20-20 54-20 74 0M23 141c20-20 54-20 74 0" fill="none" stroke="#a9c3ff" strokeWidth="5" strokeLinecap="round" opacity=".65" />
      <path d="M461 83h52M461 101h34M461 120h52M461 142h38M464 285h48M464 304h31M464 323h48" stroke="#bdd0ff" strokeWidth="5" strokeLinecap="round" opacity=".7" />
      <circle cx="43" cy="328" r="19" fill="#e2ebe2" /><path d="M12 385c1-37 61-37 62 0" fill="none" stroke="#e2ebe2" strokeWidth="12" strokeLinecap="round" />
      <path d="M492 356l-27-49 6 33 23 3Z" fill="#edf4ed" stroke="#0b2e87" strokeWidth="4" strokeLinejoin="round" />

      <g transform="rotate(-5 275 208)">
        <rect x="129" y="88" width="307" height="261" rx="10" fill="#09296f" opacity=".36" />
        <rect x="113" y="72" width="307" height="261" rx="10" fill="url(#planning-board)" stroke="#1e4bb6" strokeWidth="6" />
        <path d="M116 117H417" stroke="#1e4bb6" strokeWidth="5" />
        <circle cx="137" cy="95" r="5" fill="#ee7957" /><circle cx="155" cy="95" r="5" fill="#9cb8d9" /><circle cx="173" cy="95" r="5" fill="#9cb8d9" />
        <path d="M298 95h90" stroke="#92a8c4" strokeWidth="6" strokeLinecap="round" />

        <rect x="139" y="145" width="75" height="94" rx="5" fill="#d6e2ef" />
        <rect x="229" y="145" width="75" height="94" rx="5" fill="#f8f9f3" stroke="#ee7957" strokeWidth="5" />
        <rect x="319" y="145" width="75" height="94" rx="5" fill="#c9d9ee" />
        <path d="M154 205h45M154 217h29M244 205h45M244 217h29M334 205h45M334 217h29" stroke="#3260b6" strokeWidth="4" strokeLinecap="round" />
        <path d="M149 181c12-23 42-23 55 0M239 181c13-30 42-30 55 0M329 181c11-17 43-17 55 0" fill="none" stroke="#2051bd" strokeWidth="5" strokeLinecap="round" />
        <circle cx="267" cy="159" r="5" fill="#ee7957" />

        <path d="M150 270h233" stroke="#8daed4" strokeWidth="7" strokeLinecap="round" />
        <path d="M150 270h125" stroke="#2554c4" strokeWidth="7" strokeLinecap="round" />
        <circle cx="275" cy="270" r="14" fill="#ee7957" stroke="#fffdf5" strokeWidth="5" />
        <path d="M148 303h96M264 303h55" stroke="#a9bdcc" strokeWidth="5" strokeLinecap="round" />
        <rect x="338" y="290" width="57" height="26" rx="13" fill="#1f4fbc" />
        <path d="M355 303l7 7 13-15" fill="none" stroke="#fffdf5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path d="M43 269l80-64" stroke="#ee7957" strokeWidth="11" strokeLinecap="round" />
      <path d="M37 274l14-11" stroke="#f5f5ee" strokeWidth="11" strokeLinecap="round" />
    </svg>
  );
}
