import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Lee API_DOMAIN desde variables de entorno (React Native usa process.env con react-native-dotenv)
// NOTA: Para emulador Android, localhost no funciona. Usar 10.0.2.2
const baseURL = process.env.REACT_APP_API_DOMAIN ||
  //"http://34.8.129.243"; // Fallback
  "http://10.0.2.2:8001"; // Fallback para desarrollo (emulador Android)

const api = axios.create({
  baseURL: baseURL + "/api/v1",
  headers: { "Content-Type": "application/json" },
});

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error al obtener token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado, limpiar AsyncStorage
      try {
        await AsyncStorage.removeItem("access_token");
      } catch (e) {
        console.error("Error al limpiar token:", e);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
