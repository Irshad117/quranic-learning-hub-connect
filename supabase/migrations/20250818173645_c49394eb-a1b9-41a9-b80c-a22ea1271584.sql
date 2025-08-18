-- Create admin_users table for admin authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users
CREATE POLICY "Admin users can view themselves" 
ON public.admin_users 
FOR SELECT 
USING (auth.jwt() ->> 'email' = email);

-- Insert the admin email
INSERT INTO public.admin_users (email) VALUES ('alsiratalmustaqim0@gmail.com');

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications
CREATE POLICY "Admins can view all notifications" 
ON public.notifications 
FOR SELECT 
USING (
  auth.jwt() ->> 'email' IN (
    SELECT email FROM public.admin_users
  )
);

CREATE POLICY "Admins can update notifications" 
ON public.notifications 
FOR UPDATE 
USING (
  auth.jwt() ->> 'email' IN (
    SELECT email FROM public.admin_users
  )
);

-- Create submissions table for home page forms
CREATE TABLE public.home_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  form_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.home_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for home_submissions
CREATE POLICY "Anyone can create home submissions" 
ON public.home_submissions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all home submissions" 
ON public.home_submissions 
FOR SELECT 
USING (
  auth.jwt() ->> 'email' IN (
    SELECT email FROM public.admin_users
  )
);