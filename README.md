# Polling Application

A modern, real-time polling application built with React, TypeScript, and Tailwind CSS. This application allows administrators to create polls and users to vote on them, with instant result visualization.

## Features

- **Admin Dashboard**: Create, manage, and delete polls with custom questions and multiple answer options
- **User Voting Interface**: Intuitive voting experience with live results after submission
- **Real-time Results**: Visual progress bars showing vote distribution and percentages
- **Dark Mode Design**: Sleek, modern dark theme for comfortable viewing
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Vote Tracking**: Prevents duplicate voting and highlights user's selections
- **In-Memory Storage**: Uses React Context for state management (no backend required)

## Project Structure

```
/home/node/txai-projects/project/
├── index.html                 # HTML entry point
├── package.json              # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── src/
    ├── main.tsx             # Application entry point
    ├── App.tsx              # Main app component with routing
    ├── index.css            # Global styles and Tailwind imports
    ├── types/
    │   └── polling.ts       # TypeScript interfaces for polls
    ├── context/
    │   └── PollingContext.tsx  # State management for polls and votes
    └── components/
        ├── Navigation.tsx    # Top navigation bar
        ├── AdminView.tsx     # Admin poll creation interface
        ├── UserView.tsx      # User voting interface
        └── PollResults.tsx   # Results visualization component
```

## Technology Stack

- **Vite**: Fast build tool and dev server with HMR
- **React 18**: Modern UI library with functional components and hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router**: Client-side routing
- **React Context**: State management for polls and votes

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   mkdir -p /home/node/txai-projects/project/.logs && npm run dev -- --host 0.0.0.0 > /home/node/txai-projects/project/.logs/server.log 2>&1
   ```

3. **Access the application:**
   - The application will be available at `http://localhost:5173`
   - Navigate between User and Admin views using the top navigation

## Running the Application

### Development Mode
```bash
mkdir -p /home/node/txai-projects/project/.logs && npm run dev -- --host 0.0.0.0 > /home/node/txai-projects/project/.logs/server.log 2>&1
```

### Production Build
```bash
npm run build
npm run preview
```

## Usage Instructions

### For Poll Administrators

1. Navigate to the **Admin** page using the top navigation
2. Click **"+ Create New Poll"** button
3. Enter your poll question
4. Add at least 2 answer options (you can add more using "+ Add Option")
5. Click **"Create Poll"** to publish
6. View all active polls with live results
7. Delete polls using the **"Delete"** button when needed

### For Users

1. Navigate to the **Vote** page (default landing page)
2. Browse available polls
3. Select your preferred answer option
4. Click **"Submit Vote"** to cast your vote
5. View results immediately after voting
6. Your vote is highlighted in the results display

## Design Highlights

- **Dark Mode Theme**: Gray-900 background with violet accent colors
- **Interactive Elements**: Hover states, transitions, and visual feedback
- **Progress Bars**: Gradient-filled progress bars showing vote percentages
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Visual Indicators**: Icons, badges, and color coding for better UX

## Environment Variables

This project uses Vite's environment variable system. Create a `.env` file if needed:

```bash
# Deployment base path (default: /)
VITE_BASE_PATH=/
```

## High-Level Architecture

The application uses a **React Context-based architecture** for state management:

1. **PollingContext**: Centralized state for all polls and user votes
2. **Component Hierarchy**:
   - App → PollingProvider → Routes → Views
   - Views consume context via `usePolling()` hook
3. **In-Memory Storage**: All data stored in React state (resets on page refresh)
4. **Client-Side Routing**: React Router handles navigation without page reloads

### Key Design Decisions

- **No Backend**: Simplified architecture using React Context for quick setup
- **Vote Prevention**: Tracked via user session (browser storage could be added)
- **Real-time Updates**: React state changes trigger immediate UI updates
- **Component Separation**: Clear separation between admin and user concerns

## Troubleshooting

### Development Server Won't Start
- Check if port 5173 is already in use
- Try killing the process: `lsof -ti:5173 | xargs kill -9`
- Check the logs at `/home/node/txai-projects/project/.logs/server.log`

### Votes Not Persisting
- This is expected behavior - the app uses in-memory storage
- Data resets on page refresh
- To add persistence, consider integrating a backend or localStorage

### Styling Not Applied
- Ensure Tailwind CSS is properly configured
- Check that `index.css` imports are present in `main.tsx`
- Clear browser cache and restart dev server

## Future Enhancements

- Add localStorage/sessionStorage for vote persistence
- Backend integration with REST API
- Real-time updates using WebSockets
- User authentication system
- Poll expiration dates
- Export results to CSV/PDF
- Poll categories and filtering
- Anonymous vs. authenticated voting modes

## License

MIT License - Feel free to use this project for learning and development.

---

✨ Built by Leona - Vibe coding Agent from HCL Software
