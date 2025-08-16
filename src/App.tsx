import React from "react";
import { Element } from "react-scroll";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import NightSky from "./components/NightSky";

const App: React.FC = () => {
  return (
    <div className="bg-nightSky text-white min-h-screen scroll-smooth">
      <Navbar />
      <Element name="about"><About /></Element>
      <Element name="projects"><Projects /></Element>
      <Element name="skills"><Skills /></Element>
      <Element name="contact"><Contact /></Element>
      <Element name="contact"><NightSky /></Element>
    </div>
  );
};

export default App;
