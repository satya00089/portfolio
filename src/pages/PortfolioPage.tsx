import React, { useState } from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import { Header } from '../components/Header';
import { ProjectsGrid } from '../components/ProjectsGrid';
import { SkillsList } from '../components/SkillsList';
import { Modal } from '../components/Modal';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import type { Project } from '../components/ProjectCard';
import type { Skill } from '../components/SkillsList';

const PROJECTS: Project[] = [
  { id: 1, title: 'Fullstack App', desc: 'React + FastAPI + Terraform', tags: ['React', 'FastAPI', 'Terraform'] },
  { id: 2, title: 'ML Demo', desc: 'RAG + HuggingFace Embeddings', tags: ['TensorFlow', 'PyTorch', 'RAG'] },
  { id: 3, title: 'Infra POC', desc: 'Multi-cloud IaC', tags: ['Terraform', 'AWS', 'Azure'] },
];

const SKILLS: Skill[] = [
  { name: 'React', level: 90 },
  { name: 'Python', level: 88 },
  { name: 'FastAPI', level: 80 },
  { name: 'TensorFlow', level: 75 },
  { name: 'PyTorch', level: 75 },
  { name: 'Terraform', level: 80 },
];

const PortfolioPage: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <ThemeProvider>
      <Header links={[{ href: '#about', label: 'About' }, { href: '#projects', label: 'Projects' }, { href: '#skills', label: 'Skills' }, { href: '#contact', label: 'Contact' }]} />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section id="about" className="py-8">
          <h1 className="text-4xl font-bold">Satya Subudhi</h1>
          <p className="mt-2 text-gray-700 dark:text-gray-300">Full Stack Developer — React, Python, FastAPI, ML, IaC.</p>
        </section>

        <section id="projects" className="py-8">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <ProjectsGrid projects={PROJECTS} onOpen={setSelected} />
        </section>

        <section id="skills" className="py-8">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <SkillsList skills={SKILLS} />
        </section>

        <section id="contact" className="py-8">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <ContactForm />
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="font-semibold">Quick contact</div>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Email: hello@example.com</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Location: Remote</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        <p>{selected?.desc}</p>
      </Modal>
    </ThemeProvider>
  );
};

export default PortfolioPage;