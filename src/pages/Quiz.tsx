import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BookOpen, Clock, Award, RotateCcw } from "lucide-react";
import { QuizCollection, QuizData } from "@/types/quiz";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState<QuizCollection | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(420); // 7 minutes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuizzes = async () => {
  try {
    const quizFiles = [
      "duas", "islamic-knowledge", "kids-duas", "namaz",
      "noorani-qaida", "quran-memorization", "quran-reading", "tajweed"
    ];

    const loadedQuizzes: QuizCollection = {};
    
    for (const quizId of quizFiles) {
      try {
        // Use absolute URL with cache busting
        const url = new URL(`/questions/${quizId}.json?t=${Date.now()}`, window.location.origin);
        const response = await fetch(url.href);
        
        // First check if response is HTML
        const text = await response.text();
        if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
          throw new Error(`Received HTML instead of JSON for ${quizId}.json`);
        }

        // Then parse as JSON
        const data = JSON.parse(text);
        loadedQuizzes[quizId] = data;
        
      } catch (err) {
        console.error(`Failed to load ${quizId}:`, err);
        // Continue with other quizzes even if one fails
        continue;
      }
    }

    if (Object.keys(loadedQuizzes).length === 0) {
      throw new Error("Failed to load all quiz files");
    }

    setQuizzes(loadedQuizzes);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to load quizzes");
    console.error("Loading error:", err);
  } finally {
    setLoading(false);
  }
};

    loadQuizzes();
  }, []);

  useEffect(() => {
    if (selectedQuiz && !showResults && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      setShowResults(true);
    }
  }, [timeLeft, selectedQuiz, showResults]);

  const handleAnswerSelect = (value: string) => setSelectedAnswer(value);

  const handleNextQuestion = () => {
    if (selectedAnswer && selectedQuiz && quizzes) {
      const newAnswers = { ...answers, [currentQuestion]: selectedAnswer };
      setAnswers(newAnswers);

      // Save progress to localStorage
      localStorage.setItem(
        `quiz-${selectedQuiz}`,
        JSON.stringify({
          answers: newAnswers,
          currentQuestion,
          timeLeft,
        })
      );

      if (currentQuestion < quizzes[selectedQuiz].questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer("");
      } else {
        setShowResults(true);
      }
    }
  };

  const calculateScore = () => {
    if (!selectedQuiz || !quizzes) return 0;

    return Object.entries(answers).reduce((score, [index, answer]) => {
      return answer === quizzes[selectedQuiz].questions[parseInt(index)].correct
        ? score + 1
        : score;
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer("");
    setShowResults(false);
    setTimeLeft(420);
    localStorage.removeItem(`quiz-${selectedQuiz}`);
  };

  const startNewQuiz = () => {
    setSelectedQuiz(null);
    resetQuiz();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Timer effect
  useEffect(() => {
    if (selectedQuiz) {
      const saved = localStorage.getItem(`quiz-${selectedQuiz}`);
      if (saved) {
        const { answers, currentQuestion, timeLeft } = JSON.parse(saved);
        setAnswers(answers);
        setCurrentQuestion(currentQuestion);
        setTimeLeft(timeLeft >= 420 ? timeLeft : 420);
      }
    }
  }, [selectedQuiz]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p>Loading Islamic knowledge quizzes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-red-500">Loading Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults && selectedQuiz && quizzes) {
    const score = calculateScore();
    const totalQuestions = quizzes[selectedQuiz].questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-3xl font-bold">
                Quiz Completed!
              </CardTitle>
              <CardDescription className="text-xl">
                {quizzes[selectedQuiz].title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {score}
                  </div>
                  <div className="text-gray-600">Correct Answers</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-gray-600">
                    {totalQuestions}
                  </div>
                  <div className="text-gray-600">Total Questions</div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">
                    {percentage}%
                  </div>
                  <div className="text-gray-600">Score</div>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg ${
                  percentage >= 80
                    ? "bg-green-100 text-green-800"
                    : percentage >= 60
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <div className="font-semibold">
                  {percentage >= 80
                    ? "MashaAllah! Excellent!"
                    : percentage >= 60
                    ? "Good Job!"
                    : "Keep Practicing!"}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={resetQuiz}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Quiz
                </Button>
                <Button onClick={startNewQuiz} variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Try Another Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedQuiz && quizzes && quizzes[selectedQuiz]) {
    const quiz = quizzes[selectedQuiz];
    const currentQ = quiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header with timer */}
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-600" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Question card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{currentQ.question}</CardTitle>
              {currentQ.topic && (
                <span className="text-sm text-blue-600">{currentQ.topic}</span>
              )}
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswer}
                onValueChange={handleAnswerSelect}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
              >
                {currentQ.options.map((option, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <RadioGroupItem value={option} id={`option-${i}`} />
                    <label
                      htmlFor={`option-${i}`}
                      className="flex-1 cursor-pointer"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </RadioGroup>

              <div className="mt-8 flex justify-between">
                <Button
                  onClick={() =>
                    setCurrentQuestion((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentQuestion === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-lg"
                >
                  {currentQuestion === quiz.questions.length - 1
                    ? "Submit"
                    : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Islamic <span className="text-blue-600">Knowledge Quiz</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Test your knowledge with our comprehensive Islamic studies quizzes
            </p>
          </div>
        </div>
      </section>

      {/* Quiz Selection */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Quiz
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select a quiz topic below. Each quiz contains 80 multiple-choice
              questions and has a 07-minute time limit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(quizzes).map(([key, quiz]) => (
              <Card
                key={key}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-200"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <BookOpen className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {quiz.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {quiz.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>80 Questions</span>
                    <span>07 Minutes</span>
                  </div>
                  <Button
                    onClick={() => setSelectedQuiz(key)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Quiz Instructions
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Time Limit</h4>
                <p className="text-gray-600">
                  You have 07 minutes to complete each quiz
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Questions</h4>
                <p className="text-gray-600">
                  Each quiz contains 80 multiple-choice questions
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Scoring</h4>
                <p className="text-gray-600">
                  Get your results immediately after completion
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <RotateCcw className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Retake</h4>
                <p className="text-gray-600">
                  You can retake any quiz to improve your score
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quiz;
