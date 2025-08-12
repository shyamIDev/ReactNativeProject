import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ThemeContext } from '../Screens/ThemeProvider';

const MealDetail = ({ route }) => {
    const { item } = route.params;
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={[styles.title, { color: theme.textColor }]}>{item.strMeal}</Text>
            <Text style={[styles.text, { color: theme.subTextColor || '#666' }]}>
                Meal ID: {item.idMeal}
            </Text>
        </View>
    );
};

export default MealDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
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
    },
});
