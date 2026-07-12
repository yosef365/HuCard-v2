const SUPABASE_URL = "https://oypgqdlypqpvbdhvvgaa.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95cGdxZGx5cHFwdmJkaHZ2Z2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0NDkwMzksImV4cCI6MjA5OTAyNTAzOX0.XBqbsgprrbxSwsg5w_cy_OIUPmTnKRXUw_ToWrEatb8";

const { createClient } = supabase;

const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);