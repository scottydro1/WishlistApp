import React, { createContext, useState } from "react";

// Create UserContext
export const UserContext = createContext();

// Create a provider for the UserContext
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
