import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PortfolioPage from "./pages/PortfolioPage";
import ResumePage from "./pages/ResumePage";

const App: React.FC = () => {
  return (
    <Router basename={import.meta.env.BASE_URL || "/"}>
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
