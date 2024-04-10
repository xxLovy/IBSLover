import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './screens/HomePage';
import AddToiletScreen from './screens/AddToiletScreen';
import ChooseFilter from './screens/ChooseFilter';

const Stack = createNativeStackNavigator();

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
