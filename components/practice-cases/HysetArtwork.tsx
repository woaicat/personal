// 根据论文中“旅行任务需要一组互补工具”的例子绘制；超边圈住的是整组工具，不代表固定调用顺序。
export default function HysetArtwork() {
  return (
    <svg viewBox="0 0 540 426" preserveAspectRatio="xMidYMid slice" role="img" aria-label="四个不同工具被蓝色超边圈为一组，外围的孤立工具未被选中">
      <rect width="540" height="426" fill="#f5f5ee" />
      <path d="M-18 356C89 302 132 412 253 410C375 408 416 338 558 366" fill="none" stroke="#d4e1d8" strokeWidth="27" />
      <circle cx="75" cy="70" r="46" fill="none" stroke="#c8d9d0" strokeWidth="2" />
      <circle cx="483" cy="345" r="52" fill="none" stroke="#c8d9d0" strokeWidth="2" />
      <circle cx="83" cy="80" r="7" fill="#e9795d" />
      <circle cx="483" cy="345" r="7" fill="#e9795d" />

      <path d="M108 142C126 81 193 58 251 68C294 27 383 54 402 105C473 126 491 191 456 242C469 312 418 360 350 355C312 389 225 379 188 346C121 349 69 296 84 236C62 202 73 161 108 142Z" fill="#163eae" />
      <path d="M108 142C126 81 193 58 251 68C294 27 383 54 402 105C473 126 491 191 456 242C469 312 418 360 350 355C312 389 225 379 188 346C121 349 69 296 84 236C62 202 73 161 108 142Z" fill="none" stroke="#416ce0" strokeWidth="9" />
      <path d="M180 150L345 125L369 271L206 288Z" fill="none" stroke="#c8d8ff" strokeWidth="3" opacity=".85" />
      <path d="M180 150L369 271M345 125L206 288" fill="none" stroke="#c8d8ff" strokeWidth="2" opacity=".55" />
      <circle cx="271" cy="209" r="13" fill="#e9795d" stroke="#f5f5ee" strokeWidth="5" />

      <g transform="translate(138 108) rotate(-9 42 42)">
        <rect x="4" y="7" width="85" height="85" rx="17" fill="#0b2c84" opacity=".35" />
        <rect width="85" height="85" rx="17" fill="#f5f5ee" />
        <path d="M23 54L65 30L49 66L42 48Z" fill="none" stroke="#163eae" strokeWidth="4" strokeLinejoin="round" />
        <circle cx="44" cy="43" r="4" fill="#e9795d" />
      </g>
      <g transform="translate(304 82) rotate(7 42 42)">
        <rect x="4" y="7" width="85" height="85" rx="17" fill="#0b2c84" opacity=".35" />
        <rect width="85" height="85" rx="17" fill="#f5f5ee" />
        <path d="M21 38L43 23L65 38V65H21Z" fill="none" stroke="#163eae" strokeWidth="4" strokeLinejoin="round" />
        <path d="M21 48H65M35 65V49H51V65" fill="none" stroke="#163eae" strokeWidth="3" />
      </g>
      <g transform="translate(327 230) rotate(-5 42 42)">
        <rect x="4" y="7" width="85" height="85" rx="17" fill="#0b2c84" opacity=".35" />
        <rect width="85" height="85" rx="17" fill="#f5f5ee" />
        <path d="M21 57C15 47 23 35 34 35C39 21 60 23 64 38C75 40 76 57 65 61H30C26 61 23 60 21 57Z" fill="none" stroke="#163eae" strokeWidth="4" strokeLinejoin="round" />
        <circle cx="58" cy="25" r="5" fill="#e9795d" />
      </g>
      <g transform="translate(164 246) rotate(8 42 42)">
        <rect x="4" y="7" width="85" height="85" rx="17" fill="#0b2c84" opacity=".35" />
        <rect width="85" height="85" rx="17" fill="#f5f5ee" />
        <path d="M24 37H62M24 52H62" fill="none" stroke="#163eae" strokeWidth="4" strokeLinecap="round" />
        <path d="M53 28L63 37L53 46M34 43L24 52L34 61" fill="none" stroke="#163eae" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <circle cx="71" cy="214" r="12" fill="#e6eae2" stroke="#b4c3bb" strokeWidth="3" />
      <circle cx="479" cy="160" r="10" fill="#e6eae2" stroke="#b4c3bb" strokeWidth="3" />
      <circle cx="423" cy="379" r="7" fill="#e6eae2" stroke="#b4c3bb" strokeWidth="2" />
    </svg>
  );
}
