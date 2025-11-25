import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ProductDetail } from '../../type/Order';

interface OrderProductsProps {
  productos: ProductDetail[];
}

const OrderProducts: React.FC<OrderProductsProps> = ({ productos }) => {
  const renderProductItem = ({ item }: { item: ProductDetail }) => (
    <View style={styles.productCard}>
      <Text style={styles.productName} numberOfLines={2}>
        {item.nombre_producto}
      </Text>
      <Text style={styles.productQuantity}>
        x{item.cantidad}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos en esta orden</Text>
      
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
  },
  productCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  productName: {
    flex: 1,
    fontSize: 15,
    color: '#212529',
    fontWeight: '500',
    marginRight: 12,
  },
  productQuantity: {
    fontSize: 16,
    color: '#0D6EFD',
    fontWeight: '600',
    minWidth: 60,
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: '#DEE2E6',
  },
});

export default OrderProducts;
