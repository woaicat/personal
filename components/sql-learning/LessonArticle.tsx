import type { Lesson } from "@/lib/sql-learning/types";

export function LessonArticle({ lesson }: { lesson: Lesson }) {
  const heading = lesson.heading ?? (lesson.number ? `SQL 课程 ${lesson.number}：${lesson.title}` : lesson.title);

  return (
    <section className="lesson-article">
      <h1>{heading}</h1>
      {lesson.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

      {lesson.syntax && lesson.syntaxLabel && (
        <div className="syntax-card" aria-label={lesson.syntaxLabel}>
          <div>{lesson.syntaxLabel}</div>
          <pre>{lesson.syntax}</pre>
        </div>
      )}

      {lesson.sections?.map((section) => (
        <section className="lesson-section" key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.code && (
            <div className="syntax-card compact" aria-label={section.codeLabel ?? section.title}>
              {section.codeLabel && <div>{section.codeLabel}</div>}
              <pre>{section.code}</pre>
            </div>
          )}
          {section.table && (
            <div className="reference-table-wrap">
              <h3>{section.table.title}</h3>
              <div className="reference-table-scroll">
                <table className="reference-table">
                  <thead><tr>{section.table.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
                  <tbody>
                    {section.table.rows.map((row) => <tr key={row.join("-")}>{row.map((cell, index) => <td key={`${cell}-${index}`}>{cell}</td>)}</tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {section.tip && <p className="learning-tip"><strong>小提醒：</strong>{section.tip}</p>}
        </section>
      ))}
    </section>
  );
}
