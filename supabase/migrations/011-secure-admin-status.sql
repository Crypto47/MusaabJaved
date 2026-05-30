-- Migration: Secure is_admin column in users table
-- Prevents non-admins from elevating their own privileges or others'

CREATE OR REPLACE FUNCTION public.check_admin_status_update()
RETURNS TRIGGER AS $$
BEGIN
  -- If the is_admin column is being modified
  IF (NEW.is_admin IS DISTINCT FROM OLD.is_admin) THEN
    -- Check if the person making the change is a super-admin (by email) 
    -- or an already existing admin.
    IF NOT (
      (auth.jwt() ->> 'email' = 'samikhan15262822@gmail.com') OR
      EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND is_admin = true
      )
    ) THEN
      RAISE EXCEPTION 'Access Denied: You do not have permission to modify administrative privileges.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply the trigger to the users table
DROP TRIGGER IF EXISTS tr_check_admin_status_update ON public.users;
CREATE TRIGGER tr_check_admin_status_update
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.check_admin_status_update();

-- Note: We use SECURITY DEFINER so the function runs with tip-top privileges,
-- allowing it to check the users table even if RLS would otherwise restrict it.
