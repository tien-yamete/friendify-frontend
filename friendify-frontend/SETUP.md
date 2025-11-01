# Friendify - Setup Guide

## Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser at `http://localhost:3000`

### Default Login Credentials
The app uses **static authentication** - you can login with **any email and password**. All credentials will be accepted and you'll be logged in as the default user (John Doe).

Example:
- Email: `anything@example.com`
- Password: `anything`

## Architecture

**IMPORTANT**: This application uses **100% static/hardcoded data** with **NO network requests**.

- ✅ Pure static data from `src/data/constants.js`
- ✅ Local state management with React hooks
- ✅ Simulated async behavior with setTimeout

All data is stored in JavaScript memory and resets on page refresh.

## Project Structure

```
src/
├── components/        # Reusable UI components (11 files)
│   ├── CommentList.jsx
│   ├── Composer.jsx
│   ├── EmptyState.jsx
│   ├── Header.jsx
│   ├── Layout.jsx
│   ├── LeftNav.jsx
│   ├── PostCard.jsx
│   ├── PostSkeleton.jsx
│   ├── ProtectedRoute.jsx
│   ├── RightRail.jsx
│   └── UserAvatar.jsx
├── contexts/          # React Context providers (2 files)
│   ├── AuthContext.jsx    # Static auth
│   └── ThemeContext.jsx
├── data/              # Static data constants (1 file)
│   └── constants.js       # All app data in one place
├── hooks/             # Custom React hooks (2 files)
│   ├── useApi.js          # Static data hooks
│   └── useInView.js
├── pages/             # Page components (15 files)
│   ├── Chat.jsx
│   ├── ForgotPassword.jsx
│   ├── Friends.jsx
│   ├── Groups.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Marketplace.jsx
│   ├── Notifications.jsx
│   ├── Pages.jsx
│   ├── PostDetail.jsx
│   ├── Profile.jsx
│   ├── Register.jsx
│   ├── Saved.jsx
│   ├── Search.jsx
│   └── Settings.jsx
├── utils/             # Helper functions (1 file)
│   └── dateUtils.js
├── App.css
├── App.jsx            # Main app component with routing
├── index.css
└── main.jsx           # Entry point
```

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Implemented

✅ **Authentication**
- Login, Register, Forgot Password (all static)
- Protected routes
- Session management with localStorage

✅ **Home Feed**
- Infinite scroll posts
- Create post composer
- Like, comment, share actions
- Optimistic updates

✅ **Profile**
- View user profiles
- Edit profile (name, bio, location, website)
- Profile tabs (Posts, About, Friends, Photos)
- Cover photo and avatar

✅ **Chat**
- Conversation list
- Messaging interface
- Online status indicators

✅ **Friends**
- Friends list
- Friend requests (accept/decline)
- Friend suggestions

✅ **Groups**
- Browse and join groups
- Your groups vs. discover

✅ **Marketplace**
- Browse items for sale
- Item details dialog
- Filter by condition

✅ **Pages**
- Follow pages
- Discover new pages

✅ **Saved Items**
- Save posts and marketplace items

✅ **Settings**
- Account settings
- Privacy settings
- Content preferences

✅ **Search**
- Global search
- Filter by People, Posts, Groups, Pages

✅ **Notifications**
- Notification center
- Read/unread status

✅ **Dark/Light Mode**
- Theme toggle in header
- Persisted to localStorage

## Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Material-UI v5** - Component library
- **Emotion** - CSS-in-JS styling
- **React Router v6** - Routing
- **React Intersection Observer** - Infinite scroll
- **JavaScript** - No TypeScript
- **Static Data** - No backend integration

## Key Dependencies

```json
{
  "dependencies": {
    "@emotion/react": "^11.11.4",
    "@emotion/styled": "^11.11.5",
    "@mui/icons-material": "^5.15.19",
    "@mui/material": "^5.15.19",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-intersection-observer": "^9.10.2",
    "react-router-dom": "^6.23.1"
  }
}
```

## Static Data System

All application data lives in `src/data/constants.js` and includes:

- **currentUser** - The logged-in user (John Doe)
- **users** - 5 mock users
- **posts** - 20 generated posts with images
- **comments** - Sample comments and replies
- **conversations** - 3 chat conversations
- **messages** - Chat messages for each conversation
- **friendRequests** - Pending friend requests
- **friendSuggestions** - Suggested friends
- **groups** - 3 groups
- **marketplaceItems** - 12 items for sale
- **notifications** - 4 sample notifications
- **pages** - 2 pages to follow
- **savedItems** - 2 saved items

### How Data Updates Work

The app maintains **in-memory state** that updates during the session:

1. **Posts**: Creating a new post adds it to the `postsState` array
2. **Likes**: Toggling a like updates the post object directly
3. **Comments**: Adding a comment appends to `commentsState`
4. **Messages**: Sending a message updates `messagesState`
5. **Profile**: Editing profile updates the `currentUser` object

**All changes are lost on page refresh** since there's no backend persistence.

## Custom Hooks

All hooks in `src/hooks/useApi.js` simulate async behavior with `setTimeout`:

```javascript
// Example: Simulates a 100ms delay
function simulateAsync(data, delay = 100) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}
```

### Available Hooks

- `useInfinitePosts()` - Paginated posts with infinite scroll
- `usePost(id)` - Single post by ID
- `useCreatePost()` - Create a new post
- `useLikePost()` - Toggle post like
- `useComments(postId)` - Get comments for a post
- `useCreateComment()` - Add a comment
- `useUser(id)` - Get user profile
- `useUpdateUser()` - Update user profile
- `useConversations()` - Get chat conversations
- `useMessages(conversationId)` - Get messages
- `useSendMessage()` - Send a message
- `useFriends()` - Get friends list
- `useFriendRequests()` - Get friend requests
- `useFriendSuggestions()` - Get friend suggestions
- `useGroups()` - Get groups
- `useMarketplace()` - Get marketplace items
- `useNotifications()` - Get notifications
- `usePages()` - Get pages
- `useSaved()` - Get saved items
- `useSearch(query)` - Search across all data

## Path Alias Configuration

The project uses `@` as an alias for the `src` directory:

```javascript
import Component from '@/components/Component'
import { useAuth } from '@/contexts/AuthContext'
import { posts } from '@/data/constants'
```

This is configured in `vite.config.js`.

## Development Notes

1. **No Network Activity**: Open browser DevTools Network tab - you'll see ZERO network requests (except for images from placeholder services).

2. **State Persistence**: Data only persists during the current session. Refresh = reset to initial state.

3. **Authentication**: The auth token is stored in localStorage but it's just a dummy string. Any credentials work.

4. **Routing**: All routes are defined in `src/App.jsx`. Most routes are protected and require "authentication".

5. **Styling**: Material-UI's theming system with dark/light mode support.

6. **Images**: Placeholder services (pravatar.cc, picsum.photos) are used for images.

## Modifying Static Data

To change the initial data, edit `src/data/constants.js`:

```javascript
// Example: Add a new user
export const users = [
  // ... existing users
  {
    id: '6',
    firstName: 'New',
    lastName: 'User',
    username: 'newuser',
    avatar: 'https://i.pravatar.cc/150?img=99',
    bio: 'A new user',
    mutualFriends: 5,
  },
]
```

## Troubleshooting

### Port already in use
Edit `vite.config.js` and change the port number.

### Dependencies not installing
Delete `node_modules` and `package-lock.json`, then run `npm install`.

### Data not updating
Check the browser console for errors. Most likely a typo in the data structure.

### Images not loading
Placeholder image services require internet connection.

## License

MIT
