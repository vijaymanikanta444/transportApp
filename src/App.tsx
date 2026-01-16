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

import { store, persistor } from './store';

import { getAuth } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';

import { useEffect } from 'react';

enableScreens();

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
          <RootNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
