/*
  # Initial Schema Setup for Freelancer Platform

  1. New Tables
    - users
      - Custom user data and profile information
    - jobs
      - Project listings posted by clients
    - bids
      - Proposals submitted by freelancers
    - payments
      - Payment tracking and escrow
    - reviews
      - User reviews and ratings

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('client', 'freelancer')),
  full_name TEXT,
  bio TEXT,
  skills TEXT[],
  portfolio_urls TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  budget_min NUMERIC NOT NULL,
  budget_max NUMERIC NOT NULL,
  deadline TIMESTAMPTZ,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  skills_required TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Bids Table
CREATE TABLE IF NOT EXISTS bids (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) NOT NULL,
  freelancer_id UUID REFERENCES users(id) NOT NULL,
  amount NUMERIC NOT NULL,
  proposal TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) NOT NULL,
  client_id UUID REFERENCES users(id) NOT NULL,
  freelancer_id UUID REFERENCES users(id) NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'held', 'released', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) NOT NULL,
  reviewer_id UUID REFERENCES users(id) NOT NULL,
  reviewee_id UUID REFERENCES users(id) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users Policies
CREATE POLICY "Users can read all profiles"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = auth_id);

-- Jobs Policies
CREATE POLICY "Anyone can read jobs"
  ON jobs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Clients can create jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.role = 'client'
    )
  );

CREATE POLICY "Clients can update their own jobs"
  ON jobs FOR UPDATE
  TO authenticated
  USING (
    client_id IN (
      SELECT id FROM users
      WHERE auth_id = auth.uid()
    )
  );

-- Bids Policies
CREATE POLICY "Freelancers can read their own bids"
  ON bids FOR SELECT
  TO authenticated
  USING (
    freelancer_id IN (
      SELECT id FROM users
      WHERE auth_id = auth.uid()
    )
  );

CREATE POLICY "Clients can read bids on their jobs"
  ON bids FOR SELECT
  TO authenticated
  USING (
    job_id IN (
      SELECT id FROM jobs
      WHERE client_id IN (
        SELECT id FROM users
        WHERE auth_id = auth.uid()
      )
    )
  );

CREATE POLICY "Freelancers can create bids"
  ON bids FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.role = 'freelancer'
    )
  );

-- Reviews Policies
CREATE POLICY "Anyone can read reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create reviews for completed jobs"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = job_id
      AND jobs.status = 'completed'
      AND (
        jobs.client_id IN (
          SELECT id FROM users
          WHERE auth_id = auth.uid()
        )
        OR
        EXISTS (
          SELECT 1 FROM bids
          WHERE bids.job_id = jobs.id
          AND bids.status = 'accepted'
          AND bids.freelancer_id IN (
            SELECT id FROM users
            WHERE auth_id = auth.uid()
          )
        )
      )
    )
  );