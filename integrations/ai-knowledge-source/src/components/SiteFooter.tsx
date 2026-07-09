import Link from "next/link";
import { Github, Mail, MessageCircle, Triangle } from "lucide-react";
import type { SiteData, SiteLink } from "@/lib/types";
import { isExternalHref } from "@/lib/url";

function SmartLink({ item }: { item: SiteLink }) {
  const label = item.value || item.label;

  if (isExternalHref(item.href)) {
    return (
      <a href={item.href} target={item.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
        {label}
      </a>
    );
  }

  return <Link href={item.href}>{label}</Link>;
}

export function SiteFooter({ footer }: { footer: SiteData["footer"] }) {
  return (
    <footer id="resources" className="site-footer">
      <div className="footer-grid">
        <section id="about" className="footer-col contact-col" aria-labelledby="footer-contact">
          <h2 id="footer-contact">联系我们</h2>
          {footer.contact.map((item) => (
            <div key={item.label} className="contact-row">
              {item.label === "邮箱" ? <Mail size={16} /> : null}
              {item.label === "公众号" ? <MessageCircle size={16} /> : null}
              {item.label === "GitHub" ? <Github size={16} /> : null}
              <span>{item.label}：</span>
              <SmartLink item={item} />
            </div>
          ))}
        </section>

        <section className="footer-col" aria-labelledby="footer-resources">
          <h2 id="footer-resources">常见资源导航</h2>
          {footer.resources.map((item) => (
            <span key={item.label} className="footer-link-row">
              <Triangle size={9} fill="currentColor" />
              <SmartLink item={item} />
            </span>
          ))}
        </section>

        <section className="footer-col" aria-labelledby="footer-map">
          <h2 id="footer-map">文章导航</h2>
          {footer.articleMap.map((item) => (
            <span key={item.label} className="footer-link-row">
              <Triangle size={9} fill="currentColor" />
              <SmartLink item={item} />
            </span>
          ))}
        </section>

        <section className="footer-col" aria-labelledby="footer-archive">
          <h2 id="footer-archive">更新归档</h2>
          {footer.archive.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <Link className="archive-link" href="/#articles">
            查看更多
            <span aria-hidden="true">→</span>
          </Link>
        </section>

        <img className="footer-image" src="/images/article-storm-lake.png" alt="" />
      </div>
      <p className="copyright">© 2026 AI 产品经理知识体系 · 一个个人非盈利网站 · 持续建设中</p>
    </footer>
  );
}
