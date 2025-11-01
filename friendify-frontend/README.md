# Friendify - Social Network Frontend

A modern social network application built with React, Vite, and Material-UI.

## Features

- 🔐 **Authentication**: Login, Register, Forgot Password with form validation
- 🏠 **Home Feed**: Infinite scroll feed with post composer
- 💬 **Chat**: Messaging interface with conversation list
- 👥 **Friends**: Friend requests, suggestions, and friend list
- 👤 **Profile**: User profiles with tabs (Posts, About, Friends, Photos) and edit modal
- 🎨 **Groups**: Discover and join groups
- 🛍️ **Marketplace**: Browse and search items
- 📄 **Pages**: Follow pages and organizations
- 🔖 **Saved**: Save posts and marketplace items
- ⚙️ **Settings**: Account, privacy, and content preferences
- 🔍 **Search**: Global search with filtered results
- 🔔 **Notifications**: Notification center with grouped items
- 🌓 **Dark/Light Mode**: Theme toggle with localStorage persistence

## Tech Stack

- **React 19** with Hooks
- **Vite** for fast development and building
- **Material-UI v5** (@mui/material) for UI components
- **Emotion** for styling
- **React Router v6** for routing
- **React Intersection Observer** for infinite scroll
- **JavaScript** (no TypeScript)
- **Static Data** - All data is hardcoded in `src/data/constants.js`

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Default Login

The app uses static authentication - any email and password will work. You'll be logged in as the default user (John Doe).

### Building for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Header.jsx
│   ├── LeftNav.jsx
│   ├── RightRail.jsx
│   ├── PostCard.jsx
│   ├── Composer.jsx
│   └── ...
├── pages/            # Page components
│   ├── Home.jsx
│   ├── Profile.jsx
│   ├── Chat.jsx
│   └── ...
├── contexts/         # React Context providers
│   ├── ThemeContext.jsx
│   └── AuthContext.jsx
├── hooks/            # Custom React hooks
│   ├── useApi.js      # Static data hooks
│   └── useInView.js
├── data/             # Static data
│   └── constants.js   # All app data
├── utils/            # Helper functions
│   └── dateUtils.js
├── App.jsx           # Main app component with routing
└── main.jsx          # Entry point
```

## Features in Detail

### Authentication
- Static login (any credentials work)
- Registration form
- Forgot password flow
- Protected routes
- Session persisted to localStorage

### Home Feed
- Create post composer
- Infinite scroll posts
- Like, comment, and share actions
- Image gallery support
- Skeleton loaders

### Profile
- Cover photo and avatar
- Bio and user information
- Tabs: Posts, About, Friends, Photos
- Edit profile modal
- View other users' profiles

### Chat
- Conversation list
- Messaging interface
- Online status indicators
- Send messages with in-memory persistence

### Dark/Light Mode
- Theme toggle in header
- Persisted to localStorage
- MUI theme integration

## Static Data

All application data is stored in `src/data/constants.js` and includes:

- Users and profiles
- Posts with images
- Comments and replies
- Conversations and messages
- Friend requests and suggestions
- Groups
- Marketplace items
- Pages
- Notifications
- Saved items

### Data Persistence

All data is stored in JavaScript memory and resets on page refresh. New posts, comments, and messages are added to in-memory state during the session.

## Configuration

### Absolute Imports

The project uses `@` as an alias for the `src` directory:

```javascript
import Component from '@/components/Component'
```

This is configured in `vite.config.js`.

## License

MIT
