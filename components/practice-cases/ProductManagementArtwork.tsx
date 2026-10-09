// 取自作者把产品经理比作团队指挥者的比喻：AI 是洞察来源，人的协调与判断仍居于舞台中央。
export default function ProductManagementArtwork() {
  return (
    <svg viewBox="0 0 540 426" preserveAspectRatio="xMidYMid slice" role="img" aria-label="产品经理如指挥者挥动橙色指挥棒，在蓝色舞台上协调团队，旁边以星形象征 AI 洞察">
      <defs>
        <linearGradient id="pm-stage" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#295bd1" />
          <stop offset="1" stopColor="#0a2b82" />
        </linearGradient>
        <linearGradient id="pm-spotlight" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#bdd0ff" stopOpacity=".6" />
          <stop offset="1" stopColor="#bdd0ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="540" height="426" fill="#f5f5ee" />
      <path d="M0 326C116 273 220 285 306 248C395 209 474 191 540 191V426H0Z" fill="url(#pm-stage)" />
      <path d="M277 0H540V310L295 264Z" fill="url(#pm-spotlight)" />
      <path d="M-36 368C116 266 201 344 345 283C425 249 498 269 575 215M-25 398C98 318 205 387 354 317C434 278 506 305 567 261" fill="none" stroke="#9ebaff" strokeWidth="3" opacity=".5" />
      <path d="M25 89C101 49 166 67 207 130M18 126C92 84 151 101 177 153" fill="none" stroke="#c5d3cc" strokeWidth="4" opacity=".85" />

      <g transform="translate(100 126)">
        <path d="M0-69L11-18L62-8L11 2L0 52L-11 2L-62-8L-11-18Z" fill="#1d4dbb" />
        <path d="M-40-52L-30-33M37 30L49 42M-56 18L-40 12" stroke="#ee7957" strokeWidth="6" strokeLinecap="round" />
        <circle cx="0" cy="-8" r="11" fill="#f5f5ee" />
      </g>
      <path d="M44 235h68M55 251h52M71 267h39" stroke="#1b4dbb" strokeWidth="5" strokeLinecap="round" opacity=".55" />

      <g fill="#e8efe9" stroke="#173fa9" strokeWidth="5">
        <circle cx="82" cy="315" r="20" />
        <path d="M49 367c2-36 63-36 66 0v42H49Z" />
        <circle cx="450" cy="280" r="20" />
        <path d="M416 333c2-36 66-36 68 0v44h-68Z" />
      </g>
      <g fill="#9fbfff" opacity=".76">
        <circle cx="162" cy="332" r="15" />
        <path d="M135 366c2-28 52-28 54 0v42h-54Z" />
        <circle cx="510" cy="322" r="14" />
        <path d="M484 356c2-27 50-27 52 0v42h-52Z" />
      </g>

      <circle cx="273" cy="186" r="33" fill="#f5f5ee" stroke="#123994" strokeWidth="5" />
      <path d="M247 165c12-25 48-24 57 3c-21-11-38-6-57-3Z" fill="#103891" />
      <path d="M226 426V307c0-34 21-55 49-55h7c31 0 54 23 54 55v119Z" fill="#f5f5ee" stroke="#103891" strokeWidth="6" />
      <path d="M251 262l25 27 26-27M276 290v136" fill="none" stroke="#a4b8d1" strokeWidth="5" />
      <path d="M232 299C198 274 167 270 131 267M331 295C358 268 374 230 395 180" fill="none" stroke="#f5f5ee" strokeWidth="22" strokeLinecap="round" />
      <path d="M232 299C198 274 167 270 131 267M331 295C358 268 374 230 395 180" fill="none" stroke="#103891" strokeWidth="5" strokeLinecap="round" />
      <circle cx="395" cy="180" r="12" fill="#f5f5ee" stroke="#103891" strokeWidth="4" />
      <path d="M397 172L470 55" stroke="#ee7957" strokeWidth="8" strokeLinecap="round" />
      <path d="M467 58l12-19" stroke="#fff8e8" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
