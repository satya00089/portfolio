import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import PortfolioPage from "./pages/PortfolioPage";
import ResumePage from "./pages/ResumePage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen scroll-smooth">
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
