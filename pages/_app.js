import { useEffect } from "react";

import { Provider, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import store from "@/store";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import { setAuth, loginUser } from "@/store/slices/authSlice";
import "@/styles/globals.css";
import "tailwindcss/tailwind.css";
function AuthProvider({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setAuth(true));
    } else {
      router.push("/auth");
    }
  }, [dispatch, router]);

  return children;
}
function MyApp({ Component }) {
  const Layout = DefaultLayout;

  return (
    <Provider store={store}>
      <AuthProvider>
        <Layout>
          <Component />
        </Layout>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
