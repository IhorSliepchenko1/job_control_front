import { MoonFilledIcon, SunFilledIcon } from "./icons";

import { useTheme } from "@/context/theme-context";

export const ThemeSwitch = () => {
  const { changeTheme, theme } = useTheme();

  return (
    <button className="cursor-pointer" onClick={changeTheme}>
      {theme === "light" ? (
        <MoonFilledIcon size={22} />
      ) : (
        <SunFilledIcon size={22} />
      )}
    </button>
  );
};
