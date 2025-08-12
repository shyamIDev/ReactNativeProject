
import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { ThemeContext } from '../ThemeProvider';

const ProfileScreen = () => {
    const { theme, isDarkMode } = useContext(ThemeContext);
    const [avatarUri, setAvatarUri] = useState('https://randomuser.me/api/portraits/men/1.jpg');

    const openGallery = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                Alert.alert('Error', response.errorMessage || 'Something went wrong');
            } else {
                const uri = response.assets?.[0]?.uri;
                if (uri) {
                    setAvatarUri(uri);
                }
            }
        });
    };

    return (
        <View style={[
            styles.container,
            { backgroundColor: isDarkMode ? '#000000' : '#F5F5F5' }
        ]}>
           
            <View
                style={[
                    styles.profileSection,
                    { backgroundColor: theme.cardBackground || (isDarkMode ? '#1E1E1E' : '#FFFFFF') }
                ]}
            >
                <TouchableOpacity onPress={openGallery}>
                    <Image
                        source={{ uri: avatarUri }}
                        style={[
                            styles.avatar,
                            { borderColor: isDarkMode ? '#555' : '#ddd' }
                        ]}
                    />
                </TouchableOpacity>
                <Text style={[styles.name, { color: theme.textColor }]}>user</Text>
                <Text style={[styles.email, { color: theme.textColor }]}>user@gmail.com</Text>
            </View>

            <View
                style={[
                    styles.sectionContainer,
                    { backgroundColor: theme.cardBackground || (isDarkMode ? '#1E1E1E' : '#FFFFFF') }
                ]}
            >
                <TouchableOpacity style={styles.listItem}>
                    <Text style={[styles.itemText, { color: theme.textColor }]}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem}>
                    <Text style={[styles.itemText, { color: theme.textColor }]}>Older History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.listItem, { borderBottomWidth: 0 }]}>
                    <Text style={[styles.itemText, { color: theme.textColor }]}>Notification</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 20,
        borderRadius: 12,
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 2,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
    },
    email: {
        fontSize: 14,
    },
    sectionContainer: {
        borderRadius: 12,
        paddingVertical: 8,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
    },
    itemText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
});
