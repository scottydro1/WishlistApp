import React, { createContext, useState } from "react";

// Create the context
export const UIContext = createContext();

// Define the provider component
export const UIProvider = ({ children }) => {
    // Shared boolean states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isRadialOpen, setisRadialOpen] = useState(false);
    const [isMenuOpen, setisMenuOpen] = useState(false);

    return (
        <UIContext.Provider
            value={{
                isModalOpen,
                setIsModalOpen,
                isAuthenticated,
                setIsAuthenticated,
                isDarkMode,
                setIsDarkMode,
                isRadialOpen,
                setisRadialOpen,
                isMenuOpen,
                setisMenuOpen
            }}
        >
            {children}
        </UIContext.Provider>
    );
};
