import {View, StyleSheet, Text, Pressable, Platform} from 'react-native';

function ScheduleVisitItem(props) {
    return (
      <View>
        <Pressable style={({ pressed }) => [styles.button]} android_ripple={{ color : '#CCC' }}>
            <View style={styles.containerItem}>
                <Text style={styles.heading2}>{props.item.orderName}</Text>
                <Text>{props.item.status}</Text>
                <Text>{props.item.estimatedDeliveryDate}</Text>
                <Text>{props.item.driver}</Text>
            </View>
        </Pressable>
      </View>
    );
}

export default ScheduleVisitItem;

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