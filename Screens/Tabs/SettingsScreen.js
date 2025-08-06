

import React from 'react';
import {
    View,
    Text,
    SectionList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('isLoggedIn');
            navigation.replace('Login');
        } catch (error) {
            Alert.alert('Logout Error', 'Failed to logout. Please try again.');
        }
    };

    const handlePress = (item) => {
        if (item.key === 'logout') {
            handleLogout();
        } else if (item.key === 'version') {
            Alert.alert('App Version', 'v1.0.0');
        } else if (item.key === 'Profile') {
            navigation.navigate('Profile');
        }
        else {
            Alert.alert(item.title, `Tapped on "${item.title}"`);
        }
    };

    const sections = [
        {
            title: 'Account',
            data: [
                { key: 'Profile', title: 'Profile' },
                { key: 'purchase', title: 'Purchase Premium' },

            ],
        },
        {
            title: 'Information',
            data: [
                { key: 'faq', title: 'FAQ' },
                { key: 'privacy', title: 'Privacy Policy' },
                { key: 'terms', title: 'Terms & Conditions' },
            ],
        },
        {
            title: 'Preferences',
            data: [
                { key: 'language', title: 'Language' },
                { key: 'darkmode', title: 'Dark Mode', isSwitch: true },
            ],
        },
        {
            title: 'App',
            data: [
                { key: 'rate', title: 'Rate Us' },
                { key: 'version', title: 'Version' },
            ],
        },
        {
            title: 'Login',
            data: [
                { key: 'logout', title: 'Logout' },
            ],
        }
    ];

    const renderItem = ({ item }) => {
        if (item.isSwitch) {
            return (
                <View style={styles.switchRow}>
                    <Text style={styles.itemText}>{item.title}</Text>
                    <Switch value={false} onValueChange={() => Alert.alert('Toggle pressed')} />
                </View>
            );
        }

        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => handlePress(item)}
            >
                <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    const renderSectionHeader = ({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
    );

    return (
        <View style={styles.container}>

            <SectionList
                sections={sections}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                contentContainerStyle={styles.list}

            />
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    list: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    item: {
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    },
});
