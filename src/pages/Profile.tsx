import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Camera, Mail, MapPin, Phone, Globe, Briefcase } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    title: 'Senior React Developer',
    location: 'San Francisco, CA',
    phone: '+1 (555) 123-4567',
    website: 'https://johndoe.dev',
    bio: 'Passionate developer with 5+ years of experience in React and modern web technologies. Love building user-friendly applications and solving complex problems.',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800"
              />
              <button className="absolute bottom-0 right-0 bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                <Camera size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{formData.fullName}</h1>
              <p className="text-gray-600 dark:text-gray-300">{formData.title}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Mail size={20} />
                  {user?.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MapPin size={20} />
                  {formData.location}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Phone size={20} />
                  {formData.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Globe size={20} />
                  <a href={formData.website} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    {formData.website}
                  </a>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">About</h2>
                <p className="text-gray-600 dark:text-gray-300">{formData.bio}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;