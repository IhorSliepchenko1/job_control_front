import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { useNavigate } from "react-router-dom";

import { ThemeSwitch } from "../ui/theme-switch";

import { siteConfig } from "@/config/site";
import { useAuth } from "@/context/auth-context";

export const Navbar = () => {
  const { isAuthenticated, logoutSession } = useAuth();
  const navigate = useNavigate();
  const logout = () => logoutSession(navigate);

  return (
    <HeroUINavbar maxWidth="full" position="sticky">
      {isAuthenticated && (
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <div className="hidden sm:flex gap-4 justify-start ml-2">
            {siteConfig.navDesktop.map((item, index) => (
              <NavbarItem
                key={item.href ?? index}
                className="flex items-center"
              >
                {item.label === "Logout" ? (
                  <button
                    className="text-red-600 cursor-pointer"
                    onClick={logout}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link color={"foreground"} href={item.href}>
                    {item.label}
                  </Link>
                )}
              </NavbarItem>
            ))}
          </div>
        </NavbarContent>
      )}

      <NavbarContent className="basis-1 pr-[40px]" justify="end">
        <NavbarMenuToggle className="sm:hidden" />
        <ThemeSwitch />
      </NavbarContent>

      {isAuthenticated && (
        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMobile.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                {item.label === "Logout" ? (
                  <button
                    className="text-red-600 cursor-pointer"
                    onClick={logout}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link color={"foreground"} href={item.href}>
                    {item.label}
                  </Link>
                )}
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      )}
    </HeroUINavbar>
  );
};
