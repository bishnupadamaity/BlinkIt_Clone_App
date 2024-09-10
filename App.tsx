import 'react-native-gesture-handler'
import React from 'react'
import Navigation from '@navigation/Navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'react-native'
import { enableScreens } from 'react-native-screens';

enableScreens(false);
const App = () => {
  return (
    <GestureHandlerRootView >
      {/* <StatusBar hidden={true} translucent={true} /> */}
      <Navigation />
    </GestureHandlerRootView>
  )
}

export default App