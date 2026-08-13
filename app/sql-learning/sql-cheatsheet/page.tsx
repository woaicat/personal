import type { Metadata } from "next";
import { SqlCheatsheetPage } from "@/components/sql-learning/SqlCheatsheetPage";

export const metadata: Metadata = {
  title: "常用 SQL 速查 | 面向产品经理的交互式SQL教学",
  description: "通用 SQL 写法速查，覆盖查询、去重、分页、排名、JOIN、聚合与日期处理。",
};

export default function SqlCheatsheetRoute() {
  return <SqlCheatsheetPage />;
}
