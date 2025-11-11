import { StatusBar } from 'expo-status-bar';
import AssignmentScreen from './screens/AssignmentScreen';
import CreateClientScreen from './screens/CreateClientScreen';
import ScheduleVisitScreen from './screens/ScheduleVisitScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Visitas programadas'>
          <Stack.Screen name="Mis asignaciones" component={AssignmentScreen} />
          <Stack.Screen name="Crear cliente institucional" component={CreateClientScreen} />
          <Stack.Screen name="Visitas programadas" component={ScheduleVisitScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}