import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userData: any;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  userData: null,
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    InitializeUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
    },
    LogoutUser: (state) => {
      state.userData = null;
      state.isLoggedIn = false;
    },
  },
});

export const { InitializeUserData, LogoutUser } = loginSlice.actions;
export default loginSlice.reducer;
