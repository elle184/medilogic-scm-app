import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Order } from '../type/Order';
import { OrdenesService } from '../services/ordenes.service';
import OrderCard from '../components/orders/OrderCard';
import { FILTROS_ESTADO } from '../constants/orderConstants';
import { DEV_CONFIG } from '../constants/devConfig';

interface OrdersListScreenProps {
  navigation: any;
}

const OrdersListScreen: React.FC<OrdersListScreenProps> = ({ navigation }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState('TODOS');
  const [error, setError] = useState<string | null>(null);

  // TODO: Obtener el clienteId del contexto de autenticación
  // Por ahora usamos valores de configuración de desarrollo
  // Puedes cambiarlos en: constants/devConfig.ts
  const clienteId = DEV_CONFIG.CLIENTE_ID;

  const fetchOrders = async (showLoader = true) => {
    try {
      if (showLoader) {
        setIsLoading(true);
      }
      setError(null);

      const estadoParam = selectedEstado === 'TODOS' ? undefined : selectedEstado;
      const data = await OrdenesService.getOrdenesByCliente(clienteId, estadoParam);
      
      setOrders(data);
    } catch (err: any) {
      setError('Error al cargar las órdenes. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedEstado]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchOrders(false);
  }, [selectedEstado]);

  const handleOrderPress = (orderId: number) => {
    navigation.navigate('DetalleOrden', { orderId });
  };

  const handleRetry = () => {
    fetchOrders();
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0D6EFD" />
        <Text style={styles.loadingText}>Cargando órdenes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por estado:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedEstado}
            onValueChange={(itemValue) => setSelectedEstado(itemValue)}
            style={styles.picker}
          >
            {FILTROS_ESTADO.map((filtro) => (
              <Picker.Item
                key={filtro.value}
                label={filtro.label}
                value={filtro.value}
              />
            ))}
          </Picker>
        </View>
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay órdenes para mostrar</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <OrderCard order={item} onPress={handleOrderPress} />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={['#0D6EFD']}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6C757D',
  },
  errorText: {
    fontSize: 16,
    color: '#DC3545',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#0D6EFD',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  filterContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DEE2E6',
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
  },
});

export default OrdersListScreen;
