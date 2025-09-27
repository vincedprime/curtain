import React, { createContext, useContext, useEffect, useState } from 'react';

// Define ThemeName type directly here to avoid import issues
type ThemeName = 'starry-night' | 'cloudy-day' | 'ocean' | 'forest' | 'cherry-blossom' | 'snow' | 'rain';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>('starry-night');

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    // Apply theme to document body
    document.body.className = document.body.className.replace(/starry-night|cloudy-day|ocean|forest|cherry-blossom|snow|rain/g, '').trim();
    document.body.classList.add(newTheme);
    
    // Save theme to localStorage
    localStorage.setItem('selectedTheme', newTheme);
    
    // Apply theme-specific CSS variables
    const root = document.documentElement;
    
    // Define theme-specific colors
    const themeColors = {
      'starry-night': {
        '--theme-primary': '#38bdf8',
        '--theme-secondary': '#0ea5e9',
        '--theme-text': '#ffffff',
        '--theme-textSecondary': '#a3a3a3',
        '--theme-background': 'linear-gradient(to top, #0f0f0f, #1a1a2e)',
      },
      'cloudy-day': {
        '--theme-primary': '#f59e0b',
        '--theme-secondary': '#d97706',
        '--theme-text': '#1f2937',
        '--theme-textSecondary': '#6b7280',
        '--theme-background': 'linear-gradient(to bottom, #87ceeb, #e0f2fe)',
      },
      'ocean': {
        '--theme-primary': '#06b6d4',
        '--theme-secondary': '#0891b2',
        '--theme-text': '#ecfeff',
        '--theme-textSecondary': '#a5f3fc',
        '--theme-background': 'linear-gradient(to bottom, #0c4a6e, #164e63)',
      },
      'forest': {
        '--theme-primary': '#22c55e',
        '--theme-secondary': '#16a34a',
        '--theme-text': '#dcfce7',
        '--theme-textSecondary': '#bbf7d0',
        '--theme-background': 'linear-gradient(to bottom, #14532d, #166534)',
      },
      'cherry-blossom': {
        '--theme-primary': '#f472b6',
        '--theme-secondary': '#ec4899',
        '--theme-text': '#fdf2f8',
        '--theme-textSecondary': '#fce7f3',
        '--theme-background': 'linear-gradient(to bottom, #831843, #be185d)',
      },
      'snow': {
        '--theme-primary': '#e2e8f0',
        '--theme-secondary': '#cbd5e1',
        '--theme-text': '#1e293b',
        '--theme-textSecondary': '#64748b',
        '--theme-background': 'linear-gradient(to bottom, #f8fafc, #e2e8f0)',
      },
      'rain': {
        '--theme-primary': '#3b82f6',
        '--theme-secondary': '#2563eb',
        '--theme-text': '#dbeafe',
        '--theme-textSecondary': '#93c5fd',
        '--theme-background': 'linear-gradient(to bottom, #1e3a8a, #1e40af)',
      },
    };
    
    // Apply theme colors
    const colors = themeColors[newTheme];
    if (colors) {
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  };

  useEffect(() => {
    // Load saved theme on initialization
    const savedTheme = localStorage.getItem('selectedTheme') as ThemeName | null;
    if (savedTheme && ['starry-night', 'cloudy-day', 'ocean', 'forest', 'cherry-blossom', 'snow', 'rain'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      setTheme('starry-night');
    }
  }, []);

  useEffect(() => {
    // Apply theme class to body when theme changes
    document.body.className = document.body.className.replace(/starry-night|cloudy-day|ocean|forest|cherry-blossom|snow|rain/g, '').trim();
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}