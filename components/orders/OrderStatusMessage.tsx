import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OrderStatus } from '../../type/Order';
import { MENSAJES_ESTADO } from '../../constants/orderConstants';

interface OrderStatusMessageProps {
  estado: OrderStatus;
  fechaEntrega?: string;
}

const OrderStatusMessage: React.FC<OrderStatusMessageProps> = ({ estado, fechaEntrega }) => {
  const mensaje = MENSAJES_ESTADO[estado];

  if (!mensaje) {
    return null;
  }

  // Para ENTREGADO, reemplazar fecha si está disponible
  let mensajeFinal = mensaje;
  if (estado === 'ENTREGADO' && fechaEntrega) {
    mensajeFinal = mensaje; // Puedes personalizar más si quieres mostrar la fecha específica
  }

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>ℹ️</Text>
      <Text style={styles.message}>{mensajeFinal}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E7F3FF',
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#0D6EFD',
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontSize: 14,
    color: '#004085',
    lineHeight: 20,
  },
});

export default OrderStatusMessage;
