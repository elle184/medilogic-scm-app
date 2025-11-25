import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AssignmentScreen from './screens/AssignmentScreen';
import CreateClientScreen from './screens/CreateClientScreen';
import ScheduleVisitScreen from './screens/ScheduleVisitScreen';
import OrdersListScreen from './screens/OrdersListScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import ScheduledDeliveriesScreen from './screens/ScheduledDeliveriesScreen';
import LoginScreen from './screens/LoginScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './context/AuthContext';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator para Órdenes (Lista + Detalle)
function OrdersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ListadoOrdenes" 
        component={OrdersListScreen}
        options={{ title: 'Mis Órdenes' }}
      />
      <Stack.Screen 
        name="DetalleOrden" 
        component={OrderDetailScreen}
        options={{ title: 'Detalle de Orden' }}
      />
    </Stack.Navigator>
  );
}

// Contenido personalizado del Drawer con info del usuario y logout
function CustomDrawerContent(props) {
  const { user, logout } = useAuth();
  
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.drawerHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.userEmail}>{user?.email || 'Usuario'}</Text>
      </View>
      
      <View style={{ flex: 1 }}>
        {props.state.routes.map((route, index) => {
          const isFocused = props.state.index === index;
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => props.navigation.navigate(route.name)}
              style={[
                styles.drawerItem,
                isFocused && styles.drawerItemFocused
              ]}
            >
              <Text style={[
                styles.drawerItemText,
                isFocused && styles.drawerItemTextFocused
              ]}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
      >
        <Text style={styles.logoutButtonText}>🚪 Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

// Navegación principal (solo se muestra si está autenticado)
function MainNavigation() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Órdenes" component={OrdersStack} />
      <Drawer.Screen name="Mis entregas programadas" component={ScheduledDeliveriesScreen} />
      <Drawer.Screen name="Mis Asignaciones" component={AssignmentScreen} />
      <Drawer.Screen name="Crear cliente institucional" component={CreateClientScreen} />
      <Drawer.Screen name="Visitas programadas" component={ScheduleVisitScreen} />
    </Drawer.Navigator>
  );
}

// Componente que maneja la lógica de autenticación
function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D6EFD" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  // Mostrar login si no está autenticado, o la app principal si lo está
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigation /> : <LoginScreen />}
    </NavigationContainer>
  );
}

// Componente principal que envuelve todo con el AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6C757D',
  },
  drawerHeader: {
    backgroundColor: '#0D6EFD',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 30,
  },
  userEmail: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  drawerItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  drawerItemFocused: {
    backgroundColor: '#E7F1FF',
  },
  drawerItemText: {
    fontSize: 16,
    color: '#495057',
  },
  drawerItemTextFocused: {
    color: '#0D6EFD',
    fontWeight: '600',
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#DC3545',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});