import { useTheme } from "@/context/theme-context";
import { MoonFilledIcon, SunFilledIcon } from "./icons";

export const ThemeSwitch = () => {
  const { changeTheme, theme } = useTheme();
  return (
    <div onClick={changeTheme} className="cursor-pointer">
      {theme === "light" ? (
        <MoonFilledIcon size={22} />
      ) : (
        <SunFilledIcon size={22} />
      )}
    </div>
  );
};
