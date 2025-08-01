
import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [enteredOtp, setEnteredOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState('email');

    const generateOTP = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    };

    const handleCheckEmail = async () => {
        if (email.trim() === '') {
            Alert.alert('Error', 'Please enter your email');
            return;
        }

        const storedUsers = await AsyncStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        const matchedUser = users.find(user => user.email === email.toLowerCase());

        if (matchedUser) {
            const otpCode = generateOTP();
            setOtp(otpCode);
            await AsyncStorage.setItem('reset_otp', JSON.stringify({ email, otp: otpCode }));
            Alert.alert('OTP Sent', `Use OTP: ${otpCode}`);
            setStep('otp');
        } else {
            Alert.alert('Error', 'Email not found');
        }
    };

    const handleVerifyOtp = async () => {
        const storedOtpData = await AsyncStorage.getItem('reset_otp');
        if (!storedOtpData) {
            Alert.alert('Error', 'OTP session expired. Try again.');
            setStep('email');
            return;
        }

        const { email: storedEmail, otp: storedOtp } = JSON.parse(storedOtpData);
        if (email.toLowerCase() === storedEmail.toLowerCase() && enteredOtp === storedOtp) {
            setStep('password');
        } else {
            Alert.alert('Error', 'Invalid OTP');
        }
    };

    const handleUpdatePassword = async () => {
        if (newPassword === '' || confirmPassword === '') {
            Alert.alert('Error', 'Please enter and confirm the new password');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const storedUsers = await AsyncStorage.getItem('users');
            let users = storedUsers ? JSON.parse(storedUsers) : [];

            users = users.map(user =>
                user.email === email.toLowerCase() ? { ...user, password: newPassword } : user
            );

            await AsyncStorage.setItem('users', JSON.stringify(users));
            await AsyncStorage.removeItem('reset_otp');

            Alert.alert('Success', 'Password updated successfully', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Forgot Password</Text>

                {step === 'email' && (
                    <>
                        <Text style={styles.subtitle}>Enter your registered email</Text>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="grey"
                            style={[styles.input, styles.shadow]}
                            value={email}
                            onChangeText={text => setEmail(text.toLowerCase())}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TouchableOpacity style={[styles.button, styles.shadow]} onPress={handleCheckEmail}>
                            <Text style={styles.buttonText}>Send OTP</Text>
                        </TouchableOpacity>
                    </>
                )}

                {step === 'otp' && (
                    <>
                        <Text style={styles.subtitle}>Enter the OTP sent to your email</Text>
                        <TextInput
                            placeholder="Enter OTP"
                            placeholderTextColor="grey"
                            style={[styles.input, styles.shadow]}
                            keyboardType="numeric"
                            value={enteredOtp}
                            onChangeText={setEnteredOtp}
                            maxLength={6}
                        />
                        <TouchableOpacity style={[styles.button, styles.shadow]} onPress={handleVerifyOtp}>
                            <Text style={styles.buttonText}>Verify OTP</Text>
                        </TouchableOpacity>
                    </>
                )}

                {step === 'password' && (
                    <>
                        <Text style={styles.subtitle}>Update your password</Text>
                        <TextInput
                            placeholder="New Password"
                            placeholderTextColor="grey"
                            style={[styles.input, styles.shadow]}
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor="grey"
                            style={[styles.input, styles.shadow]}
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity style={[styles.button, styles.shadow]} onPress={handleUpdatePassword}>
                            <Text style={styles.buttonText}>Update Password</Text>
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 20,
        justifyContent: 'center',
        flexGrow: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000080',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: 'black',
        marginBottom: 10,
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
        elevation: 4,
    },
});
