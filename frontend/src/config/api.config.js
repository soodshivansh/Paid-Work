const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  ENDPOINTS: {
    PETS: '/api/pets',
    AUTH: {
      LOGIN: '/api/users/login',
      REGISTER: '/api/users/register',
      ADMIN_LOGIN: '/api/users/admin/login',
    },
    USER: {
      PROFILE: '/api/users/profile',
      UPDATE: '/api/users/update',
    },
  },
  TIMEOUT: 5000,
};

export default API_CONFIG;
