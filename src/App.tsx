import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useHref,
  Outlet,
} from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import Layout from "@/components/layouts/layout";
import { HeroUIProvider } from "@heroui/system";
import Auth from "@/pages/auth";

function WithUiProvider() {
  const navigate = useNavigate();
  const href = useHref;

  return (
    <HeroUIProvider navigate={navigate} useHref={href}>
      <Outlet />
    </HeroUIProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <WithUiProvider />,
    children: [
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "/",
        element: <Layout />,
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

export default function App() {
  return <RouterProvider router={router} />;
}
