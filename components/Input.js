import { View, Text, TextInput, StyleSheet } from 'react-native';

function Input({label, textInputConfig}) {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} {...textInputConfig} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer : {
        marginHorizontal : 4
        , marginVertical : 16
    }
    , label : {
        fontSize : 12
        , marginBottom : 4
    }
    , input : {
        padding : 6
        , borderRadius : 6
        , fontSize : 18
        , color : '#000'
        , borderColor : '#000'
    }
});