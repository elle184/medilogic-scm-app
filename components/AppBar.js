import { View, Text, StyleSheet } from 'react-native';

function AppBar({ title }) {
    return (
        <View style={styles.appBar} testID="appbar">
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

export default AppBar;

const styles = StyleSheet.create({
    appBar: {
        backgroundColor: '#70BBFD',
        padding: 15,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});
