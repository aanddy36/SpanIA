import { createSlice } from "@reduxjs/toolkit";

interface State {
  isLoggedIn: boolean;
  isLoginPopupOpen: boolean;
  isSignupPopupOpen: boolean;
}

const initialState: State = {
  isLoggedIn: true,
  isLoginPopupOpen: false,
  isSignupPopupOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleLogin: (state, {payload})=>{
        state.isLoginPopupOpen = payload;
        state.isSignupPopupOpen = false;
    },
    toggleSignup: (state, {payload})=>{
        state.isSignupPopupOpen = payload;
        state.isLoginPopupOpen = false;
    },
  },
});
export const {toggleLogin, toggleSignup} = authSlice.actions

export default authSlice.reducer;
