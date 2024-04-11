import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddToiletScreen from './screens/AddToiletScreen';
import ChooseFilter from './screens/ChooseFilterScreen';
import { store } from './redux/store'
import { Provider } from 'react-redux';
import HomeScreen_copy from './screens/HomeScreen_copy';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen_copy}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AddToilet" component={AddToiletScreen} />
          <Stack.Screen name="ChooseFilter" component={ChooseFilter} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
