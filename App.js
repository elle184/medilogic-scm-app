import { StatusBar } from 'expo-status-bar';
import AssignmentScreen from './screens/AssignmentScreen';
import CreateClientScreen from './screens/CreateClientScreen';
import ScheduleVisitScreen from './screens/ScheduleVisitScreen';
import ViewVisitRouteScreen from './screens/ViewVisitRouteScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Asignaciones" component={AssignmentScreen} />
          <Drawer.Screen name="Cliente" component={CreateClientScreen} />
          <Drawer.Screen name="Visitas programadas" component={ScheduleVisitScreen} />
          <Drawer.Screen name="Ruta de visitas" component={ViewVisitRouteScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}