import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';
import { useTwitterContext } from '../context/TwitterContext';

const Notifications = () => {
  const { user, notifications, markNotificationAsRead } = useTwitterContext();
  const [localNotifications, setLocalNotifications] = useState([]);
  
  // Update local state when context changes
  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);
  
  const markAsRead = (id) => {
    markNotificationAsRead(id);
  };

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <div className="flex-1 max-w-2xl mx-auto border-x border-gray-800 min-h-screen bg-black">
        <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-gray-800 p-4 bg-gradient-to-b from-black to-gray-900/90">
          <h1 className="text-xl font-bold text-white">Notifications</h1>
        </div>
        
        <div className="divide-y divide-gray-800">
          {localNotifications.length > 0 ? (
            localNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 transition-colors duration-200 cursor-pointer ${
                  notification.read ? 'bg-black' : 'bg-gray-900/30'
                } hover:bg-gray-900/50`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {notification.user.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white">{notification.user}</span>
                      <span className="text-gray-500">@{notification.username}</span>
                      <span className="text-gray-500">·</span>
                      <span className="text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-gray-300 mt-1">{notification.content}</p>
                    {notification.tweetPreview && (
                      <div className="mt-2 p-3 bg-gray-900 rounded-lg border border-gray-700">
                        <p className="text-gray-200 text-sm">{notification.tweetPreview}</p>
                      </div>
                    )}
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full self-center"></div>
                  )}
                  {notification.type === 'like' && (
                    <div className="text-red-500 ml-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                      </svg>
                    </div>
                  )}
                  {notification.type === 'retweet' && (
                    <div className="text-green-500 ml-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl text-gray-700 mb-4">🔔</div>
              <p className="text-gray-500 text-xl mb-2">No notifications yet</p>
              <p className="text-gray-600">When you receive notifications, they'll appear here</p>
            </div>
          )}
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Notifications;