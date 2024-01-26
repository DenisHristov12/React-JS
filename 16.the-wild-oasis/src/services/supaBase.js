import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kzehhzlyndskbwjexxah.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6ZWhoemx5bmRza2J3amV4eGFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYyNzczOTQsImV4cCI6MjAyMTg1MzM5NH0.3oXqzT6IkTyj0B6tO44kk97CFYFMnjM3a4limPUbB_c';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
