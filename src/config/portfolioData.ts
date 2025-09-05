import type { Personal, Project, Skill, TagColors } from "../types/portfolio";
import type { Resume } from "../types/resume";

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
    image:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTJxYjhmdTVjam41aWlzczZreGZ2eXc5eThjdDRpMXgxYzVuYTAzMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tWnCyw4rmoFY8CmhLV/giphy.gif",
    href: "https://mui-color-wheel.vercel.app/",
    links: [
      {
        label: "Storybook",
        url: "https://mui-color-wheel.vercel.app/",
        icon: "SiStorybook",
      },
      {
        label: "NPM",
        url: "https://www.npmjs.com/package/mui-color-wheel",
        icon: "SiNpm",
      },
      {
        label: "GitHub",
        url: "https://github.com/satya00089/mui-color-wheel",
        icon: "SiGithub",
      },
    ],
    long: "Published an open-source React component that provides a smooth and customizable color wheel built with Material-UI. Supports HSV/RGB color models, real-time updates, and easy integration into design tools or dashboards.",
  },
  {
    id: 2,
    title: "Night Skyline",
    desc: "A breathtaking recreation of the city skyline under a starlit night sky, capturing the serene beauty and glowing atmosphere of the evening.",
    tags: ["React", "CSS"],
    image:
      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2RjaHAxY3N3enY0d3RldWVpczg2ZTNzMHhsY2dpam0yYnp6bWh2byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/P2jddT5c9g9OeHI17p/giphy.gif",
    href: "https://satya00089.github.io/night-sky",
    links: [
      {
        label: "Watch",
        url: "https://www.loom.com/share/1516014366e34135a67f5dd4e551fec5",
        icon: "FaPlay",
      },
      {
        label: "GitHub",
        url: "https://github.com/satya00089/night-sky",
        icon: "SiGithub",
      },
    ],
    long: "A breathtaking recreation of the city skyline under a starlit night sky, capturing the serene beauty and glowing atmosphere of the evening.",
  },
  {
    id: 3,
    title: "Alochona",
    desc: "A simple chatbot built with Hugging Face Spaces and OpenAI.",
    long: "Alochona is an experimental chatbot hosted on Hugging Face Spaces. It uses OpenAI under the hood for responses. This project was built as a way to explore chatbot UIs, Hugging Face deployment, and integrating OpenAI APIs.",
    image: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmc5dDY1c2ZnOGs0ODF0eDkwbzBvMHZ2ZXJvYml2amRmdzN2dnZueSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7AFQj6uviWpwudbOWg/giphy.gif",
    href: "https://huggingface.co/spaces/satya00089/alochona",
    links: [
      {
        label: "Huggingface",
        url: "https://huggingface.co/spaces/satya00089/alochona/tree/main",
        icon: "SiHuggingface",
      },
      {
        label: "GitHub",
        url: "https://github.com/satya00089/alochona",
        icon: "SiGithub"
      }
    ],
    tags: ["Chatbot", "OpenAI", "Hugging Face", "Beginner Project"],
  },
  {
    id: 4,
    title: "Design System Playground",
    desc: "A component library and living documentation for a design system.",
    tags: ["Design System", "Storybook", "React"],
    image: undefined,
    href: "https://satya00089.github.io/diagrammatic",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/satya00089/diagrammatic",
        icon: "SiGithub",
      },
    ],
    long: "Built atomic components, token system, and automated visual tests.",
  },
  {
    id: 5,
    title: "Data Dashboard (POC)",
    desc: "Real-time charts and alerts for operational metrics.",
    tags: ["React", "D3", "Realtime"],
    image: undefined,
    href: "#",
    long: "Realtime pipelines ingesting metrics, with anomaly detection and alerting.",
  },
  {
    id: 6,
    title: "Design System Playground",
    desc: "A component library and living documentation for a design system.",
    tags: ["Design System", "Storybook", "React"],
    image: undefined,
    href: "https://satya00089.github.io/diagrammatic",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/satya00089/diagrammatic",
        icon: "SiGithub",
      },
    ],
    long: "Built atomic components, token system, and automated visual tests.",
  },
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: "React", level: 90, icon: "SiReact", stack: "frontend" },
  { name: "HTML5", level: 90, icon: "SiHtml5", stack: "frontend" },
  { name: "CSS3", level: 88, icon: "SiCss3", stack: "frontend" },
  { name: "JavaScript", level: 90, icon: "SiJavascript", stack: "frontend" },
  { name: "TypeScript", level: 85, icon: "SiTypescript", stack: "frontend" },
  { name: "Tailwind CSS", level: 80, icon: "SiTailwindcss", stack: "frontend" },
  // Backend
  { name: "Python", level: 88, icon: "SiPython", stack: "backend" },
  { name: "FastAPI", level: 80, icon: "SiFastapi", stack: "backend" },
  // Data Science / ML
  { name: "NumPy", level: 85, icon: "SiNumpy", stack: "ai & ml" },
  { name: "Pandas", level: 85, icon: "SiPandas", stack: "ai & ml" },
  { name: "Scikit-learn", level: 80, icon: "SiScikitlearn", stack: "ai & ml" },
  { name: "TensorFlow", level: 75, icon: "SiTensorflow", stack: "ai & ml" },
  { name: "PyTorch", level: 75, icon: "SiPytorch", stack: "ai & ml" },
  { name: "RAG", level: 70, stack: "ai & ml" },
  // IaC
  { name: "Terraform", level: 80, icon: "SiTerraform", stack: "others" },
  { name: "Bicep", level: 70, stack: "others" },
  // Cloud Platforms
  { name: "AWS", level: 78, stack: "others" },
  { name: "Azure", level: 78, stack: "others" },
  // Version Control
  { name: "Git", level: 90, icon: "SiGit", stack: "others" },
  { name: "GitHub", level: 88, icon: "SiGithub", stack: "others" },
  // Databases
  { name: "PostgreSQL", level: 80, icon: "SiPostgresql", stack: "database" },
  { name: "MySQL", level: 78, icon: "SiMysql", stack: "database" },
  { name: "MongoDB", level: 78, icon: "SiMongodb", stack: "database" },
];

// ---------- SMALL HELPERS ----------
export const tagColors: TagColors = {
  React: "bg-blue-100 text-blue-800",
  CSS: "bg-teal-100 text-teal-800",
  CSS3: "bg-teal-100 text-teal-800",
  Tailwind: "bg-teal-100 text-teal-800",
  Stripe: "bg-purple-100 text-purple-800",
  "Design System": "bg-yellow-100 text-yellow-800",
  D3: "bg-amber-100 text-amber-800",
  Realtime: "bg-green-100 text-green-800",
  Storybook: "bg-pink-100 text-pink-800",
  "NPM Package": "bg-red-100 text-red-800",
  "Material-UI": "bg-indigo-100 text-indigo-800",
  "Chatbot": "bg-violet-100 text-violet-800",
  OpenAI: "bg-gray-100 text-gray-800",
  "Hugging Face": "bg-orange-100 text-orange-800",
  Beginner: "bg-cyan-100 text-cyan-800",
  "Beginner Project": "bg-cyan-100 text-cyan-800",
};







export const RESUME_INFO: Resume = {
  meta: {
    createdAt: "2025-09-04T21:02:32.456Z",
    locale: "en-US",
    url: "https://your-site.com/resume",
  },
  personal: {
    name: "Satya Subudhi",
    title: "Full Stack Developer",
    headline: "React · Python · FastAPI · ML · IaC",
    avatar: "/profile.jpg",
    summary:
      "Full Stack Developer building production-grade applications with React, FastAPI and cloud infrastructure. I focus on developer experience, automations and sustainable code.",
    contact: {
      email: "satyasubudhi089@gmail.com",
      location: "Remote",
      website: "https://satya00089.github.io/portfolio",
      socials: [
        { label: "GitHub", url: "https://github.com/satya00089", icon: "SiGithub" },
        { label: "Hugging Face", url: "https://huggingface.co/spaces/satya00089/", icon: "SiHuggingface" },
      ],
    },
  },
  skills: [
    {
      title: "Core",
      skills: [
        { name: "React", level: 8, years: 4, category: "frontend" },
        { name: "TypeScript", level: 7, years: 3, category: "frontend" },
        { name: "Python", level: 8, years: 5, category: "backend" },
        { name: "FastAPI", level: 7, years: 2, category: "backend" },
        { name: "AWS", level: 7, years: 3, category: "devops" },
      ],
    },
  ],
  experience: [
    {
      title: "Full Stack Developer",
      company: "Acme Inc",
      location: "Remote",
      date: { start: "2022-03", present: true },
      summary: "Building customer-facing web apps and internal tools",
      bullets: [
        "Built a dashboard with React, TypeScript and Tailwind to manage data pipelines.",
        "Authored backend services in FastAPI and deployed on AWS with Terraform.",
      ],
      tech: ["React", "TypeScript", "FastAPI", "AWS", "Terraform"],
    },
  ],
  projects: [
    {
      title: "Night Sky",
      short: "Starry UI demo with animations",
      description: "A small interactive site showcasing animated star backgrounds and theme toggles.",
      image: "/projects/night-sky.png",
      href: "https://satya00089.github.io/night-sky/",
      tags: ["React", "Tailwind", "Framer Motion"],
      featured: true,
      date: { start: "2024-02" },
    },
    {
      title: "Alochona",
      short: "Chatbot on Hugging Face (OpenAI powered)",
      description: "Simple chatbot experimenting with conversational UI and deployment on Hugging Face Spaces.",
      href: "https://huggingface.co/spaces/satya00089/alochona",
      tags: ["Chatbot", "OpenAI", "Hugging Face"],
    },
  ],
  education: [
    {
      degree: "B.Sc. Computer Science",
      school: "Some University",
      date: "2018-2021",
    },
  ],
  certifications: [
    {
      name: "Terraform Associate",
      issuer: "HashiCorp",
      date: "2023",
    },
  ],
  extras: {
    languages: [{ name: "English", level: "Native" }],
    interests: ["astronomy", "music"],
  },
};
