// types/resume.ts

/**
 * Strong, extendable resume type definitions for a portfolio app.
 * - Designed to be friendly for rendering, printing, and JSON storage.
 * - Dates are strings to keep it simple (e.g., "2022", "Jan 2022", "2022-06-01").
 */

/* ---------- Basic building blocks ---------- */

export type TagColors = {
  [tag: string]: string;
};


export type Year = string; // e.g. "2024" or "2024-06"

export type DateRange = {
  start?: string; // "2022-06", "Jun 2022", etc.
  end?: string; // "2024-03" or "Present"
  present?: boolean; // shorthand flag if end is "Present"
};

export type Url = string;
export type Email = string;
export type Phone = string;

/* ---------- Contact & Personal ---------- */

export type SocialLink = {
  label: string; // e.g. "GitHub", "LinkedIn"
  url: Url;
  icon?: string; // optional icon key (e.g., "SiGithub")
  size?: number; // optional icon size
};

export type Contact = {
  email?: Email;
  phone?: Phone;
  location?: string; // e.g. "Remote / New York, USA"
  website?: Url;
  socials?: SocialLink[];
};

export type Personal = {
  name: string;
  title?: string; // e.g. "Full Stack Developer"
  headline?: string; // short tagline
  avatar?: Url; // profile image
  summary?: string; // 1-3 line summary
  contact?: Contact;
};

/* ---------- Skills, tags ---------- */

export type Skill = {
  id?: string; // optional machine id
  name: string; // "React"
  icon?: string; // optional icon name (e.g., "SiReact")
  level?: number; // 1-10 or %
  years?: number; // years of experience
  category?: "frontend" | "backend" | "data" | "devops" | "tooling" | "database" | "other";
  note?: string; // optional note e.g. "used at work since 2020"
};

export type SkillGroup = {
  title?: string;
  skills: Skill[];
};

/* ---------- Projects & work ---------- */

export type ProjectLink = {
  label: string; // "Live Demo", "GitHub"
  url: Url;
  icon?: string; // optional icon name
};

export type Project = {
  id?: string;
  title: string;
  short?: string; // one-line description
  description?: string; // longer description, markdown ok
  tags?: string[]; // technologies / categories
  image?: Url; // preview image path
  href?: Url; // live url (for playground)
  links?: ProjectLink[]; // alternate links
  date?: DateRange | string;
  featured?: boolean;
  isUnderDevelopment?: boolean;
};

export type Role = {
  id?: string;
  title: string; // e.g. "Software Engineer"
  company?: string;
  location?: string;
  date?: DateRange | string;
  summary?: string;
  bullets?: string[]; // responsibilities & achievements
  tech?: string[]; // tech used for this role
  link?: Url; // company site
};

export type Education = {
  id?: string;
  degree?: string; // "BSc Computer Science"
  school?: string;
  date?: DateRange | string;
  location?: string;
  summary?: string;
};

/* ---------- Certifications / awards ---------- */

export type Certification = {
  id?: string;
  name: string; // "AWS Certified Developer"
  issuer?: string; // "Amazon"
  date?: DateRange | string;
  url?: Url;
  description?: string;
};

/* ---------- Resume root type ---------- */

export type Portfolio = {
  meta?: {
    // optional metadata for print/export
    createdAt?: string;
    updatedAt?: string;
    locale?: string;
    url?: Url; // canonical url to portfolio/resume
    pdf?: Url; // pre-rendered PDF link if available
  };
  personal: Personal;
  summary?: string; // a single summary paragraph (optional)
  highlights?: string[]; // short bullets like "Open to remote roles" etc.
  skills?: SkillGroup[]; // grouped skills
  experience?: Role[]; // work history
  projects?: Project[]; // portfolio projects
  education?: Education[];
  certifications?: Certification[];
  extras?: {
    volunteer?: Role[];
    languages?: { name: string; level?: string }[];
    interests?: string[]; // e.g. "astronomy, photography"
  };
};




export interface Source {
  id: string;
  text: string;
  meta?: Record<string, unknown>;
  score?: number;
}