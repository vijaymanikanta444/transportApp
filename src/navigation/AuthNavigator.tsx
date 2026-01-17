import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens via the index.ts exports
import LoginScreen from '../screens/auth/LoginScreen';
import KeyboardWrapper from '../components/KeyboardWrapper';
import RegisterScreen from '../screens/auth/RegisterScreen';
// import OtpScreen from '../screens/auth/OtpScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <KeyboardWrapper>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        {/* <Stack.Screen name="Otp" component={OtpScreen} /> */}
      </Stack.Navigator>
    </KeyboardWrapper>
  );
};

export default AuthNavigator;
