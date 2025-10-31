import {View, StyleSheet, Text} from 'react-native';

function AssignmentItem(props) {
    return (
        <View style={styles.containerItem}>
            <Text style={styles.heading2}>{props.item.institucion_nombre}</Text>
            <Text>{props.item.direccion}</Text>
            <Text>{props.item.contacto_principal}</Text>
        </View>
    );
}

export default AssignmentItem;

const styles = StyleSheet.create({
  containerItem: {
    borderWidth: 1
    , margin: 5
    , padding: 5
    , flex: 1
    , width: 'auto'
    , minWidth: 300},
  heading2 : {
    fontSize: 25,
    fontWeight: 'bold'}
});