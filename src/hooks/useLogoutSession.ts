import { NavigateFunction } from "react-router-dom";

import { useValidateTokens } from "./useValidateTokens";

import { useLogoutMutation } from "@/app/services/auth/authApi";

export const useLogoutSession = (
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [logout] = useLogoutMutation();
  const { triggerValidateTokens } = useValidateTokens();

  const logoutSession = async (navigate: NavigateFunction) => {
    try {
      await logout().unwrap();
      const isStillValid = await triggerValidateTokens();

      setAuthenticated(isStillValid);
      navigate(`/auth`);
    } catch (error) {
      console.error(error);
      setAuthenticated(false);
    }
  };

  return { logoutSession };
};
