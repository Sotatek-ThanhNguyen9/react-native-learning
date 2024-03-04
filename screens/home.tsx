import React, {useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '../styles/global';
import {useAppSelector, useAppDispatch} from '../store';
import {
  fetchMovies,
  selectMovies,
  selectLoading,
  selectError,
} from '../store/moviesSlice';

export default function HomeScreen({navigation}: any) {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovies);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const pageRef = useRef(1);

  useEffect(() => {
    dispatch(fetchMovies(pageRef.current));
  }, [dispatch]);

  const handleLoadMore = () => {
    pageRef.current += 1;
    dispatch(fetchMovies(pageRef.current));
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator /> : null;
  };

  if (loading === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={(globalStyles.screenView, styles.container)}>
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Details', {
                  movie: item,
                })
              }>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>

            <View style={styles.text}>
              <Text style={styles.title}>{item.title}</Text>
              <Text
                style={styles.description}
                numberOfLines={4}
                ellipsizeMode="tail">
                {item.overview}
              </Text>
            </View>
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    gap: 10,
    padding: 0,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  image: {
    width: 60,
    height: 90,
  },
  text: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  description: {
    textAlign: 'justify',
    flex: 1,
    flexWrap: 'wrap',
  },
});
