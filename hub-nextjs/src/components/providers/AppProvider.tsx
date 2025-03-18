"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface AppContextType {
  app: "hub" | "cat-battle" | "cat-lucky" | "cat-challenge";
  setApp: (app: "hub" | "cat-battle" | "cat-lucky" | "cat-challenge") => void;
}

// Create the context with default values
const AppContext = createContext<AppContextType>({
  app: "hub",
  setApp: () => {},
});

// Custom hook to use the app context
export const useApp = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  const [app, setApp] = useState<
    "hub" | "cat-battle" | "cat-lucky" | "cat-challenge"
  >("hub");

  return (
    <AppContext.Provider value={{ app, setApp }}>
      {children}
    </AppContext.Provider>
  );
}
