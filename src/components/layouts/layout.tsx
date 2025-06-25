import { Link } from "@heroui/link";
import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />

      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        <Outlet />
      </main>

      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/IhorSliepchenko1"
          title="github.com IhorSliepchenko1"
        >
          <span className="text-default-600">Developed by</span>
          <p className="text-primary">Ihor Sliepchenko</p>
        </Link>
      </footer>
    </div>
  );
}
