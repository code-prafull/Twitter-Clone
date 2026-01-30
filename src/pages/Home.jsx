import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TweetComposer from '../components/TweetComposer';
import Tweet from '../components/Tweet';
import MobileNav from '../components/MobileNav';
import { useTwitterContext } from '../context/TwitterContext';

const Home = () => {
  const { tweets, user, addTweet } = useTwitterContext();

  // Initialize with sample tweets if none exist
  useEffect(() => {
    if (tweets.length === 0) {
      // Add sample tweets
      const sampleTweets = [
        {
          id: '1',
          userId: '1',
          username: 'reactjs',
          displayName: 'React',
          avatar: 'https://ui-avatars.com/api/?name=React&background=blue',
          content: 'Check out the latest features in React 19!',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          likes: [],
          retweets: [],
          replies: [],
          likeCount: 150,
          retweetCount: 45,
          replyCount: 12,
        },
        {
          id: '2',
          userId: '2',
          username: 'prafull_singh',
          displayName: 'Prafull Singh',
          avatar: 'https://ui-avatars.com/api/?name=Prafull Singh&background=green',
          content: 'Building a Twitter clone with React and Tailwind CSS. So far so good!',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          likes: [],
          retweets: [],
          replies: [],
          likeCount: 89,
          retweetCount: 23,
          replyCount: 7,
        }
      ];
      
      sampleTweets.forEach(tweet => addTweet(tweet));
    }
  }, [tweets.length, addTweet]);

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <div className="flex-1 max-w-2xl mx-auto border-x border-gray-800 min-h-screen bg-black">
        <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-gray-800 p-4 bg-gradient-to-b from-black to-gray-900/90">
          <h1 className="text-xl font-bold text-white">Home</h1>
        </div>
        <TweetComposer />
        <div className="pb-20">
          {tweets.length > 0 ? (
            tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl text-gray-700 mb-4">𝕏</div>
              <p className="text-gray-500 text-xl mb-2">No tweets yet</p>
              <p className="text-gray-600">Be the first to tweet!</p>
            </div>
          )}
        </div>
      </div>
      <div className="hidden lg:block w-80 p-4">
        <div className="bg-gray-900/60 backdrop-blur rounded-2xl p-4 sticky top-4 border border-gray-800 shadow-lg shadow-gray-900/50">
          <h2 className="text-xl font-bold mb-4 text-white">What's happening</h2>
          <div className="space-y-4">
            <div className="cursor-pointer hover:bg-gray-800/50 p-2 rounded transition-colors duration-200">
              <p className="text-gray-500 text-sm">Trending in India</p>
              <p className="font-bold text-white">#ReactJS</p>
              <p className="text-gray-500 text-sm">45.2K Tweets</p>
            </div>
            <div className="cursor-pointer hover:bg-gray-800/50 p-2 rounded transition-colors duration-200">
              <p className="text-gray-500 text-sm">Technology · Trending</p>
              <p className="font-bold text-white">Web Development</p>
              <p className="text-gray-500 text-sm">23.1K Tweets</p>
            </div>
            <div className="cursor-pointer hover:bg-gray-800/50 p-2 rounded transition-colors duration-200">
              <p className="text-gray-500 text-sm">Programming · Trending</p>
              <p className="font-bold text-white">#JavaScript</p>
              <p className="text-gray-500 text-sm">15.7K Tweets</p>
            </div>
          </div>
        </div>
        {user && (
          <div className="bg-gray-900/60 backdrop-blur rounded-2xl p-4 mt-4 sticky top-40 border border-gray-800 shadow-lg shadow-gray-900/50">
            <h2 className="text-xl font-bold mb-4 text-white">Who to follow</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://ui-avatars.com/api/?name=Elon Musk&background=random"
                    alt="Elon Musk"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-bold text-white">Elon Musk</p>
                    <p className="text-gray-500">@elonmusk</p>
                  </div>
                </div>
                <button className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors duration-200">
                  Follow
                </button>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://ui-avatars.com/api/?name=Bill Gates&background=random"
                    alt="Bill Gates"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-bold text-white">Bill Gates</p>
                    <p className="text-gray-500">@billgates</p>
                  </div>
                </div>
                <button className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors duration-200">
                  Follow
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <MobileNav />
    </div>
  );
};

export default Home;