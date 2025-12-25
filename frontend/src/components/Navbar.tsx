'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-blue-600">
                    SocialShare
                </Link>
                <div className="flex gap-4">
                    {user ? (
                        <>
                            <span className="text-gray-700">Hi, {user.username}</span>
                            <Link href="/create" className="text-blue-500 hover:text-blue-700">Create Post</Link>
                            <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                            <Link href="/register" className="text-blue-600 font-semibold hover:text-blue-800">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
