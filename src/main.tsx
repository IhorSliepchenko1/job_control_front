import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { UiProvider } from "./ui-provider.tsx";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <UiProvider>
        <App />
      </UiProvider>
    </Provider>
  </BrowserRouter>
);
