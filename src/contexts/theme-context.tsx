import { createContext, useState, ReactNode, useEffect } from 'react';

// export type Theme = {
//     color: string;
//     background: string;
// }

interface Themes {
    light: {
        color: string;
        background: string;
    },
    dark: {
        color: string;
        background: string;
    }
}

export const themes: Themes = {
    light: {
        color: '#2C2F33',
        background: '#e4e4ec',
    },
    dark: {
        color: '#e4e4ec',
        background: '#23272A',
    }
}

export type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    const [ theme, setTheme ] = useState<Theme>(storedTheme || "light");

    useEffect(() => {
        localStorage.setItem("theme", theme);
    })

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}