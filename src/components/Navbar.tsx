import React from "react";
import { Link } from "react-scroll";

const sections: string[] = ["about", "projects", "skills", "contact"];

const Navbar: React.FC = () => (
  <nav className="fixed w-full p-5 bg-nightSky/80 backdrop-blur-md z-50 flex justify-center gap-8">
    {sections.map((section) => (
      <Link
        key={section}
        to={section}
        smooth={true}
        duration={500}
        className="cursor-pointer hover:text-blue-400 capitalize"
      >
        {section}
      </Link>
    ))}
  </nav>
);

export default Navbar;
