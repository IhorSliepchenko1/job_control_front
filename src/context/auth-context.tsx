import { createContext, useContext, useState } from "react";
import { NavigateFunction } from "react-router-dom";

import { useLogoutSession } from "@/hooks/useLogoutSession";

type AuthContextType = {
  isAuthenticated: boolean;
  setAuthenticated: (val: boolean) => void;
  logoutSession: (navigate: NavigateFunction) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuthenticated: () => {},
  logoutSession: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const { logoutSession } = useLogoutSession(setAuthenticated);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, logoutSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
