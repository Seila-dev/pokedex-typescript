import { useContext } from 'react';
import { ThemeContext } from "../../contexts/theme-context";
import { Button } from '../button/button';

export const ThemeTogglerButton = () => {
    const { theme, setTheme } = useContext(ThemeContext)!;

    return (
        <div>
            <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Mudar tema</Button>
        </div>
    )
}