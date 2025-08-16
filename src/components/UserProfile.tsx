import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface QuizResult {
  id: string;
  quiz_category: string;
  quiz_title: string;
  score: number;
  total_questions: number;
  difficulty: string;
  completed_at: string;
  certificate_downloaded: boolean;
}

interface Profile {
  display_name: string | null;
  avatar_url: string | null;
}

const UserProfile = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchQuizResults();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('display_name, avatar_url')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      toast({
        title: "Error fetching profile",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setProfile(data);
    }
  };

  const fetchQuizResults = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching quiz results",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setQuizResults(data || []);
    }
    setLoading(false);
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback>
                  {profile?.display_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{profile?.display_name || 'Anonymous User'}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </div>
            <Button onClick={signOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Quiz Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Quiz Statistics</CardTitle>
          <CardDescription>Your quiz performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{quizResults.length}</div>
              <div className="text-sm text-muted-foreground">Quizzes Completed</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {quizResults.filter(r => (r.score / r.total_questions) >= 0.8).length}
              </div>
              <div className="text-sm text-muted-foreground">Excellent Scores (80%+)</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {quizResults.filter(r => r.certificate_downloaded).length}
              </div>
              <div className="text-sm text-muted-foreground">Certificates Downloaded</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiz History */}
      <Card>
        <CardHeader>
          <CardTitle>Quiz History</CardTitle>
          <CardDescription>Your recent quiz attempts</CardDescription>
        </CardHeader>
        <CardContent>
          {quizResults.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No quiz results yet. Take a quiz to see your progress here!
            </div>
          ) : (
            <div className="space-y-4">
              {quizResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{result.quiz_title}</div>
                    <div className="text-sm text-muted-foreground">
                      {result.quiz_category} • {new Date(result.completed_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{result.difficulty}</Badge>
                    <div className={`px-2 py-1 rounded text-white text-sm ${getScoreColor(result.score, result.total_questions)}`}>
                      {result.score}/{result.total_questions}
                    </div>
                    {result.certificate_downloaded && (
                      <Badge variant="secondary">Certificate Downloaded</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;