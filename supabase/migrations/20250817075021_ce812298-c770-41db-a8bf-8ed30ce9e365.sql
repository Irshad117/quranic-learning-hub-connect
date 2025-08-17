-- Create package_inquiries table to store package selections
CREATE TABLE public.package_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  region TEXT NOT NULL,
  duration INTEGER NOT NULL,
  classes_per_week INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.package_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for package_inquiries
CREATE POLICY "Anyone can create package inquiries" 
ON public.package_inquiries 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view their own package inquiries" 
ON public.package_inquiries 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Create contact_submissions table for contact form
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for contact_submissions
CREATE POLICY "Anyone can create contact submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);