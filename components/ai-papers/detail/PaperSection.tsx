import type { ReactNode } from "react";
import styles from "./paper-detail.module.css";

export default function PaperSection({ id, number, label, title, description, wide = false, children }: {
  id: string;
  number: string;
  label: string;
  title: string;
  description?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <header className={styles.sectionHeading}>
        <p className={styles.kicker}>{number}<span aria-hidden="true"> / </span>{label}</p>
        <h2 id={`${id}-title`}>{title}</h2>
        {description ? <p className={styles.sectionDescription}>{description}</p> : null}
      </header>
      <div className={wide ? styles.wideContent : styles.sectionContent}>{children}</div>
    </section>
  );
}
