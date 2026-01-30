import React from 'react';
import { Link } from 'react-router-dom';
import { useTwitterContext } from '../context/TwitterContext';

const MobileNav = () => {
  const { user } = useTwitterContext();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-800 md:hidden z-50">
      <div className="flex justify-around items-center p-3">
        <Link to="/" className="p-3 rounded-full hover:bg-gray-800 transition-colors duration-200 group">
          <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10.707 17.707 16.414 12l-5.707-5.707L9.293 7.707 13.586 12l-4.293 4.293z"></path>
          </svg>
        </Link>
        <Link to="/explore" className="p-3 rounded-full hover:bg-gray-800 transition-colors duration-200 group">
          <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </Link>
        <Link to="/notifications" className="p-3 rounded-full hover:bg-gray-800 transition-colors duration-200 group">
          <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM11.5 3.5L3.5 11.5"></path>
          </svg>
        </Link>
        <Link to="/messages" className="p-3 rounded-full hover:bg-gray-800 transition-colors duration-200 group">
          <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </Link>
        {user ? (
          <Link to="/profile" className="p-3 rounded-full hover:bg-gray-800 transition-colors duration-200 group">
            <img 
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
              alt={user.name} 
              className="w-6 h-6 rounded-full"
            />
          </Link>
        ) : (
          <Link to="/login" className="p-3 rounded-full hover:bg-gray-800 transition-colors duration-200 group">
            <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileNav;