import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import loginReducer from './slice/loginSlice';
import adReducer from './slice/adSlice'; // path to your adSlice

// Combine all reducers
const rootReducer = combineReducers({
  user: loginReducer, // ✅ use only one key for login slice
  ad: adReducer,
});

// Redux Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'], // persist only user data
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// Persistor to be used in App.tsx
export const persistor = persistStore(store);

// Type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
