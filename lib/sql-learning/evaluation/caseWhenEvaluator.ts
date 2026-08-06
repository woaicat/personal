import type { QueryResult, TaskEvaluation } from "@/lib/sql-learning/types";

function readClassifications(result: QueryResult) {
  const idIndex = result.columns.findIndex((column) => column.toLowerCase() === "opportunity_id");
  const typeIndex = result.columns.findIndex((column) => column.toLowerCase() === "opportunity_type");

  if (idIndex === -1 || typeIndex === -1) return null;
  return new Map(result.rows.map((row) => [String(row[idIndex]), String(row[typeIndex])]));
}

function evaluateRequiredLabels(result: QueryResult, expected: Record<string, string>): TaskEvaluation {
  const classifications = readClassifications(result);
  if (!classifications) {
    return { passed: false, feedback: "请在结果中返回 opportunity_id 和名为 opportunity_type 的分类字段。" };
  }

  const missedEntries = Object.entries(expected).filter(([id, label]) => classifications.get(id) !== label);
  if (missedEntries.length > 0) {
    return { passed: false, feedback: "查询已执行，但部分商机的分类尚未满足当前任务。请检查 CASE WHEN 的条件顺序和标签。" };
  }

  return { passed: true, feedback: "当前任务完成。" };
}

export const caseWhenEvaluation = {
  highValue(result: QueryResult) {
    return evaluateRequiredLabels(result, {
      "1C1I7A6R": "高价值成交",
      Z063OYW0: "高价值成交",
      OLK9LKZB: "高价值成交",
    });
  },
  regularWon(result: QueryResult) {
    return evaluateRequiredLabels(result, {
      "1C1I7A6R": "高价值成交",
      Z063OYW0: "高价值成交",
      EC4QE1BX: "一般成交",
      PE84CX4O: "一般成交",
    });
  },
  otherStages(result: QueryResult) {
    return evaluateRequiredLabels(result, {
      "1C1I7A6R": "高价值成交",
      Z063OYW0: "高价值成交",
      EC4QE1BX: "一般成交",
      PE84CX4O: "一般成交",
      KWVA7VR1: "已流失",
      HAXMC4IX: "推进中",
      "6CWZFOHJ": "推进中",
    });
  },
};
