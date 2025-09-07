/**
 * Theme Engine - Manages dynamic theme loading and application
 */
class ThemeEngine {
  constructor() {
    this.loadedThemes = new Map();
    this.currentTheme = null;
    this.themeRegistry = null;
  }

  /**
   * Initialize the theme engine with registry
   */
  async init(registry) {
    this.themeRegistry = registry;
    await this.loadSavedTheme();
  }

  /**
   * Load theme from localStorage or default
   */
  async loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    const defaultTheme = 'starry-night';
    const themeToLoad = savedTheme && this.themeRegistry[savedTheme] ? savedTheme : defaultTheme;
    await this.switchTheme(themeToLoad);
  }

  /**
   * Load a theme plugin from global registry
   */
  async loadTheme(themeName) {
    if (!this.themeRegistry[themeName]) {
      throw new Error(`Theme '${themeName}' not found in registry`);
    }

    // Check cache first
    if (this.loadedThemes.has(themeName)) {
      return this.loadedThemes.get(themeName);
    }

    // Check if theme plugin is available in global registry
    if (window.ThemePlugins && window.ThemePlugins[themeName]) {
      const themeConfig = window.ThemePlugins[themeName];
      this.loadedThemes.set(themeName, themeConfig);
      return themeConfig;
    }

    // If not loaded yet, try to load the script dynamically
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `themes/${themeName}.js`;
      script.onload = () => {
        if (window.ThemePlugins && window.ThemePlugins[themeName]) {
          const themeConfig = window.ThemePlugins[themeName];
          this.loadedThemes.set(themeName, themeConfig);
          resolve(themeConfig);
        } else {
          reject(new Error(`Theme plugin '${themeName}' failed to register`));
        }
      };
      script.onerror = () => {
        reject(new Error(`Failed to load theme plugin '${themeName}'`));
      };
      document.head.appendChild(script);
    });
  }

  /**
   * Switch to a new theme
   */
  async switchTheme(themeName) {
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

  /**
   * Apply theme to the DOM
   */
  applyTheme(theme, themeName) {
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

  /**
   * Apply CSS custom properties for dynamic theming
   */
  applyCSSVariables(theme) {
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

  /**
   * Apply additional theme-specific styles
   */
  applyThemeStyles(theme) {
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

  /**
   * Generate CSS for a specific component
   */
  generateComponentCSS(component, styles) {
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

  /**
   * Convert camelCase to kebab-case
   */
  camelToKebab(str) {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  /**
   * Save current theme to localStorage
   */
  saveTheme() {
    localStorage.setItem('selectedTheme', this.currentTheme);
  }

  /**
   * Update theme selector UI
   */
  updateThemeSelector() {
    const options = document.querySelectorAll('.theme-dropdown-option');
    options.forEach(option => {
      const theme = option.dataset.theme;
      if (theme === this.currentTheme) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }

  /**
   * Generate background elements for current theme
   */
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

  /**
   * Clear all background elements
   */
  clearBackgroundElements() {
    const containers = ['stars', 'clouds', 'waves', 'leaves', 'petals', 'snowflakes', 'raindrops', 'panels'];
    containers.forEach(id => {
      const container = document.getElementById(id);
      if (container && container.children.length > 0) {
        container.innerHTML = '';
      }
    });
  }

  /**
   * Generate specific background effect
   */
  generateEffect(effectName, config) {
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
      case 'panels':
        this.generatePanels(config);
        break;
    }
  }

  /**
   * Generate stars effect
   */
  generateStars(config = {}) {
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

  /**
   * Generate clouds effect
   */
  generateClouds(config = {}) {
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

  /**
   * Generate waves effect
   */
  generateWaves(config = {}) {
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

  /**
   * Generate leaves effect
   */
  generateLeaves(config = {}) {
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

  /**
   * Generate petals effect
   */
  generatePetals(config = {}) {
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

  /**
   * Generate snowflakes effect
   */
  generateSnowflakes(config = {}) {
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

  /**
   * Generate raindrops effect
   */
  generateRaindrops(config = {}) {
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

  /**
   * Generate comic book panels effect
   */
  generatePanels(config = {}) {
    const container = document.getElementById('panels');
    if (!container) return;
    
    const count = config.count || 8;
    const opacity = config.opacity || 0.1;
    
    for (let i = 0; i < count; i++) {
      const panel = document.createElement('div');
      panel.className = 'manga-panel';
      
      // Create different panel shapes and sizes
      const width = 100 + Math.random() * 200;
      const height = 80 + Math.random() * 120;
      const rotation = (Math.random() - 0.5) * 30; // -15 to 15 degrees
      
      panel.style.position = 'absolute';
      panel.style.width = width + 'px';
      panel.style.height = height + 'px';
      panel.style.left = Math.random() * (window.innerWidth - width) + 'px';
      panel.style.top = Math.random() * (window.innerHeight - height) + 'px';
      panel.style.border = '3px solid #212529';
      panel.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
      panel.style.transform = `rotate(${rotation}deg)`;
      panel.style.borderRadius = '10px';
      panel.style.zIndex = '-1';
      panel.style.pointerEvents = 'none';
      
      container.appendChild(panel);
    }
  }

  /**
   * Get completion animation config for current theme
   */
  getCompletionConfig() {
    if (!this.currentTheme) return null;
    const theme = this.loadedThemes.get(this.currentTheme);
    return theme ? theme.completion : null;
  }

  /**
   * Generate theme-specific confetti
   */
  generateThemeConfetti(container) {
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

// Export for use in main application
window.ThemeEngine = ThemeEngine;
