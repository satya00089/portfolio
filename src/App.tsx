import React from "react";
import { Element } from "react-scroll";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import NightSky from "./components/NightSky";
import Galaxy from "./components/Galaxy";
import FlipCard from "./components/FlipCard";
import Avatar from "./components/Avatar";

const App: React.FC = () => {
  return (
    <div className="bg-nightSky text-white min-h-screen scroll-smooth">
      <Navbar />
      <Element name="about"><About /></Element>
      <Element name="projects"><Projects /></Element>
      <Element name="skills"><Skills /></Element>
      <Element name="contact"><Contact /></Element>
      <Element name="contact"><NightSky /></Element>
      <Element name="contact"><Galaxy /></Element>
      <Element name="contact"><FlipCard front="abc" back="abc" /></Element>
      <Element name="contact"><Avatar /></Element>
    </div>
  );
};

export default App;
