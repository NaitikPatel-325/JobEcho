// import { GoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import Cookies from "js-cookie";
// import {
//   updateCurrentUser,
//   updateIsLoggedIn,
//   updateLoginMethod,
// } from "./redux/slices/appSlice";
// import { useGoogleSignInMutation } from "./redux/slices/api";

// const Signup = () => {
//   const dispatch = useDispatch();
//   const [loginWithGoogle] = useGoogleSignInMutation();

//   const navigate = useNavigate();

//   const handleGoogleLoginSuccess = async (credentialResponse: any) => {
//     try {
//       const { credential } = credentialResponse;
//       const data = await loginWithGoogle({ idToken: credential }).unwrap();

//       console.log("Google Login Response:", data);
//       const { token, user } = data;

//       Cookies.set("token", token, { expires: 7 });

//       dispatch(updateCurrentUser(user));
//       dispatch(updateIsLoggedIn(true));
//       dispatch(updateLoginMethod("google"));

//       if (
//         !user.collegeName ||
//         !user.collegeLocation ||
//         !user.graduationYear ||
//         !user.branch
//       )
//         navigate("/userdetails", { replace: true });
//       else navigate("/home", { replace: true });
//     } catch (error) {
//       console.error("Google Login Failed:", error);
//     }
//   };

//   return (
//     <div className="__signup grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col">
//       <div className="__form_controlle border-[1px] py-8 px-4 flex flex-col gap-5 w-[300px]">
//         <h1 className="font-mono text-4xl font-bold text-center">Signup</h1>
//         {/* <p className="font-mono text-xs text-center">
//           Join the community of expert frontend developers 👨‍💻
//         </p> */}
//         <GoogleLogin
//           onSuccess={handleGoogleLoginSuccess}
//           onError={() => console.error("Google Login Failed")}
//         />
//       </div>
//     </div>
//   );
// };

// export default Signup;

import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {
  updateCurrentUser,
  updateIsLoggedIn,
  updateLoginMethod,
} from "./redux/slices/appSlice";
import { useGoogleSignInMutation } from "./redux/slices/api";

const Signup = () => {
  const dispatch = useDispatch();
  const [loginWithGoogle] = useGoogleSignInMutation();

  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      const { credential } = credentialResponse;
      const data = await loginWithGoogle({ idToken: credential }).unwrap();

      console.log("Google Login Response:", data);
      const { token, user } = data;

      Cookies.set("token", token, { expires: 7 });

      dispatch(updateCurrentUser(user));
      dispatch(updateIsLoggedIn(true));
      dispatch(updateLoginMethod("google"));

      if (
        !user.collegeName ||
        !user.collegeLocation ||
        !user.graduationYear ||
        !user.branch
      )
        navigate("/userdetails", { replace: true });
      else navigate("/home", { replace: true });
    } catch (error) {
      console.error("Google Login Failed:", error);
    }
  };

  return (
    <div className="__signup grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col">
      <div className="__form_controlle border-[1px] py-8 px-4 flex flex-col gap-5 w-[300px]">
        <h1 className="font-mono text-4xl font-bold text-center">Signup</h1>
        {/* <p className="font-mono text-xs text-center">
          Join the community of expert frontend developers 👨‍💻
        </p> */}
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => console.error("Google Login Failed")}
        />
      </div>
    </div>
  );
};

export default Signup;
