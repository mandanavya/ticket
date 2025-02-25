// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dhzyuiommgqyiikmczbq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoenl1aW9tbWdxeWlpa21jemJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMTAzODIsImV4cCI6MjA1NTg4NjM4Mn0.dirsvJ714vZ3_ONwp29UBV3o-IDwE6xb7rphcrUA0_U';

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
