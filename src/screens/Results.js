import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {requestLocationWithPermission} from '../location';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';

export function Results() {
  const navigation = useNavigation();
  const route = useRoute();
  const [userCoords, setUserCoords] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    requestLocationWithPermission()
      .then(c => {
        setUserCoords(c.coords);
        return axios.get(
          `
          https://petmore.herokuapp.com/place-nearby?language=tr_TR&radius=20000&location=${c.coords.latitude},${c.coords.longitude}&keyword=""`,
          {
            headers: {
              Authorization: 'anonymous123',
            },
          },
        );
      })
      .then(res => {
        setPlaces(res.data.response.placeNearby.results);
      })
      .catch(error => console.log(error.message));
  }, []);

  if (userCoords) {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: userCoords.latitude,
            longitude: userCoords.longitude,
            latitudeDelta: 0.12,
            longitudeDelta: 0.07,
          }}>
          {places &&
            places.map(place => (
              <Marker
                key={place.placeId}
                coordinate={{
                  latitude: Number(place.placeLocation.split(',')[0]),
                  longitude: Number(place.placeLocation.split(',')[1]),
                }}
                title={place.placeName}
              />
            ))}
        </MapView>
        {places && (
          <View style={styles.listContainer}>
            <FlatList
              data={places}
              keyExtractor={p => p.placeId}
              renderItem={renderItem}
            />
          </View>
        )}
      </View>
    );
  } else {
    return <></>;
  }

  function renderItem({item}) {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('PlaceDetail', {
            placeId: item.placeId,
            placeName: item.placeName,
          })
        }>
        <Text style={styles.itemTitle}>İsim: {item.placeName}</Text>
        <View>
          <Text>Puan: {Number(item.placeRating).toFixed(1)}</Text>
          <Text
            style={{
              backgroundColor: item.isOpen ? 'green' : 'red',
              borderRadius: 25,
              color: 'white',
              textAlign: 'center',
              paddingVertical: 2,
              marginTop: 3,
            }}>
            {item.isOpen ? 'Açık' : 'Kapalı'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: 200,
  },
  listContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  itemContainer: {
    width: '100%',
    backgroundColor: 'darkseagreen',
    marginVertical: 10,
    borderRadius: 25,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    width: '80%',
  },
});
