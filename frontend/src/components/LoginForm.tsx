import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/lnl_logo.png';

interface User {
    id: number;
    username: string;
    password: string;
    email: string;
}

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const baseUrl = import.meta.env.VITE_API_URL;

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent the page from refreshing

        try {
            const response = await fetch(`${baseUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username,
                    password,
                    email
                }),
            });

            if (!response.ok) {
                throw new Error('Login failed!');
            }

            const data: User = await response.json();

            localStorage.setItem('user', JSON.stringify(data));

            setError('');

            console.log('Logged in user:', data);
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed!');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-[#222222] to-black">
        
        <img src={logo} alt="Logo" className="mb-6 w-32 h-32" style={{
            filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.2))"   
            }} />
    
        <div className="w-full max-w-sm p-6 bg-[#222222] rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Login</h2>
    
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setUsername(e.target.value);
              }}
              placeholder="Username/Email"
              className="w-full p-3 mb-4 border rounded bg-white"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 mb-4 border rounded bg-white"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-700 transition hover:cursor-pointer"
            >
              Sign In
            </button>
          </form>
    
          <p className="text-gray-300 text-sm mt-6 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register here
            </Link>
          </p>
        </div>

        {error && (
            <div className="mt-4 bg-red-600 text-white text-md text-center p-3 rounded font-bold">
                {error}
            </div>
        )}
      </div>
    );
}

export default LoginForm;