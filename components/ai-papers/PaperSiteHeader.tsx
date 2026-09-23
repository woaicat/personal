import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "./ai-papers.module.css";

export default function PaperSiteHeader({ onDetail = false }: { onDetail?: boolean }) {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerInner}>
        <Link className={styles.brand} href="/" aria-label="返回 JiaXuan GAO 个人网站首页">
          jiaxuan <span aria-hidden="true">·</span> 人工智能论文图解
        </Link>
        {onDetail ? (
          <Link className={styles.backLink} href="/ai-papers">
            <ArrowLeft size={16} aria-hidden="true" /> 返回论文目录
          </Link>
        ) : (
          <span className={styles.headerCaption}>用图解，读懂重要的 AI 思想</span>
        )}
      </div>
    </header>
  );
}
