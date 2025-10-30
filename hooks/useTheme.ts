import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useTheme = (): UseThemeReturn => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') return 'dark';
    
    // Check localStorage first
    const stored = localStorage.getItem('theme') as Theme;
    if (stored && (stored === 'light' || stored === 'dark')) {
      return stored;
    }
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme to document
    root.setAttribute('data-theme', theme);
    
    // Store in localStorage
    localStorage.setItem('theme', theme);
    
    // Update CSS custom properties for dynamic components
    const themeColors = {
      light: {
        '--theme-primary': '#0EA5E9',
        '--theme-secondary': '#2563EB',
        '--theme-accent': '#10B981',
        '--theme-bg': '#F8FAFC',
        '--theme-surface': '#FFFFFF',
        '--theme-text': '#0F172A'
      },
      dark: {
        '--theme-primary': '#06B6D4',
        '--theme-secondary': '#3B82F6', 
        '--theme-accent': '#F59E0B',
        '--theme-bg': '#000000',
        '--theme-surface': '#1F2937',
        '--theme-text': '#F9FAFB'
      }
    };
    
    Object.entries(themeColors[theme]).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return {
    theme,
    toggleTheme,
    setTheme
  };
};

export default useTheme;