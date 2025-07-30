

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

const GenderScreen = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleNext = () => {
    if (!selectedGender) {
      Alert.alert('Missing Info', 'Please select your gender');
      return;
    }

    console.log('Gender:', selectedGender);
    Alert.alert('Gender Saved', `You selected: ${selectedGender}`);
        navigation.navigate('HomeScreen');

  };

  const genders = ['Male', 'Female', 'Other'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>What's your Gender?</Text>

        <View style={styles.genderGroup}>
          {genders.map((gender) => (
            <TouchableOpacity
              key={gender}
              style={[
                styles.genderButton,
                selectedGender === gender && styles.genderButtonSelected,
              ]}
              onPress={() => setSelectedGender(gender)}
            >
              <Text
                style={[
                  styles.genderText,
                  selectedGender === gender && styles.genderTextSelected,
                ]}
              >
                {gender}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  genderGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  genderButton: {
    width: '28%',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  genderButtonSelected: {
    backgroundColor: '#000080',
    borderColor: '#000080',
  },
  genderText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  genderTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#000080',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default GenderScreen;
