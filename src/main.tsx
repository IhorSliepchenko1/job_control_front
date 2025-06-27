import ReactDOM from "react-dom/client";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { App } from "./App.tsx";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider } from "./context/theme-context.tsx";
import { AuthProvider } from "./context/auth-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthProvider>
      <ThemeProvider>
        <HeroUIProvider>
          <App />
        </HeroUIProvider>
      </ThemeProvider>
    </AuthProvider>
  </Provider>
);
