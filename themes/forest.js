/**
 * Forest Theme Plugin
 */
window.ThemePlugins = window.ThemePlugins || {};
window.ThemePlugins['forest'] = {
  name: 'Mystic Forest',
  category: 'green',
  icon: 'leaf',
  background: 'linear-gradient(to top, #064e3b, #166534)',
  colors: {
    primary: '#22c55e',
    secondary: '#16a34a',
    text: '#dcfce7',
    textSecondary: '#bbf7d0',
    accent: '#15803d',
    'streak-background': 'rgba(249, 115, 22, 0.1)',
    success: '#22c55e',
    danger: '#dc2626',
    warning: '#f59e0b',
    info: '#10b981'
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
    color: '#16a34a'
  },
  shadows: {
    primary: '0 4px 15px rgba(34, 197, 94, 0.4)',
    secondary: '0 2px 8px rgba(0, 0, 0, 0.1)',
    hover: '0 6px 20px rgba(34, 197, 94, 0.6)'
  },
  effects: ['leaves'],
  animations: {
    leaves: {
      count: 20,
      fallSpeed: '8s'
    }
  },
  completion: {
    icon: '🌳',
    title: 'Growing Strong!',
    message: 'Your habits are flourishing like a mighty forest!'
  },
  confetti: {
    colors: ['#22c55e', '#16a34a', '#15803d', '#dcfce7'],
    shape: '0 100% 0 100%',
    size: { width: '8px', height: '8px' }
  },
  components: {
    'date-info': {
      background: 'rgba(20, 83, 45, 0.8)',
      color: '#dcfce7',
      border: '1px solid rgba(22, 163, 74, 0.3)'
    },
    'add-habit': {
      background: 'rgba(20, 83, 45, 0.4)',
      border: '1px solid rgba(22, 163, 74, 0.2)'
    },
    'habit-item': {
      background: 'rgba(20, 83, 45, 0.8)',
      border: '1px solid #16a34a',
      color: '#dcfce7'
    },
    'habit-item-completed': {
      background: 'rgba(34, 197, 94, 0.2)',
      borderColor: '#22c55e'
    },
    'progress-bar': {
      background: '#15803d'
    },
    'progress-fill': {
      background: 'linear-gradient(90deg, #10b981, #059669)'
    },
    'streak-counter': {
      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
      color: 'white',
      boxShadow: '0 2px 8px rgba(34, 197, 94, 0.4)'
    },
    'add-btn': {
      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
      boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)'
    },
    'footer-info': {
      background: 'rgba(20, 83, 45, 0.6)',
      color: '#bbf7d0',
      border: '1px solid rgba(22, 163, 74, 0.5)'
    },
    'modal': {
      background: 'rgba(20, 83, 45, 0.8)',
      border: '1px solid #16a34a',
      color: '#dcfce7'
    },
    'theme-dropdown-menu': {
      background: 'rgba(20, 83, 45, 0.95)',
      border: '1px solid rgba(22, 163, 74, 0.3)'
    },
    'theme-dropdown-option': {
      color: '#bbf7d0'
    },
    'mobile-header': {
      background: 'rgba(20, 83, 45, 0.8)',
      border: '1px solid rgba(22, 163, 74, 0.3)'
    }
  }
};
