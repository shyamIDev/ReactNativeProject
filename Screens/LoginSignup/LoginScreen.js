
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Alert', 'Please enter all fields');
            return;
        }

        try {
            const usersJSON = await AsyncStorage.getItem('users');
            const users = usersJSON ? JSON.parse(usersJSON) : [];

            const foundUser = users.find(
                (user) => user.email === email && user.password === password
            );

            if (foundUser) {
                await AsyncStorage.setItem('loggedInUser', JSON.stringify(foundUser));
                Alert.alert('Success', 'Login successfully.', [
                    {
                        text: 'OK',
                        onPress: () => navigation.replace('HomeScreen'),
                    },
                ]);
            } else {
                Alert.alert('Error', 'Invalid credentials');
            }
        } catch (error) {
            Alert.alert('Error', 'Login failed');
            console.error('Login Error:', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Login</Text>
                    </View>
                    <Text style={styles.subtitle}>Login to your account</Text>
                    <View style={styles.formContainer}>
                        <TextInput
                            placeholder="Email"
                            style={[styles.input, styles.shadow]}
                            placeholderTextColor="grey"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            placeholder="Password"
                            style={[styles.input, styles.shadow]}
                            placeholderTextColor="grey"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity
                            style={[styles.button, styles.shadow]}
                            onPress={handleLogin}
                        >
                            <Text style={styles.buttonText}>Log in</Text>
                        </TouchableOpacity>

                        <View style={styles.forgotPasswordContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('OTPVerification')}>
                                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.socialSection}>
                        <Text style={styles.orText}>- or sign in with -</Text>
                        <View style={styles.socialContainer}>
                            {[
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png',
                                'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png',
                                'https://cdn.jim-nielsen.com/ios/512/twitter-2013-10-08.png?rf=1024',
                            ].map((uri, index) => (
                                <View key={index} style={[styles.iconWrapper, styles.shadow]}>
                                    <Image style={styles.socialIcon} source={{ uri }} />
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.footerLink}> Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    container: {
        paddingHorizontal: 20,
        flexGrow: 1,
        justifyContent: 'center',
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
        marginBottom: 10,
    },
    formContainer: {
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 14,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        marginBottom: 20,
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
        elevation: 4,
    },

    socialSection: {
        alignItems: 'center',
        marginTop: 40,
    },
    orText: {
        fontSize: 14,
        marginBottom: 15,
        color: 'black',
    },
    iconWrapper: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
    },
    socialIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginTop: 10,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#000080',
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
        marginLeft: 5,
    },
});

export default LoginScreen;
