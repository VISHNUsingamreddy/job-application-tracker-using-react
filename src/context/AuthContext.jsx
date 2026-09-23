import {createContext, useMemo, useState} from 'react';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/authService';
export const AuthContext = createContext(undefined);

export function AuthProvider({children}) {
  const [user, setUser] = useState(getCurrentUser);

  const value = useMemo(() => ({
    user,
    isAuthenticated: user !== null,
    async login(input) {
      const result = loginUser(input);
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
