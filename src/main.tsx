import ReactDOM from "react-dom/client";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { App } from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
      <App />
  </Provider>
);
