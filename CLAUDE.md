# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev       # Start development server with HMR (Vite)
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run format    # Format code with Prettier
```

## Technology Stack

- **React 19.2.0** with **Vite 7.2.2** (build tool)
- **React Router DOM 7.9.5** for routing
- **Tailwind CSS 4.1.17** for styling
- **React Icons 5.5.0** for icon components
- **Zustand 5.0.8** for state management (installed but not yet used)
- **TanStack React Query 5.90.7** for server state (installed but not yet used)
- **Axios 1.13.2** for HTTP requests (installed but not yet used)

## Project Architecture

### Route Structure

Routes defined in `src/App.jsx` using nested routing:

**Main Routes:**
- `/` → HOMPage (Home page with main calendar)
- `/clubs` → CBLPage (Club list)
- `/clubs/detail` → CBDPage (Club detail)
- `/events` → EVLPage (Event list)
- `/events/detail` → EVDPage (Event detail)
- `/test` → TestPage (Testing/playground page)
- Catch-all → NotFoundPage

**Module Demo Routes** (`/modules/*`):
- `/modules/tabBar` → TabBarPage
- `/modules/searchBar` → SearchBarPage
- `/modules/header` → HeaderPage
- `/modules/miniCalendar` → MiniCalendarPage
- `/modules/eventRow` → EventRowPage
- `/modules/mainCalendar` → MainCalendarPage

Module demo pages showcase individual reusable components in isolation.

### Feature-Based Naming System

This project uses **3-letter uppercase codes** for features:

- **HOM** = Home
- **CBL** = Club List
- **CBD** = Club Detail
- **EVL** = Event List
- **EVD** = Event Detail
- **COMMON** = Shared/common features
- **NOT** = Error/Not Found pages
- **TEST** = Testing/playground

**Naming Patterns:**
- Page components: `[CODE]Page.jsx` (e.g., `HOMPage.jsx`, `EVLPage.jsx`)
- Feature folders: `pages/[CODE]/` and potentially `components/[CODE]/`
- Common components: Named directly (e.g., `TabBar.jsx`, `MiniCalendar.jsx`)

### Directory Organization

```
src/
├── api/          # API integration layer (directory exists but empty)
├── components/   # Reusable components
│   ├── common/  # Shared components (TabBar, MiniCalendar, MainCalendar, etc.)
│   └── [FEATURE]/ # Feature-specific components (e.g., EVL/EventRow.jsx)
├── pages/        # Route-based page components
│   ├── [FEATURE]/ # Each feature has its own folder (HOM, CBL, EVL, etc.)
│   └── COMMON/   # Module demo pages
├── stores/       # Zustand state stores (directory exists but empty)
├── hooks/        # Custom React hooks (directory exists but empty)
├── utils/        # Utility functions (directory exists but empty)
├── config/       # Configuration files (directory exists but empty)
├── mocks/        # Mock data for development (directory exists but empty)
└── assets/       # Static resources (directory exists but empty)
```

### Component Architecture

**Common Components Developed:**

1. **TabBar** (`components/common/TabBar.jsx`)
   - Navigation bar with 3 tabs: 캘린더(/), 게시판(/events), 동아리(/clubs)
   - Uses React Router's `NavLink` for automatic active state
   - Active tab styling: darker text + bottom border indicator
   - Note: Filename is `TabBar.jsx` not `COM3.jsx` (COM3 is a Windows reserved name)

2. **MiniCalendar** (`components/common/MiniCalendar.jsx`)
   - Compact 6-week calendar view (42 cells)
   - Month navigation with chevron buttons
   - Sunday/Saturday colored (red/blue)
   - Today highlighted with blue circle background
   - Shows only current month dates (empty cells for prev/next month days)

3. **MainCalendar** (`components/HOM/MainCalendar.jsx`)
   - Full-size calendar similar to MiniCalendar
   - Key difference: Shows prev/next month dates in faded gray
   - Larger spacing and text for main page display
   - Same navigation and color scheme as MiniCalendar

4. **EventRow** (`components/EVL/EventRow.jsx`)
   - Props: `status`, `title`, `time`
   - Layout: status badge + title on left, time on right
   - Includes bottom border divider

**Component Patterns:**
- Korean comments throughout for documentation
- Data-driven configuration where applicable
- Tailwind utility classes only (no CSS modules)
- Functional components with hooks (`useState`, `useMemo`)
- Responsive design with breakpoints (e.g., `text-sm md:text-base`)

### Styling Strategy

**Tailwind Configuration** (`tailwind.config.js`):
- Custom color: `main-component: #4068f7`
- Placeholder sections exist for:
  - `fontFamily` (여기에 폰트 패밀리 추가 예정)
  - `boxShadow` (여기에 그림자 스타일 추가 예정)
  - `borderRadius` (여기에 라운드 크기 추가 예정)

**Styling Approach:**
- Pure Tailwind utility classes
- No CSS modules or separate stylesheets
- Conditional classes for state (e.g., active tabs, today's date)
- Common patterns: `rounded-3xl`, `shadow-md`, colored text for weekends

### Calendar Component Logic

Both `MiniCalendar` and `MainCalendar` share similar architecture:

1. **State:** `current` date (useState), `today` memoized
2. **Grid Generation:**
   - Calculate first day of month and its weekday
   - Build 6×7 (42 cells) grid
   - MiniCalendar: null for non-current-month cells
   - MainCalendar: shows prev/next month dates with `inCurrentMonth` flag
3. **Navigation:** `goPrevMonth`/`goNextMonth` functions
4. **Styling:** Conditional classes based on `isToday`, `isSunday`, `isSaturday`

### State Management (Planned but Not Implemented)

- **Zustand** for global client state
- **TanStack React Query** for server state and data fetching
- **Axios** for HTTP client
- Directories exist: `stores/`, `api/`, `hooks/` but are empty

### Git Workflow

- **Main branch:** `main`
- **Development branch:** `dev` (current branch)

## Project Maturity

This is an early-stage project with:

- ✅ Core infrastructure (Vite, React Router, Tailwind)
- ✅ Multiple common components developed (TabBar, MiniCalendar, MainCalendar, EventRow, etc.)
- ✅ Feature-based routing and folder structure
- ✅ Module demo system at `/modules/*` routes
- ⏳ No API integration, state management, or mock data implemented yet
- ⏳ Empty directories ready for: `api/`, `stores/`, `hooks/`, `utils/`, `config/`, `mocks/`
