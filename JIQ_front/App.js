import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import FolderScreen from './screens/FolderScreen';
import ShortAnswerQuiz from './screens/ShortAnswerQuiz';
import LogoAnimation from './screens/LogoAnimation';
import WrongScreen from './screens/WrongScreen';

import * as ScreenOrientation from 'expo-screen-orientation';


const Stack = createStackNavigator();

const App = () => {
  const [tabPressed, setTapPressed] = useState(true);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  React.useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };
    lockOrientation();

    const timer = setTimeout(() => setIsSplashVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return <LogoAnimation />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{ animationEnabled: false, gestureEnabled:false }}>
          <Stack.Screen name="Home" component = {HomeScreen} options = {{headerShown: false}}>
          </Stack.Screen>
          <Stack.Screen name="FolderScreen" component={FolderScreen} options={{headerShown: false}}>
          </Stack.Screen>
          <Stack.Screen name = "WrongScreen" component={WrongScreen} options={{headerShown: false}}>
          </Stack.Screen>
          <Stack.Screen name="ShortAnswerQuiz" component={ShortAnswerQuiz} options={{headerShown: false}}>
          </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;