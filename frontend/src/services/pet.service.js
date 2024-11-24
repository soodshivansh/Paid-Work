import axios from 'axios';
import API_CONFIG from '../config/api.config';

const PetService = {
  getAllPets: async (filters = {}) => {
    try {
      const response = await axios.get(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.PETS, { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getPetById: async (id) => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PETS}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createPet: async (petData) => {
    try {
      const response = await axios.post(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.PETS, petData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updatePet: async (id, petData) => {
    try {
      const response = await axios.put(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PETS}/${id}`, petData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deletePet: async (id) => {
    try {
      const response = await axios.delete(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PETS}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  uploadPetImage: async (id, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PETS}/${id}/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default PetService;
