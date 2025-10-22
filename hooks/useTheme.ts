import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
    // Default to 'light' theme to match the default CSS in :root.
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const root = document.documentElement;
        // The CSS defaults to light mode. We set the data-theme attribute for dark mode.
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }, []);

    return { theme, toggleTheme };
}
