import axios from 'axios';

const API_BASE_URL = "https://api-app-staging.wobot.ai/app/v1";
const AUTH_TOKEN = "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: AUTH_TOKEN,
  },
});

export const fetchCameras = () => axiosInstance.get('/fetch/cameras');
export const updateCameraStatus = (id, status) =>
  axiosInstance.put('/update/camera/status', { id, status });