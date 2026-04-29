import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';

function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">ABC Company</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Products</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Solutions</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">About</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            <button className="md:hidden p-2 text-gray-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
