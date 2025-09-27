import { THEME_REGISTRY } from './themeRegistry';

export type ThemeName = keyof typeof THEME_REGISTRY;

export class ThemeEngine {
  loadedThemes: Map<string, any> = new Map();
  currentTheme: ThemeName | null = null;
  themeRegistry = THEME_REGISTRY;

  async init() {
    await this.loadSavedTheme();
  }

  async loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') as ThemeName | null;
    const defaultTheme: ThemeName = 'starry-night';
    const themeToLoad = savedTheme && this.themeRegistry[savedTheme] ? savedTheme : defaultTheme;
    await this.switchTheme(themeToLoad);
  }

  async loadTheme(themeName: ThemeName) {
    if (!this.themeRegistry[themeName]) {
      throw new Error(`Theme '${themeName}' not found in registry`);
    }
    if (this.loadedThemes.has(themeName)) {
      return this.loadedThemes.get(themeName);
    }
    return null;
  }

  async switchTheme(themeName: ThemeName) {
    this.currentTheme = themeName;
    this.saveTheme();
  }

  saveTheme() {
    if (this.currentTheme) {
      localStorage.setItem('selectedTheme', this.currentTheme);
    }
  }
}