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
        <Drawer.Navigator>
          <Drawer.Screen name="Asignaciones" component={AssignmentScreen} />
          <Drawer.Screen name="Cliente" component={CreateClientScreen} />
          <Drawer.Screen name="Visitas" component={ScheduleVisitScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}