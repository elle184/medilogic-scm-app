import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Order } from '../../type/Order';
import { formatDate } from '../../utils/dateUtils';
import { TEXTO_ESTADO, COLORES_ESTADO } from '../../constants/orderConstants';

interface OrderCardProps {
  order: Order;
  onPress: (orderId: number) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  const estadoText = TEXTO_ESTADO[order.estado];
  const estadoColor = COLORES_ESTADO[order.estado];

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => onPress(order.id)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardLeft}>
          <Text style={styles.orderId}>#ORD-{order.id}</Text>
          <Text style={styles.dateText}>
            Entrega: {formatDate(order.fecha_entrega_estimada)}
          </Text>
        </View>
        
        <View style={styles.cardRight}>
          <View style={[styles.badge, { backgroundColor: estadoColor }]}>
            <Text style={styles.badgeText}>{estadoText}</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#6C757D',
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  arrow: {
    fontSize: 32,
    color: '#6C757D',
    fontWeight: '300',
  },
});

export default OrderCard;
