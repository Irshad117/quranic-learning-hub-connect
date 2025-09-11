import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, Star, Target, Award, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { CertificateModal } from './CertificateModal';

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
  canDownloadCertificate = false
}) => {
  const getPerformanceLevel = () => {
    if (percentage >= 90) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (percentage >= 80) return { level: 'Very Good', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (percentage >= 70) return { level: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    if (percentage >= 60) return { level: 'Fair', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
    return { level: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
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
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
              <p className="text-gray-600">{categoryTitle} - {difficulty}</p>
            </div>

            {/* Score Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-center p-6 rounded-2xl ${performance.bg} ${performance.border} border-2 mb-6`}
            >
              <div className="text-6xl font-bold mb-2">
                <span className={performance.color}>{percentage}</span>
                <span className="text-gray-400 text-3xl">%</span>
              </div>
              <div className="text-xl font-semibold text-gray-700 mb-1">
                {score} out of {totalQuestions} correct
              </div>
              <div className={`text-lg font-medium ${performance.color}`}>
                {performance.level}
              </div>
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