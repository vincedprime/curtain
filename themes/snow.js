/**
 * Snow Theme Plugin
 */
window.ThemePlugins = window.ThemePlugins || {};
window.ThemePlugins['snow'] = {
  name: 'Winter Snow',
  category: 'winter',
  icon: 'snowflake',
  background: 'linear-gradient(to top, #c8e5fa, #91cff9)',
  colors: {
    primary: '#0ea5e9',
    secondary: '#0284c7',
    text: '#1e3a8a',
    textSecondary: '#475569',
    accent: '#0369a1',
    'streak-background': 'rgba(249, 115, 22, 0.1)',
    success: '#22c55e',
    danger: '#dc2626',
    warning: '#f59e0b',
    info: '#0ea5e9'
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
    color: '#0ea5e9'
  },
  shadows: {
    primary: '0 4px 15px rgba(14, 165, 233, 0.4)',
    secondary: '0 2px 8px rgba(0, 0, 0, 0.1)',
    hover: '0 6px 20px rgba(14, 165, 233, 0.6)'
  },
  effects: ['snowflakes'],
  animations: {
    snowflakes: {
      count: 30,
      symbols: ['❄', '❅', '❆', '✻', '✼', '❉'],
      fallSpeed: '10s'
    }
  },
  completion: {
    icon: '❄️',
    title: 'Crystal Clear Success!',
    message: 'Your habits are as perfect as fresh snow!'
  },
  confetti: {
    colors: ['#0ea5e9', '#0284c7', '#0369a1', '#f0f9ff'],
    shape: '50%',
    size: { width: '8px', height: '8px' }
  },
  components: {
    'date-info': {
      background: 'rgba(240, 249, 255, 0.9)',
      color: '#1e3a8a',
      border: '1px solid rgba(14, 165, 233, 0.3)'
    },
    'add-habit': {
      background: 'rgba(240, 249, 255, 0.4)',
      border: '1px solid rgba(14, 165, 233, 0.2)'
    },
    'habit-item': {
      background: 'rgba(240, 249, 255, 0.9)',
      border: '1px solid #0ea5e9',
      color: '#1e3a8a'
    },
    'habit-item-completed': {
      background: 'rgba(219, 234, 254, 0.8)',
      borderColor: '#0ea5e9'
    },
    'progress-bar': {
      background: '#e0f2fe'
    },
    'progress-fill': {
      background: 'linear-gradient(90deg, #0ea5e9, #0284c7)'
    },
    'streak-counter': {
      background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
      color: 'white',
      boxShadow: '0 2px 8px rgba(14, 165, 233, 0.4)'
    },
    'add-btn': {
      background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
      boxShadow: '0 4px 15px rgba(14, 165, 233, 0.4)'
    },
    'footer-info': {
      background: 'rgba(240, 249, 255, 0.6)',
      color: '#1e3a8a',
      border: '1px solid rgba(14, 165, 233, 0.3)'
    },
    'modal': {
      background: 'rgba(240, 249, 255, 0.9)',
      border: '1px solid #0ea5e9',
      color: '#1e3a8a'
    },
    'theme-dropdown-menu': {
      background: 'rgba(240, 249, 255, 0.95)',
      border: '1px solid rgba(14, 165, 233, 0.3)'
    },
    'theme-dropdown-option': {
      color: '#1e3a8a'
    },
    'mobile-header': {
      background: 'rgba(240, 249, 255, 0.9)',
      border: '1px solid rgba(14, 165, 233, 0.3)'
    }
  }
};
