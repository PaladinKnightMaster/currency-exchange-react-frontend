import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your backend URL
  timeout: 10000,
});

export default axiosInstance;
