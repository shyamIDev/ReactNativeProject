
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
} from 'react-native';

const APIScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState();
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchData(page);
    }, []);

    const fetchData = async (pageNum) => {
        const pageSize = 10; 
        try {
            if (pageNum === 1) setLoading(true);
            else setIsLoadingMore(true);

            const response = await fetch(`https://jsonplaceholder.org/posts?_page=${pageNum}&_limit=${pageSize}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const json = await response.json();

            if (json.length > 0) {
                setData((prevData) => [...prevData, ...json]);
                setPage(pageNum + 1);
                setHasMore(true);
            } else {
                setHasMore(false);
            }

            setError(null);
        } catch (err) {
            setError('Data not found or wrong URL');
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
        }
    };

    const loadMoreData = () => {
        if (!isLoadingMore && hasMore) {
            fetchData(page);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                navigation.navigate('PostDetail', {
                    title: item.title,
                    slug: item.slug,
                    category: item.category,
                    publishedAt: item.publishedAt,
                    image: item.image,
                });
            }}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="gray" />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => `${item.idMeal}-${index}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        isLoadingMore ? (
                            <ActivityIndicator size="small" color="gray" />
                        ) : null
                    }
                />
            )}
        </View>
    );
};

export default APIScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },

    card: {
        backgroundColor: '#f4f4f4',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    content: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    meta: {
        fontSize: 12,
        color: '#777',
        marginTop: 2,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});
