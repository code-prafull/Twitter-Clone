import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTwitterContext } from '../context/TwitterContext';
import { formatDate } from '../utils/helpers';

const Tweet = ({ tweet }) => {
  const { user, likeTweet, retweet } = useTwitterContext();
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');

  const isLiked = tweet.likes.includes(user?.id);
  const isRetweeted = tweet.retweets.includes(user?.id);

  const handleLike = () => {
    if (!user) return;
    likeTweet(tweet.id, user.id, !isLiked);
  };

  const handleRetweet = () => {
    if (!user) return;
    retweet(tweet.id, user.id, !isRetweeted);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    // In a real app, you would add the reply to the tweet
    setReplyText('');
    setShowReply(false);
  };

  return (
    <div className="border-b border-gray-800 p-4 hover:bg-gray-900/20 transition-all duration-200 bg-black">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <img
            src={tweet.avatar}
            alt={tweet.displayName}
            className="w-12 h-12 rounded-full border-2 border-blue-500/20"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-1">
            <Link to={`/profile/${tweet.userId}`} className="font-bold hover:underline text-gray-100 hover:text-white transition-colors">
              {tweet.displayName}
            </Link>
            <span className="text-gray-500">@{tweet.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{formatDate(tweet.timestamp)}</span>
          </div>
          <div className="mt-2 text-white text-lg leading-relaxed">{tweet.content}</div>
          <div className="mt-4 flex justify-between max-w-md">
            <button 
              onClick={() => setShowReply(!showReply)}
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 group transition-colors duration-200"
            >
              <div className="p-2 rounded-full group-hover:bg-blue-900/20 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                </svg>
              </div>
              <span className="text-sm font-medium">{tweet.replyCount}</span>
            </button>
            <button 
              onClick={handleRetweet}
              className={`flex items-center space-x-1 ${
                isRetweeted ? 'text-green-500' : 'text-gray-500 hover:text-green-500'
              } group transition-colors duration-200`}
            >
              <div className="p-2 rounded-full group-hover:bg-green-900/20 transition-colors duration-200">
                <svg className="w-5 h-5" fill={isRetweeted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <span className="text-sm font-medium">{tweet.retweetCount}</span>
            </button>
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              } group transition-colors duration-200`}
            >
              <div className="p-2 rounded-full group-hover:bg-red-900/20 transition-colors duration-200">
                <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <span className="text-sm font-medium">{tweet.likeCount}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 group transition-colors duration-200">
              <div className="p-2 rounded-full group-hover:bg-blue-900/20 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                </svg>
              </div>
            </button>
          </div>
          
          {showReply && (
            <div className="mt-4 flex space-x-3 p-3 rounded-xl bg-gray-900/50">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                alt={user?.name}
                className="w-8 h-8 rounded-full"
              />
              <form onSubmit={handleReplySubmit} className="flex-1">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Post your reply"
                  className="w-full bg-transparent border-b border-gray-600 py-2 px-1 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full text-sm font-bold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/20"
                  >
                    Reply
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tweet;