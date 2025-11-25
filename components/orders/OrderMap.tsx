import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { VehicleLocation } from '../../type/Vehicle';
import { VehiculosService } from '../../services/vehiculos.service';
import { getRelativeTime } from '../../utils/dateUtils';
import { POLLING_INTERVAL_MS } from '../../constants/orderConstants';

interface OrderMapProps {
  vehiculoId: number;
}

const OrderMap: React.FC<OrderMapProps> = ({ vehiculoId }) => {
  const [location, setLocation] = useState<VehicleLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchLocation = async () => {
    try {
      const data = await VehiculosService.getUbicacionVehiculo(vehiculoId);
      setLocation(data);
      setError(null);
      
      // Centrar el mapa en la nueva ubicación
      if (mapRef.current && data) {
        mapRef.current.animateToRegion({
          latitude: data.latitud,
          longitude: data.longitud,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      }
    } catch (err: any) {
      console.error('Error al obtener ubicación:', err);
      
      // Si es error 401, detener el polling
      if (err.response?.status === 401) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setError('Sesión expirada');
      } else {
        setError('Ubicación no disponible');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Llamada inicial
    fetchLocation();

    // Iniciar polling cada 5 segundos
    intervalRef.current = setInterval(() => {
      fetchLocation();
    }, POLLING_INTERVAL_MS);

    // Cleanup: detener polling al desmontar
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [vehiculoId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D6EFD" />
        <Text style={styles.loadingText}>Cargando ubicación...</Text>
      </View>
    );
  }

  if (error || !location) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || 'No se pudo cargar la ubicación del vehículo'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location.latitud,
          longitude: location.longitud,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitud,
            longitude: location.longitud,
          }}
          title="Vehículo de entrega"
          description="Ubicación actual"
        >
          <View style={styles.markerContainer}>
            <Text style={styles.markerIcon}>🚚</Text>
          </View>
        </Marker>
      </MapView>
      
      <View style={styles.timestampContainer}>
        <Text style={styles.timestampText}>
          Última actualización: {getRelativeTime(location.timestamp)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: '#F8F9FA',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6C757D',
  },
  errorContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  errorText: {
    fontSize: 14,
    color: '#DC3545',
    textAlign: 'center',
  },
  markerContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  markerIcon: {
    fontSize: 24,
  },
  timestampContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  timestampText: {
    fontSize: 12,
    color: '#495057',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default OrderMap;
