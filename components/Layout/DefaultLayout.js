import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { logoutUser } from "@/store/slices/authSlice";
const DefaultLayout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated && router.pathname !== "/auth");
  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/auth");
  };

  return (
    <div className="border-[30px] border-[var(--secondary-color)] h-[100vh]">
      {isAuthenticated && router.pathname !== "/auth" && (
        <button
          onClick={handleLogout}
          className="mx-auto w-full bg-[var(--cta-color)] rounded-md my-4 p-2 hover:opacity-90 font-semibold hover:text-[var(--primary-color)]"
        >
          Logout
        </button>
      )}
      {children}
    </div>
  );
};

export default DefaultLayout;
