
-- Drop the overly permissive anon SELECT policy
DROP POLICY IF EXISTS "Anon can read sessions" ON public.live_sessions;

-- Drop the overly permissive authenticated SELECT policy
DROP POLICY IF EXISTS "Anyone can read live_sessions" ON public.live_sessions;

-- Create a scoped authenticated SELECT policy: host or participant only
CREATE POLICY "Participants and host can read sessions"
  ON public.live_sessions
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = host_user_id
    OR is_session_participant(auth.uid(), id)
  );
