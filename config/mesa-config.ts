
import { createClient } from "@supabase/supabase-js"

export const config = {
    title: 'MESA Connect',
    description: 'STEM, but united.'
   }

//Supabase
const supabaseUrl = 'https://gnmpzioggytlqzekuyuo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdubXB6aW9nZ3l0bHF6ZWt1eXVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MjE1NDksImV4cCI6MjAyMzA5NzU0OX0.UVy6bZF8L5_ThmyRTZ5jqUZgW-p-GVRc4o9bpxvA2-k'

export const supabase = createClient(supabaseUrl, supabaseKey)