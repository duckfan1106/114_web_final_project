'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from '@/utils/api';
import Navbar from '@/components/Navbar';

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', { email, password });
            if (res.data.success) {
                login(res.data.token);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex items-center justify-center mt-20">
                <div className="bg-white p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
