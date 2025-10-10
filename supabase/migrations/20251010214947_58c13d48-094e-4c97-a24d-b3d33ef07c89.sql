-- Enable required extensions for cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a cron job to run the keep-alive function every 6 days
-- This prevents the database from auto-pausing due to inactivity
SELECT cron.schedule(
  'keep-alive-ping',
  '0 0 */6 * *', -- Every 6 days at midnight
  $$
  SELECT
    net.http_post(
        url:='https://ydvnkqqtyvalvxcjhvbs.supabase.co/functions/v1/keep-alive',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkdm5rcXF0eXZhbHZ4Y2podmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1MzY1OTEsImV4cCI6MjA3NDExMjU5MX0.sNtXvbEVyI9LPGlPYuZ1AzKx5pPCihYosxpxzSeRUqs"}'::jsonb,
        body:='{"source": "cron"}'::jsonb
    ) as request_id;
  $$
);