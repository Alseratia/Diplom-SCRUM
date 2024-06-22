"use client";

import { type ReactNode, createContext, useState, useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  notificationsConnection,
  startNotificationsConnection,
} from "@/lib/notifications-connection";
import type { User } from "@/lib/types";

const queryClient = new QueryClient();

export const AuthContext = createContext<{
  user: User | null;
  toggleIsLoggedIn: (value: User) => void;
  notificationsConnection: typeof notificationsConnection;
}>({
  user: null,
  toggleIsLoggedIn: () => {},
  notificationsConnection,
});

const AuthProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [user, setUser] = useState<User | null>(null);

  const toggleIsLoggedIn = (value: User) => {
    localStorage.setItem("USER", JSON.stringify(value));
    setUser(value);
  };

  useEffect(() => {
    if (user) {
      startNotificationsConnection({ userId: user.userId });
    }
  }, [user]);

  useEffect(() => {
    const userFromLS = localStorage.getItem("USER");
    if (!userFromLS) return;
    try {
      const userData = JSON.parse(userFromLS);
      toggleIsLoggedIn(userData);
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, toggleIsLoggedIn, notificationsConnection }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const Providers = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>;
    </QueryClientProvider>
  );
};
