// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginSignupFlow/LoginScreen';
import Signup from './LoginSignupFlow/Signup';
import OTPVerificationScreen from './LoginSignupFlow/OTPVerificationScreen';
import NameScreen from './LoginSignupFlow/NameScreen';
import BirthdayScreen from './LoginSignupFlow/BirthdayScreen';
import GenderScreen from './LoginSignupFlow/GenderScreen';
import OnboardingScreen from './LoginSignupFlow/OnboardingScreen';
import SplashScreen from './LoginSignupFlow/SplashScreen';
import HomeScreen from './LoginSignupFlow/HomeScreen';
import UserDetailScreen from './LoginSignupFlow/UserDetailScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name='SplashScreen'
          component={SplashScreen}
        />
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}

        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerificationScreen}
        />
        <Stack.Screen
          name="NameScreen"
          component={NameScreen}
        />
        <Stack.Screen
          name="BirthdayScreen"
          component={BirthdayScreen}
        />
        <Stack.Screen
          name="GenderScreen"
          component={GenderScreen}
        />
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetailScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
