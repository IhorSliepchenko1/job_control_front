import { Outlet } from "react-router-dom";

import { Footer } from "./footer";
import { Navbar } from "./navbar";

export const Layout = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <main>
        <Navbar />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
