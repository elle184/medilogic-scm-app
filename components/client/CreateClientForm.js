import { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import Input from '../Input';

function CreateClientForm({submitButtonLabel}) {
    const [inputValues, setInputValues] = useState({
        name : ''
        , nit : ''
        , address : ''
        , contactName : ''
        , contactPhoneNumber : ''
        , contactEmailAddress : ''
    });

    function inputChangeHandler(inputIdentifier, inputValue) { 
        setInputValues((curInputValues) => {
            return {
                ...curInputValues
                , [inputIdentifier] : inputValue
            }
        }); 
    }

    async function submitHandler() {
        const clientData = {
            nombre : inputValues.name
            , nit : inputValues.nit
            , direccion : inputValues.address
            , nombre_contacto : inputValues.contactName
            , telefono_contacto : inputValues.contactPhoneNumber
            , email_contacto : inputValues.contactEmailAddress
        }

        const nameIsValid = inputValues.name.trim().length > 0;
        const nitIsValid = !isNaN(inputValues.nit) && inputValues.nit.trim().length > 0;
        const addressIsValid = inputValues.address.trim().length > 0;
        const contactNameIsValid = inputValues.contactName.trim().length > 0;
        const contactPhoneNumberIsValid = !isNaN(inputValues.contactPhoneNumber) && inputValues.contactPhoneNumber > 0;
        const contactEmailAddressIsValid = inputValues.contactEmailAddress.trim().length > 0;

        if (!nameIsValid || !nitIsValid || !addressIsValid || !contactNameIsValid
        || !contactPhoneNumberIsValid || !contactEmailAddressIsValid) {
            Alert.alert('Datos inválidos', 'Verifique la información del cliente.');
            return;
        } else {
            const responseGenerateToken = await fetch(
                'http://34.8.129.243/api/v1/users/generate-token'
                //'http://10.0.2.2:8001/api/v1/users/generate-token'
                , {
                    method : 'POST'
                    , headers : {'Content-Type' : 'application/json'}
                    , body : JSON.stringify({
<<<<<<< HEAD
                        email: "admin@medisupply.com",
                        password: "password123"})
=======
                        email: "ilario.goose@gustr.com",
                        password: "12345"})
>>>>>>> 383f646 (Se agrega el consumo del servicio de registro de cliente institucional.)
                }
            );
            const responseData = await responseGenerateToken.json();
            
            if (null !== responseData.access_token) {
<<<<<<< HEAD
                const responseCreateClient = await fetch(
                    //'http://10.0.2.2:8002/api/v1/clientes',
                    'http://34.8.129.243/api/v1/clientes',
=======
                console.log('Iniciando el registro del cliente...');
                console.log(JSON.stringify(clientData));
                const responseCreateClient = await fetch(
                    'http://10.0.2.2:8002/api/v1/clientes',
>>>>>>> 383f646 (Se agrega el consumo del servicio de registro de cliente institucional.)
                    {
                        method : 'POST',
                        headers : {
                            'Content-Type' : 'application/json'
<<<<<<< HEAD
                            , 'Authorization' : `Bearer ${responseData.access_token}`
=======
                            , 'Authorization' : `Bearer ${responseData.token}`
>>>>>>> 383f646 (Se agrega el consumo del servicio de registro de cliente institucional.)
                        }, 
                        body : JSON.stringify(clientData)
                    }
                );
<<<<<<< HEAD
                console.log(await responseCreateClient.json());
            }
            
=======
                console.log(responseCreateClient.json());
            }

>>>>>>> 383f646 (Se agrega el consumo del servicio de registro de cliente institucional.)
            Alert.alert('Cliente registrado', 'El cliente ha sido registrado en el sistema.');
        }
    }

    return (
        <View style={styles.formContainer}>
            <Input label='Nombre' 
                textInputConfig={
                    {
                        keyboardType : 'default'
                        , onChangeText : inputChangeHandler.bind(this, 'name')
                        , value : inputValues['name']
                    }
                } 
            />
            <Input label="NIT" textInputConfig={
                    {
                        keyboardType : 'numeric'
                        , onChangeText : inputChangeHandler.bind(this, 'nit')
                        , value : inputValues['nit']
                    }
                } 
            />
            <Input label="Dirección" textInputConfig={
                    {
                        keyboardType : 'default'
                        , onChangeText : inputChangeHandler.bind(this, 'address')
                        , value : inputValues['address']
                    }
                } 
            />
            <Input label="Nombre contacto" textInputConfig={
                    {
                        keyboardType : 'default'
                        , onChangeText : inputChangeHandler.bind(this, 'contactName')
                        , value : inputValues['contactName']
                    }
                }
            />
            <Input label="Teléfono contacto" textInputConfig={
                    {
                        keyboardType : 'numeric'
                        , onChangeText : inputChangeHandler.bind(this, 'contactPhoneNumber')
                        , value : inputValues['contactPhoneNumber']
                    }
                } 
            />
            <Input label="E-mail contacto" textInputConfig={
                    {
                        keyboardType : 'email-address'
                        , onChangeText : inputChangeHandler.bind(this, 'contactEmailAddress')
                        , value : inputValues['contactEmailAddress']
                    }
                } 
            />
            <Button title='Guardar'
                color='#70BBFD'
                onPress={submitHandler}
                label={submitButtonLabel}
            />
        </View>
    );
}

export default CreateClientForm;

const styles = StyleSheet.create({
    formContainer : {
        marginLeft : 20
        , marginRight : 20
    }
});