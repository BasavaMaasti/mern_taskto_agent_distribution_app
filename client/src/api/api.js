import axios from 'axios';

const BASE_URL = 'https://mern-taskto-agent-distribution-app.onrender.com/api';

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
