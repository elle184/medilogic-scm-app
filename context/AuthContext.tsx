import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { email: string; token: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ email: string; token: string } | null>(null);

  // Verificar si hay sesión guardada al iniciar
  useEffect(() => {
    checkStoredAuth();
  }, []);

  const checkStoredAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const email = await AsyncStorage.getItem('user_email');
      
      if (token && email) {
        setUser({ email, token });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Importar API
      const api = (await import('../services/api')).default;
      
      // Hacer petición real al backend
      const response = await api.post('/users/generate-token', {
        email: email,
        password: password,
      });
      
      // Extraer token de la respuesta
      const token = response.data.access_token || response.data.token;
      
      if (!token) {
        throw new Error('No se recibió token del servidor');
      }
      
      // Guardar token y email
      await AsyncStorage.setItem('access_token', token);
      await AsyncStorage.setItem('user_email', email);
      
      setUser({ email, token });
      setIsAuthenticated(true);
    } catch (error: any) {
      // Mensajes de error más específicos
      if (error.response?.status === 401) {
        throw new Error('Credenciales inválidas');
      } else if (error.response?.status === 404) {
        throw new Error('Endpoint de login no encontrado. Verifica la configuración del backend.');
      } else if (error.message?.includes('Network')) {
        throw new Error('Error de red. Verifica que el backend esté corriendo.');
      } else {
        throw new Error(error.message || 'Error al iniciar sesión');
      }
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('user_email');
      
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
