import type { SqlCell } from "@/lib/sql-learning/types";

const columnLabels: Record<string, string> = {
  account: "客户名称",
  sector: "所属行业",
  year_established: "成立年份",
  revenue: "年营收",
  employees: "员工人数",
  office_location: "办公地",
  subsidiary_of: "母公司",
  opportunity_id: "商机编号",
  sales_agent: "销售人员",
  product: "产品",
  deal_stage: "商机阶段",
  engage_date: "开始跟进日期",
  close_date: "关闭日期",
  close_value: "成交金额",
  series: "产品系列",
  sales_price: "标准售价",
  manager: "销售主管",
  regional_office: "区域办公室",
  opportunity_type: "商机分类",
  revenue_per_employee: "单位员工营收",
  company_age: "成立年限",
  annual_revenue_usd: "年营收（美元）",
  opportunity_count: "商机数量",
  won_opportunity_count: "已成交商机数",
  won_close_value: "已成交金额合计",
  average_won_close_value: "平均成交金额",
  q4_won_opportunity_count: "第四季度已成交商机数",
  first_engage_date: "首次跟进日期",
  last_engage_date: "最近跟进日期",
  close_day: "关闭日期",
  close_month: "关闭月份",
  week_start: "周起始日期",
  rank_in_product: "产品内排名",
  cumulative_won_value: "累计成交金额",
  sales_agent_rank: "销售人员排名",
  row_number_in_product: "产品内序号",
  first_product: "首次跟进产品",
  last_product: "最近跟进产品",
  stage_share_pct: "阶段占比",
  total_opportunity_count: "商机总数",
  won_rate_pct: "成交率",
  activity_month: "活跃月份",
  active_accounts: "活跃客户数",
  cohort_month: "首触月份",
  retained_accounts: "留存客户数",
  cohort_size: "群组客户数",
  retention_rate_pct: "留存率",
  next_month_retained_accounts: "次月留存客户数",
  next_month_retention_pct: "次月留存率",
  returned_account_count: "后续回访客户数",
  return_rate_pct: "后续回访率",
};

const sectorLabels: Record<string, string> = {
  employment: "人力服务",
  entertainment: "文娱",
  finance: "金融",
  marketing: "营销",
  medical: "医疗",
  retail: "零售",
  services: "专业服务",
  software: "软件",
  technolgy: "科技",
  telecommunications: "通信",
};

const stageLabels: Record<string, string> = {
  Won: "已成交",
  Lost: "已流失",
  Engaging: "跟进中",
  Prospecting: "待开发",
};

const locationLabels: Record<string, string> = {
  "United States": "美国",
  Kenya: "肯尼亚",
  Philipines: "菲律宾",
  Japan: "日本",
  Italy: "意大利",
  Norway: "挪威",
  Korea: "韩国",
};

export function getColumnLabel(column: string) {
  return columnLabels[column.toLowerCase()] ?? column;
}

export function formatCrmValue(column: string, value: SqlCell) {
  if (value === null) return "—";
  if (column.toLowerCase() === "year_established") return String(value);
  if (typeof value === "number") return new Intl.NumberFormat("zh-CN").format(value);
  if (column.toLowerCase() === "sector") return sectorLabels[value] ?? value;
  if (column.toLowerCase() === "deal_stage") return stageLabels[value] ?? value;
  if (column.toLowerCase() === "office_location") return locationLabels[value] ?? value;
  return value;
}
