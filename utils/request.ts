// import { App } from 'vue';
import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 7600,
  baseURL: import.meta.env.VITE_BASE as string
});

export default axiosInstance;
