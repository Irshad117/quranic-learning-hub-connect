-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'student');

-- Create user_roles table for role-based access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create question_categories table
CREATE TABLE public.question_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    color TEXT DEFAULT '#3b82f6',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on question_categories
ALTER TABLE public.question_categories ENABLE ROW LEVEL SECURITY;

-- Create questions table with all question types
CREATE TABLE public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.question_categories(id) ON DELETE CASCADE NOT NULL,
    question_text TEXT NOT NULL,
    question_type TEXT NOT NULL DEFAULT 'mcq' CHECK (question_type IN ('mcq', 'true_false', 'fill_blank', 'matching')),
    options JSONB NOT NULL DEFAULT '[]',
    correct_answer TEXT NOT NULL,
    difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    points INTEGER NOT NULL DEFAULT 10,
    time_limit INTEGER DEFAULT 30,
    explanation TEXT,
    media_url TEXT,
    tags TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on questions
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Create leaderboard table
CREATE TABLE public.leaderboard (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    category_id UUID REFERENCES public.question_categories(id) ON DELETE SET NULL,
    total_score INTEGER NOT NULL DEFAULT 0,
    total_quizzes INTEGER NOT NULL DEFAULT 0,
    best_score INTEGER NOT NULL DEFAULT 0,
    average_time_seconds NUMERIC(10,2) DEFAULT 0,
    streak_count INTEGER DEFAULT 0,
    last_quiz_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, category_id)
);

-- Enable RLS on leaderboard
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Create quiz_attempts table to track question history (prevent repeats)
CREATE TABLE public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE NOT NULL,
    category_id UUID REFERENCES public.question_categories(id) ON DELETE SET NULL,
    is_correct BOOLEAN NOT NULL,
    time_taken_seconds INTEGER,
    points_earned INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on quiz_attempts
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
USING (public.is_admin(auth.uid()));

-- RLS Policies for question_categories
CREATE POLICY "Anyone can view active categories"
ON public.question_categories FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage categories"
ON public.question_categories FOR ALL
USING (public.is_admin(auth.uid()));

-- RLS Policies for questions
CREATE POLICY "Anyone can view active questions"
ON public.questions FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage questions"
ON public.questions FOR ALL
USING (public.is_admin(auth.uid()));

-- RLS Policies for leaderboard
CREATE POLICY "Anyone can view leaderboard"
ON public.leaderboard FOR SELECT
USING (true);

CREATE POLICY "Users can update their own leaderboard entry"
ON public.leaderboard FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own leaderboard"
ON public.leaderboard FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for quiz_attempts
CREATE POLICY "Users can view their own attempts"
ON public.quiz_attempts FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own attempts"
ON public.quiz_attempts FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all attempts"
ON public.quiz_attempts FOR SELECT
USING (public.is_admin(auth.uid()));

-- Trigger to auto-assign student role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- Update timestamp triggers
CREATE TRIGGER update_question_categories_updated_at
BEFORE UPDATE ON public.question_categories
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_questions_updated_at
BEFORE UPDATE ON public.questions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leaderboard_updated_at
BEFORE UPDATE ON public.leaderboard
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.question_categories (name, description, icon, color) VALUES
('Quran Reading', 'Questions about Quran reading and pronunciation', '📖', '#3b82f6'),
('Tajweed', 'Rules of Quran recitation', '🎯', '#10b981'),
('Noorani Qaida', 'Basic Arabic alphabet and pronunciation', '📚', '#f59e0b'),
('Islamic Knowledge', 'General Islamic teachings and history', '🕌', '#8b5cf6'),
('Duas', 'Daily prayers and supplications', '🤲', '#ec4899'),
('Namaz', 'Salah and prayer-related questions', '🙏', '#06b6d4'),
('Quran Memorization', 'Hifz and memorization techniques', '💡', '#84cc16'),
('Kids Duas', 'Simple duas for children', '⭐', '#f97316');