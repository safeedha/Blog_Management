import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {login} from '../api/profile'
import {useNavigate,Link} from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const navigate=useNavigate()
  const LoginHandle = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  const result=await login(email,password)
  if(result==='Login successful')
  {
    navigate("/home")
  }
  else{
    toast.error(result)
  }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-blog-information-website-concept-118021391.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Login</h2>

        <form className="space-y-4" onSubmit={LoginHandle}>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
