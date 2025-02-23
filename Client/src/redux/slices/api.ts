import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface userInfoType {
  username: string;
  email: string;
  picture?: string;
  collegeName: string;
  collegeLocation: string;
  graduationYear: number;
  branch: string;
}

interface googleSignInResponseType {
  token: string;
  user: userInfoType;
}

interface UserCollegeDetails {
  email: string;
  collegeName: string;
  collegeLocation: string;
  graduationYear: number;
  branch: string;
}

export interface loginCredentialsType {
  email: string;
  password: string;
}

export interface signupCredentialsType {
  username: string;
  email: string;
  password: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jobecho-iex4.onrender.com",
    credentials: "include",
  }),
  tagTypes: ["myCodes", "allCodes"],
  endpoints: (builder) => ({
    login: builder.mutation<userInfoType, loginCredentialsType>({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    signup: builder.mutation<userInfoType, signupCredentialsType>({
      query: (body) => ({
        url: "/user/signup",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    getUserDetails: builder.query<userInfoType, void>({
      query: () => ({
        url: "/user/user-details",
        cache: "no-store",
      }),
    }),
    googleSignIn: builder.mutation<googleSignInResponseType, { idToken: string }>({
      query: (body) => ({
        url: "/user/googleSignin",
        method: "POST",
        body,
      }),
    }),
    updateUserDetails: builder.mutation<{ success: boolean; message: string; data?: UserCollegeDetails }, UserCollegeDetails>({
      query: (body) => ({
        url: "/user/update-user-details",
        method: "PUT",
        body,
      }),
    }),    
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserDetailsQuery,
  useSignupMutation,
  useGoogleSignInMutation,
  useUpdateUserDetailsMutation
} = api;