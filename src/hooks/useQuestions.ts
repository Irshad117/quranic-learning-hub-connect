import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface QuestionCategory {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Question {
  id: string;
  category_id: string;
  question_text: string;
  question_type: 'mcq' | 'true_false' | 'fill_blank' | 'matching';
  options: string[];
  correct_answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  time_limit: number | null;
  explanation: string | null;
  media_url: string | null;
  tags: string[];
  is_active: boolean;
  created_at: string;
}

export interface LeaderboardEntry {
  id: string;
  user_id: string;
  category_id: string | null;
  total_score: number;
  total_quizzes: number;
  best_score: number;
  average_time_seconds: number;
  streak_count: number;
  last_quiz_at: string | null;
  display_name?: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<QuestionCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('question_categories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refetch: fetchCategories };
}

export function useQuestions(categoryId?: string, difficulty?: string) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, [categoryId, difficulty]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('questions')
        .select('*')
        .eq('is_active', true);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      if (difficulty) {
        query = query.eq('difficulty', difficulty);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      
      // Parse options from JSONB
      const parsedQuestions = (data || []).map(q => ({
        ...q,
        options: Array.isArray(q.options) ? q.options : JSON.parse(q.options as unknown as string || '[]')
      }));
      
      setQuestions(parsedQuestions as Question[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  return { questions, loading, error, refetch: fetchQuestions };
}

export function useLeaderboard(categoryId?: string | null) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [categoryId]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('leaderboard')
        .select(`
          *,
          profiles:user_id (display_name)
        `)
        .order('total_score', { ascending: false })
        .limit(50);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      const formattedData = (data || []).map(entry => ({
        ...entry,
        display_name: (entry.profiles as any)?.display_name || 'Anonymous'
      }));
      
      setLeaderboard(formattedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  };

  return { leaderboard, loading, error, refetch: fetchLeaderboard };
}

export function useUserRole() {
  const { user } = useAuth();
  const [role, setRole] = useState<'admin' | 'student' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchRole();
    } else {
      setRole(null);
      setLoading(false);
    }
  }, [user]);

  const fetchRole = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      setRole((data?.role as 'admin' | 'student') || 'student');
    } catch (err) {
      console.error('Error fetching role:', err);
      setRole('student');
    } finally {
      setLoading(false);
    }
  };

  return { role, loading, isAdmin: role === 'admin' };
}

export function useQuizAttempts() {
  const { user } = useAuth();
  const [attemptedQuestionIds, setAttemptedQuestionIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAttempts();
    }
  }, [user]);

  const fetchAttempts = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('question_id')
        .eq('user_id', user.id);

      if (error) throw error;
      
      const ids = new Set((data || []).map(a => a.question_id));
      setAttemptedQuestionIds(ids);
    } catch (err) {
      console.error('Error fetching attempts:', err);
    } finally {
      setLoading(false);
    }
  };

  const recordAttempt = async (questionId: string, categoryId: string, isCorrect: boolean, timeTaken: number, pointsEarned: number) => {
    if (!user) return;
    
    try {
      await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          question_id: questionId,
          category_id: categoryId,
          is_correct: isCorrect,
          time_taken_seconds: timeTaken,
          points_earned: pointsEarned
        });

      setAttemptedQuestionIds(prev => new Set([...prev, questionId]));
    } catch (err) {
      console.error('Error recording attempt:', err);
    }
  };

  return { attemptedQuestionIds, loading, recordAttempt, refetch: fetchAttempts };
}

export function useUpdateLeaderboard() {
  const { user } = useAuth();

  const updateLeaderboard = async (categoryId: string, score: number, timeSeconds: number) => {
    if (!user) return;

    try {
      // Check if entry exists
      const { data: existing } = await supabase
        .from('leaderboard')
        .select('*')
        .eq('user_id', user.id)
        .eq('category_id', categoryId)
        .maybeSingle();

      if (existing) {
        // Update existing entry
        const newTotalQuizzes = existing.total_quizzes + 1;
        const newTotalScore = existing.total_score + score;
        const newBestScore = Math.max(existing.best_score, score);
        const newAvgTime = ((existing.average_time_seconds * existing.total_quizzes) + timeSeconds) / newTotalQuizzes;

        await supabase
          .from('leaderboard')
          .update({
            total_score: newTotalScore,
            total_quizzes: newTotalQuizzes,
            best_score: newBestScore,
            average_time_seconds: newAvgTime,
            streak_count: existing.streak_count + 1,
            last_quiz_at: new Date().toISOString()
          })
          .eq('id', existing.id);
      } else {
        // Create new entry
        await supabase
          .from('leaderboard')
          .insert({
            user_id: user.id,
            category_id: categoryId,
            total_score: score,
            total_quizzes: 1,
            best_score: score,
            average_time_seconds: timeSeconds,
            streak_count: 1,
            last_quiz_at: new Date().toISOString()
          });
      }
    } catch (err) {
      console.error('Error updating leaderboard:', err);
    }
  };

  return { updateLeaderboard };
}
