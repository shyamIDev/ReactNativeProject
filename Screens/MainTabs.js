import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Dashboard/HomeScreen';
import APIScreen from './API/APIScreen';
import MealsScreen from './API/MealsScreen';
import SettingsScreen from './Dashboard/SettingsScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
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
                                tintColor: focused ? '#000080' : 'gray',
                            }}
                            resizeMode="contain"
                        />
                    );
                },
                tabBarActiveTintColor: '#000080',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Dashboard" component={HomeScreen} />
            <Tab.Screen name="API" component={APIScreen} />
            <Tab.Screen name="SectionAPI" component={MealsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
            
        </Tab.Navigator>
    );
};

export default MainTabs;
