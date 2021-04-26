import React, {useEffect} from 'react';
import {PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {requestLocationWithPermission} from './location';

export default function App() {
  useEffect(() => {
    requestLocationWithPermission()
      .then(c => console.log(c))
      .catch(error => console.log(error.message));
  }, []);

  return (
    <View>
      <Text>Selam</Text>
    </View>
  );
}
