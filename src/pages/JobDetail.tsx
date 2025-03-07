import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, DollarSign, Calendar, Briefcase, Building, Clock } from 'lucide-react';

const JobDetail = () => {
  const { id } = useParams();

  // Mock job data (replace with actual data fetching)
  const job = {
    title: 'Senior React Developer',
    company: 'TechCorp Inc.',
    location: 'Remote',
    salary: '$80k - $120k',
    type: 'Full-time',
    posted: '2 days ago',
    description: `We are looking for an experienced React developer to join our team and help build the next generation of our web applications. The ideal candidate will have strong experience with React, TypeScript, and modern web technologies.

    You will be working on challenging projects and collaborating with a talented team of developers.`,
    requirements: [
      'At least 5 years of experience with React',
      'Strong TypeScript skills',
      'Experience with state management (Redux, Zustand)',
      'Knowledge of modern web technologies and best practices',
      'Excellent problem-solving skills',
    ],
    benefits: [
      'Competitive salary',
      'Remote work options',
      'Health insurance',
      'Flexible hours',
      '401(k) matching',
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to="/jobs"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-2"
        >
          ← Back to Jobs
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{job.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Building size={18} />
              {job.company}
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={18} />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign size={18} />
              {job.salary}
            </div>
            <div className="flex items-center gap-1">
              <Briefcase size={18} />
              {job.type}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={18} />
              {job.posted}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Job Description</h2>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{job.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Requirements</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Benefits</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-700">
          <button className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;