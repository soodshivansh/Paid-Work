import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./pages/LandingPage/LandingPage";
import AdoptPage from "./pages/AdoptPage/AdoptPage";
import { pets } from "./data/pets";
import Footer from "./components/Footer/Footer";
import PetDescription from '../src/pages/PetDescription/petDescription';
import ChooseToAdopt from '../src/pages/ChooseToAdopt/ChooseToAdopt';
import RehomePage from "./pages/RehomePage/RehomePage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
      <Routes>
        <Route path="/" element={<LandingPage pets={pets} />} />
        <Route path="/adopt" element={<AdoptPage pets={pets} />} />
        <Route path="/petDescription" element={<PetDescription/>} />
        <Route path="/choose-to-adopt" element={<ChooseToAdopt />} />
        <Route path="/rehome" element={<RehomePage />} />
      </Routes>
      </main>
      <Footer/>
    </Router>
  );
};

export default App;
