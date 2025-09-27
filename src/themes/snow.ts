const snow = {
  name: 'Winter Snow',
  category: 'winter',
  icon: 'snowflake',
  background: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)',
  colors: {
    primary: '#e2e8f0',
    secondary: '#cbd5e1',
    text: '#1e293b',
    textSecondary: '#64748b',
    accent: '#0ea5e9',
    'streak-background': 'rgba(14, 165, 233, 0.1)',
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
    color: '#cbd5e1',
  },
  shadows: {
    primary: '0 4px 15px rgba(14, 165, 233, 0.3)',
    secondary: '0 2px 8px rgba(0, 0, 0, 0.1)',
    hover: '0 6px 20px rgba(14, 165, 233, 0.4)',
  },
  effects: ['snowflakes'],
  animations: {
    snowflakes: {
      count: 30,
      symbols: ['❄', '❅', '❆', '✻', '✼', '❉'],
      speed: '10s',
    },
  },
  completion: {
    icon: '❄️',
    title: 'Snowy Success!',
    message: "You've completed all your habits like a perfect snowflake!",
  },
  confetti: {
    colors: ['#e2e8f0', '#cbd5e1', '#94a3b8', '#f1f5f9'],
    shape: '50%',
    size: { width: '8px', height: '8px' },
  },
  components: {
    'date-info': {
      background: 'rgba(248, 250, 252, 0.8)',
      color: '#1e293b',
      border: '1px solid rgba(203, 213, 225, 0.3)',
    },
    'add-habit': {
      background: 'rgba(248, 250, 252, 0.4)',
      border: '1px solid rgba(203, 213, 225, 0.2)',
    },
    'habit-item': {
      background: 'rgba(248, 250, 252, 0.8)',
      border: '1px solid #cbd5e1',
      color: '#1e293b',
    },
    'habit-item-completed': {
      background: 'rgba(14, 165, 233, 0.2)',
      borderColor: '#0ea5e9',
    },
    'progress-bar': {
      background: '#cbd5e1',
    },
    'progress-fill': {
      background: 'linear-gradient(90deg, #e2e8f0, #cbd5e1)',
    },
    'streak-counter': {
      background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
      color: 'white',
      boxShadow: '0 2px 8px rgba(14, 165, 233, 0.4)',
    },
    'add-btn': {
      background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
      boxShadow: '0 4px 15px rgba(14, 165, 233, 0.4)',
    },
    'footer-info': {
      background: 'rgba(248, 250, 252, 0.6)',
      color: '#64748b',
      border: '1px solid rgba(203, 213, 225, 0.5)',
    },
    'modal': {
      background: 'rgba(248, 250, 252, 0.8)',
      border: '1px solid #cbd5e1',
      color: '#1e293b',
    },
    'theme-dropdown-menu': {
      background: 'rgba(248, 250, 252, 0.95)',
      border: '1px solid rgba(203, 213, 225, 0.3)',
    },
    'theme-dropdown-option': {
      color: '#64748b',
    },
    'mobile-header': {
      background: 'rgba(248, 250, 252, 0.8)',
      border: '1px solid rgba(203, 213, 225, 0.3)',
    },
  },
};

export default snow;