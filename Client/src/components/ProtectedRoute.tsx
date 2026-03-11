import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useToast } from "@/components/ui/toast";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = useSelector(
    (state: RootState) => state.appSlice.isLoggedIn
  );
  const { showToast } = useToast();

  useEffect(() => {
    if (!isLoggedIn) {
      showToast({
        title: "Login required",
        description: "You must be logged in to access this page.",
        type: "destructive",
      });
    }
  }, [isLoggedIn, showToast]);

  if (!isLoggedIn) {
    // Do not redirect; keep the current URL and just show the toast.
    return null;
  }

  return <>{children}</>;
}

