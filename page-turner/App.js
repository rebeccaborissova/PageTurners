// App.js
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'

import Home from './pages/Home'
import SortingAlgoChoice from './pages/SortingAlgoChoice'
import BookSearch from './pages/BookSearch'
import Swiping from './pages/Swiping'
import BookRecSummary from './pages/BookRecSummary'
import TimerResults from './pages/timerResults'

const Stack = createStackNavigator()

const App = () => {
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
      
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
