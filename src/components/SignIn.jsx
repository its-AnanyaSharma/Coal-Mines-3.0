
// src/components/SignIn.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
// import {loginController} from '../controllers/authController.js'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = password.length >= 4; // Example: Minimum 6 characters for password
    ///////////
      // Use email variable here
      if (isValidEmail && isValidPassword) {
        console.log(email,password);
        // toast.success("Registered Successfully")
        // navigate('/home');
        } else if (!isValidPassword) {
          toast.error("Password must be at least 4 characters long.");
        }else {
          toast.error("Invalid credentials. Please try again.");
        }
      
    ///////////
    
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/login', { email, password });
      // setSuccess(response.data.message);
      if (response.data.success) {
      localStorage.setItem('token', response.data.token); // Store the token
      setSuccess('Login Successful!');
      toast.success('Login Successful!');
      navigate('/home');
      // setError('');
    } else {
      setError(response.data.message || 'Login failed');
      toast.error(response.data.message || 'Login failed');
    }
  }catch (err) {
      setError(err.response.data.message || 'Login failed');
      toast.error(err.response?.data?.message || 'Login failed');
      // setSuccess('');
    }
}

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login Portal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
             className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your password"
            required
          />
        </div>
        
        <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
        Login</button>
      </form>
      <p className="mt-4 text-center">
          @Coal Mines India
          </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
    </div>
  );
}
export default SignIn;

