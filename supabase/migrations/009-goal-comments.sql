-- Migration: Add goal_id to comments to support goal-specific comments
-- Goal comments are separate from guestbook comments.
-- goal_id IS NULL  → guestbook comment (visible in /guestbook)
-- goal_id NOT NULL → goal comment     (visible in /goals only)

-- 1. Add nullable goal_id FK column to comments
ALTER TABLE comments
  ADD COLUMN IF NOT EXISTS goal_id UUID REFERENCES goals(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_comments_goal_id ON comments(goal_id);

-- 2. Drop existing comment RLS policies so we can redefine them
DROP POLICY IF EXISTS "Comments are viewable by everyone" ON comments;
DROP POLICY IF EXISTS "Authenticated users can insert comments" ON comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON comments;
DROP POLICY IF EXISTS "Only admins can delete comments" ON comments;

-- 3. Guestbook: only rows where goal_id IS NULL
CREATE POLICY "Guestbook comments viewable by everyone" ON comments
  FOR SELECT USING (goal_id IS NULL);

-- 4. Goal comments: rows where goal_id IS NOT NULL – still public read
CREATE POLICY "Goal comments viewable by everyone" ON comments
  FOR SELECT USING (goal_id IS NOT NULL);

-- 5. Insert: authenticated users can insert guestbook comments (goal_id must be null)
CREATE POLICY "Authenticated users can insert guestbook comments" ON comments
  FOR INSERT WITH CHECK (
    auth.uid() = author_id
    AND goal_id IS NULL
  );

-- 6. Insert: only admins can insert goal comments (goal_id must be non-null)
CREATE POLICY "Only admins can insert goal comments" ON comments
  FOR INSERT WITH CHECK (
    auth.uid() = author_id
    AND goal_id IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 7. Delete: users can delete their own guestbook comments
CREATE POLICY "Users can delete their own guestbook comments" ON comments
  FOR DELETE USING (
    auth.uid() = author_id
    AND goal_id IS NULL
  );

-- 8. Delete: only admins can delete any comment
CREATE POLICY "Only admins can delete comments" ON comments
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND is_admin = true
    )
  );
