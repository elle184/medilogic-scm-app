import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Función temporal para desarrollo: Guarda un token de prueba
 * ELIMINAR EN PRODUCCIÓN
 */
export const setDevToken = async () => {
  try {
    // Reemplaza 'tu_token_aqui' con un token válido de tu backend
    const devToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBtZWRpc3VwcGx5LmNvbSIsImV4cCI6MTc2MzkyODU2Mn0.knCZGj_11XgoiM0YIlDNHVeSP1XANGbjmccSnpQmikU';
    await AsyncStorage.setItem('access_token', devToken);
    console.log('🔑 [DevToken] Token de desarrollo guardado');
  } catch (error) {
    console.error('❌ [DevToken] Error al guardar token:', error);
  }
};

/**
 * Para desarrollo: Limpia el token si no funciona
 */
export const clearDevToken = async () => {
  try {
    await AsyncStorage.removeItem('access_token');
    console.log('🗑️ [DevToken] Token eliminado');
  } catch (error) {
    console.error('❌ [DevToken] Error al limpiar token:', error);
  }
};
