import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useLocation } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { useGetCollegeDatailsQuery, useGetUserDetailsQuery } from "./redux/slices/api";
import { useEffect } from "react";
import { setCollege, updateCurrentCollege, updateCurrentUser, updateIsLoggedIn } from "./redux/slices/appSlice";

function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { data, isSuccess } = useGetUserDetailsQuery();
  const { data: collegeData, isSuccess: isCollegeSuccess } = useGetCollegeDatailsQuery();


  useEffect(() => {
    if (isSuccess && data) {
      dispatch(updateCurrentUser(data));
      dispatch(updateIsLoggedIn(true));
    }

    if (isCollegeSuccess && collegeData) {
      dispatch(updateCurrentCollege(collegeData));
    }

  }, [data, isSuccess, dispatch]);



  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
      {location.pathname !== "/" &&
        location.pathname !== "/user-experience-form-1" && <Header />}

      <AllRoutes />
    </GoogleOAuthProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;
