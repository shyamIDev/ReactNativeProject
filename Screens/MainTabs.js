import React, { useContext } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Tabs/HomeScreen';
import APIScreen from '../API/APIScreen';
import MealsScreen from '../API/MealsScreen';
import SettingsScreen from './Tabs/SettingsScreen';
import { ThemeContext } from './ThemeProvider';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
    const { theme, isDarkMode } = useContext(ThemeContext);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: true,
                headerTitle: route.name,
                headerStyle: {
                    backgroundColor: isDarkMode ? '#121212' : '#f8f8f8',
                },
                headerTitleStyle: {
                    color: isDarkMode ? '#ffffff' : '#000000',
                    fontWeight: 'bold',
                    fontSize: 18,
                },
                headerTintColor: isDarkMode ? '#ffffff' : '#000000',
                tabBarIcon: ({ focused, size }) => {
                    let iconSource;

                    if (route.name === 'Dashboard') {
                        iconSource = require('../assets/icons/dashboard.png');
                    } else if (route.name === 'API') {
                        iconSource = require('../assets/icons/api.png');
                    } else if (route.name === 'SectionAPI') {
                        iconSource = require('../assets/icons/section.png');
                    } else if (route.name === 'Settings') {
                        iconSource = require('../assets/icons/settings.png');
                    }

                    return (
                        <Image
                            source={iconSource}
                            style={{
                                width: size,
                                height: size,
                                tintColor: focused
                                    ? (isDarkMode ? '#ffffff' : '#000080')
                                    : (isDarkMode ? '#aaa' : 'gray'),
                            }}
                            resizeMode="contain"
                        />
                    );
                },
                tabBarActiveTintColor: isDarkMode ? '#ffffff' : '#000080',
                tabBarInactiveTintColor: isDarkMode ? '#aaa' : 'gray',
                tabBarStyle: {
                    backgroundColor: isDarkMode ? '#121212' : '#fff',
                    borderTopColor: isDarkMode ? '#333' : '#ddd',
                },
            })}

        >
            <Tab.Screen
                name="Dashboard"
                component={HomeScreen}
                options={{ title: 'Dashboard' }}
            />
            <Tab.Screen
                name="API"
                component={APIScreen}
                options={{ title: 'API Data' }}
            />
            <Tab.Screen
                name="SectionAPI"
                component={MealsScreen}
                options={{ title: 'Meals API' }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: 'Settings' }}
            />
        </Tab.Navigator>
    );
};

export default MainTabs;
