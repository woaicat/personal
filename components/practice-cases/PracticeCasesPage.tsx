import ZeroToOneHeader from "@/components/zero-to-one/ZeroToOneHeader";
import { catalogPracticeCases, featuredPracticeCase } from "@/content/practice-cases/cases";
import CaseArtwork from "./CaseArtwork";
import PracticeCaseCatalog from "./PracticeCaseCatalog";
import styles from "./practice-cases.module.css";

export default function PracticeCasesPage() {
  return (
    <div className={styles.page}>
      <ZeroToOneHeader active="practice-cases" />
      <main className={styles.main}>
        <section className={styles.intro} aria-labelledby="practice-cases-title">
          <div>
            <p className={styles.eyebrow}>AGENT FIELD NOTES / 01</p>
            <h1 id="practice-cases-title">实战案例</h1>
          </div>
          <div className={styles.introSide}>
            <p>精选值得反复拆解的 Agent 实践，看看一个方法解决了什么问题，又如何落到真实产品。</p>
          </div>
        </section>

        {featuredPracticeCase && <>
          <div className={styles.featureLabel}>本期推荐</div>
          <section className={styles.feature} aria-label="本期推荐">
            <div className={styles.featureArt}><CaseArtwork kind={featuredPracticeCase.artwork} variant="feature" /></div>
            <div className={styles.featureCopy}>
              <p className={styles.issue}><span aria-hidden="true" />编辑精选 · {featuredPracticeCase.tags[0]}</p>
              <h2>{featuredPracticeCase.title}</h2>
              <p className={styles.featureSummary}>{featuredPracticeCase.summary}</p>
              <div className={styles.metaRow}>
                <span className={styles.source}>{featuredPracticeCase.source}<span aria-hidden="true">·</span>{featuredPracticeCase.format}<span aria-hidden="true">·</span>深度阅读</span>
                <a className={styles.read} href={featuredPracticeCase.url} target="_blank" rel="noopener noreferrer" aria-label={`阅读本期推荐：${featuredPracticeCase.title}，在新标签页打开`}>查看推荐内容 <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </section>
        </>}

        <PracticeCaseCatalog cases={catalogPracticeCases} />
      </main>
      <div className={styles.bottomRule} aria-hidden="true" />
    </div>
  );
}
