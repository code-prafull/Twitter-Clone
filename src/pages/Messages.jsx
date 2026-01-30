import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';
import { useTwitterContext } from '../context/TwitterContext';

const Messages = () => {
  const { user, conversations, messages, addMessage, addConversation, updateConversation } = useTwitterContext();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [localConversations, setLocalConversations] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
    
  // Update local state when context changes
  useEffect(() => {
    setLocalConversations(conversations);
  }, [conversations]);
    
  // Set messages for selected conversation
  useEffect(() => {
    if (selectedConversation) {
      // In a real app, we'd filter messages for the specific conversation
      // For now, we'll use sample messages
      const sampleMessages = [
        {
          id: 1,
          sender: 'me',
          text: 'Hi there! How are you doing?',
          time: '10:30 AM',
          conversationId: selectedConversation.id
        },
        {
          id: 2,
          sender: 'other',
          text: 'I\'m doing great! Just working on a new React project.',
          time: '10:32 AM',
          conversationId: selectedConversation.id
        },
        {
          id: 3,
          sender: 'me',
          text: 'That sounds interesting! What kind of project?',
          time: '10:33 AM',
          conversationId: selectedConversation.id
        },
        {
          id: 4,
          sender: 'other',
          text: 'Building a Twitter clone with React and Tailwind CSS.',
          time: '10:35 AM',
          conversationId: selectedConversation.id
        }
      ];
      setChatMessages(sampleMessages);
    }
  }, [selectedConversation]);
    
  const sendMessage = () => {
    if (currentMessage.trim() !== '' && selectedConversation) {
      const newMessage = {
        id: Date.now(),
        sender: 'me',
        text: currentMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        conversationId: selectedConversation.id
      };
        
      // Add message to context
      addMessage(newMessage);
        
      // Update conversation last message
      updateConversation(selectedConversation.id, {
        lastMessage: currentMessage,
        time: 'now',
        unread: 0
      });
        
      // Update local state
      setChatMessages(prev => [...prev, newMessage]);
      setCurrentMessage('');
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <div className="flex-1 max-w-4xl mx-auto border-x border-gray-800 min-h-screen bg-black">
        <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-gray-800 p-4 bg-gradient-to-b from-black to-gray-900/90">
          <h1 className="text-xl font-bold text-white">Messages</h1>
        </div>
        
        <div className="flex h-[calc(100vh-64px)]">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-800 hidden md:block">
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages"
                  className="w-full bg-gray-900 text-white placeholder-gray-500 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            <div className="divide-y divide-gray-800">
              {localConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 hover:bg-gray-900/50 cursor-pointer transition-colors duration-200 ${
                    selectedConversation?.id === conversation.id ? 'bg-gray-900/30' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-white truncate">{conversation.name}</h3>
                        <span className="text-gray-500 text-sm">{conversation.time}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-gray-500 text-sm truncate">{conversation.lastMessage}</p>
                        {conversation.unread > 0 && (
                          <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message Area */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-800 flex items-center space-x-3">
                  <img
                    src={selectedConversation.avatar}
                    alt={selectedConversation.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-white">{selectedConversation.name}</h3>
                    <p className="text-gray-500 text-sm">@{selectedConversation.username}</p>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.sender === 'me'
                              ? 'bg-blue-500 text-white rounded-br-none'
                              : 'bg-gray-800 text-white rounded-bl-none'
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-blue-200' : 'text-gray-400'}`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t border-gray-800">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-900 text-white placeholder-gray-500 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button className="text-blue-500 hover:text-blue-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </svg>
                    </button>
                    <button 
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors duration-200"
                      onClick={sendMessage}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="text-6xl text-gray-700 mb-6">✉️</div>
                <h2 className="text-2xl font-bold text-white mb-2">Send private messages</h2>
                <p className="text-gray-500 mb-6 max-w-md">
                  Connect directly with other users on Twitter. Share updates, photos, videos and more.
                </p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200">
                  Start a conversation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Messages;