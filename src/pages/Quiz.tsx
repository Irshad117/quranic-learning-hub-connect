
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BookOpen, Clock, Award, RotateCcw } from 'lucide-react';

const Quiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 03 minutes in seconds

  const quizzes = {
    'noorani-qaida': {
      title: 'Noorani Qaida Quiz',
      description: 'Test your knowledge of basic Arabic letters and pronunciation',
      questions: [
        {
          question: "How many letters are there in the Arabic alphabet?",
          options: ["26", "28", "29", "30"],
          correct: "28"
        },
        {
          question: "What is the first letter of the Arabic alphabet?",
          options: ["Alif", "Ba", "Ta", "Tha"],
          correct: "Alif"
        },
        {
          question: "Which letter is called 'Ba'?",
          options: ["ب", "ت", "ث", "ج"],
          correct: "ب"
        },
        {
          question: "What does 'Harakat' mean?",
          options: ["Letters", "Vowel marks", "Words", "Sentences"],
          correct: "Vowel marks"
        },
        {
          question: "How many short vowels are there in Arabic?",
          options: ["2", "3", "4", "5"],
          correct: "3"
        },
        // Add 35 more questions to make 40 total
        ...Array.from({ length: 35 }, (_, i) => ({
          question: `Sample question ${i + 6} for Noorani Qaida?`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correct: "Option A"
        }))
      ]
    },
    'quran-reading': {
      title: 'Quran Reading Quiz',
      description: 'Test your Quranic recitation and pronunciation skills',
      questions: [
        {
          question: "What is the correct pronunciation of 'Rahman'?",
          options: ["Rah-man", "Reh-man", "Ra-man", "Ruh-man"],
          correct: "Rah-man"
        },
        {
          question: "How many Surahs are in the Quran?",
          options: ["112", "113", "114", "115"],
          correct: "114"
        },
        {
          question: "Which Surah is called 'The Opening'?",
          options: ["Al-Baqarah", "Al-Fatiha", "Al-Ikhlas", "An-Nas"],
          correct: "Al-Fatiha"
        },
        {
          question: "What does 'Bismillah' mean?",
          options: ["In the name of Allah", "Praise be to Allah", "Allah is great", "There is no god but Allah"],
          correct: "In the name of Allah"
        },
        {
          question: "How many verses are in Surah Al-Fatiha?",
          options: ["5", "6", "7", "8"],
          correct: "7"
        },
        // Add 35 more questions
        ...Array.from({ length: 35 }, (_, i) => ({
          question: `Sample question ${i + 6} for Quran Reading?`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correct: "Option A"
        }))
      ]
    },
    'tajweed': {
      title: 'Tajweed Quiz',
      description: 'Test your knowledge of Tajweed rules and proper recitation',
      questions: [
        {
          question: "What does 'Tajweed' literally mean?",
          options: ["To beautify", "To improve", "To recite", "To memorize"],
          correct: "To improve"
        },
        {
          question: "What is 'Noon Sakinah'?",
          options: ["A letter with Fatha", "A letter with Kasra", "Noon without vowel", "Noon with Damma"],
          correct: "Noon without vowel"
        },
        {
          question: "How many rules of Noon Sakinah are there?",
          options: ["3", "4", "5", "6"],
          correct: "4"
        },
        {
          question: "What is 'Ikhfa'?",
          options: ["Clear pronunciation", "Hiding", "Merging", "Emphasis"],
          correct: "Hiding"
        },
        {
          question: "What is 'Qalqalah'?",
          options: ["Vibration", "Silence", "Stretching", "Shortening"],
          correct: "Vibration"
        },
        // Add 35 more questions
        ...Array.from({ length: 35 }, (_, i) => ({
          question: `Sample question ${i + 6} for Tajweed?`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correct: "Option A"
        }))
      ]
    },
    'memorization': {
      title: 'Quran Memorization Quiz',
      description: 'Test your memorization of Quranic verses and chapters',
      questions: [
        {
          question: "Which Surah is recommended to memorize first?",
          options: ["Al-Baqarah", "Al-Fatiha", "Al-Ikhlas", "An-Nas"],
          correct: "Al-Fatiha"
        },
        {
          question: "What is the shortest Surah in the Quran?",
          options: ["Al-Asr", "Al-Kawthar", "Al-Ikhlas", "An-Nasr"],
          correct: "Al-Kawthar"
        },
        {
          question: "How many verses are in Surah Al-Ikhlas?",
          options: ["3", "4", "5", "6"],
          correct: "4"
        },
        {
          question: "Which technique is best for memorization?",
          options: ["Reading once", "Listening only", "Repetition", "Writing only"],
          correct: "Repetition"
        },
        {
          question: "What is 'Muraja'ah'?",
          options: ["New memorization", "Revision", "Recitation", "Understanding"],
          correct: "Revision"
        },
        // Add 35 more questions
        ...Array.from({ length: 35 }, (_, i) => ({
          question: `Sample question ${i + 6} for Memorization?`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correct: "Option A"
        }))
      ]
    },
    'namaz': {
    title: 'Namaz Quiz',
    description: 'Test your understanding of the daily prayers and their rules',
    questions: [
      {
        question: "How many daily prayers are there in Islam?",
        options: ["3", "4", "5", "6"],
        correct: "5"
      },
      {
        question: "What is the name of the dawn prayer?",
        options: ["Maghrib", "Isha", "Fajr", "Asr"],
        correct: "Fajr"
      },
      {
        question: "Which direction do Muslims face during prayer?",
        options: ["East", "West", "Qibla", "Kaaba"],
        correct: "Kaaba"
      },
      {
        question: "What is 'Wudu'?",
        options: ["A prayer", "A type of fast", "A purification method", "A verse"],
        correct: "A purification method"
      },
      {
        question: "What is the position called when you bow in prayer?",
        options: ["Ruku", "Sujood", "Qiyam", "Tashahhud"],
        correct: "Ruku"
      },
      ...Array.from({ length: 35 }, (_, i) => ({
        question: `Sample question ${i + 6} for Namaz?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: "Option A"
      }))
    ]
  },

  'duas': {
    title: "Dua's Quiz",
    description: 'Test your memory of important Islamic supplications',
    questions: [
      {
        question: "Which dua is said before eating?",
        options: ["Bismillah", "Alhamdulillah", "SubhanAllah", "Astaghfirullah"],
        correct: "Bismillah"
      },
      {
        question: "What is the meaning of 'Alhamdulillah'?",
        options: ["Thank You", "Praise be to Allah", "Peace", "God is Great"],
        correct: "Praise be to Allah"
      },
      {
        question: "Which dua is for seeking forgiveness?",
        options: ["SubhanAllah", "Bismillah", "Astaghfirullah", "Allahu Akbar"],
        correct: "Astaghfirullah"
      },
      {
        question: "Dua before sleeping?",
        options: ["Bismillah", "Ayat-ul-Kursi", "Surah Fatiha", "Surah Ikhlas"],
        correct: "Ayat-ul-Kursi"
      },
      {
        question: "What is the dua for traveling?",
        options: ["Dua Safar", "Dua Shifa", "Dua Maghfirah", "Dua Tawbah"],
        correct: "Dua Safar"
      },
      ...Array.from({ length: 35 }, (_, i) => ({
        question: `Sample question ${i + 6} for Duas?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: "Option A"
      }))
    ]
  },

  'islamic-knowledge': {
    title: 'Islamic Knowledge Quiz',
    description: 'General Islamic knowledge on beliefs, history, and prophets',
    questions: [
      {
        question: "Who is the last prophet in Islam?",
        options: ["Isa", "Musa", "Muhammad (PBUH)", "Ibrahim"],
        correct: "Muhammad (PBUH)"
      },
      {
        question: "How many pillars of Islam are there?",
        options: ["3", "4", "5", "6"],
        correct: "5"
      },
      {
        question: "What is the first pillar of Islam?",
        options: ["Salah", "Shahadah", "Zakat", "Hajj"],
        correct: "Shahadah"
      },
      {
        question: "Which city is called the city of the Prophet?",
        options: ["Makkah", "Madina", "Jerusalem", "Baghdad"],
        correct: "Madina"
      },
      {
        question: "What is the Islamic holy book called?",
        options: ["Torah", "Bible", "Quran", "Zabur"],
        correct: "Quran"
      },
      ...Array.from({ length: 35 }, (_, i) => ({
        question: `Sample question ${i + 6} for Islamic Knowledge?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: "Option A"
      }))
    ]
  },

  'kids-duas': {
    title: "Kids Dua's Quiz",
    description: 'Fun and easy duas for kids to learn and remember',
    questions: [
      {
        question: "What do we say after sneezing?",
        options: ["Alhamdulillah", "Bismillah", "InshaAllah", "SubhanAllah"],
        correct: "Alhamdulillah"
      },
      {
        question: "Dua before entering the toilet?",
        options: ["Allahumma inni a'udhu bika...", "Alhamdulillah", "Astaghfirullah", "Bismillah"],
        correct: "Allahumma inni a'udhu bika..."
      },
      {
        question: "What do we say when waking up?",
        options: ["Alhamdulillah", "Inna lillahi", "Allahu Akbar", "Bismillah"],
        correct: "Alhamdulillah"
      },
      {
        question: "Dua before sleeping?",
        options: ["Bismika Allahumma amutu wa ahya", "SubhanAllah", "Astaghfirullah", "La ilaha illallah"],
        correct: "Bismika Allahumma amutu wa ahya"
      },
      {
        question: "What do we say before drinking water?",
        options: ["Bismillah", "SubhanAllah", "Allahu Akbar", "Alhamdulillah"],
        correct: "Bismillah"
      },
      ...Array.from({ length: 35 }, (_, i) => ({
        question: `Sample question ${i + 6} for Kids Dua's?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: "Option A"
      }))
    ]
  }
  };

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer && selectedQuiz) {
      setAnswers({
        ...answers,
        [currentQuestion]: selectedAnswer
      });
      
      if (currentQuestion < quizzes[selectedQuiz as keyof typeof quizzes].questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
      } else {
        // Show results
        setShowResults(true);
      }
    }
  };

  const calculateScore = () => {
    if (!selectedQuiz) return 0;
    const quiz = quizzes[selectedQuiz as keyof typeof quizzes];
    let score = 0;
    
    Object.keys(answers).forEach(questionIndex => {
      const questionNum = parseInt(questionIndex);
      if (answers[questionNum] === quiz.questions[questionNum].correct) {
        score++;
      }
    });
    
    return score;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer('');
    setShowResults(false);
    setTimeLeft(180); // Reset time to 03 minutes
  };

  const startNewQuiz = () => {
    setSelectedQuiz(null);
    resetQuiz();
  };

  // Timer effect
  React.useEffect(() => {
    if (selectedQuiz && !showResults && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      setShowResults(true);
    }
  }, [timeLeft, selectedQuiz, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults && selectedQuiz) {
    const score = calculateScore();
    const totalQuestions = quizzes[selectedQuiz as keyof typeof quizzes].questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">Quiz Completed!</CardTitle>
              <CardDescription className="text-xl text-gray-600">
                {quizzes[selectedQuiz as keyof typeof quizzes].title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{score}</div>
                  <div className="text-gray-600">Correct Answers</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-gray-600">{totalQuestions}</div>
                  <div className="text-gray-600">Total Questions</div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{percentage}%</div>
                  <div className="text-gray-600">Score Percentage</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${percentage >= 80 ? 'bg-green-100 text-green-800' : percentage >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  <div className="font-semibold">
                    {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good Job!' : 'Keep Practicing!'}
                  </div>
                  <div className="text-sm">
                    {percentage >= 80 ? 'You have excellent knowledge in this subject.' : 
                     percentage >= 60 ? 'You have good understanding, but there\'s room for improvement.' : 
                     'Consider reviewing the material and taking the quiz again.'}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetQuiz} className="bg-blue-600 hover:bg-blue-700">
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

  if (selectedQuiz) {
    const quiz = quizzes[selectedQuiz as keyof typeof quizzes];
    const currentQ = quiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Timer and Progress */}
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                {currentQ.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                <div className="space-y-4">
                  {currentQ.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <label 
                        htmlFor={`option-${index}`} 
                        className="flex-1 cursor-pointer text-gray-700"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
              
              <div className="mt-8 flex justify-between">
                <Button 
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                <Button 
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {currentQuestion === quiz.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
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
              Select a quiz topic below. Each quiz contains 40 multiple-choice questions and has a 03-minute time limit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(quizzes).map(([key, quiz]) => (
              <Card key={key} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-200">
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
                    <span>40 Questions</span>
                    <span>03 Minutes</span>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Quiz Instructions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Time Limit</h4>
                <p className="text-gray-600">You have 03 minutes to complete each quiz</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Questions</h4>
                <p className="text-gray-600">Each quiz contains 40 multiple-choice questions</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Scoring</h4>
                <p className="text-gray-600">Get your results immediately after completion</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <RotateCcw className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Retake</h4>
                <p className="text-gray-600">You can retake any quiz to improve your score</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quiz;
