/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor, useAppSelector } from './store';

import { getAuth } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';

import { useEffect } from 'react';

enableScreens();

// Redux State Logger Component
function ReduxLogger() {
  const auth = useAppSelector(state => state.auth);

  useEffect(() => {
    console.log('📊 Redux Auth State:', JSON.stringify(auth, null, 2));
  }, [auth]);

  return null;
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const auth = getAuth(getApp());
    const user = auth.currentUser;
    console.log('🔥 Firebase connected. Current user:', user);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <ReduxLogger />
          <RootNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
