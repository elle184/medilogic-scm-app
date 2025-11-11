import React, {useEffect, useState} from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import Assignment from '../type/Assignment';
import AssignmentItem from '../components/assignment/AssignmentItem';

function AssignmentScreen () {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Assignment[]>([]);

    const getAssignments = async () => {
        try {
            //const response = await fetch('http://10.0.2.2:8010/api/v1/vendedores/1/clientes');
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
        getAssignments();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (<ActivityIndicator />) :
                (<FlatList 
                  data={data} keyExtractor={({id}) => id} 
                    renderItem={({item}) => (
                      <AssignmentItem item={item} />
                    )}
                />)
            }
        </View>
    );
}

export default AssignmentScreen;

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