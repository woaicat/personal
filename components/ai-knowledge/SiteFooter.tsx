import { Github, Mail, MessageCircle } from "lucide-react";
import type { SiteData, SiteLink } from "@/lib/ai-knowledge/types";
import { isExternalHref } from "@/lib/ai-knowledge/url";

function ContactValue({ item }: { item: SiteLink }) {
  const label = item.value || item.label;

  if (!item.href) {
    return <span>{label}</span>;
  }

  if (isExternalHref(item.href)) {
    return (
      <a href={item.href} target={item.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
        {label}
      </a>
    );
  }

  return <span>{label}</span>;
}

function ContactIcon({ label }: { label: string }) {
  if (label === "邮箱") return <Mail size={18} aria-hidden="true" />;
  if (label === "GitHub") return <Github size={18} aria-hidden="true" />;
  return <MessageCircle size={18} aria-hidden="true" />;
}

export function SiteFooter({ footer }: { footer: SiteData["footer"] }) {
  return (
    <footer id="about" className="site-footer" aria-labelledby="footer-contact">
      <div className="footer-contact-shell">
        <div>
          <p className="footer-eyebrow">KEEP IN TOUCH</p>
          <h2 id="footer-contact">联系我</h2>
        </div>
        <div className="footer-contact-list">
          {footer.contact.map((item) => (
            <div key={item.label} className="contact-row">
              <ContactIcon label={item.label} />
              <span className="contact-label">{item.label}</span>
              <ContactValue item={item} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
