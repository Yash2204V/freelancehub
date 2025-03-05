import React from 'react';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Job Details</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Job details for ID: {id} coming soon.</p>
      </div>
    </div>
  );
};

export default JobDetail;