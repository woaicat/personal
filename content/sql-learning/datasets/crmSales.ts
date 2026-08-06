export interface DatasetTable {
  name: string;
  source: string;
  columns: Array<{ name: string; type: "TEXT" | "REAL" }>;
  numericColumns: string[];
}

export const crmSalesTables: DatasetTable[] = [
  {
    name: "accounts",
    source: "/sql-learning/data/accounts.csv",
    columns: [
      { name: "account", type: "TEXT" },
      { name: "sector", type: "TEXT" },
      { name: "year_established", type: "REAL" },
      { name: "revenue", type: "REAL" },
      { name: "employees", type: "REAL" },
      { name: "office_location", type: "TEXT" },
      { name: "subsidiary_of", type: "TEXT" },
    ],
    numericColumns: ["year_established", "revenue", "employees"],
  },
  {
    name: "sales_pipeline",
    source: "/sql-learning/data/sales_pipeline.csv",
    columns: [
      { name: "opportunity_id", type: "TEXT" },
      { name: "sales_agent", type: "TEXT" },
      { name: "product", type: "TEXT" },
      { name: "account", type: "TEXT" },
      { name: "deal_stage", type: "TEXT" },
      { name: "engage_date", type: "TEXT" },
      { name: "close_date", type: "TEXT" },
      { name: "close_value", type: "REAL" },
    ],
    numericColumns: ["close_value"],
  },
  {
    name: "products",
    source: "/sql-learning/data/products.csv",
    columns: [
      { name: "product", type: "TEXT" },
      { name: "series", type: "TEXT" },
      { name: "sales_price", type: "REAL" },
    ],
    numericColumns: ["sales_price"],
  },
  {
    name: "sales_teams",
    source: "/sql-learning/data/sales_teams.csv",
    columns: [
      { name: "sales_agent", type: "TEXT" },
      { name: "manager", type: "TEXT" },
      { name: "regional_office", type: "TEXT" },
    ],
    numericColumns: [],
  },
];
