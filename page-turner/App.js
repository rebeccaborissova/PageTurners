// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Home from './pages/Home'
import SortingAlgoChoice from './pages/SortingAlgoChoice'
import BookSearch from './pages/BookSearch'
import Swiping from './pages/Swiping'
import BookRecSummary from './pages/BookRecSummary'
import TimerResults from './pages/timerResults'
import ThankYou from './pages/ThankYou'


import { useFonts } from 'expo-font';

const Stack = createStackNavigator()

const App = () => {
  let [fontsLoaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'), 
    'Roboto-BlackItalic': require('./assets/fonts/Roboto-BlackItalic.ttf'), 
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'), 
    'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'), 
    'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'), 
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'), 
    'Roboto-LightItalic': require('./assets/fonts/Roboto-LightItalic.ttf'), 
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'), 
    'Roboto-MediumItalic': require('./assets/fonts/Roboto-MediumItalic.ttf'), 
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'), 
    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'), 
    'Roboto-ThinItalic': require('./assets/fonts/Roboto-ThinItalic.ttf'), 
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false // removes header globally for all screens
        }}
      > 
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BookSearch" component={BookSearch} />
        <Stack.Screen name="SortingAlgorithmChoice" component={SortingAlgoChoice} />
        <Stack.Screen name="Swiping" component={Swiping} />
        <Stack.Screen name="BookRecSummary" component={BookRecSummary} />
        <Stack.Screen name="TimerResults" component={TimerResults} />
        <Stack.Screen name="ThankYou" component={ThankYou} />
      
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
