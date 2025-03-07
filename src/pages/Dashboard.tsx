import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Briefcase, Clock, DollarSign, Star } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Jobs', value: '12', icon: Briefcase, color: 'text-blue-600' },
    { label: 'Hours Worked', value: '156', icon: Clock, color: 'text-green-600' },
    { label: 'Earnings', value: '$2,450', icon: DollarSign, color: 'text-yellow-600' },
    { label: 'Rating', value: '4.8', icon: Star, color: 'text-purple-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <Link
          to="/jobs/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Post New Job
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    New Job Application
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Applied for Senior React Developer position
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;