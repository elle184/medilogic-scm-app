import {useState} from 'react';
import {View, StyleSheet, Text, Button, TextInput, FlatList} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SelectedProduct } from './SelectedProduct';

const medicamentos = [
  { label: "Acetaminofén", value: "1" },
  { label: "Ibuprofeno", value: "2" },
  { label: "Naproxeno", value: "3" },
  { label: "Amoxicilina", value: "4" },
  { label: "Omeprazol", value: "5" },
  { label: "Loratadina", value: "6" },
  { label: "Cetirizina", value: "7" },
  { label: "Diclofenaco", value: "8" },
  { label: "Metformina", value: "9" },
  { label: "Losartán", value: "10" },
  { label: "Aspirina", value: "11" },
  { label: "Salbutamol", value: "12" },
  { label: "Clorfeniramina", value: "13" },
  { label: "Prednisona", value: "14" },
  { label: "Ranitidina", value: "15" },
];

function CreateClientOrderForm() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);

    function productSelectedHandler(productSelected) {
        setSelectedProduct(productSelected);
    }

    function addProductHandler() {
        console.log(`Producto seleccionado: ${selectedProduct}`);
        setSelectedProducts((currentProducts) => [...selectedProducts, selectedProduct]);
    }

    function getProduct(productId) {
        console.log(`Producto a buscar: ${selectedProduct}`);
        for (let p in medicamentos) {
            if (productId == medicamentos[p]['value']) {
                console.log(medicamentos[p]['label']);
                return medicamentos[p]['label'];
            }
        }
    }

    return (
        <View style={styles.formContainer}>
            <Text style={styles.heading2}>Nuevo pedido</Text>
            <Text>Cliente 1</Text>
            <View style={styles.spaceBetweenTop20}></View>
            <View style={styles.inputContainer}>
                <Dropdown
                    data={medicamentos}
                    labelField="label"
                    valueField="value"
                    placeholder="Producto"
                    style={styles.dropdown}
                    onChange={item => productSelectedHandler(item.value)}
                />
            </View>
            <View style={styles.spaceBetweenTop20}></View>
            <View>
                <Button title="Añadir otro ítem" onPress={addProductHandler} />
            </View>
            <View style={styles.spaceBetweenTop20}></View>
            <View>
                <FlatList 
                    data={selectedProducts} 
                    renderItem={(itemData) => {
                        return (
                            <View style={styles.inputContainer}>    
                                <Text key={itemData.item}>{getProduct(itemData.item)}</Text>
                                <Button 
                                    title="Validar inventario"
                                    onPress={() => navigation.navigate('StockDetailScreen')}
                                />
                            </View>)
                    }}
                    alwaysBounceVertical={false} />
            </View>
            <View>
                <Text>Observaciones</Text>
                <TextInput style={styles.inputObservations} 
                    editable multiline numberOfLines={4} />
            </View>
            <View style={styles.spaceBetweenTop20}></View>
            <Button title="Confirmar pedido" />
        </View>
    );
}

export default CreateClientOrderForm;

const styles = StyleSheet.create({
    formContainer : {
        flex : 1
        , marginLeft : 20
        , marginRight : 20},
    heading2 : {
        fontSize: 25,
        fontWeight: 'bold'},
    inputContainer : {
        flexDirection : 'row'
        , justifyContent : 'space-between'
    },
    dropdown: {
        height: 50,
        width: '55%',
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10
        , marginRight: 10},
    spaceBetweenTop20 : {
        marginTop : 20
    },
    inputObservations : {
        height: 100,
        textAlignVertical: 'top',
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 10
    }
});