import axios from "axios";

// ✅ Environment variable ko directly use karo
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

console.log('🌐 Using API URL:', API_BASE_URL);

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,  // ✅ AB SAHI HOGA!
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("❌ API Error:", error.response.data);
    } else if (error.code === "ERR_NETWORK" || error.code === "ERR_NAME_NOT_RESOLVED") {
      console.log("⚠️ Backend server is not running or not reachable.");
      console.log("💡 Start backend: cd backend && npm start");
      console.log(`🔍 Tried URL: ${error.config?.baseURL}${error.config?.url}`);
    }
    return Promise.reject(error);
  },
);

export default api;