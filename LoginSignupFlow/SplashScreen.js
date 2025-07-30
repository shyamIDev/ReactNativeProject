

import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedInUser = await AsyncStorage.getItem('loggedInUser');

        setTimeout(() => {
          if (loggedInUser) {
            navigation.replace('HomeScreen');
          } else {
            navigation.replace('Login');
          }
        }, 500);
      } catch (error) {
        console.error('Error checking login status:', error);
        navigation.replace('Login');
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>My App</Text>
      <ActivityIndicator size="large" color="#007BFF" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20
  }
});
