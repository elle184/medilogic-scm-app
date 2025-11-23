import { StatusBar } from 'expo-status-bar';
import AssignmentScreen from './screens/AssignmentScreen';
import CreateClientScreen from './screens/CreateClientScreen';
import ScheduleVisitScreen from './screens/ScheduleVisitScreen';
import CreateOrderScreen from './screens/order/CreateOrderScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StockDetailScreen from './screens/order/StockDetailScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export function NavigableScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StockDetail" component={StockDetailScreen} />
    </Stack.Navigator>);
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Asignaciones" component={AssignmentScreen} />
          <Drawer.Screen name="Cliente" component={CreateClientScreen} />
          <Drawer.Screen name="Visitas" component={ScheduleVisitScreen} />
          <Drawer.Screen name="Orden" component={CreateOrderScreen} />
          <Drawer.Screen name="NavigableOptions" component={NavigableScreens} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}