import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slice/loginSlice';
import adReducer from './slice/adSlice'; // path to your adSlice

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: loginReducer, // avoid using both if they're same
    ad: adReducer,       // newly added
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
