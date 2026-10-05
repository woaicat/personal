import type { ReactNode } from "react";
import styles from "./paper-detail.module.css";

export default function PaperProse({ children }: { children: ReactNode }) {
  return <div className={styles.prose}>{children}</div>;
}
