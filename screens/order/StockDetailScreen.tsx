import {Text, View, StyleSheet} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const countryList = [
  { codigo: 'CO', nombre: 'Colombia' },
  { codigo: 'PE', nombre: 'Perú' },
  { codigo: 'EC', nombre: 'Ecuador' },
  { codigo: 'MX', nombre: 'México' },
];

function StockDetailScreen({route}) {
    function countrySelectedHandler(selectedCountry) {

    }

    return (
        <View>
            <Text>Validación de inventario</Text>
            <Text>{route.params.productId}</Text>
            <Text>País</Text>
            <Dropdown
                data={countryList}
                labelField="nombre"
                valueField="codigo"
                placeholder="País"
                onChange={item => countrySelectedHandler(item.value)}
                style={styles.dropdown}
            />
            <Text>Bodega</Text>
            <Dropdown
                data={countryList}
                labelField="nombre"
                valueField="codigo"
                placeholder="Bodega"
                onChange={item => countrySelectedHandler(item.value)}
                style={styles.dropdown}
            />
            <Text>Lote</Text>
            <Dropdown
                data={countryList}
                labelField="nombre"
                valueField="codigo"
                placeholder="Lote"
                onChange={item => countrySelectedHandler(item.value)}
                style={styles.dropdown}
            />
            <Text>Disponible: 679</Text>
            <Text>Prónostico de entrega: Lunes 18 de Julio de 2026 (Tarde)</Text>
        </View>
    )
}

export default StockDetailScreen;

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        width: '100%',
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10
        , marginRight: 10},
});