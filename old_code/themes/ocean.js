/**
 * Ocean Theme Plugin
 */
window.ThemePlugins = window.ThemePlugins || {};
window.ThemePlugins['ocean'] = {
  name: 'Ocean Depths',
  category: 'blue',
  icon: 'bubble',
  background: 'linear-gradient(to top, #1e3a8a, #0c4a6e)',
  colors: {
    primary: '#06b6d4',
    secondary: '#0891b2',
    text: '#ecfeff',
    textSecondary: '#a5f3fc',
    accent: '#0e7490',
    'streak-background': 'rgba(249, 115, 22, 0.1)',
    success: '#22c55e',
    danger: '#dc2626',
    warning: '#f59e0b',
    info: '#06b6d4'
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '400',
    headingWeight: '700'
  },
  borders: {
    width: '1px',
    style: 'solid',
    radius: '8px',
    color: '#0891b2'
  },
  shadows: {
    primary: '0 4px 15px rgba(6, 182, 212, 0.4)',
    secondary: '0 2px 8px rgba(0, 0, 0, 0.1)',
    hover: '0 6px 20px rgba(6, 182, 212, 0.6)'
  },
  effects: ['waves'],
  animations: {
    waves: {
      waveCount: 3,
      bubbleCount: 15,
      speed: '12s'
    }
  },
  completion: {
    icon: '🌊',
    title: 'Wave of Success!',
    message: 'You\'ve surfed through all your habits today!'
  },
  confetti: {
    colors: ['#06b6d4', '#0891b2', '#0e7490', '#ecfeff'],
    shape: '50%',
    size: { width: '8px', height: '8px' }
  },
  components: {
    'date-info': {
      background: 'rgba(20, 83, 109, 0.8)',
      color: '#ecfeff',
      border: '1px solid rgba(8, 145, 178, 0.3)'
    },
    'add-habit': {
      background: 'rgba(20, 83, 109, 0.4)',
      border: '1px solid rgba(8, 145, 178, 0.2)'
    },
    'habit-item': {
      background: 'rgba(20, 83, 109, 0.8)',
      border: '1px solid #0891b2',
      color: '#ecfeff'
    },
    'habit-item-completed': {
      background: 'rgba(6, 182, 212, 0.2)',
      borderColor: '#06b6d4'
    },
    'progress-bar': {
      background: '#0e7490'
    },
    'progress-fill': {
      background: 'linear-gradient(90deg, #06b6d4, #0891b2)'
    },
    'streak-counter': {
      background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      color: 'white',
      boxShadow: '0 2px 8px rgba(6, 182, 212, 0.4)'
    },
    'add-btn': {
      background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)'
    },
    'footer-info': {
      background: 'rgba(20, 83, 109, 0.6)',
      color: '#a5f3fc',
      border: '1px solid rgba(8, 145, 178, 0.5)'
    },
    'modal': {
      background: 'rgba(20, 83, 109, 0.8)',
      border: '1px solid #0891b2',
      color: '#ecfeff'
    },
    'theme-dropdown-menu': {
      background: 'rgba(20, 83, 109, 0.95)',
      border: '1px solid rgba(8, 145, 178, 0.3)'
    },
    'theme-dropdown-option': {
      color: '#a5f3fc'
    },
    'mobile-header': {
      background: 'rgba(20, 83, 109, 0.8)',
      border: '1px solid rgba(8, 145, 178, 0.3)'
    }
  }
};
