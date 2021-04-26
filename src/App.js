import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Search} from './screens/Search';
import {Results} from './screens/Results';
import {PlaceDetail} from './screens/PlaceDetail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen
          name="PlaceDetail"
          component={PlaceDetail}
          options={({route}) => ({
            title: route.params.placeName,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
