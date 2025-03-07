import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, DollarSign } from 'lucide-react';

const JobList = () => {
  const jobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      salary: '$80k - $120k',
      type: 'Full-time',
      description: 'Looking for an experienced React developer to join our team...',
      posted: '2 days ago',
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'DesignStudio',
      location: 'New York, NY',
      salary: '$70k - $90k',
      type: 'Contract',
      description: 'Seeking a creative UI/UX designer for our growing team...',
      posted: '3 days ago',
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'StartupX',
      location: 'San Francisco, CA',
      salary: '$100k - $150k',
      type: 'Full-time',
      description: 'Join our fast-paced startup as a full stack developer...',
      posted: '1 week ago',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Available Jobs</h1>
        <Link
          to="/jobs/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Post Job
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {jobs.map((job) => (
          <Link
            key={job.id}
            to={`/jobs/${job.id}`}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {job.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{job.company}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={16} />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign size={16} />
                    {job.salary}
                  </span>
                  <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded">
                    {job.type}
                  </span>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{job.posted}</span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">{job.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JobList;