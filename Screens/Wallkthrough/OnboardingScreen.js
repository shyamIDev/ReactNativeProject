

import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
} from 'react-native';
const { width } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        title: 'Fresh Food',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe8x6pu9QGy1ASwSGCEZnWk5CG4_YAcqFGeXnck0AdIlZjOTlOPdjFLaBdiJgm0wH1qCE&usqp=CAU' },
    },
    {
        id: '2',
        title: 'Fast Delivery',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: { uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/ce10c4119725607.60a3c8c45be0c.jpg' },
    },
    {
        id: '3',
        title: 'Easy Payment',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: { uri: 'https://www.netsolutions.com/wp-content/uploads/2024/12/easy-payment-options.webp' },

    },
];

const OnboardingScreen = ({ navigation }) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0]?.index || 0);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            handleGetStarted();
        }
    };

    const handleGetStarted = () => {
        console.log('Get Started Pressed');
        navigation.replace('Login');
    };

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>

            <FlatList
                ref={flatListRef}
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
            />

            <View style={styles.footer}>
                <View style={styles.dotsContainer}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>
                        {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
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
    header: {
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    slide: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        marginBottom: 35,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#222',
        marginBottom: 12,
        textAlign: 'center',
    },
    description: {
        fontSize: 15,
        textAlign: 'center',
        color: '#555',
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    footer: {
        paddingBottom: 40,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotsContainer: {
        flexDirection: 'row',
        marginBottom: 25,
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#bbb',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#000080',
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    nextButton: {
        backgroundColor: '#000080',
        paddingVertical: 14,
        paddingHorizontal: 50,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default OnboardingScreen;
