import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { logoutUser } from "@/store/slices/authSlice";
import Navbar from "./Navbar";
import {
  clearLandingPages,
  deleteAllLandingPages,
} from "@/store/slices/landingPageSlice";
import { getUserIdFromLocalStorage } from "@/store/slices/authSlice";
const DefaultLayout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userId = getUserIdFromLocalStorage();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/auth");
    dispatch(deleteAllLandingPages(userId));
    dispatch(clearLandingPages());
  };

  return (
    <>
      <div className=" h-[100vh]">
        {isAuthenticated && router.pathname !== "/auth" && (
          <button
            onClick={handleLogout}
            className="absolute right-2 top-1 bg-[var(--cta-color)] text-xs rounded-md  px-3 py-1 hover:opacity-90  hover:text-[var(--primary-color)] cursor-pointer"
          >
            Logout
          </button>
        )}
        {children}
      </div>
    </>
  );
};

export default DefaultLayout;
