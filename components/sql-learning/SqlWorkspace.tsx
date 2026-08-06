"use client";

import { useEffect, useRef, useState } from "react";
import { Celebration } from "./Celebration";
import { BrowserSqlEngine } from "@/lib/sql-learning/sql/BrowserSqlEngine";
import { formatSqlError } from "@/lib/sql-learning/sql/formatSqlError";
import { matchesExpectedResult } from "@/lib/sql-learning/evaluation/resultMatchers";
import { formatCrmValue, getColumnLabel } from "@/lib/sql-learning/presentation/crmLabels";
import { clearLessonProgress, readLessonProgress, writeLessonProgress } from "@/lib/sql-learning/storage/lessonProgress";
import type { Lesson, LessonSourceTable, QueryResult } from "@/lib/sql-learning/types";

type StatusTone = "neutral" | "success" | "error";
const EMPTY_SOURCE_TABLES: LessonSourceTable[] = [];

interface TablePreviewProps {
  label: string;
  result: QueryResult;
  source?: boolean;
}

function TablePreview({ label, result, source = false }: TablePreviewProps) {
  const displayedRows = result.rows.slice(0, source ? 8 : 100);

  return (
    <div className={source ? "source-table-card" : "result-table-card"}>
      <div className="table-label">{label}</div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>{result.columns.map((column) => (
              <th key={column} title={`SQL 字段：${column}`}>
                <span>{getColumnLabel(column)}</span>
                {getColumnLabel(column) !== column && <code>{column}</code>}
              </th>
            ))}</tr>
          </thead>
          <tbody>
            {displayedRows.map((row, rowIndex) => (
              <tr key={`${rowIndex}-${row.join("-")}`}>
                {row.map((value, columnIndex) => <td key={`${rowIndex}-${columnIndex}`}>{formatCrmValue(result.columns[columnIndex], value)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!source && result.rows.length > displayedRows.length && (
        <p className="result-summary">查询返回 {result.rows.length.toLocaleString()} 行，当前仅显示前 {displayedRows.length} 行。</p>
      )}
    </div>
  );
}

export function SqlWorkspace({ lesson }: { lesson: Lesson }) {
  const tasks = lesson.tasks ?? [];
  const initialQuery = lesson.initialQuery ?? "";
  const sourceTables = lesson.sourceTables ?? EMPTY_SOURCE_TABLES;
  const engineRef = useRef<BrowserSqlEngine | null>(null);
  const expectedResultCache = useRef(new Map<string, QueryResult>());
  const [query, setQuery] = useState(initialQuery);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [result, setResult] = useState<QueryResult>({ columns: [], rows: [] });
  const [sourceResults, setSourceResults] = useState<Array<{ source: LessonSourceTable; result: QueryResult }>>([]);
  const [status, setStatus] = useState({ message: "正在准备浏览器内 SQL 数据库…", tone: "neutral" as StatusTone });
  const [engineReady, setEngineReady] = useState(false);
  const [celebrationKey, setCelebrationKey] = useState(0);

  const activeTask = tasks.find((task) => !completedTaskIds.includes(task.id));
  const isComplete = !activeTask;

  useEffect(() => {
    const savedProgress = readLessonProgress(lesson.id);
    setQuery(savedProgress.draftQuery || initialQuery);
    setCompletedTaskIds(savedProgress.completedTaskIds);
    setProgressLoaded(true);
  }, [initialQuery, lesson.id]);

  useEffect(() => {
    const engine = new BrowserSqlEngine();
    engineRef.current = engine;
    expectedResultCache.current.clear();
    setEngineReady(false);
    setStatus({ message: "正在准备浏览器内 SQL 数据库…", tone: "neutral" });
    let active = true;

    engine.initialize()
      .then(() => {
        if (!active) return;
        setResult(engine.execute(initialQuery));
        setSourceResults(sourceTables.map((source) => ({ source, result: engine.execute(source.query) })));
        setStatus({ message: "数据已准备好。完成当前高亮任务后，下一项才会解锁。", tone: "neutral" });
        setEngineReady(true);
      })
      .catch((error: unknown) => {
        if (active) setStatus({ message: formatSqlError(error), tone: "error" });
      });

    return () => { active = false; };
  }, [initialQuery, lesson.id, sourceTables]);

  useEffect(() => {
    if (!progressLoaded) return;
    writeLessonProgress(lesson.id, { completedTaskIds, draftQuery: query });
  }, [completedTaskIds, lesson.id, progressLoaded, query]);

  const runQuery = () => {
    try {
      const nextResult = engineRef.current?.execute(query);
      if (!nextResult) return;
      setResult(nextResult);

      if (!activeTask) {
        setStatus({ message: "查询已执行。本课任务已全部完成。", tone: "success" });
        return;
      }

      const evaluation = activeTask.evaluate?.(nextResult) ?? { passed: true, feedback: "" };
      if (!evaluation.passed) {
        setStatus({ message: `查询已执行，但尚未完成当前任务：${evaluation.feedback}`, tone: "error" });
        return;
      }

      let expectedResult = expectedResultCache.current.get(activeTask.id);
      if (!expectedResult) {
        expectedResult = engineRef.current?.execute(activeTask.solution);
        if (!expectedResult) throw new Error("无法生成当前任务的验收结果。");
        expectedResultCache.current.set(activeTask.id, expectedResult);
      }
      const acceptance = matchesExpectedResult(nextResult, expectedResult, activeTask.resultOrderMatters);
      if (!acceptance.passed) {
        setStatus({ message: `查询已执行，但尚未完成当前任务：${acceptance.feedback}`, tone: "error" });
        return;
      }

      setCompletedTaskIds((current) => [...current, activeTask.id]);
      const nextTaskIndex = tasks.findIndex((task) => task.id === activeTask.id) + 1;
      setCelebrationKey((current) => current + 1);
      setStatus({
        message: nextTaskIndex < tasks.length
          ? `任务 ${nextTaskIndex} 已完成，下一项已解锁。`
          : `任务 ${tasks.length} 已完成，已完成本课练习。`,
        tone: "success",
      });
    } catch (error: unknown) {
      setStatus({ message: formatSqlError(error), tone: "error" });
    }
  };

  const resetWorkspace = () => {
    setQuery("");
    try {
      const initialResult = engineRef.current?.execute(initialQuery);
      if (initialResult) setResult(initialResult);
      setStatus({ message: "输入区域已清空，表格已还原。任务进度不会被清除。", tone: "neutral" });
    } catch {
      setStatus({ message: "输入区域已清空。SQL 数据库仍在准备中。", tone: "neutral" });
    }
  };

  const restartLesson = () => {
    clearLessonProgress(lesson.id);
    setCompletedTaskIds([]);
    setQuery(initialQuery);
    setCelebrationKey(0);
    try {
      const initialResult = engineRef.current?.execute(initialQuery);
      if (initialResult) setResult(initialResult);
      setStatus({ message: "本课已重新开始：答题进度已清空，已恢复初始查询和表格。", tone: "neutral" });
    } catch {
      setStatus({ message: "本课答题进度已清空。SQL 数据库仍在准备中。", tone: "neutral" });
    }
  };

  const showCurrentSolution = () => {
    if (!activeTask) return;
    setQuery(activeTask.solution);
    setStatus({ message: "已填入当前任务的解答。运行查询后可查看结果并解锁下一题。", tone: "neutral" });
  };

  return (
    <section className="exercise-section" aria-label="SQL 练习区">
      {celebrationKey > 0 && <Celebration key={celebrationKey} onDone={() => setCelebrationKey(0)} />}
      <h2>练习</h2>
      <p className="exercise-lead">{lesson.exerciseLead}</p>
      {sourceResults.length > 0 && (
        <section className="source-tables" aria-label="本课使用的数据表">
          {sourceResults.map(({ source, result: sourceResult }) => (
            <TablePreview key={source.label} label={`表格：${source.label}`} result={sourceResult} source />
          ))}
        </section>
      )}
      <div className="workspace">
        <div className="query-area">
          <TablePreview label={sourceResults.length > 0 ? "查询结果" : `表格：${lesson.datasetLabel ?? "CRM 数据"}`} result={result} />

          <textarea
            aria-label="SQL 查询编辑器"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="在这里输入 SQL 查询…"
            spellCheck={false}
            value={query}
          />
          <div className="editor-actions">
            <div className="editor-buttons">
              <button className="run-button" disabled={!engineReady} onClick={runQuery} type="button">运行查询</button>
              <button className="reset-button" disabled={!engineReady} onClick={resetWorkspace} type="button">重置</button>
              <button className="restart-button" disabled={!engineReady} onClick={restartLesson} type="button">重新开始本课</button>
            </div>
            <span className={`status ${status.tone}`}>{status.message}</span>
          </div>
        </div>

        <aside className="tasks-panel">
          <div className="tasks-content">
            <h3>练习 {lesson.exerciseLabel ?? lesson.number ?? ""} — 任务</h3>
            <ol>
              {tasks.map((task) => {
                const done = completedTaskIds.includes(task.id);
                const current = activeTask?.id === task.id;
                return <li className={`${done ? "done" : ""} ${current ? "active" : ""}`} key={task.id}>{task.description}</li>;
              })}
            </ol>
            {isComplete ? (
              <p className="task-hint">本课已完成。你仍可继续运行其他只读查询。</p>
            ) : (
              <p className="task-hint">遇到困难？<button onClick={showCurrentSolution} type="button">查看当前任务的解答</button></p>
            )}
          </div>
          <button className={isComplete ? "complete-button ready" : "complete-button"} disabled={!isComplete} type="button">
            完成以上任务
          </button>
        </aside>
      </div>
    </section>
  );
}
