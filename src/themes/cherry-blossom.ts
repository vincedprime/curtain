const cherryBlossom = {
  name: 'Cherry Blossom',
  category: 'pink',
  icon: 'petal',
  background: 'linear-gradient(to bottom, #831843, #be185d)',
  colors: {
    primary: '#f472b6',
    secondary: '#ec4899',
    text: '#fdf2f8',
    textSecondary: '#fce7f3',
    accent: '#be185d',
    'streak-background': 'rgba(244, 114, 182, 0.1)',
    success: '#22c55e',
    danger: '#dc2626',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '400',
    headingWeight: '700',
  },
  borders: {
    width: '1px',
    style: 'solid',
    radius: '8px',
    color: '#ec4899',
  },
  shadows: {
    primary: '0 4px 15px rgba(244, 114, 182, 0.4)',
    secondary: '0 2px 8px rgba(0, 0, 0, 0.1)',
    hover: '0 6px 20px rgba(244, 114, 182, 0.6)',
  },
  effects: ['petals'],
  animations: {
    petals: {
      count: 25,
      speed: '10s',
    },
  },
  completion: {
    icon: '🌸',
    title: 'Blossoming Success!',
    message: "You've bloomed through all your habits beautifully!",
  },
  confetti: {
    colors: ['#f472b6', '#ec4899', '#db2777', '#fdf2f8'],
    shape: '50% 0 50% 0',
    size: { width: '8px', height: '8px' },
  },
  components: {
    'date-info': {
      background: 'rgba(131, 24, 67, 0.8)',
      color: '#fdf2f8',
      border: '1px solid rgba(236, 72, 153, 0.3)',
    },
    'add-habit': {
      background: 'rgba(131, 24, 67, 0.4)',
      border: '1px solid rgba(236, 72, 153, 0.2)',
    },
    'habit-item': {
      background: 'rgba(131, 24, 67, 0.8)',
      border: '1px solid #ec4899',
      color: '#fdf2f8',
    },
    'habit-item-completed': {
      background: 'rgba(244, 114, 182, 0.2)',
      borderColor: '#f472b6',
    },
    'progress-bar': {
      background: '#be185d',
    },
    'progress-fill': {
      background: 'linear-gradient(90deg, #f472b6, #ec4899)',
    },
    'streak-counter': {
      background: 'linear-gradient(135deg, #f472b6, #ec4899)',
      color: 'white',
      boxShadow: '0 2px 8px rgba(244, 114, 182, 0.4)',
    },
    'add-btn': {
      background: 'linear-gradient(135deg, #f472b6, #ec4899)',
      boxShadow: '0 4px 15px rgba(244, 114, 182, 0.4)',
    },
    'footer-info': {
      background: 'rgba(131, 24, 67, 0.6)',
      color: '#fce7f3',
      border: '1px solid rgba(236, 72, 153, 0.5)',
    },
    'modal': {
      background: 'rgba(131, 24, 67, 0.8)',
      border: '1px solid #ec4899',
      color: '#fdf2f8',
    },
    'theme-dropdown-menu': {
      background: 'rgba(131, 24, 67, 0.95)',
      border: '1px solid rgba(236, 72, 153, 0.3)',
    },
    'theme-dropdown-option': {
      color: '#fce7f3',
    },
    'mobile-header': {
      background: 'rgba(131, 24, 67, 0.8)',
      border: '1px solid rgba(236, 72, 153, 0.3)',
    },
  },
};

export default cherryBlossom;