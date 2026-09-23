import {createContext, useEffect, useMemo, useState} from 'react';
import {
  loginUser,
  logoutUser,
  registerUser,
  subscribeToAuth,
} from '../services/authService';
export const AuthContext = createContext(undefined);

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => subscribeToAuth((nextUser) => {
    setUser(nextUser);
    setAuthLoading(false);
  }), []);

  const value = useMemo(() => ({
    user,
    authLoading,
    isAuthenticated: user !== null,
    async login(input) {
      const result = await loginUser(input);
      if (result.success) setUser(result.user);
      return result;
    },


    async register(input) {
      return registerUser(input);
    },


    
    logout() {
      logoutUser();
      setUser(null);
    },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
