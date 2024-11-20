import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./pages/LandingPage/LandingPage";
import AdoptPage from "./pages/AdoptPage/AdoptPage";
import { pets } from "./data/pets";
import Footer from "./components/Footer/Footer";
import PetDescription from '../src/pages/PetDescription/petDescription';


const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
      <Routes>
        <Route path="/" element={<LandingPage pets={pets} />} />
        <Route path="/adopt" element={<AdoptPage pets={pets} />} />
        <Route path="/petDescription" element={<PetDescription/>} />


      </Routes>
      </main>
      <Footer/>
    </Router>
  );
};

export default App;
