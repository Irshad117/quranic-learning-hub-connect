import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, Zap, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      setStreak(streak + 1);
      setMaxStreak(Math.max(maxStreak, streak + 1));
    } else {
      setStreak(0);
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

  const getStreakIcon = () => {
    if (streak >= 5) return <Zap className="w-4 h-4 text-yellow-500" />;
    if (streak >= 3) return <Star className="w-4 h-4 text-blue-500" />;
    return <Target className="w-4 h-4 text-gray-400" />;
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
            <div className="flex items-center gap-1">
              {getStreakIcon()}
              <span>Streak: {streak}</span>
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
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-auto"
                            >
                              ✓
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

        {/* Time Warning */}
        <AnimatePresence>
          {timeLeft <= 10 && timeLeft > 0 && !isAnswered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
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