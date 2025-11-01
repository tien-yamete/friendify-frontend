export const currentUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  username: 'johndoe',
  avatar: 'https://i.pravatar.cc/150?img=1',
  coverPhoto: 'https://picsum.photos/seed/cover1/1200/400',
  bio: 'Software developer | Coffee enthusiast | Travel lover',
  location: 'San Francisco, CA',
  website: 'https://johndoe.com',
  joinedDate: '2020-01-15',
  friendsCount: 847,
  followersCount: 1234,
  followingCount: 523,
}

export const users = [
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'janesmith',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Designer & Creative',
    mutualFriends: 23,
    isOnline: true,
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    username: 'mikej',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Photographer',
    mutualFriends: 15,
    isOnline: false,
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Williams',
    username: 'sarahw',
    avatar: 'https://i.pravatar.cc/150?img=45',
    bio: 'Marketing Manager',
    mutualFriends: 31,
    isOnline: true,
  },
  {
    id: '5',
    firstName: 'Tom',
    lastName: 'Brown',
    username: 'tombrown',
    avatar: 'https://i.pravatar.cc/150?img=33',
    bio: 'Entrepreneur',
    mutualFriends: 8,
    isOnline: false,
  },
]

export const posts = Array.from({ length: 20 }, (_, i) => ({
  id: `post-${i + 1}`,
  author: i === 0 ? currentUser : users[i % users.length],
  content: [
    'Just finished an amazing project! Feeling accomplished 🚀',
    'Beautiful sunset at the beach today 🌅',
    'Coffee and coding - perfect morning combo ☕',
    'Excited to share my latest photography work!',
    'Team meeting went great! Looking forward to the next sprint.',
    'Throwback to an amazing trip last summer 🏖️',
    'New blog post is live! Check it out',
    'Weekend vibes! What are your plans?',
    'Learning something new every day 📚',
    'Just launched our new website! 🎉',
  ][i % 10],
  images: i % 3 === 0 ? [
    `https://picsum.photos/seed/${i}a/600/400`,
    ...(i % 5 === 0 ? [
      `https://picsum.photos/seed/${i}b/600/400`,
      `https://picsum.photos/seed/${i}c/600/400`,
    ] : [])
  ] : [],
  likes: Math.floor(Math.random() * 500) + 10,
  comments: Math.floor(Math.random() * 50) + 2,
  shares: Math.floor(Math.random() * 20),
  timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  isLiked: i % 4 === 0,
}))

export const comments = [
  {
    id: 'comment-1',
    postId: 'post-1',
    author: users[0],
    content: 'Amazing work! Keep it up!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 5,
    replies: [],
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    author: users[1],
    content: 'This is so inspiring!',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    likes: 3,
    replies: [
      {
        id: 'reply-1',
        author: currentUser,
        content: 'Thank you so much!',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        likes: 2,
      },
    ],
  },
]

export const conversations = [
  {
    id: 'conv-1',
    participant: users[0],
    lastMessage: 'Hey! How are you doing?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    unread: 2,
    isOnline: true,
  },
  {
    id: 'conv-2',
    participant: users[1],
    lastMessage: 'Thanks for the help yesterday!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    unread: 0,
    isOnline: true,
  },
  {
    id: 'conv-3',
    participant: users[2],
    lastMessage: 'See you tomorrow!',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    unread: 0,
    isOnline: false,
  },
]

export const messages = {
  'conv-1': [
    {
      id: 'msg-1',
      sender: users[0],
      content: 'Hey! How are you doing?',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: 'msg-2',
      sender: currentUser,
      content: 'Hi! I\'m good, thanks! How about you?',
      timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: 'msg-3',
      sender: users[0],
      content: 'Doing great! Want to grab coffee later?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      read: false,
    },
  ],
  'conv-2': [],
  'conv-3': [],
}

export const friendRequests = [
  {
    id: 'req-1',
    user: users[2],
    mutualFriends: 12,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'req-2',
    user: users[3],
    mutualFriends: 8,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const friendSuggestions = [
  {
    id: 'sug-1',
    user: users[4],
    mutualFriends: 15,
    reason: 'Works at TechCorp',
  },
  {
    id: 'sug-2',
    user: {
      id: '6',
      firstName: 'Emma',
      lastName: 'Davis',
      username: 'emmad',
      avatar: 'https://i.pravatar.cc/150?img=47',
      bio: 'Product Designer',
    },
    mutualFriends: 20,
    reason: 'Friends with Jane Smith',
  },
]

export const groups = [
  {
    id: 'group-1',
    name: 'Web Developers',
    description: 'A community for web developers to share and learn',
    members: 12543,
    coverPhoto: 'https://picsum.photos/seed/group1/600/200',
    isMember: true,
  },
  {
    id: 'group-2',
    name: 'Photography Lovers',
    description: 'Share your best shots!',
    members: 8932,
    coverPhoto: 'https://picsum.photos/seed/group2/600/200',
    isMember: true,
  },
  {
    id: 'group-3',
    name: 'Travel Enthusiasts',
    description: 'Exploring the world together',
    members: 15678,
    coverPhoto: 'https://picsum.photos/seed/group3/600/200',
    isMember: false,
  },
]

export const marketplaceItems = Array.from({ length: 12 }, (_, i) => ({
  id: `item-${i + 1}`,
  title: [
    'Vintage Camera',
    'Mountain Bike',
    'Gaming Laptop',
    'Designer Chair',
    'Plant Collection',
    'Guitar - Fender',
    'Kitchen Appliances',
    'Sports Equipment',
    'Art Supplies',
    'Books Bundle',
    'Headphones',
    'Smartwatch',
  ][i],
  price: Math.floor(Math.random() * 500) + 50,
  location: 'San Francisco, CA',
  image: `https://picsum.photos/seed/item${i + 1}/400/300`,
  seller: users[i % users.length],
  condition: ['New', 'Like New', 'Good', 'Fair'][Math.floor(Math.random() * 4)],
  timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
}))

export const notifications = [
  {
    id: 'notif-1',
    type: 'like',
    user: users[0],
    message: 'liked your post',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    read: false,
    link: '/posts/post-1',
  },
  {
    id: 'notif-2',
    type: 'comment',
    user: users[1],
    message: 'commented on your post',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
    link: '/posts/post-1',
  },
  {
    id: 'notif-3',
    type: 'friend_request',
    user: users[2],
    message: 'sent you a friend request',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: true,
    link: '/friends/requests',
  },
  {
    id: 'notif-4',
    type: 'birthday',
    user: users[3],
    message: 'has a birthday today',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: true,
    link: `/profile/${users[3].id}`,
  },
]

export const pages = [
  {
    id: 'page-1',
    name: 'TechStartup Inc.',
    category: 'Technology',
    likes: 45230,
    coverPhoto: 'https://picsum.photos/seed/page1/1200/400',
    avatar: 'https://i.pravatar.cc/150?img=60',
    description: 'Innovative tech solutions for modern businesses',
    isFollowing: true,
  },
  {
    id: 'page-2',
    name: 'Coffee House',
    category: 'Food & Beverage',
    likes: 12543,
    coverPhoto: 'https://picsum.photos/seed/page2/1200/400',
    avatar: 'https://i.pravatar.cc/150?img=61',
    description: 'Best coffee in town',
    isFollowing: false,
  },
]

export const savedItems = [
  {
    id: 'saved-1',
    type: 'post',
    item: posts[0],
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'saved-2',
    type: 'marketplace',
    item: marketplaceItems[0],
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
]

export const events = [
  {
    id: 'event-1',
    title: 'Tech Conference 2024',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'San Francisco Convention Center',
    coverPhoto: 'https://picsum.photos/seed/event1/800/400',
    attendees: 234,
    interested: 567,
    host: currentUser,
    description: 'Join us for the biggest tech conference of the year! Network with industry leaders and learn about the latest innovations.',
    isGoing: true,
  },
  {
    id: 'event-2',
    title: 'Photography Meetup',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Golden Gate Park',
    coverPhoto: 'https://picsum.photos/seed/event2/800/400',
    attendees: 45,
    interested: 89,
    host: users[1],
    description: 'Bring your camera and join fellow photography enthusiasts for a fun outdoor shoot!',
    isGoing: false,
    isInterested: true,
  },
  {
    id: 'event-3',
    title: 'Coffee & Code',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Coffee House Downtown',
    coverPhoto: 'https://picsum.photos/seed/event3/800/400',
    attendees: 18,
    interested: 32,
    host: users[2],
    description: 'Weekly meetup for developers. Work on projects, share knowledge, and enjoy great coffee!',
    isGoing: true,
  },
  {
    id: 'event-4',
    title: 'Summer Music Festival',
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'City Park Amphitheater',
    coverPhoto: 'https://picsum.photos/seed/event4/800/400',
    attendees: 1234,
    interested: 3456,
    host: users[0],
    description: 'Three days of incredible music featuring local and international artists!',
    isGoing: false,
    isInterested: false,
  },
  {
    id: 'event-5',
    title: 'Startup Networking Night',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'TechHub Coworking Space',
    coverPhoto: 'https://picsum.photos/seed/event5/800/400',
    attendees: 67,
    interested: 123,
    host: users[3],
    description: 'Connect with entrepreneurs, investors, and innovators in the startup ecosystem.',
    isGoing: false,
    isInterested: true,
  },
  {
    id: 'event-6',
    title: 'Yoga in the Park',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Central Park',
    coverPhoto: 'https://picsum.photos/seed/event6/800/400',
    attendees: 28,
    interested: 54,
    host: users[4],
    description: 'Free outdoor yoga session for all levels. Bring your mat and enjoy the morning sunshine!',
    isGoing: true,
  },
]
