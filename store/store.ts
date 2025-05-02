import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import loginSlice from "./slice/loginSlice";
export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: loginSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
