import React, {memo, useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {horizontalAnimation, defaultScreenOption} from './navigationProps';
import {MapScreen} from './MapScreen';
import {MPPositionProviderInterface} from '@mapsindoors/react-native-maps-indoors-google-maps/src/core/MPPositionProviderInterface';
import MapsIndoors, {
  MPPoint,
} from '@mapsindoors/react-native-maps-indoors-google-maps';
const Stack = createStackNavigator();

const screenNames = {
  home: 'Home',
  map: 'map',
};

const HomeScreen = memo(() => {
  const navigation = useNavigation();
  const goToMap = useCallback(() => {
    navigation.navigate(screenNames.map);
  }, [navigation]);
  return (
    <TouchableOpacity
      onPress={goToMap}
      style={{
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
      }}>
      <Text style={{fontSize: 20}}>go to map</Text>
    </TouchableOpacity>
  );
});
export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        ...defaultScreenOption,
        ...horizontalAnimation,
      }}
      initialRouteName={screenNames.home}>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
        name={screenNames.home}
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.map}
        component={MapScreen}
      />
    </Stack.Navigator>
  );
};
