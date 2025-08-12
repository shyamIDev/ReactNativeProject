import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { ThemeContext } from '../Screens/ThemeProvider';

const PostDetailScreen = ({ route }) => {
    const { theme } = useContext(ThemeContext);
    const { title, slug, category, publishedAt, image } = route.params;

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}>
            <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
                <Image source={{ uri: image }} style={styles.image} />
                <Text style={[styles.title, { color: theme.textColor }]}>{title}</Text>

                <View style={styles.metaBox}>
                    <Text style={[styles.metaLabel, { color: theme.textColor }]}>Slug:</Text>
                    <Text style={[styles.metaValue, { color: theme.secondaryTextColor }]}>{slug}</Text>
                </View>

                <View style={styles.metaBox}>
                    <Text style={[styles.metaLabel, { color: theme.textColor }]}>Category:</Text>
                    <Text style={[styles.metaValue, { color: theme.secondaryTextColor }]}>{category}</Text>
                </View>

                <View style={styles.metaBox}>
                    <Text style={[styles.metaLabel, { color: theme.textColor }]}>Published:</Text>
                    <Text style={[styles.metaValue, { color: theme.secondaryTextColor }]}>{publishedAt}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        padding: 16,
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
        marginBottom: 20,
    },
    metaBox: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    metaLabel: {
        fontWeight: '600',
        fontSize: 14,
        width: 90,
    },
    metaValue: {
        fontSize: 14,
        flexShrink: 1,
    },
});
