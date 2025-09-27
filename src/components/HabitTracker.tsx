import React, { useState, useEffect } from 'react';
import { useTheme } from '../lib/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Plus, Calendar, RotateCcw } from 'lucide-react';

interface Habit {
  id: number;
  text: string;
  completed: boolean;
  streak: number;
  lastCompletedDate: string | null;
}

const dailyQuotes = [
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "A journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { text: "You don't have to be great to get started, but you have to get started to be great.", author: "Les Brown" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Progress, not perfection.", author: "Anonymous" },
  { text: "Every master was once a beginner. Every pro was once an amateur.", author: "Robin Sharma" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "Your future is created by what you do today, not tomorrow.", author: "Robert Kiyosaki" }
];

const HabitTracker: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyQuote, setDailyQuote] = useState(dailyQuotes[0]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Load habits from localStorage on component mount
  useEffect(() => {
    loadHabits();
    displayDailyQuote();
    displayCurrentDate();
  }, []);

  // Update progress when habits change
  useEffect(() => {
    updateProgress();
  }, [habits]);

  const loadHabits = () => {
    const today = new Date().toDateString();
    const savedData = localStorage.getItem('habitTracker');
    
    if (savedData) {
      const data = JSON.parse(savedData);
      let loadedHabits: Habit[] = data.habits || [];

      // Data migration for per-habit streaks
      loadedHabits = loadedHabits.map(habit => ({
        ...habit,
        streak: habit.streak || 0,
        lastCompletedDate: habit.lastCompletedDate || null
      }));

      if (data.date !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        loadedHabits.forEach(habit => {
          // Reset streak if the last completion was not yesterday
          if (habit.lastCompletedDate !== yesterdayStr) {
            habit.streak = 0;
          }
          // Reset completion status for the new day
          habit.completed = false;
        });

        setHabits(loadedHabits);
        saveHabits(loadedHabits);
      } else {
        setHabits(loadedHabits);
      }
    }
  };

  const saveHabits = (habitsToSave: Habit[] = habits) => {
    const today = new Date().toDateString();
    localStorage.setItem('habitTracker', JSON.stringify({ date: today, habits: habitsToSave }));
    
    // Also save to historical data for calendar
    saveToHistoricalData(habitsToSave);
  };

  const saveToHistoricalData = (habitsToSave: Habit[] = habits) => {
    const today = new Date().toDateString();
    
    // Load existing historical data
    let historicalData: Record<string, any> = {};
    const saved = localStorage.getItem('habitCalendarData');
    if (saved) {
      try {
        historicalData = JSON.parse(saved);
      } catch (error) {
        console.error('Error loading historical data:', error);
      }
    }
    
    // Save current day's data
    historicalData[today] = {
      date: today,
      habits: habitsToSave.map(h => ({
        id: h.id,
        text: h.text,
        completed: h.completed,
        streak: h.streak
      }))
    };
    
    // Save back to localStorage
    localStorage.setItem('habitCalendarData', JSON.stringify(historicalData));
  };

  const displayDailyQuote = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const quoteIndex = dayOfYear % dailyQuotes.length;
    setDailyQuote(dailyQuotes[quoteIndex]);
  };

  const displayCurrentDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(today);
  };

  const addHabit = () => {
    const habitText = newHabit.trim();
    if (!habitText) {
      showAlertMessage('Please enter a habit!');
      return;
    }
    if (habits.some(h => h.text.toLowerCase() === habitText.toLowerCase())) {
      showAlertMessage('This habit already exists!');
      return;
    }
    
    const newHabitObj: Habit = {
      id: Date.now(),
      text: habitText,
      completed: false,
      streak: 0,
      lastCompletedDate: null
    };
    
    const updatedHabits = [...habits, newHabitObj];
    setHabits(updatedHabits);
    setNewHabit('');
    saveHabits(updatedHabits);
  };

  const toggleHabit = (id: number) => {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    const updatedHabits = habits.map(h => {
      if (h.id === id) {
        if (!h.completed) {
          // Marking as complete
          const newStreak = h.lastCompletedDate === yesterdayStr ? h.streak + 1 : 
                           h.lastCompletedDate !== today ? 1 : h.streak;
          return {
            ...h,
            completed: true,
            streak: newStreak,
            lastCompletedDate: today
          };
        } else {
          // Marking as incomplete
          const newStreak = h.lastCompletedDate === today && h.streak > 1 ? h.streak - 1 : 0;
          const newLastCompletedDate = h.lastCompletedDate === today && h.streak > 1 ? yesterdayStr : null;
          return {
            ...h,
            completed: false,
            streak: newStreak,
            lastCompletedDate: newLastCompletedDate
          };
        }
      }
      return h;
    });

    setHabits(updatedHabits);
    saveHabits(updatedHabits);
  };

  const deleteHabit = (id: number) => {
    setHabitToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (habitToDelete !== null) {
      const updatedHabits = habits.filter(h => h.id !== habitToDelete);
      setHabits(updatedHabits);
      saveHabits(updatedHabits);
    }
    setShowDeleteModal(false);
    setHabitToDelete(null);
  };

  const resetCompleted = () => {
    const updatedHabits = habits.map(h => ({ ...h, completed: false }));
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
  };

  const deleteAllHabits = () => {
    if (habits.length === 0) return;
    if (window.confirm('Are you sure you want to delete all habits? This action cannot be undone.')) {
      setHabits([]);
      saveHabits([]);
    }
  };

  const updateProgress = () => {
    // Progress is calculated in the render method
  };

  const showAlertMessage = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const openCalendar = () => {
    saveToHistoricalData();
    // Navigate to calendar - for now just show alert
    alert('Calendar navigation would go here');
  };

  const totalHabits = habits.length;
  const completedHabits = habits.filter(h => h.completed).length;
  const progressPercentage = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

  return (
    <div className="min-h-screen" style={{ background: 'var(--theme-background, linear-gradient(to top, #0f0f0f, #1a1a2e))' }}>
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="stars"></div>
        <div className="clouds"></div>
        <div className="waves"></div>
        <div className="leaves"></div>
        <div className="petals"></div>
        <div className="snowflakes"></div>
        <div className="raindrops"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-start mb-6">
          <div style={{ color: 'var(--theme-text, #ffffff)' }}>
            <div 
              className="text-sm opacity-80 cursor-pointer hover:opacity-100 transition-opacity"
              onClick={openCalendar}
              title="View Calendar"
            >
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'var(--theme-text, #ffffff)'
                }}
              >
                Change Theme
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="bg-black/80 border-white/20 backdrop-blur-sm"
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <DropdownMenuItem 
                onClick={() => setTheme('starry-night')}
                className="text-white hover:bg-white/10 focus:bg-white/10"
                style={{ color: 'var(--theme-text, #ffffff)' }}
              >
                Starry Night
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('cloudy-day')}
                className="text-white hover:bg-white/10 focus:bg-white/10"
                style={{ color: 'var(--theme-text, #ffffff)' }}
              >
                Cloudy Day
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('ocean')}
                className="text-white hover:bg-white/10 focus:bg-white/10"
                style={{ color: 'var(--theme-text, #ffffff)' }}
              >
                Ocean
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('forest')}
                className="text-white hover:bg-white/10 focus:bg-white/10"
                style={{ color: 'var(--theme-text, #ffffff)' }}
              >
                Forest
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('cherry-blossom')}
                className="text-white hover:bg-white/10 focus:bg-white/10"
                style={{ color: 'var(--theme-text, #ffffff)' }}
              >
                Cherry Blossom
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('snow')}
                className="text-white hover:bg-white/10 focus:bg-white/10"
                style={{ color: 'var(--theme-text, #ffffff)' }}
              >
                Snow
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('rain')}
                className="text-white hover:bg-white/10 focus:bg-white/10"
                style={{ color: 'var(--theme-text, #ffffff)' }}
              >
                Rain
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <Card className="mb-6 bg-white/10 border-white/20" style={{ color: 'var(--theme-text, #ffffff)' }}>
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold">Curtain</CardTitle>
              <p className="text-xl opacity-90">Complete your daily habits</p>
              <div className="mt-4 p-4 bg-white/5 rounded-lg">
                <p className="italic text-lg">"{dailyQuote.text}"</p>
                <p className="text-sm opacity-70 mt-2">— {dailyQuote.author}</p>
              </div>
            </CardHeader>
          </Card>

          {/* Progress Section */}
          {totalHabits > 0 && (
            <Card className="mb-6 bg-white/10 border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Progress value={progressPercentage} className="h-3" />
                  <p className="text-center text-lg">
                    {completedHabits} of {totalHabits} habits completed
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Habits List */}
          <Card className="mb-6 bg-white/10 border-white/20 text-white">
            <CardContent className="pt-6">
              {habits.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🌱</div>
                  <h3 className="text-2xl font-semibold mb-2">Ready to build great habits?</h3>
                  <p className="text-lg opacity-80">Add your first habit below to get started on your journey!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {habits.map((habit) => (
                    <div
                      key={habit.id}
                      className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${
                        habit.completed 
                          ? 'bg-green-500/20 border-green-400/50' 
                          : 'bg-white/5 border-white/20'
                      }`}
                    >
                      <Checkbox
                        checked={habit.completed}
                        onCheckedChange={() => toggleHabit(habit.id)}
                        className="h-5 w-5"
                      />
                      <span className={`flex-1 text-lg ${habit.completed ? 'line-through opacity-70' : ''}`}>
                        {habit.text}
                      </span>
                      {habit.streak > 0 && (
                        <div className="flex items-center space-x-1 bg-orange-500 text-white px-2 py-1 rounded-full text-sm">
                          <span>🔥</span>
                          <span>{habit.streak}</span>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteHabit(habit.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Add Habit */}
          <Card className="mb-6 bg-white/10 border-white/20 text-white">
            <CardContent className="pt-6">
              <div className="flex space-x-3">
                <Input
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  placeholder="Add a new habit"
                  maxLength={100}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                />
                <Button onClick={addHabit} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Habit
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Actions */}
          {habits.length > 0 && (
            <div className="flex space-x-4 justify-center">
              <Button
                variant="outline"
                onClick={resetCompleted}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                variant="outline"
                onClick={deleteAllHabits}
                className="bg-red-500/20 border-red-400/50 text-red-300 hover:bg-red-500/30"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete All
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-white/60 text-sm">
            All completed habits will automatically reset at midnight.
            <br />
            Start fresh each day to build consistent habits!
          </div>
        </div>
      </div>

      {/* Modals */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 bg-white text-black">
            <CardHeader>
              <CardTitle>Delete Habit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Are you sure you want to delete this habit?</p>
              <div className="flex space-x-3 justify-end">
                <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDelete}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showAlert && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg z-50">
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default HabitTracker;
