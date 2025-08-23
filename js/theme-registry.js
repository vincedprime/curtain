/**
 * Theme Registry - Central configuration for all themes
 */
const THEME_REGISTRY = {
  'starry-night': {
    name: 'Starry Night',
    category: 'dark',
    icon: 'moon',
    background: 'linear-gradient(to top, #0f0f0f, #1a1a2e)',
    colors: {
      primary: '#38bdf8',
      secondary: '#0ea5e9',
      text: '#ffffff',
      textSecondary: '#a3a3a3',
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
      color: '#333333'
    },
    shadows: {
      primary: '0 4px 15px rgba(56, 189, 248, 0.4)',
      secondary: '0 2px 8px rgba(0, 0, 0, 0.1)',
      hover: '0 6px 20px rgba(56, 189, 248, 0.6)'
    },
    effects: ['stars'],
    animations: {
      stars: {
        count: 100,
        twinkleSpeed: '2s'
      }
    },
    completion: {
      icon: '✨',
      title: 'Stellar Achievement!',
      message: 'You\'ve completed all your habits like a shining star!'
    },
    confetti: {
      colors: ['#38bdf8', '#0ea5e9', '#f59e0b', '#8b5cf6'],
      shape: '50%',
      size: { width: '8px', height: '8px' }
    },
    components: {
      'date-info': {
        background: 'rgba(26, 26, 26, 0.8)',
        color: '#e5e5e5',
        border: '1px solid rgba(51, 51, 51, 0.3)'
      },
      'add-habit': {
        background: 'rgba(26, 26, 26, 0.4)',
        border: '1px solid rgba(51, 51, 51, 0.2)'
      },
      'habit-item': {
        background: '#1a1a1a',
        border: '1px solid #333',
        color: '#e5e5e5'
      },
      'habit-item-completed': {
        background: '#0f2a1a',
        borderColor: '#22c55e'
      },
      'progress-bar': {
        background: '#333'
      },
      'progress-fill': {
        background: 'linear-gradient(90deg, #38bdf8, #0ea5e9)'
      },
      'streak-counter': {
        background: 'linear-gradient(135deg, #f97316, #ea580c)',
        color: 'white',
        boxShadow: '0 2px 8px rgba(249, 115, 22, 0.4)'
      },
      'add-btn': {
        background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
        boxShadow: '0 4px 15px rgba(56, 189, 248, 0.4)'
      },
      'footer-info': {
        background: 'rgba(26, 26, 26, 0.6)',
        color: '#a3a3a3',
        border: '1px solid rgba(51, 51, 51, 0.5)'
      },
      'modal': {
        background: '#1a1a1a',
        border: '1px solid #333',
        color: '#e5e5e5'
      },
      'theme-dropdown-menu': {
        background: 'rgba(26, 26, 26, 0.95)',
        border: '1px solid rgba(51, 51, 51, 0.3)'
      },
      'theme-dropdown-option': {
        color: '#d1d5db'
      },
      'mobile-header': {
        background: 'rgba(26, 26, 26, 0.8)',
        border: '1px solid rgba(51, 51, 51, 0.3)'
      }
    }
  },

  'cloudy-day': {
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
  },

  'ocean': {
    name: 'Ocean Depths',
    category: 'blue',
    icon: 'bubble',
    background: 'linear-gradient(to top, #1e3a8a, #0c4a6e)',
    colors: {
      primary: '#06b6d4',
      secondary: '#0891b2',
      text: '#ecfeff',
      textSecondary: '#a5f3fc',
      accent: '#0e7490',
      success: '#22c55e',
      danger: '#dc2626',
      warning: '#f59e0b',
      info: '#06b6d4'
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
      color: '#0891b2'
    },
    shadows: {
      primary: '0 4px 15px rgba(6, 182, 212, 0.4)',
      secondary: '0 2px 8px rgba(0, 0, 0, 0.1)',
      hover: '0 6px 20px rgba(6, 182, 212, 0.6)'
    },
    effects: ['waves'],
    animations: {
      waves: {
        waveCount: 3,
        bubbleCount: 15,
        speed: '12s'
      }
    },
    completion: {
      icon: '🌊',
      title: 'Wave of Success!',
      message: 'You\'ve surfed through all your habits today!'
    },
    confetti: {
      colors: ['#06b6d4', '#0891b2', '#0e7490', '#ecfeff'],
      shape: '50%',
      size: { width: '8px', height: '8px' }
    },
    components: {
      'date-info': {
        background: 'rgba(20, 83, 109, 0.8)',
        color: '#ecfeff',
        border: '1px solid rgba(8, 145, 178, 0.3)'
      },
      'add-habit': {
        background: 'rgba(20, 83, 109, 0.4)',
        border: '1px solid rgba(8, 145, 178, 0.2)'
      },
      'habit-item': {
        background: 'rgba(20, 83, 109, 0.8)',
        border: '1px solid #0891b2',
        color: '#ecfeff'
      },
      'habit-item-completed': {
        background: 'rgba(6, 182, 212, 0.2)',
        borderColor: '#06b6d4'
      },
      'progress-bar': {
        background: '#0e7490'
      },
      'progress-fill': {
        background: 'linear-gradient(90deg, #06b6d4, #0891b2)'
      },
      'streak-counter': {
        background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        color: 'white',
        boxShadow: '0 2px 8px rgba(6, 182, 212, 0.4)'
      },
      'add-btn': {
        background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)'
      },
      'footer-info': {
        background: 'rgba(20, 83, 109, 0.6)',
        color: '#a5f3fc',
        border: '1px solid rgba(8, 145, 178, 0.5)'
      },
      'modal': {
        background: 'rgba(20, 83, 109, 0.8)',
        border: '1px solid #0891b2',
        color: '#ecfeff'
      },
      'theme-dropdown-menu': {
        background: 'rgba(20, 83, 109, 0.95)',
        border: '1px solid rgba(8, 145, 178, 0.3)'
      },
      'theme-dropdown-option': {
        color: '#a5f3fc'
      },
      'mobile-header': {
        background: 'rgba(20, 83, 109, 0.8)',
        border: '1px solid rgba(8, 145, 178, 0.3)'
      }
    }
  },

  'forest': {
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
  },

  'cherry-blossom': {
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
  },

  'snow': {
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
  },

  'rain': {
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
  }
};

// Export for use in main application
window.THEME_REGISTRY = THEME_REGISTRY;
