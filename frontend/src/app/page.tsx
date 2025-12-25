'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import axios from '@/utils/api';

export default function Home() {
    const { user, logout } = useAuth();
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('/posts');
                setPosts(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPosts();
    }, []);

    return (
        <main className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Latest Posts</h1>

                <div className="grid gap-6 max-w-2xl mx-auto">
                    {posts.map((post) => (
                        <div key={post._id} className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg">{post.user?.username || 'Unknown'}</h3>
                                <span className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="mb-4 text-gray-800">{post.text}</p>
                            {post.image && (
                                <img src={post.image} alt="Post content" className="w-full h-64 object-cover rounded-md mb-4" />
                            )}
                            <div className="flex gap-4 text-gray-600">
                                <button>❤️ {post.likes?.length || 0} Likes</button>
                                <button>💬 {post.comments?.length || 0} Comments</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
