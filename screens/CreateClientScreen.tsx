import { View, Button, StyleSheet } from "react-native";
import CreateClientForm from "../components/client/CreateClientForm";

function CreateClientScreen() {
    return (
        <View style={styles.formContainer}>
            <CreateClientForm 
                submitButtonLabel='Guardar'
            />
        </View>
    );
}

export default CreateClientScreen;

const styles = StyleSheet.create({
    formContainer : {
        flex : 1
        , flexDirection : 'column'
        , justifyContent : 'flex-start'
    }
})