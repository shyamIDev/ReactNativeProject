
import React, { useState, useMemo } from 'react';
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
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pinNo, setPinNo] = useState('');
    const [education, setEducation] = useState('');

    const isPasswordMatch = useMemo(() => {
        return password === confirmPassword && password.length > 0;
    }, [password, confirmPassword]);

    const handleSignup = async () => {
        if (
            name === '' ||
            email === '' ||
            password === '' ||
            confirmPassword === '' ||
            address === '' ||
            mobileNo === '' ||
            state === '' ||
            city === '' ||
            pinNo === '' ||
            education === ''
        ) {
            Alert.alert('Error', 'Please fill all the fields');
            return;
        }

        if (!isPasswordMatch) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const storedUsers = await AsyncStorage.getItem('users');
            const users = storedUsers ? JSON.parse(storedUsers) : [];

            const userExists = users.find(user => user.email === email);
            if (userExists) {
                Alert.alert('Error', 'User already exists');
                return;
            }

            const newUser = {
                name,
                email,
                password,
                mobileNo,
                address,
                state,
                city,
                pinNo,
                education,
            };

            users.push(newUser);
            await AsyncStorage.setItem('users', JSON.stringify(users));

            Alert.alert('Success', 'Signup Successful');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>SignUp</Text>
                    </View>

                    <Text style={styles.subtitle}>Create your account</Text>

                    <View style={styles.formContainer}>
                        <TextInput
                            placeholder="Name"
                            style={[styles.input, styles.shadow]}
                            placeholderTextColor="grey"
                            value={name}
                            onChangeText={(text) => {
                                const onlyLetters = text.replace(/[^a-zA-Z\s]/g, '');
                                setName(onlyLetters);
                            }}
                        />
                        <TextInput
                            placeholder="Email"
                            style={[styles.input, styles.shadow]}
                            placeholderTextColor="grey"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={(text) => setEmail(text.toLowerCase())}
                        />
                        <TextInput
                            placeholder="Password"
                            style={[styles.input, styles.shadow]}
                            placeholderTextColor="grey"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TextInput
                            placeholder="Confirm Password"
                            style={[styles.input, styles.shadow]}
                            placeholderTextColor="grey"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TextInput
                            placeholder="Address"
                            style={[styles.input, styles.shadow]}
                            placeholderTextColor="grey"
                            value={address}
                            onChangeText={setAddress}
                        />
                        <TextInput
                            placeholder="Mobile No."
                            style={[styles.input, styles.shadow]}
                            placeholderTextColor="grey"
                            value={mobileNo}
                            onChangeText={(text) => {
                                const onlyNumbers = text.replace(/[^0-9]/g, '');
                                setMobileNo(onlyNumbers);
                            }}
                        />
                        <TextInput
                            placeholder="State"
                            style={[styles.input, styles.shadow]}
                            placeholderTextColor="grey"
                            value={state}
                            onChangeText={(text) => {
                                const onlyLetters = text.replace(/[^a-zA-Z\s]/g, '');
                                setState(onlyLetters);
                            }}
                        />
                        <TextInput
                            placeholder="City"
                            style={[styles.input, styles.shadow]}
                            placeholderTextColor="grey"
                            value={city}
                            onChangeText={(text) => {
                                const onlyLetters = text.replace(/[^a-zA-Z\s]/g, '');
                                setCity(onlyLetters);
                            }}
                        />
                        <TextInput
                            placeholder="Pin Number"
                            style={[styles.input, styles.shadow]}
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                            value={pinNo}
                            onChangeText={(text) => {
                                const onlyNumbers = text.replace(/[^0-9]/g, '');
                                setPinNo(onlyNumbers);
                            }}
                        />
                        <TextInput
                            placeholder="Education"
                            style={[styles.input, styles.shadow]}
                            placeholderTextColor="grey"
                            value={education}
                            onChangeText={(text) => {
                                const onlyLetters = text.replace(/[^a-zA-Z\s]/g, '');
                                setEducation(onlyLetters);
                            }}
                        />
                        <TouchableOpacity style={[styles.button, styles.shadow]} onPress={handleSignup}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.socialSection}>
                        <Text style={styles.orText}>- or sign in with -</Text>
                        <View style={styles.socialContainer}>
                            {[
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png',
                                'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png',
                                'https://e7.pngegg.com/pngimages/708/311/png-clipart-twitter-twitter-thumbnail.png',
                            ].map((uri, index) => (
                                <View key={index} style={[styles.iconWrapper, styles.shadow]}>
                                    <Image style={styles.socialIcon} source={{ uri }} />
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.footerLink}> Sign in</Text>
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
        justifyContent: 'center',
        paddingVertical: 20,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        marginTop: 50,
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
        marginBottom: 20,
    },
    formContainer: {
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 14,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#000080',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 50,
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

export default Signup;
