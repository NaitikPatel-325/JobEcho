import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useLocation } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { useGetUserDetailsQuery } from "./redux/slices/api";
import { useEffect } from "react";
import { updateCurrentUser, updateIsLoggedIn } from "./redux/slices/appSlice";
import { ToastProvider } from "./components/ui/toast";

function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { data, isSuccess } = useGetUserDetailsQuery();


  useEffect(() => {
    if (isSuccess && data) {
      dispatch(updateCurrentUser(data));
      dispatch(updateIsLoggedIn(true));
    }


  }, [data, isSuccess, dispatch]);



  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
      <ToastProvider>
        {location.pathname !== "/" &&
          location.pathname !== "/user-experience-form-1" && <Header />}
        <AllRoutes />
      </ToastProvider>
    </GoogleOAuthProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;