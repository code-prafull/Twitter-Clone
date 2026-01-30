import React from 'react';
import Sidebar from '../components/Sidebar';
import Tweet from '../components/Tweet';
import MobileNav from '../components/MobileNav';

const Bookmarks = () => {
  const bookmarkedTweets = [
    {
      id: '1',
      userId: '1',
      username: 'reactjs',
      displayName: 'React',
      avatar: 'https://ui-avatars.com/api/?name=React&background=blue',
      content: 'Check out the latest features in React 19! We\'ve improved performance and added new hooks.',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      likes: [],
      retweets: [],
      replies: [],
      likeCount: 245,
      retweetCount: 89,
      replyCount: 34,
    },
    {
      id: '2',
      userId: '2',
      username: 'webdev',
      displayName: 'Web Developer',
      avatar: 'https://ui-avatars.com/api/?name=Web Developer&background=green',
      content: 'Just finished building a complete social media app with React and Node.js. The possibilities are endless!',
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      likes: [],
      retweets: [],
      replies: [],
      likeCount: 512,
      retweetCount: 203,
      replyCount: 42,
    },
    {
      id: '3',
      userId: '3',
      username: 'designer',
      displayName: 'UI Designer',
      avatar: 'https://ui-avatars.com/api/?name=UI Designer&background=purple',
      content: 'Tips for creating beautiful UIs: 1) Consistency is key 2) White space is your friend 3) User experience first!',
      timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      likes: [],
      retweets: [],
      replies: [],
      likeCount: 876,
      retweetCount: 312,
      replyCount: 89,
    }
  ];

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <div className="flex-1 max-w-2xl mx-auto border-x border-gray-800 min-h-screen bg-black">
        <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-gray-800 p-4 bg-gradient-to-b from-black to-gray-900/90">
          <h1 className="text-xl font-bold text-white">Bookmarks</h1>
        </div>
        
        <div>
          {bookmarkedTweets.length > 0 ? (
            bookmarkedTweets.map((tweet) => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl text-gray-700 mb-4">🔖</div>
              <p className="text-gray-500 text-xl mb-2">No bookmarks yet</p>
              <p className="text-gray-600">When you bookmark tweets, they'll appear here</p>
            </div>
          )}
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Bookmarks;