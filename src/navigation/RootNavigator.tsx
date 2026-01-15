import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import AuthNavigator from './AuthNavigator';

function TempScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>🚍 College Transport App</Text>
    </View>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      {/* <TempScreen /> */}
      <AuthNavigator />
    </NavigationContainer>
  );
}
