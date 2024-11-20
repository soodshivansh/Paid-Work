import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AdoptPage from '../pages/AdoptPage';
import PetDescription from '../pages/PetDescription/petDescription';

const AppRoutes = ({ pets }) => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage pets={pets} />} />
      <Route path="/adopt" element={<AdoptPage pets={pets} />} />
      <Route path="/petDescription" element={<PetDescription/>} />
    </Routes>
  );
};

export default AppRoutes;
