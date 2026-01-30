import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTwitterContext } from '../context/TwitterContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { setUser } = useTwitterContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Mock registration - in a real app, this would be an API call
    try {
      // Simulate user data
      const userData = {
        id: Date.now().toString(),
        email: email,
        name: name,
        username: name.toLowerCase().replace(/\s+/g, ''),
        avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
        bio: 'New Twitter user',
        joinDate: new Date().toISOString(),
        followers: 0,
        following: 0,
      };

      // Set user in context
      setUser(userData);
      
      // Show success message
      setSuccess('Account created successfully!');
      
      // Navigate to home after a delay
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-blue-400 mb-4">𝕏</div>
          <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
        </div>
        
        {success ? (
          <div className="bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded-lg text-center">
            {success}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-900 text-white placeholder-gray-500 border border-gray-700 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900 text-white placeholder-gray-500 border border-gray-700 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900 text-white placeholder-gray-500 border border-gray-700 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-900 text-white placeholder-gray-500 border border-gray-700 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full transition-colors duration-200"
            >
              Sign up
            </button>
          </form>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Sign in
            </Link><br />
            <Link to="/Home" className="text-blue-400 hover:underline">
                          Back
              </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;