import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // REQUIRED for redux-persist
    }),
  devTools: {
    trace: true,
    traceLimit: 25,
    maxAge: 50,
  },
});

export const persistor = persistStore(store);

// Export hooks and types
export * from './hooks';
export * from './types';

// Export all auth-related actions, selectors, and types
export * from './slices/auth';
