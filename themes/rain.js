/**
 * Rain Theme Plugin
 */
window.ThemePlugins = window.ThemePlugins || {};
window.ThemePlugins['rain'] = {
  name: 'Stormy Rain',
  category: 'storm',
  icon: 'raindrop',
  background: 'linear-gradient(to top, #374151, #1f2937)',
  colors: {
    primary: '#3b82f6',
    secondary: '#1d4ed8',
    text: '#e5e7eb',
    textSecondary: '#f3f4f6',
    accent: '#1e3a8a',
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
    color: '#3b82f6'
  },
  shadows: {
    primary: '0 4px 15px rgba(59, 130, 246, 0.4)',
    secondary: '0 2px 8px rgba(0, 0, 0, 0.1)',
    hover: '0 6px 20px rgba(59, 130, 246, 0.6)'
  },
  effects: ['raindrops'],
  animations: {
    raindrops: {
      count: 50,
      fallSpeed: '1s'
    }
  },
  completion: {
    icon: '⚡',
    title: 'Electrifying Achievement!',
    message: 'You\'ve powered through all your habits like lightning!'
  },
  confetti: {
    colors: ['#3b82f6', '#1d4ed8', '#1e3a8a', '#6b7280'],
    shape: '0 0 50% 50%',
    size: { width: '3px', height: '12px' }
  },
  components: {
    'date-info': {
      background: 'rgba(55, 65, 81, 0.8)',
      color: '#e5e7eb',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    },
    'add-habit': {
      background: 'rgba(55, 65, 81, 0.4)',
      border: '1px solid rgba(59, 130, 246, 0.2)'
    },
    'habit-item': {
      background: 'rgba(55, 65, 81, 0.8)',
      border: '1px solid #3b82f6',
      color: '#e5e7eb'
    },
    'habit-item-completed': {
      background: 'rgba(30, 58, 138, 0.3)',
      borderColor: '#3b82f6'
    },
    'progress-bar': {
      background: '#4b5563'
    },
    'progress-fill': {
      background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)'
    },
    'streak-counter': {
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      color: 'white',
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)'
    },
    'add-btn': {
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
    },
    'footer-info': {
      background: 'rgba(55, 65, 81, 0.6)',
      color: '#e5e7eb',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    },
    'modal': {
      background: 'rgba(55, 65, 81, 0.8)',
      border: '1px solid #3b82f6',
      color: '#e5e7eb'
    },
    'theme-dropdown-menu': {
      background: 'rgba(55, 65, 81, 0.95)',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    },
    'theme-dropdown-option': {
      color: '#e5e7eb'
    },
    'mobile-header': {
      background: 'rgba(55, 65, 81, 0.8)',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    }
  }
};
