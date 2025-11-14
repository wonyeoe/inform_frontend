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
- **Zustand 5.0.8** for state management (not yet implemented)
- **TanStack React Query 5.90.7** for server state (not yet implemented)
- **Axios 1.13.2** for HTTP requests (not yet implemented)

## Project Architecture

### Route Structure

Routes defined in `src/App.jsx`:

- `/` → HOMPage (Home)
- `/clubs` → CBLPage (Club List)
- `/clubs/detail` → CBDPage (Club Detail)
- `/events` → EVLPage (Event List)
- `/events/detail` → EVDPage (Event Detail)
- `/modules/com3` → COM3Page (Tab Navigation Module Demo)
- `/test` → TestPage (Navigation testing)

### Naming Conventions

- **Page components**: `[CODE]Page.jsx` (e.g., `HOMPage`, `CBDPage`)
- **Feature folders**: 3-letter uppercase codes (HOM, CBD, CBL, EVL, EVD)
- **Common modules**: Prefixed with module identifier (e.g., `COM3_TabBar`)

**Feature Codes:**

- **HOM** = Home
- **CBL** = Club List
- **CBD** = Club Detail
- **EVL** = Event List
- **EVD** = Event Detail

### Directory Organization

```
src/
├── api/          # API integration layer (prepared but empty)
├── components/   # Reusable components
│   ├── common/  # Shared components (e.g., COM3_TabBar)
│   └── [FEATURE]/ # Feature-specific components
├── pages/        # Route-based page components
│   └── [FEATURE]/ # Each feature has its own folder
├── stores/       # Zustand state stores (prepared but empty)
├── hooks/        # Custom React hooks (prepared but empty)
├── utils/        # Utility functions (prepared but empty)
├── config/       # Configuration files (prepared but empty)
├── mocks/        # Mock data for development
│   └── [FEATURE]/ # Feature-specific mock data
└── assets/       # Static resources
    ├── common/  # Shared assets
    └── [FEATURE]/ # Feature-specific assets
```

**Feature-based organization:** Each feature can have its own subdirectories in `components/`, `assets/`, and `mocks/` for modularity.

### Component Architecture

**Module System:**

- Components are built as reusable modules (e.g., `COM3_TabBar` navigation module)
- Modules can be demoed at `/modules/[module-name]` routes
- Korean comments are used throughout for documentation

**Pattern Example** (`COM3_TabBar`):

- Data-driven configuration (tabs array)
- React Router's `NavLink` for active state management
- Tailwind CSS for responsive, conditional styling
- Functional components with hooks

**Note:** "COM3" as a standalone filename doesn't work on Windows (reserved name), hence `COM3_TabBar.jsx`

### Styling Approach

- Pure Tailwind utility classes (no CSS modules)
- Responsive design using breakpoints (e.g., `text-sm md:text-base`)
- Theme extensions prepared in `tailwind.config.js` (colors, fonts, shadows, border radius) but not yet populated
- Full-screen layouts (`min-h-screen`) for pages

### State Management Strategy (Planned)

- **Zustand** for global client state (installed but not implemented)
- **TanStack React Query** for server state and data fetching (installed but not implemented)
- **Axios** for HTTP client (installed but not implemented)

### Project Maturity

This is an early-stage project with:

- ✅ Core infrastructure established (routing, build tools, styling)
- ✅ One completed common component module (COM3_TabBar)
- ✅ Clean architectural foundation
- ⏳ Placeholder directories ready for: API layer, stores, hooks, utils, config
- ⏳ No API integration or state management implementation yet

## Git Workflow

- **Main branch:** `main`
- **Development branch:** `dev`

Recent work has focused on:

1. Module development (COM3 tab navigation completed)
2. Page routing setup
3. Initial Prettier and Tailwind configuration
