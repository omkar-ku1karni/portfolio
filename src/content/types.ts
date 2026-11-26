/**
 * Content types for the portfolio.
 * You normally never need to edit this file — edit `site.ts` instead.
 */

/** Project links. Each one becomes a button on the card; leave one out and its button won't show. */
export interface ProjectLinks {
  /** GitHub repository. */
  repo?: string;
  /** Live project website. */
  live?: string;
}

/**
 * Which diagram the card previews. Add a new one in components/sections/ProjectPreview.tsx;
 * a project without one gets generated flow-line art instead.
 */
export type ProjectPreviewKind = 'pipeline' | 'funnel' | 'fusion' | 'agents';

export interface Project {
  title: string;
  /** 'ai' = AI engineering, 'analytics' = analytics & ML. Sets the colour it lights in. */
  family: 'ai' | 'analytics';
  /** One or two sentences shown on the card. */
  summary: string;
  preview?: ProjectPreviewKind;
  links?: ProjectLinks;
}

export interface Role {
  title: string;
  company: string;
  period: string;
  location?: string;
  /** Wrap text in **double asterisks** to bold it. */
  achievements: string[];
}

export interface School {
  institution: string;
  degree: string;
  period: string;
  location?: string;
  /** 'in-progress' marks it with a dashed outline. */
  status?: 'complete' | 'in-progress';
  note?: string;
}

export interface Publication {
  title: string;
  /** One sentence on what the paper does. Wrap text in **double asterisks** to bold it. */
  summary?: string;
  authors: string[];
  venue: string;
  year: string;
  url?: string;
}

export interface Credential {
  name: string;
  issuer: string;
  /** Group heading, e.g. "AWS" or "Oracle Cloud". */
  group: string;
  date: string;
  /** Path under /public, e.g. "/certifications/RAG.webp". */
  image?: string;
  /** Leave undefined to hide the "Verify" link. */
  verifyUrl?: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export type ReachIcon = 'resume' | 'email' | 'linkedin' | 'github';

export interface ReachLink {
  label: string;
  /** What the link actually shows, e.g. the email address. */
  value: string;
  href: string;
  icon: ReachIcon;
}

export interface Profile {
  name: string;
  tagline: string;
  location: string;
  headshot: string;
}

export interface SiteContent {
  profile: Profile;
  reach: ReachLink[];
  projects: Project[];
  experience: Role[];
  education: School[];
  publications: Publication[];
  credentials: Credential[];
  skills: SkillGroup[];
  contact: { heading: string; sub?: string };
}
