import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import Movie from '../../type/Movie';
import AssignmentItem from './AssignmentItem';

function AssignmentList () {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Movie[]>([]);

    const getAssignments = async () => {
        try {
            const response = await fetch('https://reactnative.dev/movies.json');
            const json = await response.json();
            setData(json.movies);
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
        <View>
            <Text style={styles.heading1}>Mis asignaciones</Text>
            {isLoading ? (<ActivityIndicator />) :
                (<FlatList data={data} keyExtractor={({id}) => id} 
                    renderItem={({item}) => (
                      <AssignmentItem item={item} />
                    )}
                />)
            }
        </View>
    );
}

export default AssignmentList;

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