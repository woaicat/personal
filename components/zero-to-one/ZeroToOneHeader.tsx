import Link from "next/link";
import styles from "./zero-to-one-header.module.css";

type Section = "agent" | "practice-cases";

export default function ZeroToOneHeader({ active }: { active: Section }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/" aria-label="返回 JiaXuan 个人作品集首页">
          jiaxuan <span aria-hidden="true">·</span> 从 0 到 1
        </Link>
        <nav className={styles.nav} aria-label="从 0 到 1 导航">
          <Link href="/zero-to-one/agent" className={active === "agent" ? styles.active : undefined} aria-current={active === "agent" ? "page" : undefined}>Agent</Link>
          <Link href="/zero-to-one/practice-cases" className={active === "practice-cases" ? styles.active : undefined} aria-current={active === "practice-cases" ? "page" : undefined}>实战案例</Link>
        </nav>
      </div>
    </header>
  );
}
