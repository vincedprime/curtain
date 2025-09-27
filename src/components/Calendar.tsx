import { useState, useEffect } from 'react';
import { useTheme } from '../lib/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Modal } from '@/components/ui/modal';
import { ArrowLeft, Sun, Moon, Waves, Leaf, Flower, Snowflake, Droplets } from 'lucide-react';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

interface HistoricalData {
  [date: string]: {
    date: string;
    habits: Array<{
      id: number;
      text: string;
      completed: boolean;
      streak: number;
    }>;
  };
}

interface CalendarProps {
  onGoBack: () => void;
}

function Calendar({ onGoBack }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { theme, setTheme } = useTheme();
  const [historicalData, setHistoricalData] = useState<HistoricalData>({});
  const [showDayDetails, setShowDayDetails] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Load historical data on component mount
  useEffect(() => {
    loadHistoricalData();
  }, []);

  const loadHistoricalData = () => {
    const saved = localStorage.getItem('habitCalendarData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setHistoricalData(data);
      } catch (error) {
        console.error('Error loading historical data:', error);
        setHistoricalData({});
      }
    }
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const getDateData = (dateStr: string) => {
    return historicalData[dateStr] || null;
  };

  const getCompletionLevel = (dateStr: string) => {
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
  };

  // Calendar grid logic
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  const prevMonth = new Date(year, month - 1, 0);
  const daysInPrevMonth = prevMonth.getDate();

  // Previous month days (for padding)
  const prevMonthDays = [];
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    prevMonthDays.push({
      day: daysInPrevMonth - i,
      isOtherMonth: true,
      date: new Date(year, month - 1, daysInPrevMonth - i),
    });
  }

  // Current month days
  const currentMonthDays = [];
  for (let day = 1; day <= daysInMonth; day++) {
    currentMonthDays.push({
      day,
      isOtherMonth: false,
      date: new Date(year, month, day),
    });
  }

  // Next month days (to fill 6x7 grid)
  const totalCells = prevMonthDays.length + currentMonthDays.length;
  const remainingCells = 42 - totalCells;
  const nextMonthDays = [];
  for (let day = 1; day <= remainingCells; day++) {
    nextMonthDays.push({
      day,
      isOtherMonth: true,
      date: new Date(year, month + 1, day),
    });
  }

  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setShowDayDetails(true);
  };

  const handleDayMouseEnter = (event: React.MouseEvent, date: Date) => {
    const data = getDateData(date.toDateString());
    if (data && data.habits && data.habits.length > 0) {
      const completedCount = data.habits.filter(h => h.completed).length;
      const totalCount = data.habits.length;
      const percentage = Math.round((completedCount / totalCount) * 100);
      
      setTooltipContent(`${completedCount}/${totalCount} habits completed (${percentage}%)`);
    } else {
      setTooltipContent('No habit data');
    }
    
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setShowTooltip(true);
  };

  const handleDayMouseLeave = () => {
    setShowTooltip(false);
  };

  const closeDayDetails = () => {
    setShowDayDetails(false);
    setSelectedDate(null);
  };

  const goHome = () => {
    onGoBack();
  };

  const getThemeIcon = (themeName: string) => {
    switch (themeName) {
      case 'starry-night':
        return <Moon className="h-4 w-4" />;
      case 'cloudy-day':
        return <Sun className="h-4 w-4" />;
      case 'ocean':
        return <Waves className="h-4 w-4" />;
      case 'forest':
        return <Leaf className="h-4 w-4" />;
      case 'cherry-blossom':
        return <Flower className="h-4 w-4" />;
      case 'snow':
        return <Snowflake className="h-4 w-4" />;
      case 'rain':
        return <Droplets className="h-4 w-4" />;
      default:
        return <Moon className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--theme-background, linear-gradient(to top, #0f0f0f, #1a1a2e))' }}>
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div id="stars" className="stars"></div>
        <div id="clouds" className="clouds"></div>
        <div id="waves" className="waves"></div>
        <div id="leaves" className="leaves"></div>
        <div id="petals" className="petals"></div>
        <div id="snowflakes" className="snowflakes"></div>
        <div id="raindrops" className="raindrops"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={goHome}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Habits
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm flex items-center gap-2"
              >
                {getThemeIcon(theme)}
                Change Theme
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="bg-black/80 border-white/20 backdrop-blur-sm"
            >
              <DropdownMenuItem 
                onClick={() => setTheme('starry-night')}
                className="text-white hover:bg-white/10 flex items-center gap-2"
              >
                {getThemeIcon('starry-night')}
                Starry Night
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('cloudy-day')}
                className="text-white hover:bg-white/10 flex items-center gap-2"
              >
                {getThemeIcon('cloudy-day')}
                Cloudy Day
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('ocean')}
                className="text-white hover:bg-white/10 flex items-center gap-2"
              >
                {getThemeIcon('ocean')}
                Ocean
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('forest')}
                className="text-white hover:bg-white/10 flex items-center gap-2"
              >
                {getThemeIcon('forest')}
                Forest
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('cherry-blossom')}
                className="text-white hover:bg-white/10 flex items-center gap-2"
              >
                {getThemeIcon('cherry-blossom')}
                Cherry Blossom
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('snow')}
                className="text-white hover:bg-white/10 flex items-center gap-2"
              >
                {getThemeIcon('snow')}
                Snow
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('rain')}
                className="text-white hover:bg-white/10 flex items-center gap-2"
              >
                {getThemeIcon('rain')}
                Rain
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6 bg-white/10 border-white/20" style={{ color: 'var(--theme-text, #ffffff)' }}>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Habit Calendar</CardTitle>
              <p className="text-xl opacity-90">Track your daily progress</p>
            </CardHeader>
          </Card>
          {/* Calendar Navigation */}
          <Card className="mb-6 bg-white/10 border-white/20">
            <CardContent className="pt-6">
              <div className="calendar-nav">
                <Button 
                  variant="outline" 
                  onClick={() => changeMonth(-1)}
                  className="nav-btn"
                >
                  &#x2039; Previous
                </Button>
                <h2 className="month-year">
                  {monthNames[month]} {year}
                </h2>
                <Button 
                  variant="outline" 
                  onClick={() => changeMonth(1)}
                  className="nav-btn"
                >
                  Next &#x203A;
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Calendar Grid */}
          <Card className="mb-6 bg-white/10 border-white/20">
            <CardContent className="p-6">
              <div className="calendar-container">
                <div className="calendar-weekdays">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="weekday">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="calendar-grid">
                  {allDays.map(({ day, isOtherMonth, date }, idx) => {
                    const today = new Date().toDateString();
                    const dateStr = date.toDateString();
                    const completionLevel = getCompletionLevel(dateStr);
                    const isToday = dateStr === today && !isOtherMonth;
                    
                    return (
                      <div
                        key={idx}
                        className={`calendar-day ${isToday ? 'today' : ''} ${isOtherMonth ? 'other-month' : ''}`}
                        data-level={completionLevel}
                        onClick={() => !isOtherMonth && handleDayClick(date)}
                        onMouseEnter={(e) => !isOtherMonth && handleDayMouseEnter(e, date)}
                        onMouseLeave={() => !isOtherMonth && handleDayMouseLeave()}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-6">
              <div className="legend">
                <div className="legend-title">Completion Rate</div>
                <div className="legend-items">
                  <div className="legend-item">
                    <div className="legend-color" data-level="none"></div>
                    <span>No data</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" data-level="low"></div>
                    <span>0-50%</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" data-level="medium"></div>
                    <span>50-80%</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" data-level="high"></div>
                    <span>80-100%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Day Details Modal */}
      <Modal
        isOpen={showDayDetails && !!selectedDate}
        onClose={closeDayDetails}
        title={selectedDate ? selectedDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }) : ''}
        className="day-details-modal max-w-lg"
      >
        {(() => {
          if (!selectedDate) return null;
          
          const data = getDateData(selectedDate.toDateString());
          if (!data || !data.habits || data.habits.length === 0) {
            return (
              <>
                <div className="completion-summary">
                  <div className="summary-rate">No Data</div>
                  <div className="summary-text">No habits recorded for this day</div>
                </div>
                <div className="habits-breakdown">
                  <p className="text-center text-white/60 italic">No habits to display</p>
                </div>
              </>
            );
          } else {
            const completedCount = data.habits.filter(h => h.completed).length;
            const totalCount = data.habits.length;
            const percentage = Math.round((completedCount / totalCount) * 100);
            
            return (
              <>
                <div className="completion-summary">
                  <div className="summary-rate">{percentage}%</div>
                  <div className="summary-text">{completedCount} of {totalCount} habits completed</div>
                </div>
                <div className="habits-breakdown">
                  {data.habits.map((habit, idx) => (
                    <div key={idx} className="habit-detail">
                      <div className={`habit-status ${habit.completed ? 'completed' : 'incomplete'}`}>
                        {habit.completed ? '✓' : '○'}
                      </div>
                      <div className="habit-detail-text">{habit.text}</div>
                    </div>
                  ))}
                </div>
              </>
            );
          }
        })()}
      </Modal>

      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="tooltip show"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          <div className="tooltip-content">
            <div className="tooltip-date">
              {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div className="tooltip-habits">{tooltipContent}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
