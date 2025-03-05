import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Profile settings coming soon.</p>
      </div>
    </div>
  );
};

export default Profile;