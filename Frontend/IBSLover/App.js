import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './pages/HomePage';
import AddToiletScreen from './pages/AddToiletScreen';
import ChooseFilter from './pages/ChooseFilter';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AddToilet" component={AddToiletScreen} />
        <Stack.Screen name="ChooseFilter" component={ChooseFilter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
