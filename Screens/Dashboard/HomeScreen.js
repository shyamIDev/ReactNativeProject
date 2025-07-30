

import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const storedUsers = await AsyncStorage.getItem('users');
                const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
                setUsers(parsedUsers);
            } catch (error) {
                console.error('Failed to load users:', error);
            }
        };

        if (isFocused) {
            loadUsers();
        }
    }, [isFocused]);

    const handleLogout = () => {
        navigation.replace('Login');
    };

    const handleDelete = async (index) => {
        try {
            const updatedUsers = [...users];
            updatedUsers.splice(index, 1);
            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.userCard}>
            <TouchableOpacity
                onPress={() => navigation.navigate('UserDetail', { user: item, index })}
            >
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.emailText}>{item.email}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(index)}
            >
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Registered Users</Text>
                <FlatList
                    data={users}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: 10 }}
                />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 16,
    },
    logoutButton: {
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 6,
    },
    logoutText: {
        color: '#ffffff',
        fontWeight: '600',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    userCard: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 0.5,
        borderColor: '#e0e0e0',
    },
    deleteButton: {
        marginTop: 10,
        alignSelf: 'flex-end',
        backgroundColor: '#ff4d4d',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    deleteText: {
        color: '#fff',
        fontWeight: '600',
    },
    nameText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333333',
    },
    emailText: {
        fontSize: 15,
        color: '#666666',
        marginTop: 4,
    },
});
