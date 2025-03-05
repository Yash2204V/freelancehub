import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Briefcase, Calendar, DollarSign, Tag, Loader2, ArrowLeft } from 'lucide-react';
import type { Job, Profile } from '../lib/types';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [client, setClient] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

      if (jobError) throw jobError;
      setJob(jobData);

      if (jobData) {
        const { data: clientData, error: clientError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', jobData.client_id)
          .single();

        if (clientError) throw clientError;
        setClient(clientData);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || 'Job not found'}
        </div>
        <Link to="/jobs" className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/jobs" className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Jobs
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <Briefcase className="h-6 w-6 text-indigo-600" />
          <h1 className="text-2xl font-bold">{job.title}</h1>
        </div>

        <div className="grid gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{job.description}</p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Budget</h3>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>${job.budget}</span>
              </div>
            </div>

            {job.deadline && (
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Deadline</h3>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            )}

            <div>
              <h3 className="font-medium text-gray-900 mb-1">Status</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                {job.status}
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {client && (
            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-900 mb-2">Posted by</h3>
              <div className="text-gray-600">{client.email}</div>
            </div>
          )}

          {job.status === 'open' && user && user.id !== job.client_id && (
            <div className="border-t pt-6">
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Apply for this Job
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;