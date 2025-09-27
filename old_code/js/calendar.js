/**
 * Calendar functionality for habit tracking
 */

// Global variables
let themeEngine = null;
let currentDate = new Date();
let historicalData = {};

// Initialize the calendar page
async function init() {
  // Initialize theme engine
  themeEngine = new ThemeEngine();
  await themeEngine.init(THEME_REGISTRY);
  
  loadHistoricalData();
  renderCalendar();
  setupEventListeners();
}

// Load historical habit data from localStorage
function loadHistoricalData() {
  const saved = localStorage.getItem('habitCalendarData');
  if (saved) {
    try {
      historicalData = JSON.parse(saved);
    } catch (error) {
      console.error('Error loading historical data:', error);
      historicalData = {};
    }
  }
}

// Save historical data to localStorage
function saveHistoricalData() {
  localStorage.setItem('habitCalendarData', JSON.stringify(historicalData));
}

// Get habit data for a specific date
function getDateData(dateStr) {
  return historicalData[dateStr] || null;
}

// Calculate completion level for a date
function getCompletionLevel(dateStr) {
  const data = getDateData(dateStr);
  if (!data || !data.habits || data.habits.length === 0) {
    return 'none';
  }
  
  const completedCount = data.habits.filter(h => h.completed).length;
  const totalCount = data.habits.length;
  const percentage = (completedCount / totalCount) * 100;
  
  if (percentage === 0) return 'low';
  if (percentage <= 50) return 'low';
  if (percentage <= 80) return 'medium';
  return 'high';
}

// Render the calendar
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Update month/year display
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  document.getElementById('month-year').textContent = `${monthNames[month]} ${year}`;
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  // Get previous month details for padding
  const prevMonth = new Date(year, month - 1, 0);
  const daysInPrevMonth = prevMonth.getDate();
  
  const grid = document.getElementById('calendar-grid');
  grid.innerHTML = '';
  
  // Add previous month days (grayed out)
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const dayElement = createDayElement(day, true, new Date(year, month - 1, day));
    grid.appendChild(dayElement);
  }
  
  // Add current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = createDayElement(day, false, new Date(year, month, day));
    grid.appendChild(dayElement);
  }
  
  // Add next month days to complete the grid
  const totalCells = grid.children.length;
  const remainingCells = 42 - totalCells; // 6 rows × 7 days
  for (let day = 1; day <= remainingCells; day++) {
    const dayElement = createDayElement(day, true, new Date(year, month + 1, day));
    grid.appendChild(dayElement);
  }
}

// Create a day element
function createDayElement(day, isOtherMonth, date) {
  const dayElement = document.createElement('div');
  dayElement.className = 'calendar-day';
  dayElement.textContent = day;
  
  if (isOtherMonth) {
    dayElement.classList.add('other-month');
    return dayElement;
  }
  
  const dateStr = date.toDateString();
  const today = new Date().toDateString();
  
  // Mark today
  if (dateStr === today) {
    dayElement.classList.add('today');
  }
  
  // Set completion level
  const level = getCompletionLevel(dateStr);
  dayElement.setAttribute('data-level', level);
  
  // Add click handler for day details
  dayElement.addEventListener('click', () => showDayDetails(date));
  
  // Add hover handlers for tooltip
  dayElement.addEventListener('mouseenter', (e) => showTooltip(e, date));
  dayElement.addEventListener('mouseleave', hideTooltip);
  
  return dayElement;
}

// Show tooltip with habit information
function showTooltip(event, date) {
  const tooltip = document.getElementById('tooltip');
  const content = document.getElementById('tooltip-content');
  const dateStr = date.toDateString();
  const data = getDateData(dateStr);
  
  if (!data || !data.habits || data.habits.length === 0) {
    content.innerHTML = `
      <div class="tooltip-date">${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
      <div class="tooltip-habits">No habit data</div>
    `;
  } else {
    const completedCount = data.habits.filter(h => h.completed).length;
    const totalCount = data.habits.length;
    const percentage = Math.round((completedCount / totalCount) * 100);
    
    content.innerHTML = `
      <div class="tooltip-date">${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
      <div class="tooltip-habits">${completedCount}/${totalCount} habits completed (${percentage}%)</div>
    `;
  }
  
  // Position tooltip
  const rect = event.target.getBoundingClientRect();
  tooltip.style.left = `${rect.left + rect.width / 2}px`;
  tooltip.style.top = `${rect.top - 10}px`;
  tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
  
  tooltip.classList.add('show');
}

// Hide tooltip
function hideTooltip() {
  const tooltip = document.getElementById('tooltip');
  tooltip.classList.remove('show');
}

// Show detailed day information
function showDayDetails(date) {
  const dateStr = date.toDateString();
  const data = getDateData(dateStr);
  
  // Update modal title
  document.getElementById('day-details-date').textContent = 
    date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  
  const summaryDiv = document.getElementById('completion-summary');
  const breakdownDiv = document.getElementById('habits-breakdown');
  
  if (!data || !data.habits || data.habits.length === 0) {
    summaryDiv.innerHTML = `
      <div class="summary-rate">No Data</div>
      <div class="summary-text">No habits recorded for this day</div>
    `;
    breakdownDiv.innerHTML = '<p style="text-align: center; color: var(--theme-textSecondary); font-style: italic;">No habits to display</p>';
  } else {
    const completedCount = data.habits.filter(h => h.completed).length;
    const totalCount = data.habits.length;
    const percentage = Math.round((completedCount / totalCount) * 100);
    
    summaryDiv.innerHTML = `
      <div class="summary-rate">${percentage}%</div>
      <div class="summary-text">${completedCount} of ${totalCount} habits completed</div>
    `;
    
    breakdownDiv.innerHTML = data.habits.map(habit => `
      <div class="habit-detail">
        <div class="habit-status ${habit.completed ? 'completed' : 'incomplete'}">
          ${habit.completed ? '✓' : '○'}
        </div>
        <div class="habit-detail-text">${habit.text}</div>
      </div>
    `).join('');
  }
  
  document.getElementById('day-details-modal').classList.add('show');
}

// Close day details modal
function closeDayDetails() {
  document.getElementById('day-details-modal').classList.remove('show');
}

// Navigate to previous/next month
function changeMonth(delta) {
  currentDate.setMonth(currentDate.getMonth() + delta);
  renderCalendar();
}

// Navigate back to main page
function goHome() {
  window.location.href = 'index.html';
}

// Theme management functions (copied from main page)
function selectTheme(theme) {
  if (themeEngine && ['starry-night', 'cloudy-day', 'ocean', 'forest', 'cherry-blossom', 'snow', 'rain'].includes(theme)) {
    themeEngine.switchTheme(theme);
  }
}

function toggleThemeDropdown() {
  const dropdown = document.getElementById('theme-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('open');
  }
}

// Set up event listeners
function setupEventListeners() {
  // Modal close on backdrop click
  document.getElementById('day-details-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closeDayDetails();
    }
  });
  
  // Theme dropdown options
  const themeOptions = document.querySelectorAll('.theme-dropdown-option');
  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.dataset.theme;
      selectTheme(theme);
      const dropdown = document.getElementById('theme-dropdown');
      if (dropdown) dropdown.classList.remove('open');
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('theme-dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export functions for global access
window.changeMonth = changeMonth;
window.goHome = goHome;
window.toggleThemeDropdown = toggleThemeDropdown;
window.closeDayDetails = closeDayDetails;
