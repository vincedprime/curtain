# Theme Customization Plan

## Themes concept
- **Starry Night** - Dark gradient with animated stars (current dark theme)
- **Cloudy Day** - Light gradient with floating clouds (current light theme)
- **Ocean** - Deep blue/teal with wave patterns and bubbles
- **Forest** - Green gradient with nature elements
- **Cherry Blossom** - Dark gradient with petal animations 

## UI Components and Theme Changes

### 1. Background & Body
**Theme Variations:**
- **Starry Night**: Dark gradient (`#0f0f0f` to `#1a1a2e`) with animated stars
- **Cloudy Day**: Light gradient (`#87ceeb` to `#fdfdfd`) with floating clouds
- **Ocean**: Deep blue gradient (`#1e3a8a` to `#0c4a6e`) with wave and bubbles animations
- **Forest**: Green gradient (`#064e3b` to `#166534`) with falling leaves
- **Cherry Blossom**: Pink gradient (`#fdf2f8` to `#fce7f3`) with floating petals

### 2. Theme Toggle Button - This object be common for all themes
**Theme Icons - no emoji:**
- **Starry Night**: Moon icon
- **Cloudy Day**: Sun icon
- **Ocean**: Bubble icon
- **Forest**: Circle leave
- **Cherry Blossom**: Light pink shade moon icon

### 3. Header Section
**Components:** Title, subtitle, description, daily quote

**Color Schemes:**
- **Starry Night**: White text (`#fff`) with light gray subtitle (`#a3a3a3`)
- **Cloudy Day**: Dark text (`#333`) with medium gray subtitle (`#555`)
- **Ocean**: White/light cyan text (`#ecfeff`) for contrast
- **Forest**: Light green/white text (`#dcfce7`) for readability
- **Cherry Blossom**: Deep pink text (`#be185d`) on light background

### 4. Date Info Box
**Theme Variations:**
- **Starry Night**: Dark background (`rgba(26, 26, 26, 0.8)`) with gray border
- **Cloudy Day**: Light background (`rgba(255, 255, 255, 0.8)`) with light gray border
- **Ocean**: Dark teal background (`rgba(20, 83, 109, 0.8)`) with cyan border
- **Forest**: Dark green background (`rgba(20, 83, 45, 0.8)`) with light green border
- **Cherry Blossom**: Light pink background (`rgba(252, 231, 243, 0.8)`) with pink border

### 5. Add Habit Section
**Components:** Input field, Add button

**Theme Styling:**
- **Starry Night**: Dark input (`#1a1a1a`) with blue focus border (`#60a5fa`)
- **Cloudy Day**: White input with blue focus border (`#60a5fa`)
- **Ocean**: Teal accents, dark input with cyan highlights
- **Forest**: Green accents, nature-inspired colors
- **Cherry Blossom**: Pink accents, soft pink highlights

### 6. Habit Templates
**Components:** Quick add buttons

**Button Styles:**
- **Starry Night**: Gray borders (`#4b5563`) with dark hover (`#374151`)
- **Cloudy Day**: Light gray borders (`#d1d5db`) with light hover (`#f9fafb`)
- **Ocean**: Teal borders with wave-like hover animations
- **Forest**: Green borders with leaf-like styling
- **Cherry Blossom**: Pink borders with petal-like effects

### 7. Progress Section
**Components:** Progress bar, progress text, streak counter

**Progress Bar Colors:**
- **Starry Night**: Blue gradient (`#38bdf8` to `#0ea5e9`)
- **Cloudy Day**: Orange gradient (`#fbbf24` to `#f59e0b`)
- **Ocean**: Cyan gradient (`#06b6d4` to `#0891b2`)
- **Forest**: Green gradient (`#10b981` to `#059669`)
- **Cherry Blossom**: Pink gradient (`#ec4899` to `#db2777`)

**Streak Counter:**
- **Starry Night**: Orange background (`#f97316`) with fire emoji
- **Cloudy Day**: Orange background (`#fbbf24`) with fire emoji
- **Ocean**: Teal background with wave emoji
- **Forest**: Green background with tree emoji
- **Cherry Blossom**: Pink background with blossom emoji

### 8. Habit Items
**Components:** Checkbox, text, delete button

**Theme Styling:**
- **Starry Night**: Dark backgrounds (`#1a1a1a`) with green completed state (`#0f2a1a`)
- **Cloudy Day**: White backgrounds with light green completed state (`#e6ffe6`)
- **Ocean**: Dark backgrounds with cyan accents
- **Forest**: Nature-inspired greens for completed states
- **Cherry Blossom**: Soft pink backgrounds with deeper pink accents

### 9. Action Buttons
**Components:** Reset button, Delete All button

**Theme Color Schemes:**
- **Starry Night**: Gray reset (`#9ca3af`) and red delete (`#dc2626`)
- **Cloudy Day**: Gray reset (`#6b7280`) and red delete (`#dc2626`)
- **Ocean**: Teal and coral variants
- **Forest**: Green and brown variants
- **Cherry Blossom**: Pink and deeper pink variants

### 10. Modals
**Components:** Delete confirmation, alert modal, confirm modal

**Theme Backgrounds:**
- **Starry Night**: Dark background (`#1a1a1a`) with gray borders
- **Cloudy Day**: White background with light gray borders
- **Ocean**: Dark blue with cyan accents
- **Forest**: Dark green with light green accents
- **Cherry Blossom**: Light pink with deeper pink accents

### 11. Footer Info
**Component:** Information text at bottom

**Theme Styling:**
- **Starry Night**: Dark background (`rgba(26, 26, 26, 0.6)`) with light gray text
- **Cloudy Day**: Light background (`rgba(255, 255, 255, 0.6)`) with gray text
- **Ocean**: Dark teal background with light cyan text
- **Forest**: Dark green background with light green text
- **Cherry Blossom**: Light pink background with deep pink text

### 12. Animated Background Elements

**Theme-Specific Animations:**
- **Starry Night**: Twinkling stars scattered across dark background
- **Cloudy Day**: White clouds floating across light blue sky
- **Ocean**: Animated wave patterns at bottom, floating bubbles, subtle water ripples
- **Forest**: Falling leaves (different shapes), swaying tree branches, firefly-like dots
- **Cherry Blossom**: Falling pink petals, gentle wind effects, soft glows around elements

### 13. Completion Animation
**Theme-Specific Celebrations:**
- **Starry Night**: Confetti with star shapes and cosmic colors
- **Cloudy Day**: Traditional confetti with bright celebration colors
- **Ocean**: Splash effect with water droplets
- **Forest**: Leaf explosion with nature colors
- **Cherry Blossom**: Petal shower with pink/white colors

## Implementation Strategy

1. **CSS Structure**: Create theme-specific CSS classes for each component
2. **JavaScript**: Theme switching logic with localStorage persistence
3. **Animations**: Theme-appropriate background animations
4. **Icons**: Custom icons for each theme's toggle button
5. **Transitions**: Smooth transitions between themes

## Storage Structure
```javascript
{
  selectedTheme: 'starry-night' | 'cloudy-day' | 'sky' | 'ocean' | 'forest' | 'cherry-blossom',
  // ... existing habit data
}
```

## Theme Selector UI
- Dropdown or grid of theme preview cards
- Each card shows a mini preview of the theme
- Current theme highlighted
- Smooth transition when switching themes
