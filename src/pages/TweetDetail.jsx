import React from 'react';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';
import { useParams } from 'react-router-dom';
import { useTwitterContext } from '../context/TwitterContext';
import Tweet from '../components/Tweet';

const TweetDetail = () => {
  const { id } = useParams();
  const { tweets } = useTwitterContext();
  
  const tweet = tweets.find(t => t.id === id);
  
  if (!tweet) {
    return (
      <div className="flex min-h-screen bg-black">
        <Sidebar />
        <div className="flex-1 max-w-2xl mx-auto border-x border-gray-800 min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="text-6xl text-gray-700 mb-4">𝕏</div>
            <p className="text-xl mb-4 text-gray-300">Tweet not found</p>
            <a href="/home" className="text-blue-400 hover:text-blue-300 hover:underline font-medium transition-colors duration-200">Go back home</a>
          </div>
        </div>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <div className="flex-1 max-w-2xl mx-auto border-x border-gray-800 min-h-screen bg-black">
        <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-gray-800 p-4 bg-gradient-to-b from-black to-gray-900/90">
          <h1 className="text-xl font-bold text-white">Thread</h1>
        </div>
        <div className="border-b border-gray-800">
          <Tweet tweet={tweet} />
        </div>
        
        {/* Replies */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-white">Replies</h2>
          <div className="text-center py-8 text-gray-500">
            <p>No replies yet. Be the first to reply!</p>
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default TweetDetail;