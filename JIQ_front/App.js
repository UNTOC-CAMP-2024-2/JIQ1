import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import WrongNote from './screens/WrongAsw';

const Stack = createStackNavigator();

const App = () => {
  const [tabPressed, setTapPressed] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{ animationEnabled: false, gestureEnabled:false }}>
        {tabPressed ? (
          <Stack.Screen name="Home">
            {props => (
              <HomeScreen {...props} tabPressed={tabPressed} setTapPressed={setTapPressed} />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="WrongNote">
            {props => (
              <WrongNote {...props} tabPressed={tabPressed} setTapPressed={setTapPressed} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;