import { Link } from "@heroui/link";

export const Footer = () => {
  return (
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
  );
};
