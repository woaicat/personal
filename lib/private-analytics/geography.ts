// Vercel supplies ISO country / subdivision codes at its hosting ingress.
// Province codes cross-checked against Unicode CLDR, with short UI names:
// https://github.com/unicode-org/cldr/blob/main/common/subdivisions/zh.xml
const provinces: Record<string, string> = {
  AH: "安徽",
  BJ: "北京",
  CQ: "重庆",
  FJ: "福建",
  GD: "广东",
  GS: "甘肃",
  GX: "广西",
  GZ: "贵州",
  HA: "河南",
  HB: "湖北",
  HE: "河北",
  HI: "海南",
  HK: "香港",
  HL: "黑龙江",
  HN: "湖南",
  JL: "吉林",
  JS: "江苏",
  JX: "江西",
  LN: "辽宁",
  MO: "澳门",
  NM: "内蒙古",
  NX: "宁夏",
  QH: "青海",
  SC: "四川",
  SD: "山东",
  SH: "上海",
  SN: "陕西",
  SX: "山西",
  TJ: "天津",
  TW: "台湾",
  XJ: "新疆",
  XZ: "西藏",
  YN: "云南",
  ZJ: "浙江",
};
const countries = new Intl.DisplayNames(["zh-CN"], {
  type: "region",
  fallback: "none",
});

export function regionFromHeaders(
  headers: Headers,
  environment: Readonly<Record<string, string | undefined>> = process.env,
) {
  // A header alone is not proof of the hosting provider. Local and preview
  // requests deliberately ignore even well-formed, client-supplied geo headers.
  if (environment.VERCEL !== "1" || environment.VERCEL_ENV !== "production")
    return "未知";
  const country = (headers.get("x-vercel-ip-country") || "").toUpperCase();
  if (!/^[A-Z]{2}$/.test(country) || ["ZZ", "XX", "EU", "UN"].includes(country))
    return "未知";
  if (["HK", "MO", "TW"].includes(country)) return provinces[country];
  if (country === "CN") {
    const region = (headers.get("x-vercel-ip-country-region") || "").toUpperCase();
    return provinces[region] || "中国（省区未知）";
  }
  // Country-level labels keep overseas bars comparable without pretending an
  // unmapped subdivision code is a known Chinese place name.
  return countries.of(country) || "未知";
}
