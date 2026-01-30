import React from 'react';
import { Link } from 'react-router-dom';
import { useTwitterContext } from '../context/TwitterContext';

const Sidebar = () => {
  const { user } = useTwitterContext();

  return (
    <div className="hidden md:block w-64 fixed h-full p-4 border-r border-gray-800 bg-black">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center">
          <Link to="/" className="text-4xl font-bold text-blue-400 transition-transform hover:scale-110 duration-200">
            𝕏
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className="flex items-center p-3 rounded-full hover:bg-gray-900 transition-all duration-200 group"
              >
                <svg className="w-6 h-6 mr-4 text-gray-300 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10.707 17.707 16.414 12l-5.707-5.707L9.293 7.707 13.586 12l-4.293 4.293z"></path>
                </svg>
                <span className="text-xl font-medium group-hover:text-blue-400 transition-colors">Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/explore" 
                className="flex items-center p-3 rounded-full hover:bg-gray-900 transition-all duration-200 group"
              >
                <svg className="w-6 h-6 mr-4 text-gray-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span className="text-xl font-medium group-hover:text-blue-400 transition-colors">Explore</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/notifications" 
                className="flex items-center p-3 rounded-full hover:bg-gray-900 transition-all duration-200 group"
              >
                <svg className="w-6 h-6 mr-4 text-gray-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM11.5 3.5L3.5 11.5"></path>
                </svg>
                <span className="text-xl font-medium group-hover:text-blue-400 transition-colors">Notifications</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/messages" 
                className="flex items-center p-3 rounded-full hover:bg-gray-900 transition-all duration-200 group"
              >
                <svg className="w-6 h-6 mr-4 text-gray-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <span className="text-xl font-medium group-hover:text-blue-400 transition-colors">Messages</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/bookmarks" 
                className="flex items-center p-3 rounded-full hover:bg-gray-900 transition-all duration-200 group"
              >
                <svg className="w-6 h-6 mr-4 text-gray-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                </svg>
                <span className="text-xl font-medium group-hover:text-blue-400 transition-colors">Bookmarks</span>
              </Link>
            </li>
            {user ? (
              <li>
                <Link 
                  to="/profile" 
                  className="flex items-center p-3 rounded-full hover:bg-gray-900 transition-all duration-200 group"
                >
                  <svg className="w-6 h-6 mr-4 text-gray-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span className="text-xl font-medium group-hover:text-blue-400 transition-colors">Profile</span>
                </Link>
              </li>
            ) : (
              <li>
                <Link 
                  to="/login" 
                  className="flex items-center p-3 rounded-full hover:bg-gray-900 transition-all duration-200 group"
                >
                  <svg className="w-6 h-6 mr-4 text-gray-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  <span className="text-xl font-medium group-hover:text-blue-400 transition-colors">Login</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Tweet Button */}
        <div className="mt-auto mb-4">
          {user ? (
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/20">
              Tweet
            </button>
          ) : (
            <Link 
              to="/signup" 
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/20 block text-center"
            >
              Join Now
            </Link>
          )}
        </div>

        {/* User Info */}
        {user && (
          <div className="flex items-center p-3 rounded-full hover:bg-gray-900 cursor-pointer transition-all duration-200 group">
            <img 
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
              alt={user.name} 
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3 flex-1">
              <div className="font-bold text-gray-100 group-hover:text-white transition-colors">{user.name}</div>
              <div className="text-gray-500">@{user.username}</div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 16l-5-5h10l-5 5z"></path>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;