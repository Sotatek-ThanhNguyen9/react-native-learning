/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {globalStyles} from '../../styles/global';

export default function DetailsScreen({route}: any) {
  const {movie} = route.params;

  return (
    <View style={globalStyles.screenView}>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.backdrop_path}`,
        }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`,
              }}
              style={styles.poster}
              resizeMode="cover"
            />
            <View style={styles.movieInformation}>
              <Text style={styles.title}>{movie.title}</Text>
              <View style={styles.group}>
                <Ionicons name={'time'} size={20} color={'#fff'} />
                <Text style={{color: '#fff'}}>2hrs 40mins</Text>
              </View>
              <View style={styles.group}>
                <Ionicons name={'heart'} size={20} color={'#fff'} />
                <Text style={{color: '#fff'}}>{movie.popularity}</Text>
              </View>
              <Text style={styles.group}>{movie.releaseDate}</Text>
            </View>
          </View>
          <Text style={styles.description}>
            {'\t'}
            {movie.overview}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    flex: 1,
  },
  header: {
    flex: 0,
    flexDirection: 'row',
    columnGap: 10,
    height: 'auto',
    marginBottom: 20,
  },
  movieInformation: {
    flex: 1,
    gap: 0,
  },
  group: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  poster: {
    width: 100,
    height: 150,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    color: '#fff',
  },
  description: {
    textAlign: 'justify',
    flex: 1,
    flexWrap: 'wrap',
    color: '#fff',
  },
});
