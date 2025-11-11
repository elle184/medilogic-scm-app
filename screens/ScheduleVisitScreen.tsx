import React, {useEffect, useState} from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
import ScheduleVisit from '../type/ScheduleVisit';
import ScheduleVisitItem from '../components/schedule-visit/ScheduleVisitItem';

const SCHEDULE_VISITS = [
  {
    id: 1,
    orderName: 'Orden #A102',
    status: 'Pendiente',
    estimatedDeliveryDate: '2025-11-03 10:30',
    driver: 'Carlos Ramírez'
  },
  {
    id: 2,
    orderName: 'Orden #A103',
    status: 'En curso',
    estimatedDeliveryDate: '2025-11-03 12:15',
    driver: 'Laura Gómez'
  },
  {
    id: 3,
    orderName: 'Orden #A104',
    status: 'Completada',
    estimatedDeliveryDate: '2025-11-02 17:45',
    driver: 'Andrés Torres'
  },
  {
    id: 4,
    orderName: 'Orden #A105',
    status: 'Pendiente',
    estimatedDeliveryDate: '2025-11-03 09:00',
    driver: 'Marta Sánchez'
  },
  {
    id: 5,
    orderName: 'Orden #A106',
    status: 'Cancelada',
    estimatedDeliveryDate: '2025-11-02 15:00',
    driver: 'Juan Pérez'
  }
];

function ScheduleVisitScreen () {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<ScheduleVisit[]>([]);

    /*const getSchedules = async () => {
        try {
            const response = await fetch('http://34.8.129.243/api/v1/vendedores/1/clientes');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSchedules();
    }, []);*/

    return (
        <View style={styles.container}>
            <FlatList 
                data={SCHEDULE_VISITS} keyExtractor={({id}) => id} 
                renderItem={({item}) => (
                    <ScheduleVisitItem item={item} />
                )}
            />
        </View>
    );
}

export default ScheduleVisitScreen;

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