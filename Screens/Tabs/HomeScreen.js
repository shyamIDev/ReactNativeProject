

import React, { useEffect, useState, useContext } from 'react';
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
import { ThemeContext } from '../ThemeProvider';

const HomeScreen = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const isFocused = useIsFocused();
    const { theme, isDarkMode } = useContext(ThemeContext);

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
        <View
            style={[
                styles.userCard,
                isDarkMode
                    ? { backgroundColor: '#1e1e1e', borderColor: '#333' } // Dark mode card
                    : { backgroundColor: '#fff', borderColor: '#e0e0e0' }  // Light mode card stays same white with shadow
            ]}
        >
            <TouchableOpacity
                onPress={() => navigation.navigate('UserDetail', { user: item, index })}
            >
                <Text
                    style={[
                        styles.nameText,
                        { color: theme.textColor }
                    ]}
                >
                    {item.name}
                </Text>
                <Text
                    style={[
                        styles.emailText,
                        { color: isDarkMode ? '#ccc' : '#666' }
                    ]}
                >
                    {item.email}
                </Text>
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
        <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.content}>
                {users.length === 0 ? (
                    <Text style={[styles.emptyText, { color: theme.secondaryTextColor }]}>
                        No users found.
                    </Text>
                ) : (
                    <FlatList
                        data={users}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingVertical: 10 }}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    userCard: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 0.5,
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
    },
    emailText: {
        fontSize: 15,
        marginTop: 4,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 40,
    },
});
