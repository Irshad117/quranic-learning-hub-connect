import React from 'react';
import { Award, Star } from 'lucide-react';

interface CertificateProps {
  userName: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  difficulty: string;
  completionDate: string;
}

export const Certificate = React.forwardRef<HTMLDivElement, CertificateProps>(
  ({ userName, quizTitle, score, totalQuestions, percentage, difficulty, completionDate }, ref) => {
    const getGradeColor = () => {
      if (percentage >= 80) return 'text-green-600';
      if (percentage >= 60) return 'text-yellow-600';
      return 'text-red-600';
    };

    const getGradeText = () => {
      if (percentage >= 80) return 'Excellent';
      if (percentage >= 60) return 'Good';
      return 'Needs Improvement';
    };

    return (
      <div
        ref={ref}
        className="w-[800px] h-[600px] bg-white border-8 border-primary/20 relative p-8 mx-auto"
        style={{ fontFamily: 'serif' }}
      >
        {/* Decorative border */}
        <div className="absolute inset-4 border-2 border-primary/30 rounded-lg">
          <div className="absolute inset-2 border border-primary/20 rounded-lg"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Award className="h-12 w-12 text-primary" />
              <h1 className="text-4xl font-bold text-primary">Certificate of Achievement</h1>
              <Award className="h-12 w-12 text-primary" />
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded"></div>
          </div>

          {/* Main content */}
          <div className="space-y-4">
            <p className="text-lg text-gray-700">This is to certify that</p>
            
            <div className="my-6">
              <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-primary/30 pb-2 inline-block min-w-[300px]">
                {userName || 'Quiz Participant'}
              </h2>
            </div>

            <p className="text-lg text-gray-700">has successfully completed the</p>

            <div className="my-4">
              <h3 className="text-2xl font-semibold text-primary">
                {quizTitle}
              </h3>
              <p className="text-lg text-gray-600 capitalize">
                ({difficulty} Level)
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 my-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{score}</div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{totalQuestions}</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getGradeColor()}`}>{percentage}%</div>
                <div className="text-sm text-gray-600">Final Score</div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 my-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 ${
                    percentage >= star * 20 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className={`ml-2 font-semibold ${getGradeColor()}`}>
                {getGradeText()}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="space-y-4 mt-8">
            <p className="text-sm text-gray-600">
              Awarded on {completionDate}
            </p>
            
            <div className="flex items-center justify-between w-full max-w-md mx-auto pt-6">
              <div className="text-center">
                <div className="w-32 border-t border-gray-400 mb-1"></div>
                <p className="text-xs text-gray-500">Quranic Academy</p>
              </div>
              <div className="mx-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-center">
                <div className="w-32 border-t border-gray-400 mb-1"></div>
                <p className="text-xs text-gray-500">Date of Completion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-primary/40"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-primary/40"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-primary/40"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-primary/40"></div>
      </div>
    );
  }
);

Certificate.displayName = 'Certificate';