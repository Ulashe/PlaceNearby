import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {requestLocationWithPermission} from './location';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function Home() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default function App() {
//   const [coordinates, setCoordinates] = useState(null);

//   useEffect(() => {
//     requestLocationWithPermission()
//       .then(c => setCoordinates(c.coords))
//       .catch(error => console.log(error.message));
//   }, []);

//   if (coordinates) {
//     return (
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={{flex: 1}}
//         initialRegion={{
//           latitude: coordinates.latitude,
//           longitude: coordinates.longitude,
//           latitudeDelta: 0.09,
//           longitudeDelta: 0.03,
//         }}
//       />
//     );
//   } else {
//     return <></>;
//   }
// }
