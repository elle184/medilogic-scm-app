import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OrderWithDetails } from '../../type/Order';
import { formatDateTime } from '../../utils/dateUtils';
import { TEXTO_ESTADO, COLORES_ESTADO } from '../../constants/orderConstants';

interface OrderHeaderProps {
  order: OrderWithDetails;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({ order }) => {
  const estadoText = TEXTO_ESTADO[order.estado];
  const estadoColor = COLORES_ESTADO[order.estado];

  return (
    <View style={styles.container}>
      <Text style={styles.orderId}>#ORD-{order.id}</Text>
      
      <View style={styles.infoRow}>
        <Text style={styles.label}>Fecha de entrega:</Text>
        <Text style={styles.value}>
          {formatDateTime(order.fecha_entrega_estimada)}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Estado:</Text>
        <View style={[styles.badge, { backgroundColor: estadoColor }]}>
          <Text style={styles.badgeText}>{estadoText}</Text>
        </View>
      </View>

      {order.id_vehiculo && order.vehiculo_placa && (
        <View style={styles.infoRow}>
          <Text style={styles.label}>🚚 Vehículo:</Text>
          <Text style={styles.valueHighlight}>{order.vehiculo_placa}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DEE2E6',
  },
  orderId: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#212529',
    fontWeight: '600',
  },
  valueHighlight: {
    fontSize: 16,
    color: '#0D6EFD',
    fontWeight: 'bold',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default OrderHeader;
