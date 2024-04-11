import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddToiletScreen from './screens/AddToiletScreen';
import ChooseFilter from './screens/ChooseFilterScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AddToilet" component={AddToiletScreen} />
        <Stack.Screen name="ChooseFilter" component={ChooseFilter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
