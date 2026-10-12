import { ArrowUpRight, ChevronRight, Languages, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import type { Lang, SiteContent } from "../content";
import { content, siteMeta } from "../content.generated";

const PAGES = ["home", "story", "services", "testimonials", "process", "honors", "connect"];

function Seal({ char, mini = false }: { char: string; mini?: boolean }) {
  return <span className={mini ? "seal-stamp mini" : "seal-stamp"}>{char}</span>;
}

function PortraitArch({ portrait, name, note }: { portrait: string; name: string; note: string }) {
  return (
    <div className="arch-frame">
      {portrait ? (
        <img src={portrait} alt={name} />
      ) : (
        <div className="portrait-placeholder">
          <div>{name}</div>
          <div>{note}</div>
        </div>
      )}
    </div>
  );
}

function PageHead({ tag, title, ledeHtml }: { tag: string; title: string; ledeHtml?: string }) {
  return (
    <>
      <div className="section-tag">{tag}</div>
      <h2>{title}</h2>
      {ledeHtml ? <div className="section-lede" dangerouslySetInnerHTML={{ __html: ledeHtml }} /> : null}
    </>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Lang>(siteMeta.defaultLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const t = content[language] as SiteContent;
  const isZh = language === "zh";
  const rawPage = location === "/" ? "home" : location.replace("/", "") || "home";
  const page = PAGES.includes(rawPage) ? rawPage : "home";
  const go = (path: string) => {
    setMenuOpen(false);
    setLocation(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.documentElement.lang = isZh ? "zh-Hant" : "en";
  }, [isZh]);

  return (
    <div className="trust-shell">
      <header className="trust-header">
        <button className="trust-brand" onClick={() => go("/")}>
          <Seal char={t.hero.sealChar} mini />
          <span>
            <strong>{t.chrome.brandName}</strong>
            <small>{t.chrome.brandSub}</small>
          </span>
        </button>
        <nav className={menuOpen ? "trust-nav is-open" : "trust-nav"}>
          {t.chrome.nav.map((item) => (
            <button
              key={item.path}
              className={item.path === location || (item.path === "/" && page === "home") ? "is-active" : ""}
              onClick={() => go(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="trust-actions">
          <button className="lang-btn" onClick={() => setLanguage(isZh ? "en" : "zh")}>
            <Languages size={14} />
            {t.chrome.languageLabel}
          </button>
          <button className="trust-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label={t.chrome.menuLabel}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        {page === "home" && (
          <>
            <section className="trust-hero">
              <div>
                <div className="hero-eyebrow">{t.hero.eyebrow}</div>
                <h1>{t.hero.name}</h1>
                <p className="hero-title">
                  {t.hero.title}
                  <br />
                  <b>{t.hero.titleEm}</b>
                </p>
                <p className="hero-tagline">{t.hero.tagline}</p>
                <div className="hero-cta">
                  <button className="btn-seal" onClick={() => go(t.hero.ctaPrimaryPath)}>
                    {t.hero.ctaPrimaryLabel}
                    <ArrowUpRight size={16} />
                  </button>
                  <button className="btn-ghost" onClick={() => go(t.hero.ctaSecondaryPath)}>
                    {t.hero.ctaSecondaryLabel}
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className="hero-seal-wrap">
                  <Seal char={t.hero.sealChar} />
                  <span className="hero-seal-note">{t.hero.sealNote}</span>
                </div>
              </div>
              <div className="hero-portrait">
                <span className="vertical-strip">{t.hero.verticalText}</span>
                <div className="portrait-arch">
                  <PortraitArch portrait={t.hero.portrait} name={t.hero.name} note={t.hero.portraitNote} />
                  <Seal char={t.hero.sealChar} />
                </div>
              </div>
            </section>

            <section className="trust-section">
              <div className="section-tag">{t.home.tag}</div>
              <h2>{t.home.title}</h2>
              <div className="section-lede" dangerouslySetInnerHTML={{ __html: t.home.bodyHtml }} />
              <div className="home-links">
                {t.home.links.map((link, index) => (
                  <button key={link.path} onClick={() => go(link.path)}>
                    <span className="idx">0{index + 1}</span>
                    <span>
                      <strong>{link.title}</strong>
                      <small>{link.detail}</small>
                    </span>
                    <ArrowUpRight size={18} />
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {page === "story" && (
          <section className="trust-section">
            <PageHead tag={t.story.tag} title={t.story.title} />
            <div className="story-grid">
              <blockquote className="story-quote">
                {t.story.quote}
                <footer>— {t.story.quoteBy}</footer>
              </blockquote>
              <div>
                <div className="story-body" dangerouslySetInnerHTML={{ __html: t.story.bodyHtml }} />
                <h3 className="subhead">{t.story.credentialsTitle}</h3>
                <div className="cred-list">
                  {t.story.credentials.map((c) => (
                    <div className="cred-row" key={c.title}>
                      <span className="dot" />
                      <div>
                        <strong>{c.title}</strong>
                        <br />
                        <span>{c.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {page === "services" && (
          <section className="trust-section paper-deep">
            <PageHead tag={t.services.tag} title={t.services.title} ledeHtml={t.services.bodyHtml} />
            <div className="service-grid">
              {t.services.services.map((s, index) => (
                <article className="service-card" key={s.title}>
                  <span className="num">0{index + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.detail}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {page === "testimonials" && (
          <section className="trust-section">
            <PageHead tag={t.testimonials.tag} title={t.testimonials.title} ledeHtml={t.testimonials.bodyHtml} />
            <div className="quote-grid">
              {t.testimonials.quotes.map((q) => (
                <article className="quote-card" key={q.name}>
                  <span className="mark">“</span>
                  <p>{q.text}</p>
                  <footer>
                    <strong>{q.name}</strong>
                    <span>{q.role}</span>
                  </footer>
                </article>
              ))}
            </div>
          </section>
        )}

        {page === "process" && (
          <section className="trust-section paper-deep">
            <PageHead tag={t.process.tag} title={t.process.title} ledeHtml={t.process.bodyHtml} />
            <div className="process-grid">
              {t.process.steps.map((s, index) => (
                <div className="process-step" key={s.title}>
                  <div className="pnum">0{index + 1}</div>
                  <h3>{s.title}</h3>
                  <p>{s.detail}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {page === "honors" && (
          <section className="trust-section">
            <PageHead tag={t.honors.tag} title={t.honors.title} ledeHtml={t.honors.bodyHtml} />
            <div className="stat-row">
              {t.honors.stats.map((s) => (
                <div className="stat" key={s.label}>
                  <div className="n">
                    {s.number}
                    <em>{s.suffix}</em>
                  </div>
                  <div className="l">{s.label}</div>
                </div>
              ))}
            </div>
            <h3 className="subhead">{t.honors.awardsTitle}</h3>
            <div className="award-list">
              {t.honors.awards.map((a) => (
                <div className="award-row" key={`${a.year}-${a.text}`}>
                  <span className="yr">{a.year}</span>
                  <span>{a.text}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {page === "connect" && (
          <section className="trust-section">
            <PageHead tag={t.connect.tag} title={t.connect.title} ledeHtml={t.connect.bodyHtml} />
            <div className="connect-cards">
              <a className="connect-card" href={t.contact.phoneHref}>
                <span className="k">
                  <Phone size={14} />
                  {t.connect.phoneLabel}
                </span>
                <span className="v">{t.contact.phone}</span>
                <span className="d">{t.connect.phoneDetail}</span>
              </a>
              <a className="connect-card" href={t.contact.lineHref} target="_blank" rel="noreferrer">
                <span className="k">
                  <MessageCircle size={14} />
                  {t.connect.lineLabel}
                </span>
                <span className="v">{t.contact.lineId}</span>
                <span className="d">{t.connect.lineDetail}</span>
              </a>
              <a className="connect-card" href={`mailto:${t.contact.email}`}>
                <span className="k">
                  <Mail size={14} />
                  {t.connect.emailLabel}
                </span>
                <span className="v">{t.contact.email}</span>
                <span className="d">{t.connect.emailDetail}</span>
              </a>
            </div>
            <p className="connect-note">
              {t.contact.officeHours} · {t.contact.company}
            </p>
          </section>
        )}
      </main>

      <footer className="trust-footer">
        <Seal char={t.hero.sealChar} mini />
        <span>
          {siteMeta.shortName} · {t.contact.company}
        </span>
        <span>{t.chrome.footerNote}</span>
      </footer>
    </div>
  );
}
