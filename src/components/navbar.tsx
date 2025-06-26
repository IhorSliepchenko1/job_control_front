import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { siteConfig } from "@/config/site";
import { useLogoutMutation } from "@/app/services/auth/authApi";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()

  const logoutSession = async () => {
    try {
      await logout().unwrap()
      navigate(`/auth`)
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <HeroUINavbar maxWidth="full" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
        </NavbarBrand>
        <div className="hidden sm:flex gap-4 justify-start ml-2">
          {siteConfig.navDesktop.map((item, index) => (
            <NavbarItem key={item.href ?? index} className="flex items-center">
              {
                item.label === "Logout" ?
                  <p className="text-red-600 cursor-pointer" onClick={logoutSession}>{item.label}</p>
                  :
                  <Link
                    color={"foreground"}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
              }
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent className="basis-1 pr-[40px]" justify="end">
        <NavbarMenuToggle className="sm:hidden" />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMobile.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              {
                item.label === "Logout" ?
                  <p className="text-red-600 cursor-pointer" onClick={logoutSession}>{item.label}</p>
                  :
                  <Link
                    color={"foreground"}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
              }

            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
