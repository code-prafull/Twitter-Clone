import React, { createContext, useContext, useReducer, useEffect } from 'react';

const TwitterContext = createContext();

const initialState = {
  user: null,
  tweets: [],
  followers: [],
  following: [],
  notifications: [],
  messages: [],
  conversations: [],
};

function twitterReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'ADD_TWEET':
      return {
        ...state,
        tweets: [action.payload, ...state.tweets],
      };
    case 'UPDATE_TWEET':
      return {
        ...state,
        tweets: state.tweets.map((tweet) =>
          tweet.id === action.payload.id ? action.payload : tweet
        ),
      };
    case 'DELETE_TWEET':
      return {
        ...state,
        tweets: state.tweets.filter((tweet) => tweet.id !== action.payload),
      };
    case 'SET_TWEETS':
      return {
        ...state,
        tweets: action.payload,
      };
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
      };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload,
      };
    case 'SET_CONVERSATIONS':
      return {
        ...state,
        conversations: action.payload,
      };
    case 'LIKE_TWEET':
      return {
        ...state,
        tweets: state.tweets.map((tweet) =>
          tweet.id === action.payload.tweetId
            ? {
                ...tweet,
                likes: action.payload.isLiked
                  ? [...tweet.likes, action.payload.userId]
                  : tweet.likes.filter((id) => id !== action.payload.userId),
                likeCount: action.payload.isLiked
                  ? tweet.likeCount + 1
                  : tweet.likeCount - 1,
              }
            : tweet
        ),
      };
    case 'RETWEET':
      return {
        ...state,
        tweets: state.tweets.map((tweet) =>
          tweet.id === action.payload.tweetId
            ? {
                ...tweet,
                retweets: action.payload.isRetweeted
                  ? [...tweet.retweets, action.payload.userId]
                  : tweet.retweets.filter((id) => id !== action.payload.userId),
                retweetCount: action.payload.isRetweeted
                  ? tweet.retweetCount + 1
                  : tweet.retweetCount - 1,
              }
            : tweet
        ),
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    case 'MARK_NOTIFICATION_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
      };
    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'ADD_CONVERSATION':
      return {
        ...state,
        conversations: [...state.conversations, action.payload],
      };
    case 'UPDATE_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.map((conversation) =>
          conversation.id === action.payload.id
            ? { ...conversation, ...action.payload.update }
            : conversation
        ),
      };
    default:
      return state;
  }
}

export const TwitterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(twitterReducer, initialState);

  // Load user and data from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('twitterUser');
    const savedTweets = localStorage.getItem('twitterTweets');
    const savedNotifications = localStorage.getItem('twitterNotifications');
    const savedMessages = localStorage.getItem('twitterMessages');
    const savedConversations = localStorage.getItem('twitterConversations');
    
    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) });
    }
    
    if (savedTweets) {
      dispatch({ type: 'SET_TWEETS', payload: JSON.parse(savedTweets) });
    }
    
    if (savedNotifications) {
      dispatch({ type: 'SET_NOTIFICATIONS', payload: JSON.parse(savedNotifications) });
    }
    
    if (savedMessages) {
      dispatch({ type: 'SET_MESSAGES', payload: JSON.parse(savedMessages) });
    }
    
    if (savedConversations) {
      dispatch({ type: 'SET_CONVERSATIONS', payload: JSON.parse(savedConversations) });
    }
  }, []);

  // Save data to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('twitterTweets', JSON.stringify(state.tweets));
    localStorage.setItem('twitterNotifications', JSON.stringify(state.notifications));
    localStorage.setItem('twitterMessages', JSON.stringify(state.messages));
    localStorage.setItem('twitterConversations', JSON.stringify(state.conversations));
  }, [state.tweets, state.notifications, state.messages, state.conversations]);

  const setUser = (user) => {
    localStorage.setItem('twitterUser', JSON.stringify(user));
    dispatch({ type: 'SET_USER', payload: user });
  };

  const addTweet = (tweet) => {
    dispatch({ type: 'ADD_TWEET', payload: tweet });
  };

  const updateTweet = (tweet) => {
    dispatch({ type: 'UPDATE_TWEET', payload: tweet });
  };

  const deleteTweet = (id) => {
    dispatch({ type: 'DELETE_TWEET', payload: id });
  };

  const likeTweet = (tweetId, userId, isLiked) => {
    dispatch({ 
      type: 'LIKE_TWEET', 
      payload: { tweetId, userId, isLiked } 
    });
  };

  const retweet = (tweetId, userId, isRetweeted) => {
    dispatch({ 
      type: 'RETWEET', 
      payload: { tweetId, userId, isRetweeted } 
    });
  };

  return (
    <TwitterContext.Provider
      value={{
        user: state.user,
        tweets: state.tweets,
        followers: state.followers,
        following: state.following,
        notifications: state.notifications,
        messages: state.messages,
        conversations: state.conversations,
        setUser,
        addTweet,
        updateTweet,
        deleteTweet,
        likeTweet,
        retweet,
        addNotification: (notification) => dispatch({ type: 'ADD_NOTIFICATION', payload: notification }),
        markNotificationAsRead: (id) => dispatch({ type: 'MARK_NOTIFICATION_AS_READ', payload: id }),
        clearNotifications: () => dispatch({ type: 'CLEAR_NOTIFICATIONS' }),
        addMessage: (message) => dispatch({ type: 'ADD_MESSAGE', payload: message }),
        addConversation: (conversation) => dispatch({ type: 'ADD_CONVERSATION', payload: conversation }),
        updateConversation: (id, update) => dispatch({ type: 'UPDATE_CONVERSATION', payload: { id, update } }),
      }}
    >
      {children}
    </TwitterContext.Provider>
  );
};

export const useTwitterContext = () => {
  const context = useContext(TwitterContext);
  if (!context) {
    throw new Error('useTwitterContext must be used within a TwitterProvider');
  }
  return context;
};