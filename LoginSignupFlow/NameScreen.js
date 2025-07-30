

import React, { useState, useMemo } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';

const NameScreen = ({ navigation }) => {
    const [name, setName] = useState('');

    const isValidName = useMemo(() => {
        return name.trim().length > 1;
    }, [name]);

    const handleNext = () => {
        if (!isValidName) {
            Alert.alert('Error', 'Please enter a valid name');
            return;
        }

        navigation.navigate('BirthdayScreen', { userName: name });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Let's Get Started</Text>
                    <Text style={styles.subtitle}>What should we call you?</Text>
                </View>

                <TextInput
                    placeholder="Enter your name"
                    style={[styles.input, styles.shadow]}
                    placeholderTextColor="grey"
                    value={name}
                    onChangeText={setName}
                />

                <TouchableOpacity
                    style={[styles.button, styles.shadow]}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000080',
    },
    subtitle: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        marginTop: 10,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 14,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#000080',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    footerText: {
        color: 'black',
        fontSize: 14,
    },
    footerLink: {
        color: '#000080',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default NameScreen;
