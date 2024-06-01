import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import "@/styles/globals.css";
import "tailwindcss/tailwind.css";
function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || DefaultLayout;

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
