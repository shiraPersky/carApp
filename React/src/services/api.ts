import axios from 'axios';

const API_URL = 'http://localhost:3000/services'; // Adjust this according to your API base URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
