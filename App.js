import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  const [clientList, setClientList] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>Mis asignaciones</Text>
      <ScrollView>
        <View style={styles.containerItem}>
          <Text>Realcube</Text>
          <Text>Axel-Springer-Platz 3</Text>
          <Text>Lorie Aguilar</Text>
        </View>
        <View style={styles.containerItem}>
          <Text>Skyba</Text>
          <Text>Bredgade 10</Text>
          <Text>Hernando Downham</Text>
        </View>
        <View style={styles.containerItem}>
          <Text>Tagcat</Text>
          <Text>Carnegieplein 4</Text>
          <Text>Anitra Halfhead</Text>
        </View>
        <View style={styles.containerItem}>
          <Text>Centidel</Text>
          <Text>150 1ST STREET S E</Text>
          <Text>Carri Verbruggen</Text>
        </View>
        <View style={styles.containerItem}>
          <Text>Eayo</Text>
          <Text>2285 LAKESHORE DRIVE, BUILDING 4</Text>
          <Text>Sarette Melling</Text>
        </View>
        <View style={styles.containerItem}>
          <Text>Realcube</Text>
          <Text>Axel-Springer-Platz 3</Text>
          <Text>Lorie Aguilar</Text>
        </View>
        <View style={styles.containerItem}>
          <Text>Skyba</Text>
          <Text>Bredgade 10</Text>
          <Text>Hernando Downham</Text>
        </View>
        <View style={styles.containerItem}>
          <Text>Tagcat</Text>
          <Text>Carnegieplein 4</Text>
          <Text>Anitra Halfhead</Text>
        </View>
        <View style={styles.containerItem}>
          <Text>Centidel</Text>
          <Text>150 1ST STREET S E</Text>
          <Text>Carri Verbruggen</Text>
        </View>
        <View style={styles.containerItem}>
          <Text>Eayo</Text>
          <Text>2285 LAKESHORE DRIVE, BUILDING 4</Text>
          <Text>Sarette Melling</Text>
        </View>
        <View style={styles.containerItem}>
          <Text>Realcube</Text>
          <Text>Axel-Springer-Platz 3</Text>
          <Text>Lorie Aguilar</Text>
        </View>
        <View style={styles.containerItem}>
          <Text>Skyba</Text>
          <Text>Bredgade 10</Text>
          <Text>Hernando Downham</Text>
        </View>
        <View style={styles.containerItem}>
          <Text>Tagcat</Text>
          <Text>Carnegieplein 4</Text>
          <Text>Anitra Halfhead</Text>
        </View>
        <View style={styles.containerItem}>
          <Text>Centidel</Text>
          <Text>150 1ST STREET S E</Text>
          <Text>Carri Verbruggen</Text>
        </View>
        <View style={styles.containerItem}>
          <Text>Eayo</Text>
          <Text>2285 LAKESHORE DRIVE, BUILDING 4</Text>
          <Text>Sarette Melling</Text>
        </View>
      </ScrollView>
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
    justifyContent: 'center'},
  heading1 : {
    fontSize: 30,
    fontWeight: 'bold'},
  containerItem: {
    borderWidth: 1
    , margin: 5
    , padding: 5
    , flex: 1
    , width: 'auto'
    , minWidth: 300}
});
