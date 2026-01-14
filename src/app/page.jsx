import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to ShopHub</h1>
          <p className="text-xl mb-8">Discover amazing products at unbeatable prices</p>
          <Link 
            href="/items" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Browse Items
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your orders delivered within 2-3 business days</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">All products are verified for quality and authenticity</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Your transactions are safe and encrypted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-blue-100 p-8 rounded-lg text-center hover:bg-blue-200 transition cursor-pointer">
              <div className="text-4xl mb-2">💻</div>
              <p className="font-semibold">Electronics</p>
            </div>
            <div className="bg-green-100 p-8 rounded-lg text-center hover:bg-green-200 transition cursor-pointer">
              <div className="text-4xl mb-2">👕</div>
              <p className="font-semibold">Fashion</p>
            </div>
            <div className="bg-yellow-100 p-8 rounded-lg text-center hover:bg-yellow-200 transition cursor-pointer">
              <div className="text-4xl mb-2">🏠</div>
              <p className="font-semibold">Home & Living</p>
            </div>
            <div className="bg-purple-100 p-8 rounded-lg text-center hover:bg-purple-200 transition cursor-pointer">
              <div className="text-4xl mb-2">⚽</div>
              <p className="font-semibold">Sports</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <p className="text-blue-100">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5K+</div>
              <p className="text-blue-100">Products</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="text-blue-100">Categories</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <p className="text-blue-100">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 mb-4">Amazing quality and fast shipping. Highly recommend!</p>
              <p className="font-semibold">- Sarah Johnson</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 mb-4">Best online shopping experience I&apos;ve ever had.</p>
              <p className="font-semibold">- Mike Chen</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 mb-4">Great prices and excellent customer service!</p>
              <p className="font-semibold">- Emily Davis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">Subscribe to our newsletter for exclusive deals and updates</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied customers today</p>
          <Link 
            href="/items" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Explore Products
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
