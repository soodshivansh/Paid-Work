import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import AdoptPage from "./pages/AdoptPage";
import { pets } from "./data/pets";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
      <Routes>
        <Route path="/" element={<LandingPage pets={pets} />} />
        <Route path="/adopt" element={<AdoptPage pets={pets} />} />
      </Routes>
      </main>
      <Footer/>
    </Router>
  );
};

export default App;
