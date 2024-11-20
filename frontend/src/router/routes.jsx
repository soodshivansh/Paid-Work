import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AdoptPage from '../pages/AdoptPage';

const AppRoutes = ({ pets }) => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage pets={pets} />} />
      <Route path="/adopt" element={<AdoptPage pets={pets} />} />
    </Routes>
  );
};

export default AppRoutes;
