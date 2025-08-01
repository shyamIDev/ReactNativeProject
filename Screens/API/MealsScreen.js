import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    SectionList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Image,
} from 'react-native';

const MealsScreen = ({ navigation }) => {
    const [meals, setMeals] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [canadianRes, seafoodRes] = await Promise.all([
                    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian'),
                    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'),
                ]);

                const canadianJson = await canadianRes.json();
                const seafoodJson = await seafoodRes.json();

                const sections = [
                    { title: 'Canadian Meals', data: canadianJson.meals || [] },
                    { title: 'Seafood Meals', data: seafoodJson.meals || [] },
                ];

                setMeals(sections);
            } catch (error) {
                console.error('API fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleSelect = (itemId) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(itemId)
                ? prevSelected.filter(id => id !== itemId)
                : [...prevSelected, itemId]
        );
    };

    const renderItem = ({ item }) => {
        const isSelected = selectedItems.includes(item.idMeal);

        return (
            <TouchableOpacity
                onPress={() => {
                    toggleSelect(item.idMeal);
                    navigation.navigate('MealDetail', { item });
                }}
                style={[styles.itemContainer, isSelected && styles.itemSelected]}
            >
                <Image source={{ uri: item.strMealThumb }} style={styles.image} />
                <Text style={styles.itemText}>{item.strMeal}</Text>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#000080" />
            </View>
        );
    }

    return (
        <SectionList
            sections={meals}
            keyExtractor={(item) => item.idMeal}
            renderItem={renderItem}
            renderSectionHeader={({ section }) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
        />
    );
};

export default MealsScreen;

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#f4f4f4',
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 5,
        backgroundColor: '#fff',
    },
    itemSelected: {
        backgroundColor: '#cce5ff',
        borderColor: '#3399ff',
    },
    itemText: {
        marginLeft: 10,
        fontSize: 16,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
});
