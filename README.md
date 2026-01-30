# Twitter Clone

A Twitter-like social media application built with React, featuring real-time posting, liking, retweeting, and user profiles.

## Features

- **User Authentication**: Sign up and login functionality
- **Tweet Creation**: Post tweets with text content
- **Like & Retweet**: Engage with tweets from other users
- **User Profiles**: View and manage your profile
- **Timeline**: See tweets from users you follow
- **Responsive Design**: Works on desktop and mobile devices
- **Persistent Data**: Uses localStorage to save data between sessions

## Tech Stack

- **React**: Frontend library for building user interfaces
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework for styling
- **LocalStorage**: Client-side data persistence

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Sign Up**: Create a new account using your email and password
2. **Login**: Access your account with your credentials
3. **Tweet**: Share your thoughts with the world
4. **Engage**: Like, retweet, and reply to other users' tweets
5. **Profile**: View and manage your profile information

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── Tweet.jsx       # Individual tweet component
│   ├── TweetComposer.jsx # Tweet creation form
│   └── MobileNav.jsx   # Mobile navigation
├── context/            # Global state management
│   └── TwitterContext.jsx # Twitter state provider
├── pages/              # Page components
│   ├── Home.jsx        # Main feed page
│   ├── Profile.jsx     # User profile page
│   ├── Login.jsx       # Login page
│   ├── Signup.jsx      # Registration page
│   └── TweetDetail.jsx # Individual tweet page
├── utils/              # Utility functions
│   └── helpers.js      # Helper functions
└── App.jsx             # Main application component
```

## Functionality

- **Authentication**: Mock authentication system with localStorage
- **State Management**: Context API for global state management
- **Data Persistence**: Uses localStorage to persist user data and tweets
- **Real-time Interaction**: Like, retweet, and reply to tweets instantly
- **Responsive UI**: Adapts to different screen sizes

## Future Enhancements

- Real-time notifications
- Direct messaging
- Advanced search functionality
- Trending topics
- Media upload support
- Dark/light mode toggle

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## 🔗 Live Demo
👉 [View Site ](https://x-twiteclone.netlify.app/)  
