import {useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const medicamentos = [
  { label: "Acetaminofén", value: "acetaminofen" },
  { label: "Ibuprofeno", value: "ibuprofeno" },
  { label: "Naproxeno", value: "naproxeno" },
  { label: "Amoxicilina", value: "amoxicilina" },
  { label: "Omeprazol", value: "omeprazol" },
  { label: "Loratadina", value: "loratadina" },
  { label: "Cetirizina", value: "cetirizina" },
  { label: "Diclofenaco", value: "diclofenaco" },
  { label: "Metformina", value: "metformina" },
  { label: "Losartán", value: "losartan" },
  { label: "Aspirina", value: "aspirina" },
  { label: "Salbutamol", value: "salbutamol" },
  { label: "Clorfeniramina", value: "clorfeniramina" },
  { label: "Prednisona", value: "prednisona" },
  { label: "Ranitidina", value: "ranitidina" },
];

function CreateClientOrderForm() {
    const [value, setValue] = useState(null);

    return (
        <View style={styles.formContainer}>
            <Text style={styles.heading2}>Nuevo pedido</Text>
            <Text>Cliente 1</Text>

            <View style={styles.inputContainer}>
                <Dropdown
                    data={medicamentos}
                    labelField="label"
                    valueField="value"
                    placeholder="Seleccione un medicamento"
                    value={value}
                    style={styles.dropdown}
                />
                <Button 
                    title="Validar inventario" 
                />
            </View>
        </View>
    );
}

export default CreateClientOrderForm;

const styles = StyleSheet.create({
    formContainer : {
        flex : 1
        , alignItems : 'center'
        , justifyContent : 'center'
        , marginLeft : 20
        , marginRight : 20
        , marginTop : 50},
    heading2 : {
        fontSize: 25,
        fontWeight: 'bold'},
    inputContainer : {
        flexDirection : 'row'
        , justifyContent : 'space-between'
    },
    dropdown: {
        height: 50,
        width: '65%',
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10
        , marginRight: 10}
});