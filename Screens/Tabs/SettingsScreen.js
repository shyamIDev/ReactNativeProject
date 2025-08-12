

import React, { useContext } from 'react';
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
import { ThemeContext } from '../ThemeProvider';

const SettingsScreen = ({ navigation }) => {
  const { isDarkMode, toggleTheme, theme } = useContext(ThemeContext);

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
    } else {
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
      data: [{ key: 'logout', title: 'Logout' }],
    },
  ];

  const renderItem = ({ item }) => {
    if (item.isSwitch) {
      return (
        <View style={styles.row}>
          <Text style={[styles.itemText, { color: theme.textColor }]}>{item.title}</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: '#ccc', true: '#4444ff' }}
            thumbColor={isDarkMode ? '#fff' : '#000'}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity style={styles.row} onPress={() => handlePress(item)}>
        <Text
          style={[
            styles.itemText,
            item.key === 'logout'
              ? { color: 'red', fontWeight: '600' }
              : { color: theme.textColor }
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };


  const renderSectionHeader = ({ section: { title } }) => (
    <View style={[styles.headerContainer, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.sectionHeader, { color: theme.textColor }]}>{title}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingBottom: 20,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    marginTop: 15,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 15,
  },
});
