import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddToiletScreen from './screens/AddToiletScreen';
import ChooseFilter from './screens/ChooseFilterScreen';
import SigninWIthGoogle from './screens/SigninWIthGoogle';
import { store } from './redux/store'
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="ChooseFilter" component={ChooseFilter} />
            <Stack.Screen name="AddToilet" component={AddToiletScreen} />
            <Stack.Screen name="Signin" component={SigninWIthGoogle} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
