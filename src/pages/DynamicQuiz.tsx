import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useCategories, useQuestions, useQuizAttempts, useUpdateLeaderboard, Question } from '@/hooks/useQuestions';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { CertificateModal } from '@/components/CertificateModal';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  CheckCircle, 
  XCircle, 
  Flame,
  RotateCcw,
  Download,
  ArrowLeft,
  Timer,
  Award,
  Sparkles
} from 'lucide-react';

type GamePhase = 'select-category' | 'select-difficulty' | 'playing' | 'results';

const DynamicQuiz = () => {
  const { user } = useAuth();
  const { categories, loading: categoriesLoading } = useCategories();
  const { attemptedQuestionIds, recordAttempt } = useQuizAttempts();
  const { updateLeaderboard } = useUpdateLeaderboard();
  
  // Game state
  const [phase, setPhase] = useState<GamePhase>('select-category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalTime, setTotalTime] = useState(0);
  const [showStreakAnimation, setShowStreakAnimation] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [quizResultId, setQuizResultId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Timer effect
  useEffect(() => {
    if (phase === 'playing' && !isAnswered && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(t => t - 1);
        setTotalTime(t => t + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'playing' && timeLeft === 0 && !isAnswered) {
      handleTimeUp();
    }
  }, [phase, timeLeft, isAnswered]);

  const fetchQuestions = async () => {
    if (!selectedCategory || !selectedDifficulty) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('category_id', selectedCategory)
        .eq('difficulty', selectedDifficulty)
        .eq('is_active', true);

      if (error) throw error;

      // Parse options and filter out attempted questions for logged-in users
      let availableQuestions = (data || []).map(q => ({
        ...q,
        options: Array.isArray(q.options) ? q.options : JSON.parse(q.options as unknown as string || '[]')
      })) as Question[];

      if (user && attemptedQuestionIds.size > 0) {
        const fresh = availableQuestions.filter(q => !attemptedQuestionIds.has(q.id));
        if (fresh.length >= 10) {
          availableQuestions = fresh;
        }
      }

      // Shuffle and take 25 questions
      const shuffled = availableQuestions.sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, Math.min(25, shuffled.length));

      if (selected.length === 0) {
        toast({
          title: 'No Questions Available',
          description: 'There are no questions in this category/difficulty yet.',
          variant: 'destructive'
        });
        return;
      }

      setQuizQuestions(selected);
      setPhase('playing');
      setTimeLeft(selected[0]?.time_limit || 30);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to load questions',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setPhase('select-difficulty');
  };

  const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    setSelectedDifficulty(difficulty);
    fetchQuestions();
  };

  const handleAnswerSelect = async (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const currentQ = quizQuestions[currentIndex];
    const isCorrect = answer === currentQ.correct_answer;

    if (isCorrect) {
      const newScore = score + currentQ.points;
      setScore(newScore);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak(Math.max(maxStreak, newStreak));

      if (newStreak >= 3) {
        setShowStreakAnimation(true);
        setTimeout(() => setShowStreakAnimation(false), 2000);
      }
    } else {
      setStreak(0);
    }

    // Record attempt for logged-in users
    if (user && selectedCategory) {
      await recordAttempt(
        currentQ.id,
        selectedCategory,
        isCorrect,
        30 - timeLeft,
        isCorrect ? currentQ.points : 0
      );
    }
  };

  const handleTimeUp = () => {
    setIsAnswered(true);
    setStreak(0);
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(quizQuestions[currentIndex + 1]?.time_limit || 30);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setPhase('results');

    // Save result and update leaderboard for logged-in users
    if (user && selectedCategory) {
      try {
        const category = categories.find(c => c.id === selectedCategory);
        const { data, error } = await supabase
          .from('quiz_results')
          .insert({
            user_id: user.id,
            quiz_category: category?.name || 'Quiz',
            quiz_title: category?.name || 'Quiz',
            score: score,
            total_questions: quizQuestions.length,
            difficulty: selectedDifficulty
          })
          .select()
          .single();

        if (!error && data) {
          setQuizResultId(data.id);
          await updateLeaderboard(selectedCategory, score, totalTime);
        }
      } catch (err) {
        console.error('Error saving quiz result:', err);
      }
    }
  };

  const resetQuiz = () => {
    setPhase('select-category');
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setQuizQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(30);
    setTotalTime(0);
    setQuizResultId(null);
  };

  const getStreakIcon = () => {
    if (streak >= 10) return <Flame className="w-5 h-5 text-red-500 animate-pulse" />;
    if (streak >= 5) return <Zap className="w-5 h-5 text-yellow-500 animate-bounce" />;
    if (streak >= 3) return <Star className="w-5 h-5 text-blue-500" />;
    return <Target className="w-5 h-5 text-muted-foreground" />;
  };

  // Category Selection
  if (phase === 'select-category') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Islamic Knowledge Quiz</h1>
            <p className="text-lg text-muted-foreground">Choose a category to begin your learning journey</p>
          </motion.div>

          {categoriesLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <CardContent className="pt-6 text-center">
                      <span className="text-4xl mb-4 block">{category.icon}</span>
                      <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {!user && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center p-4 bg-muted rounded-lg"
            >
              <p className="text-muted-foreground">
                <Link to="/auth" className="text-primary hover:underline">Sign in</Link> to save your progress and earn certificates!
              </p>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Difficulty Selection
  if (phase === 'select-difficulty') {
    const category = categories.find(c => c.id === selectedCategory);
    const difficulties = [
      { level: 'easy' as const, label: 'Beginner', desc: 'Basic concepts', color: 'from-green-500 to-emerald-500', icon: '🌱' },
      { level: 'medium' as const, label: 'Intermediate', desc: 'Moderate challenge', color: 'from-yellow-500 to-orange-500', icon: '⭐' },
      { level: 'hard' as const, label: 'Advanced', desc: 'Expert level', color: 'from-red-500 to-pink-500', icon: '🔥' }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setPhase('select-category')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-5xl mb-4 block">{category?.icon}</span>
            <h1 className="text-3xl font-bold mb-2">{category?.name}</h1>
            <p className="text-muted-foreground">Select your difficulty level</p>
          </motion.div>

          <div className="space-y-4">
            {difficulties.map((diff, index) => (
              <motion.div
                key={diff.level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
                  onClick={() => handleDifficultySelect(diff.level)}
                >
                  <CardContent className="p-0">
                    <div className={`bg-gradient-to-r ${diff.color} p-6 text-white`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{diff.icon}</span>
                          <div>
                            <h3 className="font-bold text-xl">{diff.label}</h3>
                            <p className="text-white/80">{diff.desc}</p>
                          </div>
                        </div>
                        <Sparkles className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading questions...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Playing Phase
  if (phase === 'playing' && quizQuestions.length > 0) {
    const currentQ = quizQuestions[currentIndex];
    const progress = ((currentIndex + 1) / quizQuestions.length) * 100;
    const timerProgress = (timeLeft / (currentQ.time_limit || 30)) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="font-bold text-lg">{score}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStreakIcon()}
                  <span className={streak >= 3 ? 'font-bold text-primary' : 'text-muted-foreground'}>
                    {streak}x
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Timer className={`w-5 h-5 ${timeLeft <= 10 ? 'text-destructive animate-pulse' : 'text-muted-foreground'}`} />
                <span className={`font-mono text-lg ${timeLeft <= 10 ? 'text-destructive font-bold' : ''}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Question {currentIndex + 1} of {quizQuestions.length}</span>
                <Badge variant={
                  currentQ.difficulty === 'easy' ? 'secondary' :
                  currentQ.difficulty === 'hard' ? 'destructive' : 'default'
                }>
                  {currentQ.difficulty}
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
              <Progress 
                value={timerProgress} 
                className={`h-1 ${timeLeft <= 10 ? 'bg-destructive/20' : ''}`}
              />
            </div>
          </motion.div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Card className="mb-6 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl leading-relaxed">
                    {currentQ.question_text}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {currentQ.options.map((option, index) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrect = option === currentQ.correct_answer;
                      const showResult = isAnswered;

                      let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
                      
                      if (!showResult) {
                        buttonClass += isSelected 
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-muted";
                      } else {
                        if (isCorrect) {
                          buttonClass += "border-green-500 bg-green-50 text-green-700";
                        } else if (isSelected && !isCorrect) {
                          buttonClass += "border-red-500 bg-red-50 text-red-700";
                        } else {
                          buttonClass += "border-border bg-muted/50 text-muted-foreground";
                        }
                      }

                      return (
                        <motion.button
                          key={index}
                          whileHover={!showResult ? { scale: 1.02 } : {}}
                          whileTap={!showResult ? { scale: 0.98 } : {}}
                          onClick={() => handleAnswerSelect(option)}
                          disabled={isAnswered}
                          className={buttonClass}
                        >
                          <div className="flex items-center">
                            <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-semibold">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="flex-1">{option}</span>
                            {showResult && isCorrect && (
                              <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
                            )}
                            {showResult && isSelected && !isCorrect && (
                              <XCircle className="w-5 h-5 text-red-600 ml-2" />
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {isAnswered && currentQ.explanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 p-4 bg-muted rounded-lg border-l-4 border-primary"
                    >
                      <h4 className="font-semibold mb-2">Explanation:</h4>
                      <p className="text-muted-foreground">{currentQ.explanation}</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Next Button */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Button
                onClick={handleNext}
                size="lg"
                className="px-8"
              >
                {currentIndex + 1 < quizQuestions.length ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </motion.div>
          )}

          {/* Streak Animation */}
          <AnimatePresence>
            {showStreakAnimation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
              >
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full shadow-2xl">
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <Flame className="w-6 h-6 animate-bounce" />
                    <span>STREAK {streak}!</span>
                    <Flame className="w-6 h-6 animate-bounce" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Results Phase
  if (phase === 'results') {
    const percentage = quizQuestions.length > 0 
      ? Math.round((score / quizQuestions.reduce((sum, q) => sum + q.points, 0)) * 100)
      : 0;
    const category = categories.find(c => c.id === selectedCategory);

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="text-center overflow-hidden">
              <div className={`p-8 ${
                percentage >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                percentage >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                'bg-gradient-to-r from-red-500 to-pink-500'
              } text-white`}>
                <Trophy className="w-16 h-16 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">
                  {percentage >= 80 ? 'MashaAllah! Excellent!' :
                   percentage >= 60 ? 'Good Job!' : 'Keep Practicing!'}
                </h1>
                <p className="text-white/80">{category?.name}</p>
              </div>

              <CardContent className="pt-8 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-3xl font-bold text-primary">{score}</p>
                    <p className="text-sm text-muted-foreground">Points</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-3xl font-bold">{quizQuestions.length}</p>
                    <p className="text-sm text-muted-foreground">Questions</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-3xl font-bold text-orange-500">{maxStreak}x</p>
                    <p className="text-sm text-muted-foreground">Best Streak</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {user && (
                    <Button 
                      onClick={() => setShowCertificateModal(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Certificate
                    </Button>
                  )}
                  <Button onClick={resetQuiz} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Play Again
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/dashboard">View Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {user && (
          <CertificateModal
            isOpen={showCertificateModal}
            onClose={() => setShowCertificateModal(false)}
            onDownload={async () => {
              if (quizResultId) {
                await supabase
                  .from('quiz_results')
                  .update({ certificate_downloaded: true })
                  .eq('id', quizResultId);

                await supabase
                  .from('certificates')
                  .insert({
                    user_id: user.id,
                    quiz_result_id: quizResultId,
                    certificate_data: {
                      quiz_title: category?.name || 'Quiz',
                      score,
                      total_questions: quizQuestions.length,
                      difficulty: selectedDifficulty,
                      completion_date: new Date().toISOString()
                    }
                  });

                toast({
                  title: 'Certificate Downloaded!',
                  description: 'Your certificate has been saved.'
                });
              }
              setShowCertificateModal(false);
            }}
            quizTitle={category?.name || 'Quiz'}
            score={score}
            totalQuestions={quizQuestions.length}
            percentage={percentage}
            difficulty={selectedDifficulty || 'medium'}
          />
        )}
      </div>
    );
  }

  return null;
};

export default DynamicQuiz;
