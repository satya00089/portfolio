import React from "react";

const skills: string[] = ["React", "Tailwind CSS", "Vite", "JavaScript", "TypeScript"];

const Skills: React.FC = () => (
  <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
    <h2 className="text-4xl font-bold mb-10">Skills</h2>
    <div className="flex flex-wrap gap-4 justify-center">
      {skills.map((skill, idx) => (
        <span
          key={idx}
          className="px-4 py-2 bg-blue-600/50 rounded-lg hover:bg-blue-400 transition"
        >
          {skill}
        </span>
      ))}
    </div>
  </section>
);

export default Skills;
