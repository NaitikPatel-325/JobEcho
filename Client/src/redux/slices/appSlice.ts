import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    loginMethod: null,
    isLoggedIn: false,
    currentWidth: window.innerWidth
  },
  reducers: {
    updateCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    updateIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    updateLoginMethod: (state, action) => { 
      state.loginMethod = action.payload;
    },
    setCurrentWidth: (state, action) => {  
      state.currentWidth = action.payload;
    }
  },
});

export const { updateCurrentUser, updateIsLoggedIn, setCurrentWidth, updateLoginMethod } = appSlice.actions;
export default appSlice.reducer;