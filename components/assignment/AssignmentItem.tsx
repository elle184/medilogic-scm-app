import {View, StyleSheet, Text, Pressable, Platform} from 'react-native';

function AssignmentItem(props) {
    return (
      <View>
        <Pressable style={({ pressed }) => [styles.button]} android_ripple={{ color : '#CCC' }}>
            <View style={styles.containerItem}>
                <Text style={styles.heading2}>{props.item.institucion_nombre}</Text>
                <Text>{props.item.direccion}</Text>
                <Text>{props.item.contacto_principal}</Text>
            </View>
        </Pressable>
      </View>
    );
}

export default AssignmentItem;

const styles = StyleSheet.create({
  containerItem: {
    borderWidth: 0
    , margin: 6
    , padding: 5
    , flex: 1
    , width: 'auto'
    , minWidth: 300
    , elevation : 4
    , backgroundColor : 'white'
    , shadowColor : 'black'
    , shadowOpacity : 0.25
    , shadowOffset : { width : 0, height : 2 }
    , shadowRadius : 5
    , overflow : Platform.OS === 'android' ? 'hidden' : 'visible'},
  heading2 : {
    fontSize: 25,
    fontWeight: 'bold'},
  button : { flex : 1 }
});