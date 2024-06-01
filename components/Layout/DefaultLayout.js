import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { logoutUser } from "@/store/slices/authSlice";
const DefaultLayout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/auth");
  };

  return (
    <div className="border-[30px] border-[var(--secondary-color)] h-[100vh]">
      {isAuthenticated && router.pathname !== "/auth" && (
        <button
          onClick={handleLogout}
          className="absolute right-10 top-5 bg-[var(--cta-color)] rounded-md my-4 px-4 py-2 hover:opacity-90  hover:text-[var(--primary-color)] cursor-pointer"
        >
          Logout
        </button>
      )}
      {children}
    </div>
  );
};

export default DefaultLayout;
