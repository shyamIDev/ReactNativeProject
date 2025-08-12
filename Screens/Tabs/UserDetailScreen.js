
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../ThemeProvider';

const UserDetailScreen = ({ route }) => {
  const { theme, isDarkMode } = useContext(ThemeContext);
  const { user } = route.params;
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleUpdate = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      let users = storedUsers ? JSON.parse(storedUsers) : [];

      const updatedUsers = users.map(u => u.email === user.email ? editedUser : u);
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

      Alert.alert('Success', 'User updated successfully');
      setEditMode(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update user');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[
          styles.card,
          isDarkMode
            ? { backgroundColor: '#1e1e1e', borderColor: '#333' }
            : { backgroundColor: '#fff', borderColor: '#e0e0e0' }
        ]}>
          {Object.entries(editedUser).map(([key, value]) => (
            <View
              key={key}
              style={[
                styles.detailRow,
                { borderBottomColor: isDarkMode ? '#333' : '#eee' }
              ]}
            >
              <Text style={[styles.label, { color: theme.textColor }]}>
                {formatKey(key)}:
              </Text>
              {editMode ? (
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: theme.textColor,
                      borderColor: isDarkMode ? '#555' : '#ccc'
                    }
                  ]}
                  value={value}
                  onChangeText={text =>
                    setEditedUser(prev => ({ ...prev, [key]: text }))
                  }
                  placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
                />
              ) : (
                <Text style={[styles.value, { color: theme.textColor }]}>{value}</Text>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.editButton,
            { backgroundColor: isDarkMode ? theme.buttonColor || '#444' : '#000080' }
          ]}
          onPress={editMode ? handleUpdate : () => setEditMode(true)}
        >
          <Text style={styles.editButtonText}>
            {editMode ? 'Save Changes' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const formatKey = key => {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

export default UserDetailScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  label: {
    width: 120,
    fontWeight: '600',
  },
  value: {
    flex: 1,
    fontSize: 15,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    fontSize: 15,
    paddingVertical: 4,
  },
  editButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
