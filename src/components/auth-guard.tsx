import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "./ui/loader";
import { Layout } from "./layouts/layout";

import {
  useUpdateRefreshTokenMutation,
  useValidateAccessTokenQuery,
  useValidateRefreshTokenQuery,
} from "@/app/services/auth/authApi";
import { useAuth } from "@/context/auth-context";

export const AuthGuard = () => {
  const { data: accessData, isLoading: isAccessLoading } =
    useValidateAccessTokenQuery();
  const { data: refreshData, isLoading: isRefreshLoading } =
    useValidateRefreshTokenQuery();

  const [updateTokens] = useUpdateRefreshTokenMutation();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { setAuthenticated, isAuthenticated } = useAuth();

  const redirectAuth = useCallback(() => {
    navigate(`/auth`);
  }, [navigate]);

  const updateToken = useCallback(async () => {
    await updateTokens();
  }, [updateTokens]);

  useEffect(() => {
    if (isAccessLoading || isRefreshLoading) return;

    const check = async () => {
      try {
        if (!accessData?.success) {
          if (!refreshData?.success) {
            redirectAuth();
          } else {
            await updateToken();
          }
        } else {
          await updateToken();
        }
      } catch (error) {
        console.error(error);
        redirectAuth();
      } finally {
        setLoading(false);
      }
    };

    check();
    setAuthenticated(accessData?.success || false);
  }, [
    accessData,
    refreshData,
    isAccessLoading,
    isRefreshLoading,
    redirectAuth,
    setAuthenticated,
    updateToken,
  ]);

  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuthenticated && pathname === "/auth") {
      navigate("/");
      console.error(`Попытка перейти на закрытый роут!!!`);
    }
  }, [isAuthenticated, pathname, redirectAuth, navigate]);

  return loading ? <Loader /> : <Layout />;
};
