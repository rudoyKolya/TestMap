import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {HomeStackNavigator} from './src/HomeStackNavigator';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
}

export default App;
