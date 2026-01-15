import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/common/SplashScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }} // Hide headers globally
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
