import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AssignmentScreen from './screens/AssignmentScreen';
import CreateClientScreen from './screens/CreateClientScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Crear cliente institucional'>
          <Stack.Screen name="Mis asignaciones" component={AssignmentScreen} />
          <Stack.Screen name="Crear cliente institucional" component={CreateClientScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}