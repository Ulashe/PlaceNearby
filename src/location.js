import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const requestLocationWithPermission = () =>
  new Promise(async (resolve, reject) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        Geolocation.getCurrentPosition(
          coordinates => resolve(coordinates),
          error => reject({code: error.code, message: error.message}),
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      } else {
        reject({code: 1, message: 'Location permission denied'});
      }
    } catch (err) {
      console.warn(err);
    }
  });
