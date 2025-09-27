const cloudyDay = {
  name: 'Cloudy Day',
  category: 'light',
  icon: 'sun',
  background: 'linear-gradient(to bottom, #87ceeb, #e0f2fe)',
  colors: {
    primary: '#f59e0b',
    secondary: '#d97706',
    text: '#1f2937',
    textSecondary: '#6b7280',
    accent: '#0e7490',
    'streak-background': 'rgba(249, 115, 22, 0.1)',
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
    color: '#d1d5db',
  },
  shadows: {
    primary: '0 4px 15px rgba(245, 158, 11, 0.4)',
    secondary: '0 2px 8px rgba(0, 0, 0, 0.1)',
    hover: '0 6px 20px rgba(245, 158, 11, 0.6)',
  },
  effects: ['clouds'],
  animations: {
    clouds: {
      count: 5,
      speed: '60s',
    },
  },
  completion: {
    icon: '☀️',
    title: 'Bright Achievement!',
    message: "You've completed all your habits like a sunny day!",
  },
  confetti: {
    colors: ['#f59e0b', '#d97706', '#fbbf24', '#fde047'],
    shape: '50%',
    size: { width: '8px', height: '8px' },
  },
  components: {
    'date-info': {
      background: 'rgba(255, 255, 255, 0.8)',
      color: '#1f2937',
      border: '1px solid rgba(209, 213, 219, 0.3)',
    },
    'add-habit': {
      background: 'rgba(255, 255, 255, 0.4)',
      border: '1px solid rgba(209, 213, 219, 0.2)',
    },
    'habit-item': {
      background: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid #d1d5db',
      color: '#1f2937',
    },
    'habit-item-completed': {
      background: 'rgba(34, 197, 94, 0.2)',
      borderColor: '#22c55e',
    },
    'progress-bar': {
      background: '#d1d5db',
    },
    'progress-fill': {
      background: 'linear-gradient(90deg, #f59e0b, #d97706)',
    },
    'streak-counter': {
      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
      color: 'white',
      boxShadow: '0 2px 8px rgba(245, 158, 11, 0.4)',
    },
    'add-btn': {
      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
      boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
    },
    'footer-info': {
      background: 'rgba(255, 255, 255, 0.6)',
      color: '#6b7280',
      border: '1px solid rgba(209, 213, 219, 0.5)',
    },
    'modal': {
      background: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid #d1d5db',
      color: '#1f2937',
    },
    'theme-dropdown-menu': {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid rgba(209, 213, 219, 0.3)',
    },
    'theme-dropdown-option': {
      color: '#6b7280',
    },
    'mobile-header': {
      background: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(209, 213, 219, 0.3)',
    },
  },
};

export default cloudyDay;