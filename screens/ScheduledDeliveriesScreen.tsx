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
import { Vehicle } from '../type/Vehicle';
import { OrdenesService } from '../services/ordenes.service';
import { VehiculosService } from '../services/vehiculos.service';
import { TEXTO_ESTADO, COLORES_ESTADO } from '../constants/orderConstants';
import { formatDate, formatDateTime } from '../utils/dateUtils';
import { DEV_CONFIG } from '../constants/devConfig';

interface ScheduledDeliveriesScreenProps {
  navigation: any;
}

const ScheduledDeliveriesScreen: React.FC<ScheduledDeliveriesScreenProps> = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [vehicles, setVehicles] = useState<Record<number, Vehicle>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState('TODAS');
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const clienteId = DEV_CONFIG.CLIENTE_ID;

  const fetchOrders = async (showLoader = true) => {
    try {
      if (showLoader) {
        setIsLoading(true);
      }
      setError(null);

      const data = await OrdenesService.getOrdenesByCliente(clienteId);
      
      // Filtrar pedidos excluyendo estados ENTREGADO y DEVUELTO
      const filteredData = data.filter(
        (order) => order.estado !== 'ENTREGADO' && order.estado !== 'DEVUELTO'
      );
      
      setOrders(filteredData);

      // Obtener información de vehículos asignados
      const vehicleIds = filteredData
        .filter((order) => order.id_vehiculo !== null)
        .map((order) => order.id_vehiculo as number);
      
      const uniqueVehicleIds = Array.from(new Set(vehicleIds));
      
      // Fetch vehicle information
      const vehiclesData: Record<number, Vehicle> = {};
      await Promise.all(
        uniqueVehicleIds.map(async (vehicleId) => {
          try {
            const vehicle = await VehiculosService.getVehiculoById(vehicleId);
            vehiclesData[vehicleId] = vehicle;
          } catch (error) {
            console.error(`Error al obtener vehículo ${vehicleId}:`, error);
          }
        })
      );
      
      setVehicles(vehiclesData);

      // Extraer fechas únicas de entrega
      const uniqueDates = Array.from(
        new Set(filteredData.map((order) => {
          const date = new Date(order.fecha_entrega_estimada);
          return date.toISOString().split('T')[0]; // Solo la fecha sin hora
        }))
      ).sort();

      setAvailableDates(uniqueDates);

      // Si no hay fecha seleccionada o es "TODAS", mostrar todas las órdenes filtradas
      if (selectedDate === 'TODAS') {
        setFilteredOrders(filteredData);
      }
    } catch (err: any) {
      setError('Error al cargar las órdenes. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    // Filtrar órdenes por fecha seleccionada
    if (selectedDate === 'TODAS') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => {
        const orderDate = new Date(order.fecha_entrega_estimada)
          .toISOString()
          .split('T')[0];
        return orderDate === selectedDate;
      });
      setFilteredOrders(filtered);
    }
  }, [selectedDate, orders]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchOrders(false);
  }, []);

  const handleRetry = () => {
    fetchOrders();
  };

  const renderDeliveryCard = ({ item }: { item: Order }) => {
    const estadoText = TEXTO_ESTADO[item.estado];
    const estadoColor = COLORES_ESTADO[item.estado];
    const vehicle = item.id_vehiculo ? vehicles[item.id_vehiculo] : null;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.orderId}>#ORD-{item.id}</Text>
          <View style={[styles.badge, { backgroundColor: estadoColor }]}>
            <Text style={styles.badgeText}>{estadoText}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📅 Fecha de entrega:</Text>
            <Text style={styles.infoValue}>
              {formatDateTime(item.fecha_entrega_estimada)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🚚 Vehículo asignado:</Text>
            {vehicle ? (
              <Text style={styles.infoValue}>
                Placa: {vehicle.placa}
              </Text>
            ) : (
              <Text style={styles.noVehicleText}>
                Aún no se ha asignado un vehículo
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0D6EFD" />
        <Text style={styles.loadingText}>Cargando entregas programadas...</Text>
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
        <Text style={styles.filterLabel}>Filtrar por fecha de entrega:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedDate}
            onValueChange={(itemValue) => setSelectedDate(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Todas las fechas" value="TODAS" />
            {availableDates.map((date) => (
              <Picker.Item
                key={date}
                label={formatDate(date)}
                value={date}
              />
            ))}
          </Picker>
        </View>
      </View>

      {filteredOrders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {selectedDate === 'TODAS'
              ? 'No hay entregas programadas'
              : 'No hay entregas programadas para esta fecha'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDeliveryCard}
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
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
  cardBody: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'column',
    gap: 4,
  },
  infoLabel: {
    fontSize: 13,
    color: '#6C757D',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    color: '#212529',
    fontWeight: '600',
  },
  noVehicleText: {
    fontSize: 15,
    color: '#FD7E14',
    fontWeight: '600',
    fontStyle: 'italic',
  },
});

export default ScheduledDeliveriesScreen;
