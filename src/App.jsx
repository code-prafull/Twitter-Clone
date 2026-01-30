import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TwitterProvider } from './context/TwitterContext';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TweetDetail from './pages/TweetDetail';
import Notifications from './pages/Notifications';
import Explore from './pages/Explore';
import Messages from './pages/Messages';
import Bookmarks from './pages/Bookmarks';
import './App.css';

function App() {
  return (
    <TwitterProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/tweet/:id" element={<TweetDetail />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </div>
      </Router>
    </TwitterProvider>
  );
}

export default App;
