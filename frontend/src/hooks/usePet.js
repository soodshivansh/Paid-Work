import { useState, useEffect } from 'react';
import axios from 'axios';
import API_CONFIG from '../config/api.config';

export const usePet = (petId) => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PETS}/${petId}`);
        setPet(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch pet details');
      } finally {
        setLoading(false);
      }
    };

    if (petId) {
      fetchPet();
    }
  }, [petId]);

  return { pet, loading, error };
};

