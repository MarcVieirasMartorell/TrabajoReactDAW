import { PawPrint, Users, Search, Mail, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg transition-colors" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              aria-label="PetHaven Home"
            >
              <PawPrint className="h-8 w-8 text-rose-500" aria-hidden="true" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">PetHaven</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hidden md:inline-block"
              aria-label="View available pets"
            >
              Pets
            </Link>
            <Link 
              to="/search" 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Search pets"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Search</span>
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="About our team"
            >
              <Users className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">About</span>
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Contact us"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Contact</span>
            </Link>
            <Link 
              to="/admin" 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Admin panel"
            >
              <Settings className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Admin</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}