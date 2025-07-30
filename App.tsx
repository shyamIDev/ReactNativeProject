// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginSignup/LoginScreen';
import Signup from './Screens/LoginSignup/Signup';
import OTPVerificationScreen from './Screens/ForgotPassword/OTPVerificationScreen';
import NameScreen from './Screens/Onbording/NameScreen';
import BirthdayScreen from './Screens/Onbording/BirthdayScreen';
import GenderScreen from './Screens/Onbording/GenderScreen';
import OnboardingScreen from './Screens/Wallkthrough/OnboardingScreen';
import SplashScreen from './Screens/Splash/SplashScreen';
import HomeScreen from './Screens/Dashboard/HomeScreen';
import UserDetailScreen from './Screens/Dashboard/UserDetailScreen';


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
