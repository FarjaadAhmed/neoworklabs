// Long-form copy for /services/[slug]. Keyed by the slug in CONTENT.services.items.
export type ServiceDetail = {
  seoTitle: string; // <title> before " | Neowork Labs", e.g. "AI Ad Production Services"
  h1: string; // keyword H1, e.g. "AI-Generated Video Ads for Brands"
  answer: string; // 2-sentence direct answer: what it is, who it's for, the result
  included: { title: string; body: string }[];
  process: { title: string; body: string; turnaround: string }[];
  pricing: string; // no prices yet: explain how quotes work
  audience: { title: string; body: string }[];
  caseStudy?: { client: string; summary: string; result: string };
  faqs: { q: string; a: string }[];
};
