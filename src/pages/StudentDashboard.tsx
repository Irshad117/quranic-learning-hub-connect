import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole, useLeaderboard } from '@/hooks/useQuestions';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  BookOpen, 
  Award, 
  Clock, 
  Target,
  Download,
  Play,
  Star,
  Flame,
  Medal,
  LogOut
} from 'lucide-react';

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

interface Certificate {
  id: string;
  certificate_data: any;
  created_at: string;
}

const StudentDashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  const { leaderboard } = useLeaderboard();
  
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Fetch quiz results
      const { data: results } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      setQuizResults(results || []);

      // Fetch certificates
      const { data: certs } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setCertificates(certs || []);
    } catch (err) {
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Calculate stats
  const totalQuizzes = quizResults.length;
  const averageScore = totalQuizzes > 0 
    ? Math.round(quizResults.reduce((sum, r) => sum + (r.score / r.total_questions) * 100, 0) / totalQuizzes)
    : 0;
  const totalCorrect = quizResults.reduce((sum, r) => sum + r.score, 0);
  const bestScore = totalQuizzes > 0 
    ? Math.max(...quizResults.map(r => Math.round((r.score / r.total_questions) * 100)))
    : 0;

  // Find user's rank in leaderboard
  const userRank = leaderboard.findIndex(entry => entry.user_id === user.id) + 1;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Student Dashboard</h1>
              <p className="text-xs text-muted-foreground">Welcome back!</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {role === 'admin' && (
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin">Admin Panel</Link>
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Certificates</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Leaderboard</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-blue-100">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{totalQuizzes}</p>
                        <p className="text-xs text-muted-foreground">Quizzes Taken</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-green-100">
                        <Target className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{averageScore}%</p>
                        <p className="text-xs text-muted-foreground">Avg Score</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-yellow-100">
                        <Star className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{bestScore}%</p>
                        <p className="text-xs text-muted-foreground">Best Score</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-purple-100">
                        <Award className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{certificates.length}</p>
                        <p className="text-xs text-muted-foreground">Certificates</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Start Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <Link to="/quiz">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Take a Quiz
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/services">
                        View Courses
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Results */}
              {quizResults.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {quizResults.slice(0, 5).map((result) => {
                        const percentage = Math.round((result.score / result.total_questions) * 100);
                        return (
                          <div key={result.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                percentage >= 80 ? 'bg-green-100' : percentage >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                              }`}>
                                <span className={`font-bold ${getScoreColor(percentage)}`}>
                                  {percentage}%
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{result.quiz_title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(result.completed_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Badge className={getDifficultyColor(result.difficulty || 'medium')}>
                              {result.difficulty || 'medium'}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Quiz History</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-center py-8 text-muted-foreground">Loading...</p>
                ) : quizResults.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No quizzes taken yet</p>
                    <Button className="mt-4" asChild>
                      <Link to="/quiz">Take Your First Quiz</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {quizResults.map((result) => {
                      const percentage = Math.round((result.score / result.total_questions) * 100);
                      return (
                        <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{result.quiz_title}</h4>
                              <Badge className={getDifficultyColor(result.difficulty || 'medium')}>
                                {result.difficulty || 'medium'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(result.completed_at).toLocaleString()}
                            </p>
                            <div className="mt-2">
                              <div className="flex items-center gap-2">
                                <Progress value={percentage} className="flex-1 h-2" />
                                <span className={`text-sm font-medium ${getScoreColor(percentage)}`}>
                                  {result.score}/{result.total_questions}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>My Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                {certificates.length === 0 ? (
                  <div className="text-center py-12">
                    <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No certificates yet</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Complete quizzes to earn certificates!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certificates.map((cert) => {
                      const data = cert.certificate_data as any;
                      return (
                        <div key={cert.id} className="p-4 border rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{data?.quiz_title || 'Quiz Certificate'}</h4>
                              <p className="text-sm text-muted-foreground">
                                Score: {data?.score}/{data?.total_questions}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(cert.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Award className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Global Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userRank > 0 && (
                  <div className="mb-6 p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Your Rank</p>
                    <p className="text-3xl font-bold text-primary">#{userRank}</p>
                  </div>
                )}
                
                <div className="space-y-2">
                  {leaderboard.slice(0, 10).map((entry, index) => {
                    const isCurrentUser = entry.user_id === user.id;
                    return (
                      <div 
                        key={entry.id} 
                        className={`flex items-center gap-4 p-3 rounded-lg ${
                          isCurrentUser ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-yellow-100' : 
                          index === 1 ? 'bg-gray-200' : 
                          index === 2 ? 'bg-orange-100' : 'bg-muted'
                        }`}>
                          {index < 3 ? (
                            <Medal className={`w-4 h-4 ${
                              index === 0 ? 'text-yellow-600' : 
                              index === 1 ? 'text-gray-600' : 'text-orange-600'
                            }`} />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">
                            {entry.display_name || 'Anonymous'}
                            {isCurrentUser && <span className="text-primary ml-2">(You)</span>}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {entry.total_quizzes} quizzes completed
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{entry.total_score}</p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentDashboard;
