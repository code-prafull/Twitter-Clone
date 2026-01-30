import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Tweet from '../components/Tweet';
import MobileNav from '../components/MobileNav';
import { useTwitterContext } from '../context/TwitterContext';

const Explore = () => {
  const { user, tweets } = useTwitterContext();
  const [activeTab, setActiveTab] = useState('For you');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter tweets based on search query
  const filteredTweets = tweets.filter(tweet => 
    tweet.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tweet.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const trends = [
    {
      id: 1,
      category: 'Technology',
      title: '#ReactJS',
      tweetCount: '50.4K',
    },
    {
      id: 2,
      category: 'Trending in India',
      title: 'WebDevelopment',
      tweetCount: '25.1K',
    },
    {
      id: 3,
      category: 'Programming',
      title: 'JavaScript',
      tweetCount: '18.7K',
    },
    {
      id: 4,
      category: 'Trending',
      title: 'CodingLife',
      tweetCount: '12.3K',
    },
    {
      id: 5,
      category: 'Software',
      title: 'Frontend',
      tweetCount: '8.9K',
    },
  ];

  const people = [
    {
      id: 1,
      name: 'Elon Musk',
      username: 'elonmusk',
      bio: 'CEO of Tesla and SpaceX. Innovating the future.',
    },
    {
      id: 2,
      name: 'Bill Gates',
      username: 'billgates',
      bio: 'Co-founder of Microsoft. Philanthropist.',
    },
    {
      id: 3,
      name: 'Mark Zuckerberg',
      username: 'zuck',
      bio: 'Founder of Meta. Building the metaverse.',
    },
  ];

  const sampleTweets = [
    {
      id: '1',
      userId: '1',
      username: 'technews',
      displayName: 'Tech News',
      avatar: 'https://ui-avatars.com/api/?name=Tech News&background=blue',
      content: 'Breaking: New React features announced at conference. Developers are excited about the performance improvements!',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      likes: [],
      retweets: [],
      replies: [],
      likeCount: 234,
      retweetCount: 89,
      replyCount: 23,
    },
    {
      id: '2',
      userId: '2',
      username: 'coding_guru',
      displayName: 'Coding Guru',
      avatar: 'https://ui-avatars.com/api/?name=Coding Guru&background=green',
      content: 'Just deployed my new portfolio website built with React and Tailwind CSS. So happy with the results! 🚀',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      likes: [],
      retweets: [],
      replies: [],
      likeCount: 156,
      retweetCount: 42,
      replyCount: 18,
    }
  ];

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <div className="flex-1 max-w-2xl mx-auto border-x border-gray-800 min-h-screen bg-black">
        <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-gray-800 p-4 bg-gradient-to-b from-black to-gray-900/90">
          <h1 className="text-xl font-bold text-white">Explore</h1>
        </div>
        
        <div className="flex border-b border-gray-800">
          <button
            className={`flex-1 py-4 font-bold text-center transition-colors duration-200 ${
              activeTab === 'For you'
                ? 'text-white border-b-4 border-blue-500'
                : 'text-gray-500 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('For you')}
          >
            For you
          </button>
          <button
            className={`flex-1 py-4 font-bold text-center transition-colors duration-200 ${
              activeTab === 'Trending'
                ? 'text-white border-b-4 border-blue-500'
                : 'text-gray-500 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('Trending')}
          >
            Trending
          </button>
        </div>

        {activeTab === 'For you' && (
          <div>
            {(searchQuery ? filteredTweets : sampleTweets).map((tweet) => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))}
            {(searchQuery ? filteredTweets : sampleTweets).length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl text-gray-700 mb-4">🔍</div>
                <p className="text-gray-500 text-xl mb-2">No tweets found</p>
                <p className="text-gray-600">Try a different search term</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'Trending' && (
          <div className="divide-y divide-gray-800">
            <div className="p-4">
              <h2 className="text-lg font-bold text-white mb-4">Trends for you</h2>
              {trends.map((trend) => (
                <div key={trend.id} className="py-3 hover:bg-gray-900/20 transition-colors duration-200 cursor-pointer">
                  <p className="text-gray-500 text-sm">{trend.category}</p>
                  <p className="font-bold text-white">#{trend.title}</p>
                  <p className="text-gray-500 text-sm">{trend.tweetCount} posts</p>
                </div>
              ))}
            </div>
            
            <div className="p-4">
              <h2 className="text-lg font-bold text-white mb-4">Who to follow</h2>
              {people.map((person) => (
                <div key={person.id} className="py-3 hover:bg-gray-900/20 transition-colors duration-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${person.name}&background=random`}
                      alt={person.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-bold text-white">{person.name}</div>
                      <div className="text-gray-500">@{person.username}</div>
                      <p className="text-gray-400 text-sm mt-1">{person.bio}</p>
                    </div>
                  </div>
                  <button className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors duration-200">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <MobileNav />
    </div>
  );
};

export default Explore;