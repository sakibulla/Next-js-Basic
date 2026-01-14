'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ItemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Fetch item details
  useEffect(() => {
    if (params.id) {
      fetchItemDetails();
    }
  }, [params.id]);

  const fetchItemDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/items/${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        setItem(data.data);
      } else {
        setError('Item not found');
      }
    } catch (err) {
      setError('Error connecting to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading item details...</p>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
              <button
                onClick={() => router.push('/items')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Back to Items
              </button>
            </div>
          )}
          
          {/* Item Details */}
          {!loading && !error && item && (
            <div className="max-w-5xl mx-auto">
              <button
                onClick={() => router.push('/items')}
                className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2"
              >
                ← Back to Items
              </button>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Image */}
                  <div className="relative h-96 bg-gray-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="p-8">
                    <h1 className="text-4xl font-bold mb-4">{item.name}</h1>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-blue-600">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2">Description</h2>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2">Product Details</h2>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Product ID: {item.id}</li>
                        <li>• In Stock: Yes</li>
                        <li>• Free Shipping Available</li>
                        <li>• 30-Day Return Policy</li>
                      </ul>
                    </div>
                    
                    <div className="flex gap-4">
                      <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Add to Cart
                      </button>
                      <button className="px-6 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
                        ♥
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional Info */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl mb-2">🚚</div>
                  <h3 className="font-semibold mb-1">Free Shipping</h3>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl mb-2">🔄</div>
                  <h3 className="font-semibold mb-1">Easy Returns</h3>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl mb-2">🔒</div>
                  <h3 className="font-semibold mb-1">Secure Payment</h3>
                  <p className="text-sm text-gray-600">100% secure checkout</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
