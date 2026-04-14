# RabbitSteel Recap - Project Documentation

## Overview

**RabbitSteel Recap** is a React-based web application that parses and visualizes save data from the RabbitSteel game. It allows players to upload their `savedata.ini` file and view comprehensive statistics about their gameplay, including character performance, winrates, playtime, and area-specific statistics.

### Tech Stack
- **React 19.x** - UI framework
- **Vite 8.x** - Build tool with hot module reloading
- **Vanilla CSS** - Styling
- **JavaScript (ES6+)** - Core logic

---

## Project Structure

```
RabbitSteel-Recap/
├── public/              # Static assets served by Vite
├── src/
│   ├── components/      # Reusable React components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page-level components (Home, Dashboard)
│   ├── utils/           # Utility functions (parsing, data shaping)
│   ├── assets/          # Images and static resources
│   ├── App.jsx          # Root application component
│   ├── main.jsx         # React entry point
│   ├── App.css          # Application styles
│   └── index.css        # Global styles
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── index.html           # HTML template
```

---

## File-by-File Explanation

### Core Application Files

#### `src/main.jsx`
- **Purpose**: Application entry point
- **Responsibilities**:
  - Creates React root and mounts the app to the DOM
  - Wraps the app in `StrictMode` for development warnings
  - Imports global CSS
- **Key Exports**: None (side effect only)

#### `src/App.jsx`
- **Purpose**: Root application component that manages overall flow
- **State**:
  - `saveData`: The parsed and shaped save data object (or null)
- **Flow**:
  1. Displays a header with the app title
  2. Conditionally renders either:
     - **Home page** (when no data loaded) - allows file upload
     - **Dashboard page** (when data loaded) - displays statistics
  3. Displays a footer
- **Key Functions**:
  - `handleDataLoaded()`: Called by Home when file is parsed
  - `handleReset()`: Called by Dashboard to return to Home

### Pages

#### `src/pages/Home.jsx`
- **Purpose**: File upload entry point where users select their save file
- **Features**:
  - File input validation (only accepts `.ini` files)
  - File reading using FileReader API
  - Integration with parsing pipeline:
    1. Reads file content
    2. Passes to `parseIni()` to convert INI format → object
    3. Passes to `shapeSaveData()` to structure the data
    4. Calls `onDataLoaded()` callback to App
  - Error handling for invalid files
  - User-friendly UI with Card component

#### `src/pages/Dashboard.jsx`
- **Purpose**: Main display page showing all parsed game statistics
- **Props**:
  - `data`: Shaped save data object
  - `onReset`: Callback to return to Home page
- **Sub-components** (displayed in sections):
  - `ProfileHeader`: Player name, playtime, run count, total wins
  - `CharacterStats`: Statistics for each playable character
  - `AreaWinrates`: Winrate breakdown by game areas/difficulties
- **Features**:
  - "Upload New File" button to load different save data

### Components

#### UI Components (`src/components/ui/`)

**Card.jsx**
- Reusable container component for content sections
- Props: `title`, `children`, `className`
- Provides consistent styling and layout

**StatBadge.jsx**
- Displays a labeled statistic value
- Props: `label`, `value`
- Used for displaying individual stats (e.g., "Total Runs: 42")

**ProgressBar.jsx**
- Visual progress/winrate indicator
- Props: `label`, `value`, `color`, `showPercent`
- Displays percentage with optional visual bar

#### Dashboard Components (`src/components/dashboard/`)

**ProfileHeader.jsx**
- Displays player-level summary
- Shows: Player name, playtime (formatted), total runs, total wins, shop visits, overall winrate
- Uses StatBadge and ProgressBar UI components

**CharacterStats.jsx**
- Shows performance statistics for each character class
- Displays for each character:
  - Total wins
  - Offline vs Online wins
  - Fastest clear time and difficulty achieved
  - Win count indicators
- Data sourced from shaped save data's `characters` array

**AreaWinrates.jsx**
- Displays winrate statistics by difficulty area
- Shows: Cute, Normal, Hard, Lunar difficulties
- Includes winrates for Offline and Online modes
- Helps identify strength/weakness areas

### Hooks

#### `src/hooks/useSaveData.js`
- **Purpose**: Custom React hook managing the entire save file lifecycle
- **State**:
  - `data`: Parsed and shaped save data object
  - `loading`: Boolean indicating parsing in progress
  - `error`: Error message if parsing fails
- **Functions**:
  - `uploadFile(file)`: Handles file upload, parsing, and error handling
  - `reset()`: Clears all data and errors
- **Error Handling**:
  - Validates file extension
  - Catches parsing exceptions
  - Validates required INI sections
- **Returns**: Object with `{ data, loading, error, uploadFile, reset }`

### Utilities

#### `src/utils/parseIni.js`
- **Purpose**: Converts INI file format into JavaScript objects
- **Input Format**:
  ```
  [Section]
  key="value"
  key="value"
  
  [NextSection]
  key="value"
  ```
- **Processing**:
  1. Splits content by newlines
  2. Identifies section headers `[SectionName]`
  3. Parses key=value pairs with quoted values
  4. Strips surrounding quotes from values
  5. Converts numeric strings to actual numbers
  6. Skips empty lines and comment lines (starting with `;`)
- **Output**: Nested object `{ SectionName: { key: value } }`
- **Example**:
  ```javascript
  parseIni("[SaveInfo]\nplayerName=\"John\"\nruns=\"100\"")
  // Returns: { SaveInfo: { playerName: "John", runs: 100 } }
  ```

#### `src/utils/shapeSaveData.js`
- **Purpose**: Transforms flat INI data into a structured, queryable format
- **Input**: Raw parsed INI object from `parseIni()`
- **Processing Steps**:
  1. **Extract player data**:
     - Playtime in milliseconds
     - Total runs count
     - Shop visits count
     - Main character name
  2. **Initialize character statistics**:
     - Creates entry for each of 14 rabbit characters
     - Tracks: total wins, offline wins, online wins, fastest times, winning difficulty
  3. **Process game runs**:
     - Iterates through run records in INI data
     - Aggregates wins by character, difficulty, and online/offline mode
     - Calculates fastest clear times
  4. **Compute areas**:
     - Groups results by 4 difficulties: Cute, Normal, Hard, Lunar
     - Calculates winrates for each difficulty and mode
- **Output Structure**:
  ```javascript
  {
    player: {
      name: string,
      playtimeMs: number,
      playtimeFormatted: string (e.g., "10h 30m"),
      totalRuns: number,
      totalWins: number,
      winrate: number (as percentage),
      shopVisits: number
    },
    characters: [
      {
        id: 0-13,
        class: string,
        name: string,
        code: string (3-letter),
        color: string (hex),
        TotalWins: number,
        OfflineWins: number,
        OnlineWins: number,
        FastestWinTime: number,
        FastestWinDiff: number,
        FastestWinType: number (0=offline, 1=online)
      },
      // ... 14 total characters
    ],
    areas: [
      {
        difficulty: string,
        Offline: {
          wins: number,
          runs: number,
          winrate: number
        },
        Online: {
          wins: number,
          runs: number,
          winrate: number
        }
      },
      // ... 4 total (Cute, Normal, Hard, Lunar)
    ]
  }
  ```

#### `src/utils/collection.js`
- **Purpose**: Defines all 14 playable character classes in RabbitSteel
- **Data Structure**: Array of character objects with:
  - `id`: 0-13 (index in RABBITS array)
  - `key`: Internal identifier (e.g., 'wizard', 'assassin')
  - `name`: Display name
  - `code`: 3-letter shorthand
  - `color`: Hex color for UI display (class color-coding)
- **Characters** (example entries):
  - Wizard, Assassin, Heavyblade, Dancer, Druid, Spellsword, Sniper, Rogue, Knight, Priest, Berserker, Paladin, Cleric, Bard
- **Usage**: Referenced by `shapeSaveData()` to initialize character stat tracking

---

## Data Flow

```
User uploads savedata.ini
    ↓
FileReader reads file as text
    ↓
parseIni() → Converts INI format to JS object
    ↓
shapeSaveData() → Structures data into player/characters/areas
    ↓
Home calls onDataLoaded(shapedData)
    ↓
App sets saveData state
    ↓
Dashboard receives data as props
    ↓
Sub-components render statistics
```

---

## Key Concepts

### Save File Format
The game saves data in `savedata.ini` format with sections and key-value pairs:
- `[SaveInfo]`: Player-level metadata (runCountLocal, shopCountLocal, etc.)
- `[Playtime]`: Total playtime in milliseconds
- `[CharName]`: Character names
- `[Runs]`: Individual run records with outcomes
- Other sections for inventory, unlocks, etc.

### Character Classes
RabbitSteel features 14 different playable character classes, each with unique abilities. The app tracks performance for each class separately (wins, fastest times, online vs offline).

### Difficulties
The game has 4 difficulty levels:
- **Cute**: Easiest
- **Normal**: Standard
- **Hard**: Challenging
- **Lunar**: Hardest

Each difficulty has both Offline and Online modes, tracked separately.

### Statistics Tracked
1. **Player Level**:
   - Total playtime
   - Total runs attempted
   - Total wins achieved
   - Win rate percentage

2. **Per Character**:
   - Total wins
   - Offline wins vs Online wins
   - Fastest clear time
   - Fastest clear difficulty

3. **Per Difficulty**:
   - Win/run counts for Offline and Online
   - Winrate percentage for each mode

---

## Running the Application

### Development
```bash
npm install      # Install dependencies
npm run dev      # Start dev server (hot reload)
```

### Production Build
```bash
npm run build    # Build optimized bundle
npm run preview  # Preview production build locally
```

### Code Quality
```bash
npm run lint     # Run ESLint on all files
```

---

## Dependencies

### Runtime
- **react@19.x**: UI library
- **react-dom@19.x**: DOM rendering

### Development
- **vite@8.x**: Build tool and dev server
- **@vitejs/plugin-react@6.x**: React support in Vite
- **eslint@9.x**: Code linting
- **@types/react**: TypeScript types (development only)

---

## Extension Points

### Adding Features
1. **New Dashboard Sections**: Create component in `src/components/dashboard/`, add to Dashboard.jsx
2. **Additional Statistics**: Modify `shapeSaveData.js` to compute new metrics
3. **Character Filtering**: Add state to Dashboard for filtering by class
4. **Export Functionality**: Add export to CSV/JSON in dashboard
5. **Multiple Save Comparisons**: Track multiple saves in App state

### Styling
Global styles: `src/index.css`
App layout: `src/App.css`
Component-specific: Inline classes or CSS modules (if added)

---

## Notes

- The app is stateless except for the current save file in memory
- No backend/database - purely client-side processing
- File parsing is synchronous (suitable for typical save file sizes)
- UI is responsive but not explicitly tested on mobile (CSS media queries would be needed)
- Character color-coding from `collection.js` helps visual class identification

