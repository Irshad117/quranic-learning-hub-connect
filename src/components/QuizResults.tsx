import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, Star, Target, Award, Download, Crown, Medal, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CertificateModal } from './CertificateModal';
import { cn } from '@/lib/utils';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpent: number;
  categoryTitle: string;
  difficulty: string;
  onRetake: () => void;
  onNewQuiz: () => void;
  onDownloadCertificate?: () => void;
  canDownloadCertificate?: boolean;
  maxStreak?: number;
  achievements?: string[];
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  percentage,
  timeSpent,
  categoryTitle,
  difficulty,
  onRetake,
  onNewQuiz,
  onDownloadCertificate,
  canDownloadCertificate = false,
  maxStreak = 0,
  achievements = []
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(0);

  useEffect(() => {
    if (percentage >= 80) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [percentage]);
  const getPerformanceLevel = () => {
    if (percentage >= 95) return { 
      level: 'Legendary!', 
      color: 'text-purple-600', 
      bg: 'bg-gradient-to-br from-purple-50 to-pink-50', 
      border: 'border-purple-300',
      icon: Crown,
      celebration: true
    };
    if (percentage >= 90) return { 
      level: 'Excellent', 
      color: 'text-green-600', 
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50', 
      border: 'border-green-200',
      icon: Trophy,
      celebration: true
    };
    if (percentage >= 80) return { 
      level: 'Very Good', 
      color: 'text-blue-600', 
      bg: 'bg-gradient-to-br from-blue-50 to-cyan-50', 
      border: 'border-blue-200',
      icon: Medal,
      celebration: false
    };
    if (percentage >= 70) return { 
      level: 'Good', 
      color: 'text-yellow-600', 
      bg: 'bg-gradient-to-br from-yellow-50 to-amber-50', 
      border: 'border-yellow-200',
      icon: Star,
      celebration: false
    };
    if (percentage >= 60) return { 
      level: 'Fair', 
      color: 'text-orange-600', 
      bg: 'bg-gradient-to-br from-orange-50 to-red-50', 
      border: 'border-orange-200',
      icon: Target,
      celebration: false
    };
    return { 
      level: 'Keep Learning', 
      color: 'text-gray-600', 
      bg: 'bg-gradient-to-br from-gray-50 to-slate-50', 
      border: 'border-gray-200',
      icon: Target,
      celebration: false
    };
  };

  const performance = getPerformanceLevel();
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMotivationalMessage = () => {
    if (percentage >= 90) return "Outstanding! You have excellent knowledge of Islamic teachings.";
    if (percentage >= 80) return "Well done! You have a strong understanding of the subject.";
    if (percentage >= 70) return "Good work! Keep studying to improve further.";
    if (percentage >= 60) return "Not bad! With more practice, you can do better.";
    return "Keep learning! Every step in seeking knowledge is rewarded by Allah.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Confetti Animation */}
            <AnimatePresence>
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        opacity: 1, 
                        y: -100, 
                        x: Math.random() * 100 + "%", 
                        rotate: 0 
                      }}
                      animate={{ 
                        y: window.innerHeight + 100, 
                        rotate: 360,
                        opacity: [1, 1, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        delay: Math.random() * 0.5,
                        ease: "easeOut"
                      }}
                      className={cn(
                        "absolute w-3 h-3 rounded-full",
                        i % 4 === 0 && "bg-yellow-400",
                        i % 4 === 1 && "bg-blue-400", 
                        i % 4 === 2 && "bg-green-400",
                        i % 4 === 3 && "bg-purple-400"
                      )}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className={cn(
                  "w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center shadow-xl",
                  performance.celebration 
                    ? "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 animate-pulse" 
                    : "bg-gradient-to-br from-blue-400 to-purple-500"
                )}
              >
                <performance.icon className="w-12 h-12 text-white drop-shadow-lg" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {performance.celebration ? "🎉 Incredible! 🎉" : "Quiz Complete!"}
                </h1>
                <p className="text-gray-600 text-lg">{categoryTitle} - {difficulty}</p>
              </motion.div>
            </div>

            {/* Score Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className={cn(
                "text-center p-8 rounded-3xl border-2 mb-6 relative overflow-hidden",
                performance.bg,
                performance.border
              )}
            >
              {/* Animated background elements */}
              {performance.celebration && (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute top-2 right-2"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400 opacity-60" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-2 left-2"
                  >
                    <Sparkles className="w-4 h-4 text-purple-400 opacity-60" />
                  </motion.div>
                </>
              )}
              
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                className="text-7xl font-bold mb-3 relative z-10"
              >
                <span className={cn(performance.color, performance.celebration && "animate-pulse")}>{percentage}</span>
                <span className="text-gray-400 text-4xl">%</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl font-semibold text-gray-700 mb-2 relative z-10"
              >
                {score} out of {totalQuestions} correct
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={cn("text-2xl font-bold relative z-10", performance.color)}
              >
                {performance.level}
              </motion.div>

              {/* Max Streak Display */}
              {maxStreak > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mt-4 flex items-center justify-center gap-2 relative z-10"
                >
                  <Zap className={cn("w-5 h-5", maxStreak >= 5 ? "text-orange-500" : "text-blue-500")} />
                  <span className="text-sm font-medium text-gray-600">
                    Best Streak: {maxStreak}
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mb-6"
            >
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="text-lg font-semibold text-gray-800">{formatTime(timeSpent)}</div>
                <div className="text-sm text-gray-600">Time Taken</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Target className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <div className="text-lg font-semibold text-gray-800">{Math.round((score / timeSpent) * 60)}</div>
                <div className="text-sm text-gray-600">Score/Min</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Star className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                <div className="text-lg font-semibold text-gray-800">{difficulty}</div>
                <div className="text-sm text-gray-600">Difficulty</div>
              </div>
            </motion.div>

            {/* Motivational Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mb-6"
            >
              <p className="text-blue-800 text-center font-medium">
                {getMotivationalMessage()}
              </p>
            </motion.div>

            {/* Certificate Section */}
            {canDownloadCertificate && percentage >= 70 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-green-50 p-4 rounded-lg border-2 border-green-200 mb-6"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Congratulations!</span>
                </div>
                <p className="text-green-700 text-center text-sm mb-3">
                  You've earned a certificate for scoring {percentage}%!
                </p>
                <Button
                  onClick={onDownloadCertificate}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <Button
                onClick={onRetake}
                variant="outline"
                className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                Retake Quiz
              </Button>
              
              <Button
                onClick={onNewQuiz}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Try Another Quiz
              </Button>
            </motion.div>

            {/* Islamic Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-center"
            >
              <div className="text-sm text-gray-500 italic">
                "And whoever is guided - it is [by] his soul that he guides"
              </div>
              <div className="text-xs text-gray-400 mt-1">
                - Quran 17:15
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default QuizResults;