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
import UserDetailScreen from './Screens/Dashboard/UserDetailScreen';

import MainTabs from './Screens/MainTabs';
import PostDetailScreen from './Screens/API/PostDetailScreen';
import MealDetail from './Screens/API/MealDetail';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}>

        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp" component={Signup}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerificationScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="NameScreen"
          component={NameScreen}
           options={{ headerShown: true }}
        />
        <Stack.Screen
          name="BirthdayScreen"
          component={BirthdayScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="GenderScreen"
          component={GenderScreen}
           options={{ headerShown: true }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={MainTabs}
        />

        <Stack.Screen
          name="UserDetail"
          component={UserDetailScreen}
          options={{ headerShown: true, title: 'User Details' }}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetailScreen}
          options={{ headerShown: true }}
        />
           <Stack.Screen
            name="MealDetail"
             component={MealDetail}
             options={{ headerShown: true }}
              />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
