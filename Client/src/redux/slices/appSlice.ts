import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface College {
  name: string | null;
  companies: string[];
}

interface AppState {
  user: any;
  loginMethod: string | null;
  isLoggedIn: boolean;
  currentWidth: number;
  college: College;
}

const initialState: AppState = {
  user: null,
  loginMethod: null,
  isLoggedIn: false,
  currentWidth: window.innerWidth,
  college: {
    name: null,
    companies: [],
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateCurrentUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    updateIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    updateLoginMethod: (state, action: PayloadAction<string | null>) => {
      state.loginMethod = action.payload;
    },
    setCurrentWidth: (state, action: PayloadAction<number>) => {
      state.currentWidth = action.payload;
    },
    setCollege: (state, action: PayloadAction<string>) => {
      state.college = {
        ...state.college,
        name: action.payload,
        companies: state.college.companies || [],
      };
    },
    setCompanies: (state, action: PayloadAction<string[]>) => {
      state.college = {
        ...state.college,
        companies: action.payload || [],
      };
    },
    addCompany: (state, action: PayloadAction<string>) => {
      if (!state.college.companies) {
        state.college.companies = [];
      }
      state.college.companies.push(action.payload);
    },
  },
});

export const { updateCurrentUser, updateIsLoggedIn, setCurrentWidth, updateLoginMethod, setCollege, setCompanies, addCompany } = appSlice.actions;
export default appSlice.reducer;