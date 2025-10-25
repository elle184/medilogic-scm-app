import {View, StyleSheet, Text} from 'react-native';

function AssignmentItem(props) {
    return (
        <View style={styles.containerItem}>
            <Text style={styles.heading2}>{props.item.title}</Text>
            <Text>{props.item.releaseYear}</Text>
            <Text>Lorie Aguilar</Text>
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