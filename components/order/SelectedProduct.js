import {StyleSheet, View, Text, Button} from 'react-native';

function SelectedProduct(props) {
    return (
        <View style={styles.inputContainer}>    
            <Text key={props.productId}>{props.productId}</Text>
            <Button title="Validar inventario" />
        </View>);
}

export default SelectedProduct;

const styles = StyleSheet.create({
        inputContainer : {
        flexDirection : 'row'
        , justifyContent : 'space-between'
    },
})