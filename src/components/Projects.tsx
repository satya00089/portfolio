import React from "react";

interface Project {
  title: string;
  description: string;
  link: string;
}

const projectList: Project[] = [
  { title: "Project One", description: "A cool project using React and Tailwind.", link: "#" },
  { title: "Project Two", description: "Another amazing project demo.", link: "#" },
  { title: "Project Three", description: "Showcasing skills and creativity.", link: "#" },
];

const Projects: React.FC = () => (
  <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
    <h2 className="text-4xl font-bold mb-10">Projects</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {projectList.map((project, idx) => (
        <a
          key={idx}
          href={project.link}
          className="bg-nightSky/80 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
          <p>{project.description}</p>
        </a>
      ))}
    </div>
  </section>
);

export default Projects;
