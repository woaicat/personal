import Image from "next/image";
import ZeroToOneHeader from "@/components/zero-to-one/ZeroToOneHeader";
import { catalogPracticeCases, featuredPracticeCase } from "@/content/practice-cases/cases";
import featuredPracticeCaseIllustration from "@/public/practice-cases/featured-ai-evaluation.png";
import PracticeCaseCatalog from "./PracticeCaseCatalog";
import styles from "./practice-cases.module.css";

export default function PracticeCasesPage() {
  return (
    <div className={styles.page}>
      <ZeroToOneHeader active="practice-cases" />
      <main className={styles.main}>
        <section className={styles.intro} aria-labelledby="practice-cases-title">
          <div>
            <p className={styles.eyebrow}>AGENT FIELD NOTES</p>
            <h1 id="practice-cases-title">实战案例</h1>
          </div>
          <div className={styles.introSide}>
            <p>精选值得了解和学习的Agent落地实践</p>
          </div>
        </section>

        {featuredPracticeCase && <>
          <div className={styles.featureLabel}>本期推荐</div>
          <section className={styles.feature} aria-label="本期推荐">
            <div className={styles.featureCopy}>
              <p className={styles.issue}><span aria-hidden="true" />编辑精选 · {featuredPracticeCase.tags[0]}</p>
              <h2>{featuredPracticeCase.title}</h2>
              <p className={styles.featureSummary}>{featuredPracticeCase.summary}</p>
              <div className={styles.metaRow}>
                <span className={styles.source}>{featuredPracticeCase.source}<span aria-hidden="true">·</span>{featuredPracticeCase.format}<span aria-hidden="true">·</span>深度阅读</span>
                <a className={styles.read} href={featuredPracticeCase.url} target="_blank" rel="noopener noreferrer" aria-label={`阅读本期推荐：${featuredPracticeCase.title}，在新标签页打开`}>查看推荐内容 <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <div className={styles.featureArt}>
              <Image
                className={styles.featureImage}
                src={featuredPracticeCaseIllustration}
                alt="蓝图风格的 AI 产品评测流程插图"
                fill
                priority
                sizes="(max-width: 820px) 100vw, 46vw"
              />
            </div>
          </section>
        </>}

        <PracticeCaseCatalog cases={catalogPracticeCases} />
      </main>
      <div className={styles.bottomRule} aria-hidden="true" />
    </div>
  );
}
