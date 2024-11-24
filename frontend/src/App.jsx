import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./pages/LandingPage/LandingPage";
import AdoptPage from "./pages/AdoptPage/AdoptPage";
import Footer from "./components/Footer/Footer";
import PetDescription from '../src/pages/PetDescription/petDescription';
import ChooseToAdopt from '../src/pages/ChooseToAdopt/ChooseToAdopt';
import RehomePage from "./pages/RehomePage/RehomePage";
import LoginPopup from "./pages/LoginSignUp/loginPopUp";
import { pets } from "./data/pets";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import Admin from './pages/Admin/Admin';

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
      <Navbar handleLoginPopup={toggleLoginPopup} user={user} setUser={setUser} />;
      <LoginPopup loginPopup={loginPopup} handleLoginPopup={toggleLoginPopup} onLoginSuccess={handleLoginSuccess} />;

      <div className={loginPopup ? "blur-sm bg-black/30" : ""}>
        <main>
          <Routes>
            <Route path="/" element={<LandingPage pets={pets} />} />
            <Route path="/adopt" element={<AdoptPage pets={pets} />} />
            <Route path="/petDescription/:id" element={<PetDescription />} />
            <Route path="/profile" element={<UpdateProfile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/choose-to-adopt" element={<ChooseToAdopt />} />
            <Route path="/rehome" element={<RehomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
