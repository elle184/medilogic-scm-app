import {useState} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native';
import VisitRoute from '../type/VisitRoute';
import VisitRouteItem from '../components/visit-route/VisitRouteItem';
import DateTimePicker from '@react-native-community/datetimepicker';

const visitRoutes: VisitRoute[] = [
  {
    id : 1,
    client: "Cliente A",
    address: "Calle 123 #45-67, Bogotá",
    contact_name: "Juan Pérez",
    estimated_time_p1_p2: "15 min",
    visitDate : "2025-11-10"
  },
  {
    id : 2,
    client: "Cliente B",
    address: "Cra 9 #12-34, Medellín",
    contact_name: "María Gómez",
    estimated_time_p1_p2: "25 min",
    visitDate : "2025-11-11"
  },
  {
    id : 3,
    client: "Cliente C",
    address: "Av. Siempre Viva 742, Cali",
    contact_name: "Carlos López",
    estimated_time_p1_p2: "10 min",
    visitDate : "2025-11-12"
  }
];

function VisitRouteScreen () {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<VisitRoute[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(false);

    const onChangeDate = (event : any, date? : Date) => {
      setShowPicker(false);

      if (date) setSelectedDate(date);
    }

    const formattedSelectedDate = selectedDate 
      ? selectedDate.toISOString().split('T')[0]
      : null;

    const filteredData = formattedSelectedDate
      ? visitRoutes.filter((item) => item.visitDate === formattedSelectedDate)
      : visitRoutes;

    return (
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: "#e0e0e0",
              borderRadius: 8,
              marginBottom: 20
            }}
            onPress={() => setShowPicker(true)}
          >
            <Text>
              {formattedSelectedDate
                ? `Fecha seleccionada: ${formattedSelectedDate}`
                : "Seleccionar fecha"}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          {filteredData.length > 0 ? (
            <FlatList 
                data={filteredData} 
                keyExtractor={({id}) => id} 
                renderItem={({item}) => (
                    <VisitRouteItem item={item} />
                )}
                
            />) : 
            (<Text style={{ textAlign: "center", marginTop: 30, fontSize: 16 }}>
              No hay visitas programadas para esta fecha
            </Text>)
          }
        </View>
    );
}

export default VisitRouteScreen;

const styles = StyleSheet.create({
  logo : {
    width : 64
    , height : 64
    , display : 'inline'
  },
  applicationName : {
    display : 'inline'
  },
  container: {
    flex: 1
    , flexDirection: 'column'
    , backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'},
  header : {
    paddingTop : 40
    , paddingBottom : 50
  },
  heading1 : {
    paddingTop: 40
    , fontSize: 30
    , fontWeight: 'bold'}
});