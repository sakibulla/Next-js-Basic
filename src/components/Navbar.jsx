'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount and when pathname changes
  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = () => {
    // Check if authentication cookie exists
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('isAuthenticated='));
    setIsAuthenticated(authCookie?.includes('true') || false);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear authentication cookie
    document.cookie = 'isAuthenticated=; path=/; max-age=0';
    setIsAuthenticated(false);
    router.push('/login');
  };
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            ShopHub
          </Link>
          
          {/* Navigation Links */}
          <div className="flex gap-6 items-center">
            <Link 
              href="/" 
              className={`hover:text-blue-600 transition ${
                pathname === '/' ? 'text-blue-600 font-semibold' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/items" 
              className={`hover:text-blue-600 transition ${
                pathname === '/items' ? 'text-blue-600 font-semibold' : 'text-gray-700'
              }`}
            >
              Items
            </Link>
            
            {/* Conditional rendering based on authentication */}
            {isAuthenticated ? (
              <>
                <Link 
                  href="/add-item" 
                  className={`hover:text-blue-600 transition ${
                    pathname === '/add-item' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                  }`}
                >
                  Add Item
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className={`hover:text-blue-600 transition ${
                  pathname === '/login' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
