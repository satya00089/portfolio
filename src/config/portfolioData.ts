import type { Personal, Project, Skill, TagColors } from "../types/portfolio";

export const PERSONAL: Personal = {
  name: "Satya Subudhi",
  title: "Full Stack Developer",
  email: "satyasubudhi089@gmail.com",
  tagline:
    "Full stack engineer building scalable web apps, APIs, and ML-backed features.",
  avatar: "./profile.jpg",
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "MUI Color Wheel",
    desc: "A Material-UI based color wheel component with real-time color picking.",
    tags: ["React", "Material-UI", "NPM Package", "Storybook"],
    image: undefined,
    href: "https://mui-color-wheel.vercel.app/",
    links: [
      { label: "Storybook", url: "https://mui-color-wheel.vercel.app/", icon: "SiStorybook" },
      { label: "NPM", url: "https://www.npmjs.com/package/mui-color-wheel", icon: "SiNpm" },
      { label: "GitHub", url: "https://github.com/satya00089/mui-color-wheel", icon: "SiGithub" },
    ],
    long: "Published an open-source React component that provides a smooth and customizable color wheel built with Material-UI. Supports HSV/RGB color models, real-time updates, and easy integration into design tools or dashboards.",
  },
  {
    id: 2,
    title: "Design System Playground",
    desc: "A component library and living documentation for a design system.",
    tags: ["Design System", "Storybook", "React"],
    image: undefined,
    href: "#",
    long: "Built atomic components, token system, and automated visual tests.",
  },
  {
    id: 3,
    title: "Data Dashboard (POC)",
    desc: "Real-time charts and alerts for operational metrics.",
    tags: ["React", "D3", "Realtime"],
    image: undefined,
    href: "#",
    long: "Realtime pipelines ingesting metrics, with anomaly detection and alerting.",
  },
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: "React", level: 90, icon: "SiReact" },
  { name: "HTML5", level: 90, icon: "SiHtml5" },
  { name: "CSS3", level: 88, icon: "SiCss3" },
  // Backend
  { name: "Python", level: 88, icon: "SiPython" },
  { name: "FastAPI", level: 80, icon: "SiFastapi" },
  // Data Science / ML
  { name: "NumPy", level: 85, icon: "SiNumpy" },
  { name: "Pandas", level: 85, icon: "SiPandas" },
  { name: "Scikit-learn", level: 80, icon: "SiScikitlearn" },
  { name: "TensorFlow", level: 75, icon: "SiTensorflow" },
  { name: "PyTorch", level: 75, icon: "SiPytorch" },
  { name: "RAG", level: 70 },
  // IaC
  { name: "Terraform", level: 80, icon: "SiTerraform" },
  { name: "Bicep", level: 70, icon: "VscAzure" },
  // Cloud Platforms
  { name: "AWS", level: 78, icon: "FaAws" },
  { name: "Azure", level: 78, icon: "VscAzure" },
  // Version Control
  { name: "Git", level: 90, icon: "SiGit" },
  { name: "GitHub", level: 88, icon: "SiGithub" },
  { name: "GitLab", level: 82, icon: "SiGitlab" },
  // Databases
  { name: "PostgreSQL", level: 80, icon: "SiPostgresql" },
  { name: "MySQL", level: 78, icon: "SiMysql" },
  { name: "MongoDB", level: 78, icon: "SiMongodb" },
];

// ---------- SMALL HELPERS ----------
export const tagColors: TagColors = {
  React: "bg-blue-100 text-blue-800",
  Tailwind: "bg-teal-100 text-teal-800",
  Stripe: "bg-purple-100 text-purple-800",
  "Design System": "bg-yellow-100 text-yellow-800",
  D3: "bg-amber-100 text-amber-800",
  Realtime: "bg-green-100 text-green-800",
  Storybook: "bg-pink-100 text-pink-800",
  "NPM Package": "bg-red-100 text-red-800",
  "Material-UI": "bg-indigo-100 text-indigo-800",
};
