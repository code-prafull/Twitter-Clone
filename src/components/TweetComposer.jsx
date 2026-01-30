import React, { useState } from 'react';
import { useTwitterContext } from '../context/TwitterContext';
import { generateId, validateTweet } from '../utils/helpers';

const TweetComposer = () => {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { user, addTweet } = useTwitterContext();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateTweet(content);
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    const newTweet = {
      id: generateId(),
      userId: user?.id,
      username: user?.username,
      displayName: user?.name,
      avatar: user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random`,
      content,
      timestamp: new Date().toISOString(),
      likes: [],
      retweets: [],
      replies: [],
      likeCount: 0,
      retweetCount: 0,
      replyCount: 0,
    };

    addTweet(newTweet);
    setContent('');
    setError('');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="border-b border-gray-800 p-4 bg-black">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
              alt={user.name}
              className="w-12 h-12 rounded-full border-2 border-blue-500"
            />
          </div>
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError('');
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="What's happening?"
              className="w-full bg-transparent text-xl placeholder-gray-500 border-0 focus:ring-0 resize-none min-h-[100px] font-medium"
              rows={isFocused ? 4 : 1}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className="flex items-center justify-between pt-3">
              <div className="flex space-x-2 text-blue-500">
                <button type="button" className="hover:bg-blue-900/20 p-2 rounded-full transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0z"></path>
                    <path d="M12 2a10 10 0 00-7.35 16.76L12 22l7.35-3.24A10 10 0 0012 2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <button type="button" className="hover:bg-blue-900/20 p-2 rounded-full transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.12 21 5.5v13c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.22-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-3.086z"></path>
                  </svg>
                </button>
                <button type="button" className="hover:bg-blue-900/20 p-2 rounded-full transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0z"></path>
                    <path d="M12 2a10 10 0 00-7.35 16.76L12 22l7.35-3.24A10 10 0 0012 2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <button type="button" className="hover:bg-blue-900/20 p-2 rounded-full transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0z"></path>
                    <path d="M12 2a10 10 0 00-7.35 16.76L12 22l7.35-3.24A10 10 0 0012 2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
              <button
                type="submit"
                disabled={!content.trim()}
                className={`px-6 py-2 rounded-full font-bold transition-all duration-200 ${
                  content.trim()
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/20 transform hover:scale-105'
                    : 'bg-blue-500/50 text-white/50 cursor-not-allowed'
                }`}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TweetComposer;