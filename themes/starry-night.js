/**
 * Starry Night Theme Plugin
 */
window.ThemePlugins = window.ThemePlugins || {};
window.ThemePlugins['starry-night'] = {
  name: 'Starry Night',
  category: 'dark',
  icon: 'moon',
  background: 'linear-gradient(to top, #0f0f0f, #1a1a2e)',
  colors: {
    primary: '#38bdf8',
    secondary: '#0ea5e9',
    text: '#ffffff',
    textSecondary: '#a3a3a3',
    accent: '#f97316',
    'streak-background': 'rgba(249, 115, 22, 0.1)',
    success: '#22c55e',
    danger: '#dc2626',
    warning: '#f59e0b',
    info: '#3b82f6'
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
    color: '#333333'
  },
  shadows: {
    primary: '0 4px 15px rgba(56, 189, 248, 0.4)',
    secondary: '0 2px 8px rgba(0, 0, 0, 0.1)',
    hover: '0 6px 20px rgba(56, 189, 248, 0.6)'
  },
  effects: ['stars'],
  animations: {
    stars: {
      count: 100,
      twinkleSpeed: '2s'
    }
  },
  completion: {
    icon: '✨',
    title: 'Stellar Achievement!',
    message: 'You\'ve completed all your habits like a shining star!'
  },
  confetti: {
    colors: ['#38bdf8', '#0ea5e9', '#f59e0b', '#8b5cf6'],
    shape: '50%',
    size: { width: '8px', height: '8px' }
  },
  components: {
    'date-info': {
      background: 'rgba(26, 26, 26, 0.8)',
      color: '#e5e5e5',
      border: '1px solid rgba(51, 51, 51, 0.3)'
    },
    'add-habit': {
      background: 'rgba(26, 26, 26, 0.4)',
      border: '1px solid rgba(51, 51, 51, 0.2)'
    },
    'habit-item': {
      background: '#1a1a1a',
      border: '1px solid #333',
      color: '#e5e5e5'
    },
    'habit-item-completed': {
      background: '#0f2a1a',
      borderColor: '#22c55e'
    },
    'progress-bar': {
      background: '#333'
    },
    'progress-fill': {
      background: 'linear-gradient(90deg, #38bdf8, #0ea5e9)'
    },
    'streak-counter': {
      background: 'linear-gradient(135deg, #f97316, #ea580c)',
      color: 'white',
      boxShadow: '0 2px 8px rgba(249, 115, 22, 0.4)'
    },
    'add-btn': {
      background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
      boxShadow: '0 4px 15px rgba(56, 189, 248, 0.4)'
    },
    'footer-info': {
      background: 'rgba(26, 26, 26, 0.6)',
      color: '#a3a3a3',
      border: '1px solid rgba(51, 51, 51, 0.5)'
    },
    'modal': {
      background: '#1a1a1a',
      border: '1px solid #333',
      color: '#e5e5e5'
    },
    'theme-dropdown-menu': {
      background: 'rgba(26, 26, 26, 0.95)',
      border: '1px solid rgba(51, 51, 51, 0.3)'
    },
    'theme-dropdown-option': {
      color: '#d1d5db'
    },
    'mobile-header': {
      background: 'rgba(26, 26, 26, 0.8)',
      border: '1px solid rgba(51, 51, 51, 0.3)'
    }
  }
};
