import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeEngine, type ThemeName } from './ThemeEngine';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themeEngine: ThemeEngine | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>('starry-night');
  const [themeEngine, setThemeEngine] = useState<ThemeEngine | null>(null);

  const setTheme = async (newTheme: ThemeName) => {
    if (themeEngine) {
      await themeEngine.switchTheme(newTheme);
      setThemeState(newTheme);
    }
  };

  useEffect(() => {
    const initThemeEngine = async () => {
      try {
        console.log('ThemeContext: Creating ThemeEngine...');
        const engine = new ThemeEngine();
        await engine.init();
        setThemeEngine(engine);
        
        // Get the current theme from the engine
        const currentTheme = engine.currentTheme || 'starry-night';
        setThemeState(currentTheme);
        console.log('ThemeContext: ThemeEngine initialized with theme:', currentTheme);
      } catch (error) {
        console.error('ThemeContext: Failed to initialize ThemeEngine:', error);
        // Set a fallback theme
        setThemeState('starry-night');
      }
    };

    initThemeEngine();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeEngine }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}