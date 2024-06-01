import { useEffect } from "react";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import store from "@/store";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import "@/styles/globals.css";
import "tailwindcss/tailwind.css";
function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || DefaultLayout;
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/auth");
    }
  }, []);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
