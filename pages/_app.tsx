import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..

if (typeof window !== "undefined") {
  AOS.init();
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
