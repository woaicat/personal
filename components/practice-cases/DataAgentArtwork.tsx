// 将海量数据表画成档案柜：一张被抽出的表和已核验的 SQL 回执，是这篇案例的核心。
export default function DataAgentArtwork() {
  const upperFiles = [42, 77, 112, 147, 182, 369, 404, 439, 474];
  const lowerFiles = [42, 77, 112, 147, 182, 369, 404, 439, 474];

  return (
    <svg viewBox="0 0 540 426" preserveAspectRatio="xMidYMid slice" role="img" aria-label="蓝色数据档案柜中一张带橙色索引的表被抽出，旁边附有已核验的 SQL 回执">
      <defs>
        <linearGradient id="data-agent-backdrop" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#123fae" />
          <stop offset="1" stopColor="#082978" />
        </linearGradient>
        <linearGradient id="data-agent-paper" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fffdf4" />
          <stop offset="1" stopColor="#d8e7dc" />
        </linearGradient>
        <linearGradient id="data-agent-light" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#8bacff" stopOpacity=".48" />
          <stop offset="1" stopColor="#8bacff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="540" height="426" fill="url(#data-agent-backdrop)" />
      <path d="M-20 53L367 -20L559 346L170 446Z" fill="url(#data-agent-light)" />
      <path d="M0 125L205 87M350 74L540 43M0 338L204 296M362 283L540 245" stroke="#a8c0ff" strokeWidth="2" opacity=".25" />
      <path d="M22 181H518M22 356H518" stroke="#bed0ff" strokeWidth="5" opacity=".55" />
      <path d="M22 188H518M22 363H518" stroke="#041b56" strokeWidth="11" opacity=".45" />

      {upperFiles.map((x, index) => (
        <g key={`upper-${x}`} opacity={index % 3 === 0 ? ".8" : ".55"}>
          <rect x={x} y={index % 2 === 0 ? 100 : 113} width="25" height={index % 2 === 0 ? 78 : 65} rx="2" fill={index % 3 === 0 ? "#a7c4ff" : "#5c84e4"} />
          <path d={`M${x + 6} 133h13M${x + 6} 142h10`} stroke="#103c9d" strokeWidth="2" />
        </g>
      ))}
      {lowerFiles.map((x, index) => (
        <g key={`lower-${x}`} opacity={index % 4 === 0 ? ".8" : ".55"}>
          <rect x={x} y={index % 2 === 0 ? 229 : 243} width="25" height={index % 2 === 0 ? 123 : 109} rx="2" fill={index % 4 === 0 ? "#99b9ff" : "#4773d9"} />
          <path d={`M${x + 6} 274h13M${x + 6} 283h10`} stroke="#103c9d" strokeWidth="2" />
        </g>
      ))}

      <path d="M198 62h-18v28M355 62h18v28M180 295v26h18M373 295v26h-18" fill="none" stroke="#ffb388" strokeWidth="5" strokeLinecap="square" />
      <rect x="214" y="78" width="140" height="240" rx="5" fill="#061b51" opacity=".48" />
      <rect x="204" y="65" width="140" height="240" rx="5" fill="url(#data-agent-paper)" />
      <path d="M204 109H344" stroke="#1744ad" strokeWidth="5" />
      <rect x="300" y="53" width="31" height="35" rx="2" fill="#ed7856" />
      <path d="M220 88h72" stroke="#143d9d" strokeWidth="6" strokeLinecap="round" />
      <path d="M222 133h105M222 158h105M222 183h105M222 208h105M222 233h105M222 258h105" stroke="#a8bed7" strokeWidth="2" />
      <path d="M258 119v153M294 119v153" stroke="#a8bed7" strokeWidth="2" />
      <rect x="224" y="185" width="98" height="20" rx="2" fill="#ed7856" opacity=".28" />
      <path d="M231 195h19M265 195h18M301 195h16" stroke="#df6848" strokeWidth="4" strokeLinecap="round" />
      <path d="M222 283h62" stroke="#1444ac" strokeWidth="5" strokeLinecap="round" />

      <g transform="translate(353 268) rotate(-8 74 54)">
        <rect x="7" y="8" width="148" height="108" rx="5" fill="#061b51" opacity=".4" />
        <rect width="148" height="108" rx="5" fill="#f5f5ee" />
        <path d="M0 31H148" stroke="#1745ad" strokeWidth="4" />
        <path d="M16 18h18M40 18h14" stroke="#1745ad" strokeWidth="4" strokeLinecap="round" />
        <text x="16" y="60" fill="#1745ad" fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="18" fontWeight="700">SQL</text>
        <path d="M16 75h64M16 86h43" stroke="#9bb3c4" strokeWidth="4" strokeLinecap="round" />
        <circle cx="116" cy="72" r="19" fill="#d6e6db" stroke="#1745ad" strokeWidth="3" />
        <path d="M107 72l6 6 12-15" fill="none" stroke="#1745ad" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <circle cx="84" cy="63" r="5" fill="#ed7856" />
      <path d="M95 63h64" stroke="#c7d7ff" strokeWidth="2" />
    </svg>
  );
}
