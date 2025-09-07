/**
 * Manga Theme Plugin - Comic book inspired black and white theme
 */
window.ThemePlugins = window.ThemePlugins || {};
window.ThemePlugins['manga'] = {
  name: 'Manga Style',
  category: 'monochrome',
  icon: 'book',
  background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
  colors: {
    primary: '#212529',
    secondary: '#495057',
    text: '#212529',
    textSecondary: '#6c757d',
    accent: '#dc3545',
    'streak-background': 'rgba(220, 53, 69, 0.1)',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8'
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Marker Felt", cursive',
    fontWeight: '600',
    headingWeight: '900'
  },
  borders: {
    width: '3px',
    style: 'solid',
    radius: '0px',
    color: '#212529'
  },
  shadows: {
    primary: '4px 4px 0px #212529',
    secondary: '2px 2px 0px #495057',
    hover: '6px 6px 0px #212529'
  },
  effects: ['panels'],
  animations: {
    panels: {
      count: 8,
      opacity: 0.1
    }
  },
  completion: {
    icon: '💥',
    title: 'BAM! Achievement Unlocked!',
    message: 'You\'ve completed all your habits like a true manga hero!'
  },
  confetti: {
    colors: ['#212529', '#495057', '#dc3545', '#ffc107'],
    shape: '0%',
    size: { width: '12px', height: '12px' }
  },
  components: {
    'date-info': {
      background: '#ffffff',
      color: '#212529',
      border: '3px solid #212529',
      boxShadow: '4px 4px 0px #212529'
    },
    'add-habit': {
      background: '#ffffff',
      border: '3px solid #212529',
      boxShadow: '2px 2px 0px #495057'
    },
    'habit-item': {
      background: '#ffffff',
      border: '3px solid #212529',
      color: '#212529',
      boxShadow: '2px 2px 0px #495057'
    },
    'habit-item-completed': {
      background: '#28a745',
      borderColor: '#212529',
      color: '#ffffff',
      boxShadow: '2px 2px 0px #1e7e34'
    },
    'progress-bar': {
      background: '#e9ecef',
      border: '2px solid #212529'
    },
    'progress-fill': {
      background: '#dc3545',
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
    },
    'streak-counter': {
      background: '#ffc107',
      color: '#212529',
      border: '3px solid #212529',
      boxShadow: '3px 3px 0px #212529',
      fontWeight: '900'
    },
    'add-btn': {
      background: '#dc3545',
      color: '#ffffff',
      border: '3px solid #212529',
      boxShadow: '4px 4px 0px #212529',
      fontWeight: '900'
    },
    'footer-info': {
      background: '#ffffff',
      color: '#495057',
      border: '3px solid #212529',
      boxShadow: '2px 2px 0px #495057'
    },
    'modal': {
      background: '#ffffff',
      border: '4px solid #212529',
      color: '#212529',
      boxShadow: '6px 6px 0px #495057'
    },
    'theme-dropdown-menu': {
      background: '#ffffff',
      border: '3px solid #212529',
      boxShadow: '4px 4px 0px #495057'
    },
    'theme-dropdown-option': {
      color: '#212529',
      fontWeight: '600'
    },
    'mobile-header': {
      background: '#ffffff',
      border: '3px solid #212529',
      boxShadow: '2px 2px 0px #495057'
    }
  }
};
