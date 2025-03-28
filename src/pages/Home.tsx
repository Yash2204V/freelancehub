import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-16 sm:py-24">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Find the Perfect Freelancer for Your Project
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Connect with top freelancers, manage projects, and grow your business with our secure platform.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/jobs"
            className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-400 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
          >
            Browse Jobs
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Post Projects</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Easily post your projects and find the perfect freelancer for your needs.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Expert Freelancers</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with skilled professionals across various domains.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Secure Payments</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Safe and secure payment system with escrow protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;