"use client";
// Supabase disabled
import type React from "react";
import { createContext, useContext } from "react";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (provider: "google" | "github") => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAdmin: false,
  isLoading: false,
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthContext.Provider value={{ user: null, session: null, isAdmin: false, isLoading: false, signIn: async () => {}, signOut: async () => {} }}>
    {children}
  </AuthContext.Provider>
);

export const useAuth = () => useContext(AuthContext);
