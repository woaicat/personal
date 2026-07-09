import type { PortfolioData } from "@/lib/types";
import { PROFILE_VALUES } from "./constants";

type HeroSlide = PortfolioData["site"]["profile"]["visualSlides"][number];

type ProfileSectionsProps = {
  data: PortfolioData;
  profileTitleLines: string[];
  heroSlides: HeroSlide[];
  activeHeroSlide: HeroSlide;
  heroSlideIndex: number;
  hasMultipleHeroSlides: boolean;
  activeValue: string;
  onHeroPrev: () => void;
  onHeroNext: () => void;
  onHeroDotClick: (index: number) => void;
  onValueChange: (value: string) => void;
};

export function ProfileSections({
  data,
  profileTitleLines,
  heroSlides,
  activeHeroSlide,
  heroSlideIndex,
  hasMultipleHeroSlides,
  activeValue,
  onHeroPrev,
  onHeroNext,
  onHeroDotClick,
  onValueChange
}: ProfileSectionsProps) {
  return (
    <>
      <section className="profile-showcase section-anchor" id="profile-intro">
        <div className="container profile-grid">
          <div className="profile-copy">
            <div className="profile-head">
              <div className="profile-name-row">
                <span>{data.site.profile.name}</span>
              </div>
            </div>
            <h1>
              {profileTitleLines.map((line, index) => (
                <span className={index === 0 ? "profile-title-main" : "profile-title-focus"} key={`${line}-${index}`}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="profile-desc">{data.site.profile.description}</p>
            <a className="btn btn-dark" href={data.site.profile.ctaUrl}>
              {data.site.profile.ctaText}
            </a>
          </div>
          <div className="profile-media">
            <div className="profile-visual" role="region" aria-label="顶部图片轮播">
              <img className="profile-visual-image" src={activeHeroSlide.image} alt={activeHeroSlide.alt} />
              {hasMultipleHeroSlides && (
                <>
                  <button
                    className="hero-carousel-btn hero-carousel-btn-prev"
                    type="button"
                    aria-label="上一张图片"
                    onClick={onHeroPrev}
                  >
                    ‹
                  </button>
                  <button
                    className="hero-carousel-btn hero-carousel-btn-next"
                    type="button"
                    aria-label="下一张图片"
                    onClick={onHeroNext}
                  >
                    ›
                  </button>
                  <div className="hero-carousel-dots" role="tablist" aria-label="轮播分页">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={`${slide.image}-${index}`}
                        className={`hero-carousel-dot${index === heroSlideIndex ? " is-active" : ""}`}
                        type="button"
                        role="tab"
                        aria-label={`切换到第 ${index + 1} 张图片`}
                        aria-selected={index === heroSlideIndex}
                        onClick={() => onHeroDotClick(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <p className="profile-visual-caption">{activeHeroSlide.caption}</p>
          </div>
        </div>
      </section>

      <div id="subscribe-anchor" className="anchor-offset" />
      <section className="press" id="subscribe">
        <div className="container press-grid">
          <div>
            <h2>在这里可以找到我</h2>
            <p>欢迎通过以下平台和账号与我交流。</p>
          </div>
          <div className="logos">
            {data.contacts.map((contact) => (
              <div className="platform-item" key={`${contact.platform}-${contact.account}`}>
                <div className="platform-name">{contact.platform}</div>
                <div className="platform-account">{contact.account}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="profile-bio">
        <div className="container">
          <div className="bio-intro">
            <h3>个人档案</h3>
            <p>嗨👋 ！ 我是jiaxuan， 一个AI产品经理，常驻北京 ，希望你能从我的作品集中找到一些灵感。</p>
          </div>

          <div className="bio-skills">
            <h4>个人技能</h4>
            <div className="bio-tags">
              <span>产品方案实现</span>
              <span>PRD撰写</span>
              <span>原型生成</span>
              <span>AI产品评测设计</span>
              <span>AI编程</span>
              <span>创意写作</span>
            </div>
          </div>

          <div className="bio-values">
            <h4>价值观</h4>
            <div className="value-tabs">
              {PROFILE_VALUES.map((item) => (
                <button
                  key={item.label}
                  className={`value-chip${activeValue === item.label ? " active" : ""}`}
                  type="button"
                  onClick={() => onValueChange(item.label)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="value-detail is-visible">
              {activeValue}：{PROFILE_VALUES.find((item) => item.label === activeValue)?.description}
            </p>
          </div>

          <div className="bio-card">
            <div className="bio-block">
              <h4>专精领域</h4>
              <div className="bio-list">
                <div className="bio-item">
                  <span>B端产品设计（办公、合规、营销等领域）</span>
                </div>
                <div className="bio-item">
                  <span>AI产品设计（工作流、智能体、插件等形态）</span>
                </div>
              </div>
            </div>

            <div className="bio-block">
              <h4>工作经历</h4>
              <div className="bio-list">
                <div className="bio-item">
                  <span>在一家金融公司做AI产品经理</span>
                  <span>2023年-2026年</span>
                </div>
                <div className="bio-item">
                  <span>在一家教育公司做管培生</span>
                  <span>2021年-2022年</span>
                </div>
              </div>
            </div>

            <div className="bio-block">
              <h4>我的三个超能力</h4>
              <div className="bio-list">
                <div className="bio-item">
                  <span>1、此人对自己负责的事有超乎寻常的责任心和主动性</span>
                </div>
                <div className="bio-item">
                  <span>2、动手能力极强</span>
                </div>
                <div className="bio-item">
                  <span>3、擅长和周围的人建立友好人际关系</span>
                </div>
              </div>
            </div>

            <div className="bio-block">
              <h4>正在寻找</h4>
              <p>新的AI产品工作（ToB领域 、泛营销等领域）</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
