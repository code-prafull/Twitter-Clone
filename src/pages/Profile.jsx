import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Tweet from '../components/Tweet';
import MobileNav from '../components/MobileNav';
import { useTwitterContext } from '../context/TwitterContext';

const Profile = () => {
  const { user: currentUser } = useTwitterContext();
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Tweets');
  const [isFollowing, setIsFollowing] = useState(false);

  // For this demo, we'll use the current user if no userId is provided
  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setIsFollowing(false); // Default to not following oneself
    }
  }, [currentUser]);

  // Mock function to toggle follow
  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  // Mock tweets for the user
  const userTweets = [
    {
      id: '1',
      userId: user?.id,
      username: user?.username || 'username',
      displayName: user?.name || 'User Name',
      avatar: user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`,
      content: 'Just joined Twitter! Excited to share my thoughts with the world.',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      likes: [],
      retweets: [],
      replies: [],
      likeCount: 24,
      retweetCount: 5,
      replyCount: 3,
    },
    {
      id: '2',
      userId: user?.id,
      username: user?.username || 'username',
      displayName: user?.name || 'User Name',
      avatar: user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`,
      content: 'Beautiful sunset today! Nature never fails to amaze me. 🌅 #sunset #nature #photography',
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      likes: [],
      retweets: [],
      replies: [],
      likeCount: 156,
      retweetCount: 42,
      replyCount: 18,
    },
    {
      id: '3',
      userId: user?.id,
      username: user?.username || 'username',
      displayName: user?.name || 'User Name',
      avatar: user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`,
      content: 'Working on an exciting new project. Can\'t wait to share it with everyone! 💻 #coding #webdev #react',
      timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      likes: [],
      retweets: [],
      replies: [],
      likeCount: 87,
      retweetCount: 23,
      replyCount: 12,
    }
  ];

  if (!user) {
    return (
      <div className="flex min-h-screen bg-black">
        <Sidebar />
        <div className="flex-1 max-w-2xl mx-auto border-x border-gray-800 min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-xl">Loading...</p>
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
        {/* Profile Header */}
        <div className="relative">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          {/* Edit Profile Button - Only for own profile */}
          {currentUser?.id === user.id && (
            <div className="absolute top-4 right-4">
              <button className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors duration-200">
                Edit profile
              </button>
            </div>
          )}
          
          {/* Follow Button - For other profiles */}
          {currentUser?.id !== user.id && (
            <div className="absolute top-4 right-4">
              <button 
                onClick={toggleFollow}
                className={`px-4 py-2 rounded-full font-bold transition-colors duration-200 ${
                  isFollowing 
                    ? 'bg-white text-black border border-gray-700 hover:bg-gray-200' 
                    : 'bg-black text-white border border-gray-700 hover:bg-gray-900'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          )}
          
          {/* Profile Info */}
          <div className="px-4 pb-4">
            <div className="flex items-end -mt-16">
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-black bg-black"
              />
            </div>
            
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-gray-500">@{user.username}</p>
              
              <p className="text-white mt-3">{user.bio}</p>
              
              <div className="flex items-center space-x-4 mt-3 text-gray-500">
                <span>📍 {user.location || 'Earth'}</span>
                <span>🔗 {user.website || 'website.com'}</span>
              </div>
              
              <div className="flex items-center space-x-4 mt-3 text-gray-500">
                <span><span className="text-white font-bold">{user.following || 0}</span> Following</span>
                <span><span className="text-white font-bold">{user.followers || 0}</span> Followers</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-800 sticky top-0 bg-black/80 backdrop-blur-md z-10">
          <div className="flex">
            <button
              className={`flex-1 py-4 font-bold text-center transition-colors duration-200 ${
                activeTab === 'Tweets'
                  ? 'text-white border-b-4 border-blue-500'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('Tweets')}
            >
              Tweets
            </button>
            <button
              className={`flex-1 py-4 font-bold text-center transition-colors duration-200 ${
                activeTab === 'Replies'
                  ? 'text-white border-b-4 border-blue-500'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('Replies')}
            >
              Replies
            </button>
            <button
              className={`flex-1 py-4 font-bold text-center transition-colors duration-200 ${
                activeTab === 'Media'
                  ? 'text-white border-b-4 border-blue-500'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('Media')}
            >
              Media
            </button>
            <button
              className={`flex-1 py-4 font-bold text-center transition-colors duration-200 ${
                activeTab === 'Likes'
                  ? 'text-white border-b-4 border-blue-500'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('Likes')}
            >
              Likes
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div>
          {activeTab === 'Tweets' && (
            <div>
              {userTweets.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
              ))}
              {userTweets.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-xl">No tweets yet</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'Replies' && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No replies yet</p>
            </div>
          )}
          
          {activeTab === 'Media' && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No media yet</p>
            </div>
          )}
          
          {activeTab === 'Likes' && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No likes yet</p>
            </div>
          )}
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Profile;