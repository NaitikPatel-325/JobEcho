import ShinyText from "../Animation/ShinyText/ShinyText";
import VariableProximity from "@/Animation/VariableProximity/VariableProximity";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLogoutMutation } from "@/redux/slices/api";
import { Link, useNavigate } from "react-router-dom";
import {
  setCurrentWidth,
  updateCurrentUser,
  updateIsLoggedIn,
} from "@/redux/slices/appSlice";
import Cookies from "js-cookie";
import { googleLogout } from "@react-oauth/google";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

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
  const [logoutMutation] = useLogoutMutation();
  const loginMethod = useSelector(
    (state: RootState) => state.appSlice.loginMethod
  );
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

  return (
    <header className="w-full fixed top-0 left-0 shadow-md z-50 bg-black">
      <div className="lg:px-16 px-4 flex flex-wrap items-center py-4 justify-between">
        {/* Logo */}
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

        {/* Navigation Links */}
        <nav className="md:flex md:items-center md:w-auto w-full hidden md:block">
        <ul className="md:flex items-center justify-center text-base text-gray-600">
  <li>
    <a className="relative md:p-4 py-3 px-0 block transform transition-all duration-300 hover:scale-110 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full" href="/home">
      Home
    </a>
  </li>
  <li>
    <a className="relative md:p-4 py-3 px-0 block transform transition-all duration-300 hover:scale-110 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full" href="/features">
      Features
    </a>
  </li>
  {isLoggedIn ? (
    <li>
      <a className="relative md:p-4 py-3 px-0 block transform transition-all duration-300 hover:scale-110 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full" href="/user-experience-form-1">
        Share Experience
      </a>
    </li>
  ) : null}
  <li>
    <a className="relative md:p-4 py-3 px-0 block transform transition-all duration-300 hover:scale-110 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full" href="/InterviewExperience-1">
      Interview Experiences
    </a>
  </li>
</ul>

        </nav>

        {/* Buttons / Auth Section */}
        <div className="flex items-center space-x-4">
          {windowWidth > 500 ? (
            <ul className="flex gap-4">
              {isLoggedIn ? (
                <li>
                  <Button onClick={handleLogout}>Logout</Button>
                </li>
              ) : (
                <li>
                  <Link to="/signup">
                    <Button>
                      <ShinyText
                        text="Sign Up"
                        disabled={false}
                        speed={3}
                        className="custom-class"
                      />
                    </Button>
                  </Link>
                </li>
              )}
            </ul>
          ) : (
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button>
                  <GiHamburgerMenu />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full">
                <ul className="flex flex-col gap-2">
                  <li>
                    <a href="/" className="p-2 block">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/features" className="p-2 block">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="/user-experience-form" className="p-2 block">
                      Share Experience
                    </a>
                  </li>
                  {isLoggedIn ? (
                    <li>
                      <Button onClick={handleLogout}>Logout</Button>
                    </li>
                  ) : (
                    <li>
                      <Link to="/signup">
                        <Button>
                          <ShinyText
                            text="Sign Up"
                            disabled={false}
                            speed={3}
                            className="custom-class"
                          />
                        </Button>
                      </Link>
                    </li>
                  )}
                </ul>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
