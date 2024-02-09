import "../styles/globals.css";
import "../public/normalize.css";
import "../public/variables.css";
import "../public/fonts.css";
import "../public/typography.css";
import "../public/theme.css";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { createStore } from "../store";
import OverlayWrapper from "../components/molecules/popupOverlay/overlayWrapper";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  console.log(pathname);

  return (
    <Provider store={createStore()}>
      <div id={pathname === "/" && "main"}>
        <OverlayWrapper />
          <Component {...pageProps} />
      </div>
    </Provider>
  );
}
