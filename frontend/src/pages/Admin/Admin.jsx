import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (!userInfo.isAdmin) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Pet4Home Admin Dashboard
        </h1>
      </div>
    </div>
  );
};

export default Admin;
