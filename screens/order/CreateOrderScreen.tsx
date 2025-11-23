import {View, StyleSheet} from 'react-native';
import CreateClientOrderForm from '../../components/order/CreateClientOrderForm';

function CreateOrderScreen() {
    return (
        <View style={styles.formContainer}>
            <CreateClientOrderForm>
            </CreateClientOrderForm>
        </View>
    );
}

export default CreateOrderScreen;

const styles = StyleSheet.create({
    formContainer : {
        flex : 1
        , flexDirection: 'column'
        , justifyContent : 'flex-start'
    }
});