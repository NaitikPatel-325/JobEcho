import VariableProximity from "@/Animation/VariableProximity/VariableProximity";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLogoutMutation, useGoogleSignInMutation } from "@/redux/slices/api";
import { Link, useNavigate } from "react-router-dom";
import {
  setCurrentWidth,
  updateCurrentUser,
  updateIsLoggedIn,
  updateLoginMethod,
} from "@/redux/slices/appSlice";
import Cookies from "js-cookie";
import { googleLogout, GoogleLogin } from "@react-oauth/google";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const containerRef = useRef(null);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const windowWidth = useSelector(
    (state: RootState) => state.appSlice.currentWidth
  );
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.appSlice.isLoggedIn
  );
  const currentUser = useSelector((state: RootState) => state.appSlice.user);
  const loginMethod = useSelector(
    (state: RootState) => state.appSlice.loginMethod
  );
  const [logoutMutation] = useLogoutMutation();
  const [loginWithGoogle] = useGoogleSignInMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => dispatch(setCurrentWidth(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      if (loginMethod === "google") googleLogout();
      else if (loginMethod === "github") console.log("Logged out from GitHub");
      dispatch(updateIsLoggedIn(false));
      dispatch(updateCurrentUser(null));
      Cookies.remove("token");
      setTimeout(() => dispatch(setCurrentWidth(window.innerWidth)), 0);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
      if (!user.collegeName || !user.collegeLocation || !user.graduationYear || !user.branch)
        navigate("/userdetails", { replace: true });
      else navigate("/home", { replace: true });
    } catch (error) {
      console.error("Google Login Failed:", error);
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 shadow-md z-50 bg-black">
      <div className="lg:px-16 px-4 flex flex-wrap items-center py-4 justify-between">
        <div ref={containerRef} className="flex items-center relative">
          <Link to="/" className="no-underline">
            <VariableProximity
              label="JobEcho"
              className="text-4xl text-white font-extrabold cursor-pointer"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={300}
              falloff="linear"
            />
          </Link>
        </div>

        <nav className="md:flex md:items-center md:w-auto w-full hidden md:block">
          <ul className="md:flex items-center justify-center text-base text-gray-600">
            <li>
              <a className="relative md:p-4 py-3 px-0 block transform transition-all duration-300 hover:scale-110 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full" href="/home">
                Home
              </a>
            </li>
          </ul>
          <ul className="md:flex items-center justify-center text-base text-gray-400">
              <li>
                <a href="/user-experience-form-1" className="relative md:p-4 py-3 px-0 block hover:text-white transition-all duration-300">
                  Share Experience
                </a>
              </li>
            <li>
              <a href="/CollegeCompanies" className="relative md:p-4 py-3 px-0 block hover:text-white transition-all duration-300">
                Interview Experiences
              </a>
            </li>
            <li>
              <a href="/Chat" className="relative md:p-4 py-3 px-0 block hover:text-white transition-all duration-300">
                 Live Chat 
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center">
          {windowWidth > 500 ? (
            <ul className="flex gap-4">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center">
                      <Avatar>
                        <AvatarImage src={currentUser?.picture || "/default-avatar.png"} alt="User Avatar" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-black">
                    <DropdownMenuItem className="text-white font-semibold">Hello, {currentUser?.name || "User"}!</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={() => console.error("Google Login Failed")} />
              )}
            </ul>
          ) : null}
        </div>
      </div>
    </header>
  );
}
