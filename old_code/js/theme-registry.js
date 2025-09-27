/**
 * Theme Registry - Lightweight registry for theme plugins
 * This registry only contains metadata about themes, actual theme data is loaded dynamically
 */
const THEME_REGISTRY = {
  'starry-night': {
    name: 'Starry Night',
    category: 'dark',
    preview: '#1a1a2e',
    pluginPath: './themes/starry-night.js'
  },
  'cloudy-day': {
    name: 'Cloudy Day',
    category: 'light',
    preview: '#87ceeb',
    pluginPath: './themes/cloudy-day.js'
  },
  'ocean': {
    name: 'Ocean Depths',
    category: 'blue',
    preview: '#0c4a6e',
    pluginPath: './themes/ocean.js'
  },
  'forest': {
    name: 'Mystic Forest',
    category: 'green',
    preview: '#166534',
    pluginPath: './themes/forest.js'
  },
  'cherry-blossom': {
    name: 'Cherry Blossom',
    category: 'pink',
    preview: '#fce7f3',
    pluginPath: './themes/cherry-blossom.js'
  },
  'snow': {
    name: 'Winter Snow',
    category: 'winter',
    preview: '#91cff9',
    pluginPath: './themes/snow.js'
  },
  'rain': {
    name: 'Stormy Rain',
    category: 'storm',
    preview: '#374151',
    pluginPath: './themes/rain.js'
  }
};

// Export for use in main application
window.THEME_REGISTRY = THEME_REGISTRY;