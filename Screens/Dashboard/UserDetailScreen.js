
import React, { useState } from 'react';
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

const UserDetailScreen = ({ route, navigation }) => {
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>User Details</Text>

        <View style={styles.card}>
          {Object.entries(editedUser).map(([key, value]) => (
            <View key={key} style={styles.detailRow}>
              <Text style={styles.label}>{formatKey(key)}:</Text>
              {editMode ? (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={text =>
                    setEditedUser(prev => ({ ...prev, [key]: text }))
                  }
                />
              ) : (
                <Text style={styles.value}>{value}</Text>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.editButton}
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
  safeArea: { flex: 1, backgroundColor: '#F6F8FA' },
  scrollContent: { padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: '#0A0A0A',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
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
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  label: {
    width: 120,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    flex: 1,
    color: '#555',
    fontSize: 15,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 15,
    paddingVertical: 4,
  },
  editButton: {
    marginTop: 20,
    backgroundColor: '#000080',
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
