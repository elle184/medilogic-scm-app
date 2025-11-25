import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import { OrderWithDetails, ProductDetail } from '../type/Order';
import { OrdenesService } from '../services/ordenes.service';
import { VehiculosService } from '../services/vehiculos.service';
import { ProductosService } from '../services/productos.service';
import OrderHeader from '../components/orders/OrderHeader';
import OrderMap from '../components/orders/OrderMap';
import OrderStatusMessage from '../components/orders/OrderStatusMessage';
import OrderProducts from '../components/orders/OrderProducts';

interface OrderDetailScreenProps {
  route: any;
  navigation: any;
}

const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [order, setOrder] = useState<OrderWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrderDetails();
  }, [orderId]);

  const loadOrderDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 1. Obtener datos base de la orden
      const orderData = await OrdenesService.getOrdenById(orderId);
      let orderWithDetails: OrderWithDetails = { ...orderData };

      // 2. Si hay vehículo asignado, obtener placa
      if (orderData.id_vehiculo) {
        try {
          const vehiculoData = await VehiculosService.getVehiculoById(orderData.id_vehiculo);
          orderWithDetails.vehiculo_placa = vehiculoData.placa;
        } catch (err) {
          console.error('Error al obtener vehículo:', err);
        }
      }

      // 3. Obtener detalles completos de los productos
      try {
        const productoIds = orderData.productos.map(p => p.id_producto);
        const productos = await ProductosService.getProductosByIds(productoIds);
        
        // Crear un mapa de productos por ID para fácil acceso
        const productosMap = new Map(productos.map(p => [p.id, p]));
        
        // Mapear productos con sus detalles completos
        const productosDetalles = orderData.productos.map(p => {
          const productoInfo = productosMap.get(p.id_producto);
          const valorUnitario = productoInfo?.valor_unitario_usd || 0;
          const subtotal = valorUnitario * p.cantidad;
          
          return {
            id: p.id_producto,
            id_producto: p.id_producto,
            nombre_producto: productoInfo?.nombre_producto || `Producto ${p.id_producto}`,
            cantidad: p.cantidad,
            valor_unitario_usd: valorUnitario,
            subtotal: subtotal,
          } as ProductDetail;
        });
        
        orderWithDetails.productos_detalles = productosDetalles;
        orderWithDetails.total = productosDetalles.reduce((sum, p) => sum + p.subtotal, 0);
      } catch (err) {
        console.error('Error al obtener detalles de productos:', err);
        // Si falla, usar datos básicos
        const productosDetalles = orderData.productos.map(p => ({
          id: p.id_producto,
          id_producto: p.id_producto,
          nombre_producto: `Producto ${p.id_producto}`,
          cantidad: p.cantidad,
          valor_unitario_usd: 0,
          subtotal: 0,
        } as ProductDetail));
        
        orderWithDetails.productos_detalles = productosDetalles;
        orderWithDetails.total = 0;
      }

      setOrder(orderWithDetails);
    } catch (err) {
      console.error('Error al cargar detalles de orden:', err);
      setError('Error al cargar los detalles de la orden. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    loadOrderDetails();
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0D6EFD" />
        <Text style={styles.loadingText}>Cargando detalles...</Text>
      </View>
    );
  }

  if (error || !order) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'No se pudo cargar la orden'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const showMap = order.estado === 'EN_REPARTO' && order.id_vehiculo;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header con información básica */}
      <OrderHeader order={order} />

      {/* Mapa o mensaje contextual */}
      {showMap ? (
        <OrderMap vehiculoId={order.id_vehiculo!} />
      ) : (
        <OrderStatusMessage estado={order.estado} fechaEntrega={order.fecha_entrega_estimada} />
      )}

      {/* Lista de productos */}
      {order.productos_detalles && (
        <OrderProducts productos={order.productos_detalles} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    paddingBottom: 24,
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
});

export default OrderDetailScreen;
