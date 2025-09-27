import { THEME_REGISTRY } from './themeRegistry';
import starryNight from '../themes/starry-night';
import ocean from '../themes/ocean';
import cloudyDay from '../themes/cloudy-day';
import forest from '../themes/forest';
import cherryBlossom from '../themes/cherry-blossom';
import snow from '../themes/snow';
import rain from '../themes/rain';

export type ThemeName = keyof typeof THEME_REGISTRY;

export interface ThemeConfig {
  name: string;
  category: string;
  icon: string;
  background: string;
  colors: Record<string, string>;
  typography: Record<string, string>;
  borders: Record<string, string>;
  shadows: Record<string, string>;
  effects: string[];
  animations: Record<string, any>;
  completion: {
    icon: string;
    title: string;
    message: string;
  };
  confetti: {
    colors: string[];
    shape: string;
    size: { width: string; height: string };
  };
  components: Record<string, Record<string, string>>;
}

export class ThemeEngine {
  loadedThemes: Map<string, ThemeConfig> = new Map();
  currentTheme: ThemeName | null = null;
  themeRegistry = THEME_REGISTRY;

  private themeConfigs: Record<ThemeName, ThemeConfig> = {
    'starry-night': starryNight,
    'ocean': ocean,
    'cloudy-day': cloudyDay,
    'forest': forest,
    'cherry-blossom': cherryBlossom,
    'snow': snow,
    'rain': rain,
  };

  async init() {
    try {
      console.log('ThemeEngine: Initializing...');
      await this.loadSavedTheme();
      console.log('ThemeEngine: Initialization complete');
    } catch (error) {
      console.error('ThemeEngine: Initialization failed:', error);
      // Fallback to default theme
      await this.switchTheme('starry-night');
    }
  }

  async loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') as ThemeName | null;
    const defaultTheme: ThemeName = 'starry-night';
    const themeToLoad = savedTheme && this.themeRegistry[savedTheme] ? savedTheme : defaultTheme;
    await this.switchTheme(themeToLoad);
  }

  async loadTheme(themeName: ThemeName): Promise<ThemeConfig> {
    if (!this.themeRegistry[themeName]) {
      throw new Error(`Theme '${themeName}' not found in registry`);
    }
    
    if (this.loadedThemes.has(themeName)) {
      return this.loadedThemes.get(themeName)!;
    }

    const themeConfig = this.themeConfigs[themeName];
    this.loadedThemes.set(themeName, themeConfig);
    return themeConfig;
  }

  async switchTheme(themeName: ThemeName) {
    try {
      const theme = await this.loadTheme(themeName);
      this.applyTheme(theme, themeName);
      this.currentTheme = themeName;
      this.saveTheme();
      this.updateThemeSelector();
      
      // Use a small delay to ensure DOM operations complete
      setTimeout(() => {
        this.generateBackgroundElements();
      }, 10);
    } catch (error) {
      console.error('Failed to switch theme:', error);
    }
  }

  applyTheme(theme: ThemeConfig, themeName: ThemeName) {
    // Batch DOM operations to prevent multiple reflows
    requestAnimationFrame(() => {
      const body = document.body;
      
      // Remove all existing theme classes at once
      const themeNames = Object.keys(this.themeRegistry).join('|');
      const themeRegex = new RegExp(`\\b(${themeNames})\\b`, 'g');
      body.className = body.className.replace(themeRegex, '').trim();
      
      // Add current theme class
      body.classList.add(themeName);
      
      // Apply CSS custom properties
      this.applyCSSVariables(theme);
      
      // Apply theme-specific styles
      this.applyThemeStyles(theme);
    });
  }

  applyCSSVariables(theme: ThemeConfig) {
    const root = document.documentElement;
    
    // Colors
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--theme-${key}`, value);
      });
    }
    
    // Typography
    if (theme.typography) {
      Object.entries(theme.typography).forEach(([key, value]) => {
        root.style.setProperty(`--theme-typography-${key}`, value);
      });
    }
    
    // Borders
    if (theme.borders) {
      Object.entries(theme.borders).forEach(([key, value]) => {
        root.style.setProperty(`--theme-border-${key}`, value);
      });
    }
    
    // Shadows
    if (theme.shadows) {
      Object.entries(theme.shadows).forEach(([key, value]) => {
        root.style.setProperty(`--theme-shadow-${key}`, value);
      });
    }
    
    // Background
    if (theme.background) {
      root.style.setProperty('--theme-background', theme.background);
    }
  }

  applyThemeStyles(theme: ThemeConfig) {
    // Remove existing dynamic styles
    const existingStyle = document.getElementById('dynamic-theme-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Create new style element
    const styleElement = document.createElement('style');
    styleElement.id = 'dynamic-theme-styles';
    
    let css = '';
    
    // Generate CSS for components
    if (theme.components) {
      Object.entries(theme.components).forEach(([component, styles]) => {
        css += this.generateComponentCSS(component, styles);
      });
    }
    
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
  }

  generateComponentCSS(component: string, styles: Record<string, string>) {
    let css = '';
    const selector = `.${this.currentTheme} .${component}`;
    
    if (typeof styles === 'object') {
      css += `${selector} {\n`;
      Object.entries(styles).forEach(([property, value]) => {
        css += `  ${this.camelToKebab(property)}: ${value};\n`;
      });
      css += '}\n';
    }
    
    return css;
  }

  camelToKebab(str: string) {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  saveTheme() {
    if (this.currentTheme) {
      localStorage.setItem('selectedTheme', this.currentTheme);
    }
  }

  updateThemeSelector() {
    const options = document.querySelectorAll('.theme-dropdown-option');
    options.forEach(option => {
      const theme = option.getAttribute('data-theme');
      if (theme === this.currentTheme) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }

  generateBackgroundElements() {
    if (!this.currentTheme) return;
    
    const theme = this.loadedThemes.get(this.currentTheme);
    if (!theme || !theme.effects) return;
    
    // Clear existing background elements
    this.clearBackgroundElements();
    
    // Generate new background elements
    theme.effects.forEach(effect => {
      if (theme.animations && theme.animations[effect]) {
        this.generateEffect(effect, theme.animations[effect]);
      }
    });
  }

  clearBackgroundElements() {
    const containers = ['stars', 'clouds', 'waves', 'leaves', 'petals', 'snowflakes', 'raindrops'];
    containers.forEach(id => {
      const container = document.getElementById(id);
      if (container && container.children.length > 0) {
        container.innerHTML = '';
      }
    });
  }

  generateEffect(effectName: string, config: any) {
    switch (effectName) {
      case 'stars':
        this.generateStars(config);
        break;
      case 'clouds':
        this.generateClouds(config);
        break;
      case 'waves':
        this.generateWaves(config);
        break;
      case 'leaves':
        this.generateLeaves(config);
        break;
      case 'petals':
        this.generatePetals(config);
        break;
      case 'snowflakes':
        this.generateSnowflakes(config);
        break;
      case 'raindrops':
        this.generateRaindrops(config);
        break;
    }
  }

  generateStars(config: any = {}) {
    const container = document.getElementById('stars');
    if (!container) return;
    
    const count = config.count || 100;
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = Math.random() * 100 + 'vh';
      star.style.left = Math.random() * 100 + 'vw';
      star.style.animationDuration = (1 + Math.random() * 2) + 's';
      container.appendChild(star);
    }
  }

  generateClouds(config: any = {}) {
    const container = document.getElementById('clouds');
    if (!container) return;
    
    const count = config.count || 5;
    for (let i = 0; i < count; i++) {
      const cloud = document.createElement('div');
      cloud.className = 'cloud';
      const size = 80 + Math.random() * 100;
      cloud.style.width = size + 'px';
      cloud.style.height = size * 0.6 + 'px';
      cloud.style.top = Math.random() * 50 + 'vh';
      cloud.style.animationDuration = (40 + Math.random() * 40) + 's';
      container.appendChild(cloud);
    }
  }

  generateWaves(config: any = {}) {
    const container = document.getElementById('waves');
    if (!container) return;
    
    // Generate waves
    const waveCount = config.waveCount || 3;
    for (let i = 0; i < waveCount; i++) {
      const wave = document.createElement('div');
      wave.className = 'wave';
      wave.style.animationDelay = `-${i * 2}s`;
      container.appendChild(wave);
    }
    
    // Generate bubbles
    const bubbleCount = config.bubbleCount || 15;
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      const size = 4 + Math.random() * 20;
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = Math.random() * 100 + '%';
      bubble.style.bottom = '-20px';
      bubble.style.animationDelay = Math.random() * 6 + 's';
      bubble.style.animationDuration = (4 + Math.random() * 4) + 's';
      container.appendChild(bubble);
    }
  }

  generateLeaves(config: any = {}) {
    const container = document.getElementById('leaves');
    if (!container) return;
    
    const count = config.count || 20;
    for (let i = 0; i < count; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      leaf.style.left = Math.random() * 100 + '%';
      leaf.style.top = '-50px';
      leaf.style.animationDelay = Math.random() * 8 + 's';
      leaf.style.animationDuration = (6 + Math.random() * 4) + 's';
      container.appendChild(leaf);
    }
  }

  generatePetals(config: any = {}) {
    const container = document.getElementById('petals');
    if (!container) return;
    
    const count = config.count || 25;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.top = '-50px';
      petal.style.animationDelay = Math.random() * 10 + 's';
      petal.style.animationDuration = (8 + Math.random() * 4) + 's';
      container.appendChild(petal);
    }
  }

  generateSnowflakes(config: any = {}) {
    const container = document.getElementById('snowflakes');
    if (!container) return;
    
    const symbols = config.symbols || ['❄', '❅', '❆', '✻', '✼', '❉'];
    const count = config.count || 30;
    
    for (let i = 0; i < count; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      snowflake.style.left = Math.random() * 100 + '%';
      snowflake.style.top = '-50px';
      snowflake.style.animationDelay = Math.random() * 10 + 's';
      snowflake.style.animationDuration = (8 + Math.random() * 6) + 's';
      container.appendChild(snowflake);
    }
  }

  generateRaindrops(config: any = {}) {
    const container = document.getElementById('raindrops');
    if (!container) return;
    
    const count = config.count || 50;
    for (let i = 0; i < count; i++) {
      const raindrop = document.createElement('div');
      raindrop.className = 'raindrop';
      raindrop.style.left = Math.random() * 100 + '%';
      raindrop.style.top = '-20px';
      raindrop.style.animationDelay = Math.random() * 2 + 's';
      raindrop.style.animationDuration = (0.8 + Math.random() * 0.6) + 's';
      container.appendChild(raindrop);
    }
  }

  getCompletionConfig() {
    if (!this.currentTheme) return null;
    const theme = this.loadedThemes.get(this.currentTheme);
    return theme ? theme.completion : null;
  }

  generateThemeConfetti(container: HTMLElement) {
    if (!this.currentTheme) return;
    
    const theme = this.loadedThemes.get(this.currentTheme);
    if (!theme || !theme.confetti) return;
    
    const count = 50;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.animationDelay = Math.random() * 2 + 's';
      piece.style.animationDuration = (2 + Math.random() * 2) + 's';
      
      // Apply theme-specific confetti styling
      const confettiConfig = theme.confetti;
      if (confettiConfig.colors) {
        const color = confettiConfig.colors[Math.floor(Math.random() * confettiConfig.colors.length)];
        piece.style.background = color;
      }
      
      if (confettiConfig.shape) {
        piece.style.borderRadius = confettiConfig.shape;
      }
      
      if (confettiConfig.size) {
        piece.style.width = confettiConfig.size.width;
        piece.style.height = confettiConfig.size.height;
      }
      
      container.appendChild(piece);
    }
  }
}