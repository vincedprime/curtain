import { useState } from 'react';
import { useTheme } from '../lib/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { theme, setTheme } = useTheme();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
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

  // Placeholder handlers
  const handleDayClick = (date: Date) => {
    // TODO: Show day details modal
    alert(date.toDateString());
  };
  const handleDayMouseEnter = (date: Date) => {
    // TODO: Show tooltip
  };
  const handleDayMouseLeave = () => {
    // TODO: Hide tooltip
  };

  return (
    <div className="container">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Habit Calendar</CardTitle>
          <p className="text-muted-foreground">Track your daily progress</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <p>Current theme: {theme}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Change Theme</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTheme('starry-night')}>
                  Starry Night
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('cloudy-day')}>
                  Cloudy Day
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('ocean')}>
                  Ocean
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('forest')}>
                  Forest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('cherry-blossom')}>
                  Cherry Blossom
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('snow')}>
                  Snow
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('rain')}>
                  Rain
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => changeMonth(-1)}>
              &#x2039; Previous
            </Button>
            <h2 className="text-xl font-semibold">
              {monthNames[month]} {year}
            </h2>
            <Button variant="outline" onClick={() => changeMonth(1)}>
              Next &#x203A;
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {allDays.map(({ day, isOtherMonth, date }, idx) => {
              const today = new Date().toDateString();
              const dateStr = date.toDateString();
              return (
                <Button
                  key={idx}
                  variant={dateStr === today && !isOtherMonth ? "default" : "ghost"}
                  className={`aspect-square h-12 ${
                    isOtherMonth ? 'text-muted-foreground' : ''
                  }`}
                  onClick={() => !isOtherMonth && handleDayClick(date)}
                  onMouseEnter={() => !isOtherMonth && handleDayMouseEnter(date)}
                  onMouseLeave={() => !isOtherMonth && handleDayMouseLeave()}
                  disabled={isOtherMonth}
                >
                  {day}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Completion Rate Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-muted rounded"></div>
              <span>No data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-300 rounded"></div>
              <span>0-50%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-300 rounded"></div>
              <span>50-80%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-300 rounded"></div>
              <span>80-100%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Modal overlay for day details (to be implemented) */}
      <div className="modal-overlay" id="day-details-modal" style={{ display: 'none' }}>
        <div className="modal day-details-modal">
          <div className="modal-header">
            <h3 id="day-details-date">Day Details</h3>
            <button className="close-btn">×</button>
          </div>
          <div className="modal-content">
            <div className="completion-summary" id="completion-summary"></div>
            <div className="habits-breakdown" id="habits-breakdown"></div>
          </div>
        </div>
      </div>
      {/* Tooltip placeholder */}
      <div className="tooltip" id="tooltip" style={{ display: 'none' }}>
        <div className="tooltip-content" id="tooltip-content"></div>
      </div>
    </div>
  );
}

export default Calendar;
