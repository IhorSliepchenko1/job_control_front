import { useNavigate } from "react-router-dom";
import {
  useUpdateRefreshTokenMutation,
  useValidateAccessTokenQuery,
  useValidateRefreshTokenQuery,
} from "@/app/services/auth/authApi";
import { useEffect, useState } from "react";
import { Loader } from "./ui/loader";
import { Layout } from "./layouts/layout";
import { useAuth } from "@/context/auth-context";

export const AuthGuard = () => {
  const { data: accessData, isLoading: isAccessLoading } =
    useValidateAccessTokenQuery();
  const { data: refreshData, isLoading: isRefreshLoading } =
    useValidateRefreshTokenQuery();

  const [updateTokens] = useUpdateRefreshTokenMutation();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { setAuthenticated } = useAuth();

  const redirectAuth = () => {
    navigate(`/auth`);
  };
  const updateToken = async () => {
    await updateTokens();
    navigate(`/`);
  };

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
      } catch (e) {
        console.log(e);
        redirectAuth();
      } finally {
        setLoading(false);
      }
    };

    check();
    setAuthenticated(accessData?.success || false);
  }, [accessData, refreshData, isAccessLoading, isRefreshLoading]);

  return loading ? <Loader /> : <Layout />;
};
