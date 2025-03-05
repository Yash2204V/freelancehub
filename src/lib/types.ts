export interface Profile {
  id: string;
  user_id: string;
  email: string;
  role: 'client' | 'freelancer';
  full_name?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  client_id: string;
  deadline?: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  skills: string[];
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: string;
  job_id: string;
  freelancer_id: string;
  cover_letter: string;
  price: number;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}