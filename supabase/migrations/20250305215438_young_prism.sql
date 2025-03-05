
CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  budget integer NOT NULL,
  client_id uuid REFERENCES profiles(user_id),
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz DEFAULT now(),
  skills text[] DEFAULT '{}',
  deadline date,
  CONSTRAINT valid_status CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled'))
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Everyone can read jobs
CREATE POLICY "Jobs are viewable by everyone" ON jobs
  FOR SELECT USING (true);

-- Only authenticated clients can create jobs
CREATE POLICY "Clients can create jobs" ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'client'
    )
  );

-- Only job owners can update their jobs
CREATE POLICY "Owners can update their jobs" ON jobs
  FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());