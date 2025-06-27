import { createBrowserRouter, RouterProvider } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import Auth from "@/pages/auth";
import { AuthGuard } from "./components/auth-guard";
import { useTheme } from "./context/theme-context";

const router = createBrowserRouter([
  {
    element: <AuthGuard />,
    children: [
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "/",
        element: <IndexPage />,
        children: [
          { index: true, element: <IndexPage /> },
          { path: "docs", element: <DocsPage /> },
          { path: "pricing", element: <PricingPage /> },
          { path: "blog", element: <BlogPage /> },
          { path: "about", element: <AboutPage /> },
        ],
      },
    ],
  },
]);

export const App = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme} text-foreground bg-background`}>
      <RouterProvider router={router} />;
    </div>
  );
};
