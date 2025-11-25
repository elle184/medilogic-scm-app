/**
 * Configuración de desarrollo
 * Cambia estos valores según necesites para pruebas
 */

export const DEV_CONFIG = {
  /**
   * ID del cliente para pruebas
   * Cambia este valor según el cliente que quieras usar
   * Clientes con datos: 1, 2
   */
  CLIENTE_ID: 1,  // ✅ Cambiado a cliente 1 (tiene órdenes)

  /**
   * ID del vendedor para pruebas
   * Cambia este valor según el vendedor que quieras usar
   */
  VENDEDOR_ID: 1,

  /**
   * Habilitar logs de debug en pantalla
   */
  ENABLE_DEBUG_LOGS: true,
};

/**
 * En producción, estos valores deberían venir de:
 * - Contexto de autenticación (AuthContext)
 * - AsyncStorage después del login
 * - Props de navegación
 * 
 * Ejemplo de uso en producción:
 * const { userId } = useContext(AuthContext);
 * const clienteId = userId;
 */
