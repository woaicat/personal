import { readFile } from "node:fs/promises";
import path from "node:path";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import AgentLessonShell, { AgentLessonSection } from "@/components/agent-course/AgentLessonShell";
import styles from "@/components/agent-course/styles/agent-enterprise.module.css";

type ArticleSection = { title: string; body: string };
type ReferenceEntry = { number: string; body: string };

function linkCitations(markdown: string) {
  return markdown.replace(/\[(\d+)\](?!\()/g, "[$1](#reference-$1)");
}

function ArticleMarkdown({ children }: { children: string }) {
  return <div className={styles.copy}><ReactMarkdown remarkPlugins={[remarkGfm]} components={{
    h1: ({ children: title }) => <h2 className={styles.articleTitle}>{title}</h2>,
    h3: ({ children: title }) => {
      const headingNumber = String(title).match(/^(\d+)\.(\d+)\s/);
      return <h3 id={headingNumber ? `section-${headingNumber[1]}-${headingNumber[2]}` : undefined}>{title}</h3>;
    },
    a: ({ href, children: label }) => href?.startsWith("#reference-")
      ? <a className={styles.citation} href={href} aria-label={`查看参考资料 ${href.slice("#reference-".length)}`}>{label}</a>
      : <a className={styles.sourceLink} href={href} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" /></a>
  }}>{children}</ReactMarkdown></div>;
}

function parseArticle(source: string) {
  const [article = "", referenceSection = ""] = source.split(/\n---\s*\n(?=## 参考资料)/);
  const [opening = "", ...sectionBlocks] = article.trim().split(/\n(?=## )/);
  const sections: ArticleSection[] = sectionBlocks.map((block) => {
    const [heading = "", ...body] = block.split("\n");
    return { title: heading.replace(/^## /, ""), body: linkCitations(body.join("\n").trim()) };
  });

  const noteStart = referenceSection.indexOf("\n\n*说明：");
  const referenceBody = noteStart === -1 ? referenceSection : referenceSection.slice(0, noteStart);
  const note = noteStart === -1 ? "" : referenceSection.slice(noteStart + 2).trim();
  const [referenceIntro = "", ...referenceBlocks] = referenceBody.trim().split(/\n\n(?=\[\d+\] \*\*)/);
  const references: ReferenceEntry[] = referenceBlocks.map((block) => {
    const match = block.match(/^\[(\d+)\]\s+([\s\S]+)$/);
    return {
      number: match?.[1] ?? "",
      body: (match?.[2] ?? block).replace(/\n(原文|论文)：/, "\n\n$1：")
    };
  });

  return {
    opening: linkCitations(opening),
    sections,
    referenceIntro: referenceIntro.replace(/^## 参考资料\n+/, "").trim(),
    references,
    note
  };
}

export default async function AgentTwentyFirstLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  const source = await readFile(path.join(process.cwd(), "content/agent-course/lesson-21-enterprise-agent.md"), "utf8");
  const article = parseArticle(source);

  return <AgentLessonShell detail={detail}>
    <figure className={styles.figure}>
      <a href="/agent-course/images/enterprise-agent-relationships.png" target="_blank" rel="noopener noreferrer" aria-label="查看企业 Agent 关系图原图">
        <Image src="/agent-course/images/enterprise-agent-relationships.png" alt="企业 Agent 连接员工与团队、协作空间、知识与记忆、业务系统、业务流程及治理控制的关系图" width={1448} height={1086} sizes="(max-width: 1100px) 100vw, 900px" priority />
      </a>
      <figcaption>企业 Agent 关系图 · 点击图片查看原图</figcaption>
    </figure>

    <section className={styles.opening} aria-label="课程导言"><ArticleMarkdown>{article.opening}</ArticleMarkdown></section>

    {article.sections.map((section, index) => <AgentLessonSection key={section.title} id={`section-${index + 1}`} title={section.title}>
      <ArticleMarkdown>{section.body}</ArticleMarkdown>
    </AgentLessonSection>)}

    <AgentLessonSection id="section-references" title="参考资料">
      <ArticleMarkdown>{article.referenceIntro}</ArticleMarkdown>
      <ol className={styles.referenceList}>
        {article.references.map((reference) => <li id={`reference-${reference.number}`} key={reference.number}>
          <span className={styles.referenceNumber} aria-hidden="true">{reference.number}</span>
          <ArticleMarkdown>{reference.body}</ArticleMarkdown>
        </li>)}
      </ol>
      {article.note && <div className={styles.sourceNote}><ArticleMarkdown>{article.note}</ArticleMarkdown></div>}
    </AgentLessonSection>
  </AgentLessonShell>;
}
