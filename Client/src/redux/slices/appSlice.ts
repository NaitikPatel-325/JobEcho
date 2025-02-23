import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface College {
  name: string | null;
  companies: string[];
  company_id: string[];
}

interface ICollegeType{
  collegeName: string;
  location: string;
  briefDescription?: string;
  websiteUrl?: string;
  contactInformation: string;
  companies: string;
  createdAt: Date;
  updatedAt: Date;
}


interface AppState {
  user: any;
  loginMethod: string | null;
  isLoggedIn: boolean;
  currentWidth: number;
  college: College;
  currentCollege: ICollegeType;
}

const initialState: AppState = {
  user: null,
  loginMethod: null,
  isLoggedIn: false,
  currentWidth: window.innerWidth,
  college: {
    name: null,
    companies: [],
    company_id: [],
  },
  currentCollege: {
    collegeName: "",
    location: "",
    briefDescription: "",
    websiteUrl: "",
    contactInformation: "",
    companies: "",
    createdAt: new Date(),
    updatedAt: new Date(),
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
    updateCurrentCollege: (state, action: PayloadAction<any>) => {
      state.currentCollege = action.payload;
    },
    setCollege: (state, action: PayloadAction<string>) => {
      state.college = {
        ...state.college,
        name: action.payload,
        companies: state.college.companies || [],
        company_id: state.college.company_id || [],
      };
    },
    setCompanies: (
      state,
      action: PayloadAction<{ companyNames: string[]; companyIds: string[] }>
    ) => {
      state.college = {
        ...state.college,
        companies: action.payload.companyNames || [],
        company_id: action.payload.companyIds || [],
      };
    },
    addCompany: (
      state,
      action: PayloadAction<{ companyName: string; companyId: string }>
    ) => {
      if (!state.college.companies) state.college.companies = [];
      if (!state.college.company_id) state.college.company_id = [];

      state.college.companies.push(action.payload.companyName);
      state.college.company_id.push(action.payload.companyId);
    },
  },
});

export const { updateCurrentUser, updateIsLoggedIn, setCurrentWidth, updateLoginMethod, setCollege, setCompanies, addCompany,updateCurrentCollege } = appSlice.actions;
export default appSlice.reducer;
