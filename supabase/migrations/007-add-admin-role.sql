-- Migration: Add is_admin column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Set portfolio owner as admin
UPDATE users SET is_admin = TRUE WHERE email = 'samikhan15262822@gmail.com';
