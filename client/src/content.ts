/* 業務員版內容模型：content/site/{zh,en}/*.md ＋ site.json → content.generated.ts */

export type Lang = "zh" | "en";

export interface ChromeStrings {
  brandName: string;
  brandSub: string;
  nav: { label: string; path: string }[];
  languageLabel: string;
  footerNote: string;
  menuLabel: string;
  closeLabel: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  phoneHref: string;
  lineId: string;
  lineHref: string;
  officeHours: string;
  company: string;
}

export interface HeroSection {
  eyebrow: string;
  name: string;
  title: string;
  bodyHtml: string;
  titleEm: string;
  tagline: string;
  ctaPrimaryLabel: string;
  ctaPrimaryPath: string;
  ctaSecondaryLabel: string;
  ctaSecondaryPath: string;
  sealChar: string;
  sealNote: string;
  verticalText: string;
  portrait: string;
  portraitNote: string;
}

export interface HomeSection {
  tag: string;
  title: string;
  bodyHtml: string;
  links: { title: string; detail: string; path: string }[];
}

export interface StorySection {
  tag: string;
  title: string;
  quote: string;
  quoteBy: string;
  bodyHtml: string;
  credentialsTitle: string;
  credentials: { title: string; detail: string }[];
}

export interface ServicesSection {
  tag: string;
  title: string;
  bodyHtml: string;
  services: { title: string; detail: string }[];
}

export interface TestimonialsSection {
  tag: string;
  title: string;
  bodyHtml: string;
  quotes: { text: string; name: string; role: string }[];
}

export interface ProcessSection {
  tag: string;
  title: string;
  bodyHtml: string;
  steps: { title: string; detail: string }[];
}

export interface HonorsSection {
  tag: string;
  title: string;
  bodyHtml: string;
  stats: { number: string; suffix: string; label: string }[];
  awardsTitle: string;
  awards: { year: string; text: string }[];
}

export interface ConnectSection {
  tag: string;
  title: string;
  bodyHtml: string;
  phoneLabel: string;
  phoneDetail: string;
  lineLabel: string;
  lineDetail: string;
  emailLabel: string;
  emailDetail: string;
}

export interface SiteContent {
  chrome: ChromeStrings;
  contact: ContactInfo;
  hero: HeroSection;
  home: HomeSection;
  story: StorySection;
  services: ServicesSection;
  testimonials: TestimonialsSection;
  process: ProcessSection;
  honors: HonorsSection;
  connect: ConnectSection;
}

export interface SiteMeta {
  name: string;
  shortName: string;
  description: string;
  defaultLanguage: Lang;
  languages: Lang[];
  author: string;
  baseUrl: string;
  theme: { accent: string; ink: string; paper: string };
  routes: string[];
}
