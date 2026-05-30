-- Migration: Create goals and goal_updates tables
-- Run this in your Supabase SQL Editor

-- Create goals table
CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  accomplished_at TIMESTAMP WITH TIME ZONE DEFAULT NULL, -- NULL = not accomplished
  is_current BOOLEAN NOT NULL DEFAULT false,             -- currently working on
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create goal_updates table (progress notes per goal, admin-authored)
CREATE TABLE IF NOT EXISTS goal_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE goal_updates ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------
-- Policies: goals
-- -----------------------------------------------

DROP POLICY IF EXISTS "Goals are viewable by everyone" ON goals;
DROP POLICY IF EXISTS "Only admins can insert goals" ON goals;
DROP POLICY IF EXISTS "Only admins can update goals" ON goals;
DROP POLICY IF EXISTS "Only admins can delete goals" ON goals;

CREATE POLICY "Goals are viewable by everyone" ON goals
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert goals" ON goals
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Only admins can update goals" ON goals
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Only admins can delete goals" ON goals
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- -----------------------------------------------
-- Policies: goal_updates
-- -----------------------------------------------

DROP POLICY IF EXISTS "Goal updates are viewable by everyone" ON goal_updates;
DROP POLICY IF EXISTS "Only admins can insert goal updates" ON goal_updates;
DROP POLICY IF EXISTS "Only admins can delete goal updates" ON goal_updates;

CREATE POLICY "Goal updates are viewable by everyone" ON goal_updates
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert goal updates" ON goal_updates
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Only admins can delete goal updates" ON goal_updates
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- -----------------------------------------------
-- Indexes
-- -----------------------------------------------

CREATE INDEX IF NOT EXISTS idx_goals_display_order ON goals(display_order ASC);
CREATE INDEX IF NOT EXISTS idx_goals_accomplished_at ON goals(accomplished_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_goal_updates_goal_id ON goal_updates(goal_id);
CREATE INDEX IF NOT EXISTS idx_goal_updates_created_at ON goal_updates(created_at DESC);

-- -----------------------------------------------
-- Auto-update updated_at on goals
-- -----------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_goals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS goals_updated_at ON goals;

CREATE TRIGGER goals_updated_at
  BEFORE UPDATE ON goals
  FOR EACH ROW EXECUTE PROCEDURE public.handle_goals_updated_at();
