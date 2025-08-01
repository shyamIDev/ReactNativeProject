import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MealDetail = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.title}>{item.strMeal}</Text>
            <Text style={styles.text}>Meal ID: {item.idMeal}</Text>
        </View>
    );
};

export default MealDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#666',
    },
});
