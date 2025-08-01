import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from 'react-native';

const PostDetailScreen = ({ route }) => {
    const { title, slug, category, publishedAt, image } = route.params;

    return (
        <SafeAreaView style={styles.safeArea}>
         
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={{ uri: image }} style={styles.image} />
                <Text style={styles.title}>{title}</Text>
                <View style={styles.metaBox}>
                    <Text style={styles.metaLabel}>Slug:</Text>
                    <Text style={styles.metaValue}>{slug}</Text>
                </View>
                <View style={styles.metaBox}>
                    <Text style={styles.metaLabel}>Category:</Text>
                    <Text style={styles.metaValue}>{category}</Text>
                </View>
                <View style={styles.metaBox}>
                    <Text style={styles.metaLabel}>Published:</Text>
                    <Text style={styles.metaValue}>{publishedAt}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    container: {
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    image: {
        width: '100%',
        height: 220,
        borderRadius: 12,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#222',
        marginBottom: 20,
    },
    metaBox: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    metaLabel: {
        fontWeight: '600',
        fontSize: 14,
        color: '#444',
        width: 90,
    },
    metaValue: {
        fontSize: 14,
        color: '#666',
        flexShrink: 1,
    },
});
