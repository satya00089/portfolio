import type React from "react";
import ThemeProvider from "../components/ThemeProvider";
import { ScrollProgressBar } from "../components/shared/ScrollProgressBar";
import { Header } from "../components/shared/Header";
import { Resume } from "../components/resume/Resume";
import { PrintResumeButton } from "../components/resume/PrintResumeButton";
import { Footer } from "../components/shared/Footer";

const ResumePage: React.FC = () => {
  return (
    <ThemeProvider>
      <ScrollProgressBar />
      <Header links={[]} />
      <main className="max-w-6xl mx-auto px-6 py-10 pt-25">
        <Resume />
        <PrintResumeButton />
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default ResumePage;
