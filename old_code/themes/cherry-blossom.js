/**
 * Cherry Blossom Theme Plugin
 */
window.ThemePlugins = window.ThemePlugins || {};
window.ThemePlugins['cherry-blossom'] = {
  name: 'Cherry Blossom',
  category: 'pink',
  icon: 'petal',
  background: 'linear-gradient(to top, #fdf2f8, #fce7f3)',
  colors: {
    primary: '#ec4899',
    secondary: '#db2777',
    text: '#be185d',
    textSecondary: '#db2777',
    accent: '#be185d',
    'streak-background': 'rgba(249, 115, 22, 0.1)',
    success: '#22c55e',
    danger: '#dc2626',
    warning: '#f59e0b',
    info: '#ec4899'
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
    color: '#db2777'
  },
  shadows: {
    primary: '0 4px 15px rgba(236, 72, 153, 0.4)',
    secondary: '0 2px 8px rgba(0, 0, 0, 0.1)',
    hover: '0 6px 20px rgba(236, 72, 153, 0.6)'
  },
  effects: ['petals'],
  animations: {
    petals: {
      count: 25,
      fallSpeed: '10s'
    }
  },
  completion: {
    icon: '🌸',
    title: 'Blooming Beautiful!',
    message: 'Your habits have blossomed perfectly today!'
  },
  confetti: {
    colors: ['#ec4899', '#db2777', '#be185d', '#fdf2f8'],
    shape: '50% 0 50% 0',
    size: { width: '8px', height: '8px' }
  },
  components: {
    'date-info': {
      background: 'rgba(252, 231, 243, 0.8)',
      color: '#be185d',
      border: '1px solid rgba(219, 39, 119, 0.3)'
    },
    'add-habit': {
      background: 'rgba(252, 231, 243, 0.4)',
      border: '1px solid rgba(219, 39, 119, 0.2)'
    },
    'habit-item': {
      background: 'rgba(252, 231, 243, 0.8)',
      border: '1px solid #db2777',
      color: '#be185d'
    },
    'habit-item-completed': {
      background: 'rgba(236, 72, 153, 0.2)',
      borderColor: '#ec4899'
    },
    'progress-bar': {
      background: '#f3e8ff'
    },
    'progress-fill': {
      background: 'linear-gradient(90deg, #ec4899, #db2777)'
    },
    'streak-counter': {
      background: 'linear-gradient(135deg, #ec4899, #db2777)',
      color: 'white',
      boxShadow: '0 2px 8px rgba(236, 72, 153, 0.4)'
    },
    'add-btn': {
      background: 'linear-gradient(135deg, #ec4899, #db2777)',
      boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)'
    },
    'footer-info': {
      background: 'rgba(252, 231, 243, 0.6)',
      color: '#db2777',
      border: '1px solid rgba(219, 39, 119, 0.5)'
    },
    'modal': {
      background: 'rgba(252, 231, 243, 0.8)',
      border: '1px solid #db2777',
      color: '#be185d'
    },
    'theme-dropdown-menu': {
      background: 'rgba(252, 231, 243, 0.95)',
      border: '1px solid rgba(219, 39, 119, 0.3)'
    },
    'theme-dropdown-option': {
      color: '#db2777'
    },
    'mobile-header': {
      background: 'rgba(252, 231, 243, 0.8)',
      border: '1px solid rgba(219, 39, 119, 0.3)'
    }
  }
};
