import React, {memo, useCallback, useEffect, useRef} from 'react';
import {
  NativeEventEmitter,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import MapsIndoors, {
  MapControl,
  MapView,
  MPMapConfig,
  MPPoint,
} from '@mapsindoors/react-native-maps-indoors-google-maps';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {MPPositionProviderInterface} from '@mapsindoors/react-native-maps-indoors-google-maps/src/core/MPPositionProviderInterface';

class PositionProvider extends MPPositionProviderInterface {
  constructor() {
    super();
    this.latestPosition = null;
    this.positionUpdateListeners = [];
  }
  addOnPositionUpdateListener(listener) {
    this.positionUpdateListeners.push(listener);
  }
  removeOnPositionUpdateListener(listener) {
    this.positionUpdateListeners.filter(item => item !== listener);
  }
  updatePosition() {
    this.latestPosition = {
      point: new MPPoint(50.054533, 19.958426),
      positionProvider: 'react-native-geolocation',
    };
    this.positionUpdateListeners.forEach(listener => {
      listener(this.latestPosition);
    });
  }
}

export const MapScreen = memo(() => {
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();
  const mcRef = useRef(null);
  const loadMapsIndoors = useCallback(async () => {
    await MapsIndoors.load('328f1a3a31ff41bca7f664d6').then(async () => {
      const mc = await MapControl.create(
        new MPMapConfig({useDefaultMapsIndoorsStyle: true}),
        NativeEventEmitter,
      );
      mcRef.current = mc;
      await mc.showUserPosition(true);
      await MapsIndoors.setPositionProvider(new PositionProvider());
    });
  }, []);

  useEffect(() => {
    loadMapsIndoors().catch(err => console.log(err));
  }, [loadMapsIndoors]);
  return (
    <GestureHandlerRootView style={{flex: 1, flexGrow: 1}}>
      <TouchableOpacity
        title={'Go Back'}
        onPress={() => navigation.goBack()}
        style={{zIndex: 1000, width: 100, height: 100, position: 'absolute'}}>
        <Text>Go Back</Text>
      </TouchableOpacity>
      <MapView style={{width, height: height - 20}} />
    </GestureHandlerRootView>
  );
});
