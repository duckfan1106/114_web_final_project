'use client';
import { useState } from 'react';
import axios from '@/utils/api';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function CreatePost() {
    const router = useRouter();
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/posts', { text, image: imageUrl });
            router.push('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create post');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto mt-10 p-4">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
                    <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Content</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full border p-2 rounded h-32"
                                placeholder="What's on your mind?"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2">Image URL (Optional)</label>
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="w-full border p-2 rounded"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
