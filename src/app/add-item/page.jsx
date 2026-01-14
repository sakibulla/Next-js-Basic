'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AddItemPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Show success toast
        toast.success('Item added successfully!');
        
        // Wait a moment for toast to show, then redirect
        setTimeout(() => {
          router.push('/items');
        }, 1500);
      } else {
        toast.error(data.message || 'Failed to add item');
        setLoading(false);
      }
    } catch (err) {
      toast.error('Error connecting to server. Make sure the backend is running.');
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster position="top-right" />
      
      <div className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold">Add New Item</h1>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                
                {/* Description Field */}
                <div className="mb-6">
                  <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="Enter product description"
                    required
                  />
                </div>
                
                {/* Price Field */}
                <div className="mb-6">
                  <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="0.00"
                    required
                  />
                </div>
                
                {/* Image URL Field */}
                <div className="mb-6">
                  <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                  {formData.image && (
                    <p className="mt-2 text-sm text-gray-600">
                      Preview: <a href={formData.image} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Image</a>
                    </p>
                  )}
                </div>
                
                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-400"
                  >
                    {loading ? 'Adding Item...' : 'Add Item'}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/items')}
                    className="px-6 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
