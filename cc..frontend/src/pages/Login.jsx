import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);

  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          password,
          email,
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email,password
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center flex-col gap-4"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p>
          Please {state === 'Sign Up' ? 'Sign Up' : 'Login'} to book appointment
        </p>

        {/* Full Name Field */}
        {state === 'Sign Up' && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full border border-zinc-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
        )}

        {/* Email Field */}
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Submit Button */}
        <button className="bg-amber-200 text-black w-full py-2 rounded-md text-base">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {/* Toggle between Sign Up and Login */}
        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState('Login')}
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account{' '}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState('Sign Up')}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;



