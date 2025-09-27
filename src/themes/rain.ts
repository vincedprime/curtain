const rain = {
  name: 'Stormy Rain',
  category: 'storm',
  icon: 'raindrop',
  background: 'linear-gradient(to bottom, #1e3a8a, #1e40af)',
  colors: {
    primary: '#3b82f6',
    secondary: '#2563eb',
    text: '#dbeafe',
    textSecondary: '#93c5fd',
    accent: '#1d4ed8',
    'streak-background': 'rgba(59, 130, 246, 0.1)',
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
    color: '#2563eb',
  },
  shadows: {
    primary: '0 4px 15px rgba(59, 130, 246, 0.4)',
    secondary: '0 2px 8px rgba(0, 0, 0, 0.1)',
    hover: '0 6px 20px rgba(59, 130, 246, 0.6)',
  },
  effects: ['raindrops'],
  animations: {
    raindrops: {
      count: 50,
      speed: '1s',
    },
  },
  completion: {
    icon: '🌧️',
    title: 'Storm of Success!',
    message: "You've powered through all your habits like a mighty storm!",
  },
  confetti: {
    colors: ['#3b82f6', '#2563eb', '#1d4ed8', '#dbeafe'],
    shape: '0 0 50% 50%',
    size: { width: '8px', height: '8px' },
  },
  components: {
    'date-info': {
      background: 'rgba(30, 58, 138, 0.8)',
      color: '#dbeafe',
      border: '1px solid rgba(37, 99, 235, 0.3)',
    },
    'add-habit': {
      background: 'rgba(30, 58, 138, 0.4)',
      border: '1px solid rgba(37, 99, 235, 0.2)',
    },
    'habit-item': {
      background: 'rgba(30, 58, 138, 0.8)',
      border: '1px solid #2563eb',
      color: '#dbeafe',
    },
    'habit-item-completed': {
      background: 'rgba(59, 130, 246, 0.2)',
      borderColor: '#3b82f6',
    },
    'progress-bar': {
      background: '#1d4ed8',
    },
    'progress-fill': {
      background: 'linear-gradient(90deg, #3b82f6, #2563eb)',
    },
    'streak-counter': {
      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      color: 'white',
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)',
    },
    'add-btn': {
      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
    },
    'footer-info': {
      background: 'rgba(30, 58, 138, 0.6)',
      color: '#93c5fd',
      border: '1px solid rgba(37, 99, 235, 0.5)',
    },
    'modal': {
      background: 'rgba(30, 58, 138, 0.8)',
      border: '1px solid #2563eb',
      color: '#dbeafe',
    },
    'theme-dropdown-menu': {
      background: 'rgba(30, 58, 138, 0.95)',
      border: '1px solid rgba(37, 99, 235, 0.3)',
    },
    'theme-dropdown-option': {
      color: '#93c5fd',
    },
    'mobile-header': {
      background: 'rgba(30, 58, 138, 0.8)',
      border: '1px solid rgba(37, 99, 235, 0.3)',
    },
  },
};

export default rain;