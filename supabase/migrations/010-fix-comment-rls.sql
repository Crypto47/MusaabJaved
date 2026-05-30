-- Migration: Fix RLS spoofing vulnerabilities for comments
-- This migration updates the INSERT policies to ensure that author_id strictly deeply matches auth.uid()

-- 1. Drop existing insert/delete policies to redefine them
DROP POLICY IF EXISTS "Authenticated users can insert guestbook comments" ON comments;
DROP POLICY IF EXISTS "Only admins can insert goal comments" ON comments;

-- 2. Insert: authenticated users can insert guestbook comments (author_id must be them)
CREATE POLICY "Authenticated users can insert guestbook comments" ON comments
  FOR INSERT WITH CHECK (
    auth.uid() = author_id
    AND goal_id IS NULL
  );

-- 3. Insert: only admins can insert goal comments (author_id must be them)
CREATE POLICY "Only admins can insert goal comments" ON comments
  FOR INSERT WITH CHECK (
    auth.uid() = author_id
    AND goal_id IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 4. Delete: users can delete their own guestbook comments
DROP POLICY IF EXISTS "Users can delete their own guestbook comments" ON comments;
CREATE POLICY "Users can delete their own guestbook comments" ON comments
  FOR DELETE USING (
    auth.uid() = author_id
    AND goal_id IS NULL
  );
