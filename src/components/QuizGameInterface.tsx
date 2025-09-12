import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, Zap, Target, CheckCircle, XCircle, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

interface QuizGameInterfaceProps {
  questions: Question[];
  onComplete: (score: number, percentage: number, timeSpent: number) => void;
  timeLimit: number;
  categoryTitle: string;
}

const QuizGameInterface: React.FC<QuizGameInterfaceProps> = ({
  questions,
  onComplete,
  timeLimit,
  categoryTitle
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeStarted] = useState(Date.now());
  const [showStreakAnimation, setShowStreakAnimation] = useState(false);
  const [combo, setCombo] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleNextQuestion();
    }
  }, [timeLeft, isAnswered]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    const isCorrect = answerIndex === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak(Math.max(maxStreak, newStreak));
      setCombo(combo + 1);
      
      // Show streak animation for streaks of 3 or more
      if (newStreak >= 3) {
        setShowStreakAnimation(true);
        setTimeout(() => setShowStreakAnimation(false), 2000);
      }
      
      // Check for achievements
      checkAchievements(newStreak, score + 1);
    } else {
      setStreak(0);
      setCombo(0);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowExplanation(false);
      setTimeLeft(timeLimit);
    } else {
      const timeSpent = Math.floor((Date.now() - timeStarted) / 1000);
      const percentage = Math.round((score / questions.length) * 100);
      onComplete(score, percentage, timeSpent);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const getScoreColor = () => {
    const percentage = (score / (currentQuestion + 1)) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const checkAchievements = (currentStreak: number, currentScore: number) => {
    const newAchievements: string[] = [];
    
    if (currentStreak === 5 && !achievements.includes('streak_5')) {
      newAchievements.push('streak_5');
      setShowAchievement('🔥 Fire Streak! 5 in a row!');
    }
    if (currentStreak === 10 && !achievements.includes('streak_10')) {
      newAchievements.push('streak_10');
      setShowAchievement('⚡ Lightning Fast! 10 in a row!');
    }
    if (currentScore === Math.ceil(questions.length / 2) && !achievements.includes('halfway')) {
      newAchievements.push('halfway');
      setShowAchievement('🎯 Halfway Hero!');
    }
    
    if (newAchievements.length > 0) {
      setAchievements([...achievements, ...newAchievements]);
      setTimeout(() => setShowAchievement(null), 3000);
    }
  };

  const getStreakIcon = () => {
    if (streak >= 10) return <Flame className="w-4 h-4 text-red-500 animate-pulse" />;
    if (streak >= 5) return <Zap className="w-4 h-4 text-yellow-500 animate-bounce" />;
    if (streak >= 3) return <Star className="w-4 h-4 text-blue-500" />;
    return <Target className="w-4 h-4 text-gray-400" />;
  };

  const getStreakText = () => {
    if (streak >= 10) return 'LEGENDARY!';
    if (streak >= 5) return 'ON FIRE!';
    if (streak >= 3) return 'STREAK!';
    return `Streak: ${streak}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{categoryTitle}</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              <span className={getScoreColor()}>{score}/{currentQuestion + (isAnswered ? 1 : 0)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className={timeLeft <= 10 ? 'text-red-600 font-bold' : 'text-gray-600'}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className={cn(
              "flex items-center gap-1 transition-all duration-300",
              streak >= 3 && "text-orange-600 font-bold"
            )}>
              {getStreakIcon()}
              <span className={streak >= 5 ? "animate-pulse" : ""}>{getStreakText()}</span>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                  {currentQ.question}
                </h2>
                
                <div className="grid gap-3">
                  {currentQ.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQ.correct;
                    const showResult = isAnswered;
                    
                    let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
                    
                    if (!showResult) {
                      buttonClass += isSelected 
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
                    } else {
                      if (isCorrect) {
                        buttonClass += "border-green-500 bg-green-50 text-green-700";
                      } else if (isSelected && !isCorrect) {
                        buttonClass += "border-red-500 bg-red-50 text-red-700";
                      } else {
                        buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
                      }
                    }

                    return (
                      <motion.button
                        key={index}
                        whileHover={!showResult ? { scale: 1.02 } : {}}
                        whileTap={!showResult ? { scale: 0.98 } : {}}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={isAnswered}
                        className={buttonClass}
                        aria-label={`Option ${index + 1}: ${option}`}
                      >
                        <div className="flex items-center">
                          <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-semibold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span>{option}</span>
                           {showResult && isCorrect && (
                             <motion.div
                               initial={{ scale: 0, rotate: -180 }}
                               animate={{ scale: 1, rotate: 0 }}
                               transition={{ type: "spring", stiffness: 300 }}
                               className="ml-auto"
                             >
                               <CheckCircle className="w-5 h-5 text-green-600" />
                             </motion.div>
                           )}
                           {showResult && isSelected && !isCorrect && (
                             <motion.div
                               initial={{ scale: 0, rotate: 180 }}
                               animate={{ scale: 1, rotate: 0 }}
                               transition={{ type: "spring", stiffness: 300 }}
                               className="ml-auto"
                             >
                               <XCircle className="w-5 h-5 text-red-600" />
                             </motion.div>
                           )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showExplanation && currentQ.explanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500"
                    >
                      <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
                      <p className="text-blue-700">{currentQ.explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
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
              onClick={handleNextQuestion}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {currentQuestion + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </motion.div>
        )}

        {/* Streak Animation */}
        <AnimatePresence>
          {showStreakAnimation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
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

        {/* Achievement Notification */}
        <AnimatePresence>
          {showAchievement && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg shadow-xl z-50"
            >
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">{showAchievement}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Time Warning */}
        <AnimatePresence>
          {timeLeft <= 10 && timeLeft > 0 && !isAnswered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: [0.8, 1.1, 1],
                rotate: [0, -5, 5, 0]
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                scale: { repeat: Infinity, repeatType: "reverse", duration: 0.5 },
                rotate: { repeat: Infinity, repeatType: "reverse", duration: 0.3 }
              }}
              className="fixed bottom-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 animate-pulse" />
                <span className="font-semibold">Time running out!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizGameInterface;