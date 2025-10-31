import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import AssignmentList from './components/assignment/AssignmentList';

export default function App() {
  return (
    <View style={styles.container}>
      <AssignmentList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    , flexDirection: 'column'
    , backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'}
});