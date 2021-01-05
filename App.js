/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { AppNavigator } from "./src/navigation/appNavigator";
import { View, Text } from 'react-native';


const App= () => {
  return (
    <View style={{flex:1}}>
      <AppNavigator/>
      
    </View>
  );
};

export default App;
