# Curtain: React + Supabase Migration Guide

## Project Overview
Your current project is a beautiful habit tracking application built with vanilla HTML, CSS, and JavaScript. It features:
- **8 dynamic themes** with animated backgrounds (starry-night, cloudy-day, ocean, forest, cherry-blossom, snow, rain, manga)
- **Habit management** with streak tracking and completion animations
- **Calendar view** for historical habit data
- **Local storage** for data persistence
- **Responsive design** with mobile support

## Migration Strategy: Vanilla JS → React + Supabase

### Phase 1: Project Setup & Environment

#### 1.1 Initialize React Project
```bash
# Create new React app with TypeScript
npx create-react-app curtain-react --template typescript
cd curtain-react

# Install additional dependencies
npm install @supabase/supabase-js
npm install react-router-dom
npm install @types/react-router-dom
npm install framer-motion  # For animations
npm install react-hot-toast  # For notifications
npm install lucide-react  # For icons
```

#### 1.2 Install Development Dependencies
```bash
npm install -D @types/node
npm install -D tailwindcss postcss autoprefixer
npm install -D @tailwindcss/forms
npm install -D eslint-plugin-react-hooks
```

#### 1.3 Setup Tailwind CSS
```bash
npx tailwindcss init -p
```

#### 1.4 Configure TypeScript
Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

### Phase 2: Supabase Backend Setup

#### 2.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project: "curtain-habits"
3. Note down your project URL and anon key

#### 2.2 Database Schema Design
Create the following tables in Supabase SQL Editor:

```sql
-- Users table (handled by Supabase Auth)
-- No need to create manually

-- Habits table
CREATE TABLE habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habit completions table (for daily tracking)
CREATE TABLE habit_completions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  completion_date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(habit_id, completion_date)
);

-- User preferences table
CREATE TABLE user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  selected_theme TEXT DEFAULT 'starry-night',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own habits" ON habits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own habits" ON habits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own habits" ON habits
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own habits" ON habits
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own completions" ON habit_completions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completions" ON habit_completions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own completions" ON habit_completions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own completions" ON habit_completions
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own preferences" ON user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON user_preferences
  FOR UPDATE USING (auth.uid() = user_id);
```

#### 2.3 Configure Supabase Client
Create `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

#### 2.4 Environment Variables
Create `.env.local`:
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Phase 3: React Component Architecture

#### 3.1 Project Structure
```
src/
├── components/
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── AuthProvider.tsx
│   ├── habits/
│   │   ├── HabitList.tsx
│   │   ├── HabitItem.tsx
│   │   ├── AddHabit.tsx
│   │   └── HabitCalendar.tsx
│   ├── theme/
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeSelector.tsx
│   │   └── BackgroundEffects.tsx
│   ├── ui/
│   │   ├── Modal.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Navigation.tsx
│       └── Layout.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useHabits.ts
│   ├── useTheme.ts
│   └── useLocalStorage.ts
├── services/
│   ├── habitService.ts
│   ├── authService.ts
│   └── themeService.ts
├── types/
│   ├── habit.ts
│   ├── theme.ts
│   └── user.ts
├── utils/
│   ├── dateUtils.ts
│   ├── streakUtils.ts
│   └── animations.ts
└── styles/
    ├── globals.css
    ├── themes/
    │   ├── starry-night.css
    │   ├── cloudy-day.css
    │   └── ... (other themes)
    └── components/
        ├── habits.css
        ├── calendar.css
        └── theme.css
```

#### 3.2 Type Definitions
Create `src/types/habit.ts`:
```typescript
export interface Habit {
  id: string;
  user_id: string;
  text: string;
  created_at: string;
  updated_at: string;
}

export interface HabitCompletion {
  id: string;
  habit_id: string;
  user_id: string;
  completion_date: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface HabitWithCompletion extends Habit {
  completions: HabitCompletion[];
  streak: number;
  lastCompletedDate?: string;
}
```

Create `src/types/theme.ts`:
```typescript
export interface Theme {
  name: string;
  category: string;
  icon: string;
  background: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    textSecondary: string;
    accent: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
  };
  typography: {
    fontFamily: string;
    fontWeight: string;
    headingWeight: string;
  };
  borders: {
    width: string;
    style: string;
    radius: string;
    color: string;
  };
  shadows: {
    primary: string;
    secondary: string;
    hover: string;
  };
  effects: string[];
  animations: Record<string, any>;
  completion: {
    icon: string;
    title: string;
    message: string;
  };
  confetti: {
    colors: string[];
    shape: string;
    size: { width: string; height: string };
  };
  components: Record<string, any>;
}
```

### Phase 4: Core React Components

#### 4.1 Authentication System
Create `src/components/auth/AuthProvider.tsx`:
```typescript
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

#### 4.2 Habit Management Hook
Create `src/hooks/useHabits.ts`:
```typescript
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { Habit, HabitCompletion, HabitWithCompletion } from '../types/habit';

export const useHabits = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<HabitWithCompletion[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHabits = async () => {
    if (!user) return;

    try {
      // Fetch habits
      const { data: habitsData, error: habitsError } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (habitsError) throw habitsError;

      // Fetch completions for today
      const today = new Date().toISOString().split('T')[0];
      const { data: completionsData, error: completionsError } = await supabase
        .from('habit_completions')
        .select('*')
        .eq('user_id', user.id)
        .eq('completion_date', today);

      if (completionsError) throw completionsError;

      // Combine data
      const habitsWithCompletions = habitsData.map(habit => {
        const completion = completionsData.find(c => c.habit_id === habit.id);
        return {
          ...habit,
          completions: completion ? [completion] : [],
          streak: 0, // Calculate streak
          lastCompletedDate: completion?.completion_date,
        };
      });

      setHabits(habitsWithCompletions);
    } catch (error) {
      console.error('Error fetching habits:', error);
    } finally {
      setLoading(false);
    }
  };

  const addHabit = async (text: string) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('habits')
      .insert([{ user_id: user.id, text }])
      .select()
      .single();

    if (error) throw error;
    setHabits(prev => [...prev, { ...data, completions: [], streak: 0 }]);
  };

  const toggleHabit = async (habitId: string, completed: boolean) => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];

    if (completed) {
      // Mark as completed
      const { error } = await supabase
        .from('habit_completions')
        .upsert({
          habit_id: habitId,
          user_id: user.id,
          completion_date: today,
          completed: true,
        });

      if (error) throw error;
    } else {
      // Mark as incomplete
      const { error } = await supabase
        .from('habit_completions')
        .delete()
        .eq('habit_id', habitId)
        .eq('user_id', user.id)
        .eq('completion_date', today);

      if (error) throw error;
    }

    // Refresh habits
    await fetchHabits();
  };

  const deleteHabit = async (habitId: string) => {
    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', habitId);

    if (error) throw error;
    setHabits(prev => prev.filter(h => h.id !== habitId));
  };

  useEffect(() => {
    fetchHabits();
  }, [user]);

  return {
    habits,
    loading,
    addHabit,
    toggleHabit,
    deleteHabit,
    refreshHabits: fetchHabits,
  };
};
```

#### 4.3 Theme System
Create `src/hooks/useTheme.ts`:
```typescript
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { Theme } from '../types/theme';

const themes: Record<string, Theme> = {
  'starry-night': {
    // ... theme configuration from your current themes
  },
  // ... other themes
};

export const useTheme = () => {
  const { user } = useAuth();
  const [currentTheme, setCurrentTheme] = useState<string>('starry-night');
  const [loading, setLoading] = useState(true);

  const loadUserTheme = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('selected_theme')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setCurrentTheme(data.selected_theme);
      }
    } catch (error) {
      console.error('Error loading user theme:', error);
    } finally {
      setLoading(false);
    }
  };

  const switchTheme = async (themeName: string) => {
    setCurrentTheme(themeName);
    
    if (user) {
      try {
        await supabase
          .from('user_preferences')
          .upsert({
            user_id: user.id,
            selected_theme: themeName,
          });
      } catch (error) {
        console.error('Error saving theme:', error);
      }
    }
  };

  useEffect(() => {
    loadUserTheme();
  }, [user]);

  return {
    currentTheme,
    themes,
    switchTheme,
    loading,
  };
};
```

### Phase 5: UI Components Migration

#### 5.1 Main Habit List Component
Create `src/components/habits/HabitList.tsx`:
```typescript
import React from 'react';
import { useHabits } from '../../hooks/useHabits';
import HabitItem from './HabitItem';
import AddHabit from './AddHabit';
import ProgressBar from '../ui/ProgressBar';

const HabitList: React.FC = () => {
  const { habits, loading, toggleHabit, deleteHabit } = useHabits();

  if (loading) {
    return <div className="loading">Loading habits...</div>;
  }

  const completedCount = habits.filter(h => h.completions.some(c => c.completed)).length;
  const totalCount = habits.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="habits-container">
      <ProgressBar progress={progress} completed={completedCount} total={totalCount} />
      
      <div className="habits-list">
        {habits.length === 0 ? (
          <div className="empty-state">
            <span className="emoji">🌱</span>
            <h3>Ready to build great habits?</h3>
            <p>Add your first habit above to get started!</p>
          </div>
        ) : (
          habits.map(habit => (
            <HabitItem
              key={habit.id}
              habit={habit}
              onToggle={(completed) => toggleHabit(habit.id, completed)}
              onDelete={() => deleteHabit(habit.id)}
            />
          ))
        )}
      </div>

      <AddHabit />
    </div>
  );
};

export default HabitList;
```

#### 5.2 Individual Habit Item
Create `src/components/habits/HabitItem.tsx`:
```typescript
import React from 'react';
import { HabitWithCompletion } from '../../types/habit';

interface HabitItemProps {
  habit: HabitWithCompletion;
  onToggle: (completed: boolean) => void;
  onDelete: () => void;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit, onToggle, onDelete }) => {
  const isCompleted = habit.completions.some(c => c.completed);
  const streak = habit.streak;

  return (
    <div className={`habit-item ${isCompleted ? 'completed' : ''}`}>
      <div 
        className={`habit-checkbox ${isCompleted ? 'checked' : ''}`}
        onClick={() => onToggle(!isCompleted)}
      />
      <span className="habit-text">{habit.text}</span>
      {streak > 0 && (
        <span className="habit-streak">🔥 {streak}</span>
      )}
      <div className="delete-btn-container">
        <button className="delete-btn" onClick={onDelete} />
      </div>
    </div>
  );
};

export default HabitItem;
```

#### 5.3 Calendar Component
Create `src/components/habits/HabitCalendar.tsx`:
```typescript
import React, { useState, useEffect } from 'react';
import { useHabits } from '../../hooks/useHabits';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

const HabitCalendar: React.FC = () => {
  const { user } = useAuth();
  const { habits } = useHabits();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [historicalData, setHistoricalData] = useState<Record<string, any>>({});

  const fetchHistoricalData = async (startDate: Date, endDate: Date) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('habit_completions')
        .select(`
          completion_date,
          completed,
          habits!inner(text)
        `)
        .eq('user_id', user.id)
        .gte('completion_date', startDate.toISOString().split('T')[0])
        .lte('completion_date', endDate.toISOString().split('T')[0]);

      if (error) throw error;

      // Process data for calendar display
      const processedData: Record<string, any> = {};
      data.forEach(completion => {
        const date = completion.completion_date;
        if (!processedData[date]) {
          processedData[date] = { habits: [] };
        }
        processedData[date].habits.push({
          text: completion.habits.text,
          completed: completion.completed,
        });
      });

      setHistoricalData(processedData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  useEffect(() => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    fetchHistoricalData(startOfMonth, endOfMonth);
  }, [currentDate, user]);

  // Calendar rendering logic here...
  // (Similar to your current calendar.js but in React)

  return (
    <div className="calendar-container">
      {/* Calendar implementation */}
    </div>
  );
};

export default HabitCalendar;
```

### Phase 6: Styling Migration

#### 6.1 CSS-in-JS with Styled Components
```bash
npm install styled-components
npm install -D @types/styled-components
```

#### 6.2 Theme-based Styling
Create `src/styles/theme.ts`:
```typescript
export const themeConfig = {
  'starry-night': {
    colors: {
      primary: '#38bdf8',
      secondary: '#0ea5e9',
      text: '#ffffff',
      // ... other colors
    },
    // ... other theme properties
  },
  // ... other themes
};
```

#### 6.3 Component Styling
Create `src/components/ui/Button.tsx`:
```typescript
import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>`
  padding: ${props => props.size === 'sm' ? '8px 16px' : props.size === 'lg' ? '16px 32px' : '12px 24px'};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #38bdf8, #0ea5e9);
          color: white;
          box-shadow: 0 4px 15px rgba(56, 189, 248, 0.4);
          
          &:hover {
            box-shadow: 0 6px 20px rgba(56, 189, 248, 0.6);
            transform: translateY(-2px);
          }
        `;
      case 'danger':
        return `
          background: #dc2626;
          color: white;
          
          &:hover {
            background: #b91c1c;
          }
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.1);
          color: var(--theme-text);
          border: 1px solid rgba(255, 255, 255, 0.2);
          
          &:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `;
    }
  }}
`;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
```

### Phase 7: Animation System

#### 7.1 Framer Motion Integration
Create `src/components/animations/CompletionAnimation.tsx`:
```typescript
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

interface CompletionAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

const CompletionAnimation: React.FC<CompletionAnimationProps> = ({ 
  isVisible, 
  onComplete 
}) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="completion-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="completion-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <motion.div
              className="completion-icon"
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 0.6 }}
            >
              {theme?.completion.icon || '🎉'}
            </motion.div>
            <h2>{theme?.completion.title || 'Amazing Work!'}</h2>
            <p>{theme?.completion.message || 'You\'ve completed all your habits for today!'}</p>
          </motion.div>
          
          {/* Confetti animation */}
          <ConfettiAnimation theme={theme} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ConfettiAnimation: React.FC<{ theme: any }> = ({ theme }) => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => (
    <motion.div
      key={i}
      className="confetti-piece"
      initial={{ 
        x: '50%', 
        y: '50%', 
        opacity: 1,
        scale: 0
      }}
      animate={{ 
        x: Math.random() * 400 - 200,
        y: Math.random() * 400 + 100,
        opacity: 0,
        scale: 1,
        rotate: Math.random() * 360
      }}
      transition={{ 
        duration: 2 + Math.random(),
        delay: Math.random() * 0.5
      }}
      style={{
        background: theme?.confetti.colors?.[Math.floor(Math.random() * theme.confetti.colors.length)],
        borderRadius: theme?.confetti.shape,
        width: theme?.confetti.size?.width,
        height: theme?.confetti.size?.height,
      }}
    />
  ));

  return <div className="confetti-container">{confettiPieces}</div>;
};

export default CompletionAnimation;
```

#### 7.2 Background Effects
Create `src/components/theme/BackgroundEffects.tsx`:
```typescript
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const BackgroundEffects: React.FC = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  if (!theme?.effects) return null;

  return (
    <div className="background-effects">
      {theme.effects.includes('stars') && <StarsEffect config={theme.animations.stars} />}
      {theme.effects.includes('clouds') && <CloudsEffect config={theme.animations.clouds} />}
      {theme.effects.includes('waves') && <WavesEffect config={theme.animations.waves} />}
      {/* ... other effects */}
    </div>
  );
};

const StarsEffect: React.FC<{ config: any }> = ({ config }) => {
  const stars = Array.from({ length: config?.count || 100 }, (_, i) => (
    <motion.div
      key={i}
      className="star"
      initial={{ opacity: 0.2 }}
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        delay: Math.random() * 2
      }}
      style={{
        position: 'absolute',
        top: Math.random() * 100 + 'vh',
        left: Math.random() * 100 + 'vw',
        width: '2px',
        height: '2px',
        background: 'white',
        borderRadius: '50%',
      }}
    />
  ));

  return <div className="stars-container">{stars}</div>;
};

// ... other effect components

export default BackgroundEffects;
```

### Phase 8: Routing & Navigation

#### 8.1 App Router Setup
Create `src/App.tsx`:
```typescript
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import { ThemeProvider } from './components/theme/ThemeProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Layout from './components/layout/Layout';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/calendar" element={<Calendar />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
```

#### 8.2 Protected Route Component
Create `src/components/auth/ProtectedRoute.tsx`:
```typescript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
```

### Phase 9: Data Migration Strategy

#### 9.1 Local Storage to Supabase Migration
Create `src/utils/migration.ts`:
```typescript
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

export const migrateLocalDataToSupabase = async () => {
  const { user } = useAuth();
  if (!user) return;

  try {
    // Check if user already has data
    const { data: existingHabits } = await supabase
      .from('habits')
      .select('id')
      .eq('user_id', user.id)
      .limit(1);

    if (existingHabits && existingHabits.length > 0) {
      console.log('User already has data, skipping migration');
      return;
    }

    // Get data from localStorage
    const habitTrackerData = localStorage.getItem('habitTracker');
    const calendarData = localStorage.getItem('habitCalendarData');

    if (!habitTrackerData) return;

    const { habits } = JSON.parse(habitTrackerData);

    // Migrate habits
    const habitsToInsert = habits.map(habit => ({
      user_id: user.id,
      text: habit.text,
    }));

    const { data: insertedHabits, error: habitsError } = await supabase
      .from('habits')
      .insert(habitsToInsert)
      .select();

    if (habitsError) throw habitsError;

    // Migrate historical completions
    if (calendarData) {
      const historicalData = JSON.parse(calendarData);
      const completionsToInsert = [];

      for (const [date, data] of Object.entries(historicalData)) {
        if (data.habits) {
          for (const habitData of data.habits) {
            const insertedHabit = insertedHabits.find(h => h.text === habitData.text);
            if (insertedHabit && habitData.completed) {
              completionsToInsert.push({
                habit_id: insertedHabit.id,
                user_id: user.id,
                completion_date: date,
                completed: habitData.completed,
              });
            }
          }
        }
      }

      if (completionsToInsert.length > 0) {
        const { error: completionsError } = await supabase
          .from('habit_completions')
          .insert(completionsToInsert);

        if (completionsError) throw completionsError;
      }
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  }
};
```

### Phase 10: Testing & Deployment

#### 10.1 Testing Setup
```bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D jest-environment-jsdom
```

#### 10.2 Environment Configuration
Create different environment files:
- `.env.local` (development)
- `.env.production` (production)

#### 10.3 Build & Deploy
```bash
# Build for production
npm run build

# Deploy to Vercel/Netlify
npm install -g vercel
vercel --prod
```

### Phase 11: Performance Optimizations

#### 11.1 React Query for Data Fetching
```bash
npm install @tanstack/react-query
```

#### 11.2 Code Splitting
```typescript
import { lazy, Suspense } from 'react';

const Calendar = lazy(() => import('./pages/Calendar'));

// In your router
<Route path="/calendar" element={
  <Suspense fallback={<div>Loading...</div>}>
    <Calendar />
  </Suspense>
} />
```

#### 11.3 Memoization
```typescript
import React, { memo, useMemo } from 'react';

const HabitItem = memo(({ habit, onToggle, onDelete }) => {
  const isCompleted = useMemo(() => 
    habit.completions.some(c => c.completed), 
    [habit.completions]
  );

  // ... rest of component
});
```

### Phase 12: Advanced Features

#### 12.1 Real-time Updates
```typescript
// In useHabits hook
useEffect(() => {
  if (!user) return;

  const subscription = supabase
    .channel('habits-changes')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'habits',
        filter: `user_id=eq.${user.id}`
      }, 
      () => {
        fetchHabits(); // Refresh data
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, [user]);
```

#### 12.2 Offline Support
```typescript
// Service worker for offline support
// PWA configuration
```

#### 12.3 Push Notifications
```typescript
// Web push notifications for habit reminders
```

## Migration Timeline

### Week 1: Setup & Foundation
- [ ] Initialize React project
- [ ] Setup Supabase backend
- [ ] Create basic component structure
- [ ] Implement authentication

### Week 2: Core Features
- [ ] Migrate habit management
- [ ] Implement theme system
- [ ] Create calendar component
- [ ] Add animations

### Week 3: Polish & Testing
- [ ] Data migration from localStorage
- [ ] Testing and bug fixes
- [ ] Performance optimization
- [ ] Deployment

### Week 4: Advanced Features
- [ ] Real-time updates
- [ ] Offline support
- [ ] Push notifications
- [ ] Analytics

## Key Benefits of Migration

1. **Scalability**: Supabase handles user management, real-time updates, and scaling
2. **Maintainability**: React components are easier to maintain and test
3. **Performance**: React's virtual DOM and optimized rendering
4. **Developer Experience**: TypeScript, better debugging, hot reloading
5. **User Experience**: Real-time sync, offline support, better animations
6. **Security**: Row-level security, authentication, data validation

## Potential Challenges & Solutions

### Challenge 1: Complex Theme System
**Solution**: Create a robust theme provider with CSS-in-JS or CSS custom properties

### Challenge 2: Animation Migration
**Solution**: Use Framer Motion for smooth, performant animations

### Challenge 3: Data Migration
**Solution**: Create migration utilities to transfer localStorage data to Supabase

### Challenge 4: Performance
**Solution**: Implement React Query for caching, code splitting, and memoization

This migration will transform your beautiful habit tracking app into a modern, scalable, and maintainable React application with a robust Supabase backend.
