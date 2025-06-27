import {
  useLazyValidateAccessTokenQuery,
  useLazyValidateRefreshTokenQuery,
} from "@/app/services/auth/authApi";

export const useValidateTokens = () => {
  const [triggerAccess] = useLazyValidateAccessTokenQuery();
  const [triggerRefresh] = useLazyValidateRefreshTokenQuery();

  const triggerValidateTokens = async (): Promise<boolean> => {
    try {
      await triggerAccess().unwrap();
      await triggerRefresh().unwrap();
    } catch (error) {
      if (error) {
        return false;
      }
    }

    return true;
  };

  return { triggerValidateTokens };
};
