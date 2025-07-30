
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const BirthdayScreen = ({ navigation }) => {
  const [birthday, setBirthday] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formatted = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getFullYear()}`;
    setBirthday(formatted);
    hideDatePicker();
  };

  const handleNext = () => {
    if (!birthday) {
      Alert.alert('Missing Info', 'Please select your birthday');
      return;
    }

    console.log('Birthday:', birthday);
    navigation.navigate('GenderScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>What's your Birthday?</Text>

        <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
          <Text style={styles.dateText}>
            {birthday ? birthday : 'Select your birthday'}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={new Date()}
        />

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
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 40,
  },
  dateText: {
    fontSize: 18,
    color: '#555',
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

export default BirthdayScreen;
