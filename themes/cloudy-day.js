/**
 * Cloudy Day Theme Plugin
 */
window.ThemePlugins = window.ThemePlugins || {};
window.ThemePlugins['cloudy-day'] = {
  name: 'Cloudy Day',
  category: 'light',
  icon: 'sun',
  background: 'linear-gradient(to top, #87ceeb, #fdfdfd)',
  colors: {
    primary: '#fbbf24',
    secondary: '#f59e0b',
    text: '#222222',
    textSecondary: '#555555',
    accent: '#f97316',
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
    color: '#cccccc'
  },
  shadows: {
    primary: '0 4px 15px rgba(251, 191, 36, 0.4)',
    secondary: '0 2px 8px rgba(0, 0, 0, 0.1)',
    hover: '0 6px 20px rgba(251, 191, 36, 0.6)'
  },
  effects: ['clouds'],
  animations: {
    clouds: {
      count: 5,
      speed: '60s'
    }
  },
  completion: {
    icon: '🌟',
    title: 'Bright Success!',
    message: 'You\'ve completed all your habits for today!'
  },
  confetti: {
    colors: ['#fbbf24', '#f59e0b', '#ef4444', '#22c55e', '#3b82f6'],
    shape: '50%',
    size: { width: '8px', height: '8px' }
  },
  components: {
    'date-info': {
      background: 'rgba(255, 255, 255, 0.8)',
      color: '#333',
      border: '1px solid rgba(204, 204, 204, 0.3)'
    },
    'add-habit': {
      background: 'rgba(255, 255, 255, 0.4)',
      border: '1px solid rgba(204, 204, 204, 0.2)'
    },
    'habit-item': {
      background: '#ffffff',
      border: '1px solid #ccc',
      color: '#222'
    },
    'habit-item-completed': {
      background: '#e6ffe6',
      borderColor: '#22c55e'
    },
    'progress-bar': {
      background: '#ddd'
    },
    'progress-fill': {
      background: 'linear-gradient(90deg, #fbbf24, #f59e0b)'
    },
    'streak-counter': {
      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      color: 'white',
      boxShadow: '0 2px 8px rgba(251, 191, 36, 0.3)'
    },
    'add-btn': {
      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)'
    },
    'footer-info': {
      background: 'rgba(255, 255, 255, 0.6)',
      color: '#666',
      border: '1px solid rgba(204, 204, 204, 0.5)'
    },
    'modal': {
      background: '#ffffff',
      border: '1px solid #ccc',
      color: '#222'
    },
    'theme-dropdown-menu': {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid rgba(204, 204, 204, 0.3)'
    },
    'theme-dropdown-option': {
      color: '#4b5563'
    },
    'mobile-header': {
      background: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(204, 204, 204, 0.3)'
    }
  }
};
