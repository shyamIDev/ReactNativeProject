import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = () => {
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
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <TouchableOpacity onPress={openGallery}>
                    <Image
                        source={{ uri: avatarUri }}
                        style={styles.avatar}
                    />
                </TouchableOpacity>
                <Text style={styles.name}>user</Text>
                <Text style={styles.email}>user@gmail.com</Text>
            </View>

            <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.listItem}>
                    {/* <View style={styles.iconWrapper}></View> */}
                    <Text style={styles.itemText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem}>
                    {/* <View style={styles.iconWrapper}></View> */}
                    <Text style={styles.itemText}>Older History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem}>
                    {/* <View style={styles.iconWrapper}></View> */}
                    <Text style={styles.itemText}>Notification</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    profileSection: {
        alignItems: 'center',
        backgroundColor: '#fff',
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
        borderColor: '#ccc',
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
    },
    email: {
        fontSize: 14,
        color: '#888',
    },
    sectionContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 8,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
    },
    iconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#E7F5EC',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    itemText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
});
