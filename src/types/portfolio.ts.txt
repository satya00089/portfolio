export type Personal = {
  name: string;
  title: string;
  email: string;
  tagline: string;
  avatar?: string;
};

export type Link = { label: string; url: string; icon: string };

export type Project = {
  id: string | number;
  title: string;
  desc?: string;
  image?: string;
  links?: Link[];
  tags?: string[];
  href?: string;
  long?: string;
};

export type Skill = {
  name: string;
  level: number;
  icon?: string;
  stack?: "frontend" | "backend" | "database" | "ai & ml" | "others";
};

export type TagColors = {
  [tag: string]: string;
};
