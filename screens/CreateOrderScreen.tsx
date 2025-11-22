import {View, StyleSheet} from 'react-native';
import CreateClientOrderForm from '../components/order/CreateClientOrderForm';
import Input from '../components/Input';

function CreateOrderScreen() {
    return (
        <View>
            <CreateClientOrderForm>
            </CreateClientOrderForm>
        </View>
    );
}

export default CreateOrderScreen;

const styles = StyleSheet.create({
    formContainer : {
        flex : 1
        , alignItems : 'center'
        , justifyContent : 'center'
    }
});