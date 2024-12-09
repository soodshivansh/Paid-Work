import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./pages/LandingPage/LandingPage";
import AdoptPage from "./pages/AdoptPage/AdoptPage";
import Footer from "./components/Footer/Footer";
import PetDescription from './pages/PetDescription/petDescription';
import ChooseToAdopt from './pages/ChooseToAdopt/ChooseToAdopt';
import RehomePage from "./pages/RehomePage/RehomePage";
import LoginPopup from "./pages/LoginSignUp/loginPopUp";
import { pets } from "./data/pets";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import ChooseToRehome from '../src/pages/ChooseToRehome/ChooseToRehome';
import AdoptionFAQ from "./components/FAQ/AdoptionFAQ";
import RehomingFAQ from "./components/FAQ/RehomingFAQ";
import WriteReview from "./components/Review/WriteReview";
import About from "./components/About/About";
import CareGuide from "./pages/CareGuide/CareGuide";
import AdminPanel from "./pages/AdminPanel/AdminPanel";

const App = () => {
  const [loginPopup, setLoginPopup] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const toggleLoginPopup = () => {
    setLoginPopup(!loginPopup);
  };

  const handleLoginSuccess = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoginPopup(false);
  };

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar handleLoginPopup={toggleLoginPopup} user={user} setUser={setUser} />
      <LoginPopup loginPopup={loginPopup} handleLoginPopup={toggleLoginPopup} onLoginSuccess={handleLoginSuccess} />

      <div className={loginPopup ? "blur-sm bg-black/30" : ""}>
        <main>
          <Routes>
            <Route path="/" element={<LandingPage pets={pets} />} />
            <Route path="/adopt" element={<AdoptPage pets={pets} />} />
            <Route path="/petDescription/:id" element={<PetDescription />} />
            <Route path="/profile" element={<UpdateProfile />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/choose-to-adopt" element={<ChooseToAdopt />} />
            <Route path="/rehome" element={<RehomePage />} />
            <Route path="/choose-to-rehome" element={<ChooseToRehome />} />
            <Route path="/faq/adoption" element={<AdoptionFAQ />} />
            <Route path="/faq/rehoming" element={<RehomingFAQ />} />
            <Route path="/write-review" element={<WriteReview />} />
            <Route path="/about" element={<About />} />
            <Route path="/care-guide" element={<CareGuide />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
