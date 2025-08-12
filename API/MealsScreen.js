import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    SectionList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Image,
} from 'react-native';
import { ThemeContext } from '../Screens/ThemeProvider';

const PAGE_SIZE = 10;

const MealsScreen = ({ navigation }) => {
    const [allMeals, setAllMeals] = useState([]);
    const [meals, setMeals] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [canadianRes, seafoodRes] = await Promise.all([
                    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian'),
                    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'),
                ]);

                const canadianJson = await canadianRes.json();
                const seafoodJson = await seafoodRes.json();

                const fullData = [
                    { title: 'Canadian Meals', data: canadianJson.meals || [] },
                    { title: 'Seafood Meals', data: seafoodJson.meals || [] },
                ];

                setAllMeals(fullData);

                setMeals([
                    {
                        title: 'Canadian Meals',
                        data: (canadianJson.meals || []).slice(0, PAGE_SIZE),
                    },
                    {
                        title: 'Seafood Meals',
                        data: (seafoodJson.meals || []).slice(0, PAGE_SIZE),
                    },
                ]);
            } catch (error) {
                console.error('API fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const loadMoreData = () => {
        const newMeals = allMeals.map((section, index) => {
            const currentLength = meals[index]?.data?.length || 0;
            const moreData = section.data.slice(currentLength, currentLength + PAGE_SIZE);

            return {
                title: section.title,
                data: [...(meals[index]?.data || []), ...moreData],
            };
        });

        setMeals(newMeals);
    };

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
                style={[
                    styles.itemContainer,
                    { backgroundColor: theme.backgroundColor, borderColor: '#ccc' },
                    isSelected && { backgroundColor: '#cce5ff', borderColor: '#3399ff' }
                ]}
            >
                <Image source={{ uri: item.strMealThumb }} style={styles.image} />
                <Text style={[styles.itemText, { color: theme.textColor }]}>
                    {item.strMeal}
                </Text>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <View style={[styles.centered, { backgroundColor: theme.backgroundColor }]}>
                <ActivityIndicator size="large" color={theme.textColor} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
            <SectionList
                sections={meals}
                keyExtractor={(item) => item.idMeal}
                renderItem={renderItem}
                renderSectionHeader={({ section }) => (
                    <Text style={[styles.sectionHeader, { backgroundColor: theme.backgroundColor, color: theme.textColor }]}>
                        {section.title}
                    </Text>
                )}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={<ActivityIndicator size="small" color={theme.textColor} />}
            />
        </View>
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
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 5,
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
