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


const Stack = createStackNavigator();

const App = () => {
  const [tabPressed, setTapPressed] = useState(true);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  React.useEffect(() => {
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
          <Stack.Screen name="Home" component = {HomeScreen}>
          </Stack.Screen>
          <Stack.Screen name="FolderScreen" component={FolderScreen}>
          </Stack.Screen>
          <Stack.Screen name = "WrongScreen" component={WrongScreen}>
          </Stack.Screen>
          <Stack.Screen name="ShortAnswerQuiz" component={ShortAnswerQuiz}>
          </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;