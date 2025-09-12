import React from 'react';
import { Award, Star, BookOpen, Zap } from 'lucide-react';

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
      if (percentage >= 80) return 'text-emerald-600';
      if (percentage >= 60) return 'text-amber-600';
      return 'text-rose-600';
    };

    const getGradeText = () => {
      if (percentage >= 80) return 'ممتاز / Excellent';
      if (percentage >= 60) return 'جيد / Good';
      return 'يحتاج تحسين / Needs Improvement';
    };

    return (
      <div
        ref={ref}
        className="w-[800px] h-[600px] bg-gradient-to-br from-slate-50 to-white relative mx-auto print:shadow-none"
        style={{ fontFamily: '"Times New Roman", serif' }}
      >
        {/* Islamic Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v40c11.046 0 20-8.954 20-20zM0 20c0 11.046 8.954 20 20 20V0C8.954 0 0 8.954 0 20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Ornate Border */}
        <div className="absolute inset-4 border-4 border-double border-amber-700 rounded-lg bg-gradient-to-br from-amber-50/30 to-emerald-50/30">
          <div className="absolute inset-3 border-2 border-amber-600/40 rounded-lg">
            <div className="absolute inset-2 border border-amber-500/30 rounded-lg"></div>
          </div>
        </div>

        {/* Corner Islamic Ornaments */}
        <div className="absolute top-6 left-6 text-amber-600/60">
          <Zap className="h-8 w-8" />
        </div>
        <div className="absolute top-6 right-6 text-amber-600/60">
          <Zap className="h-8 w-8 scale-x-[-1]" />
        </div>
        <div className="absolute bottom-6 left-6 text-amber-600/60">
          <BookOpen className="h-8 w-8" />
        </div>
        <div className="absolute bottom-6 right-6 text-amber-600/60">
          <BookOpen className="h-8 w-8" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-12 py-8">
          {/* Header with Academy Branding */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-full flex items-center justify-center shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-emerald-800 tracking-wide">صراط المستقيم</h1>
            <h2 className="text-3xl font-bold text-amber-700 tracking-wide">SIRAT AL-MUSTAQIM ACADEMY</h2>
            <p className="text-sm text-slate-600 italic">Online Quran Learning Excellence</p>
            <div className="w-48 h-1 bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-600 mx-auto rounded-full"></div>
          </div>

          {/* Certificate Title */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Award className="h-10 w-10 text-amber-600" />
              <h3 className="text-3xl font-bold text-slate-800">شهادة إنجاز</h3>
              <Award className="h-10 w-10 text-amber-600" />
            </div>
            <h4 className="text-2xl font-bold text-slate-700">CERTIFICATE OF ACHIEVEMENT</h4>
          </div>

          {/* Main Content */}
          <div className="space-y-4 mb-6">
            <p className="text-lg text-slate-700 font-medium">هذا يشهد أن / This is to certify that</p>
            
            <div className="my-8">
              <div className="bg-gradient-to-r from-amber-100 to-emerald-100 rounded-lg p-4 border-2 border-amber-200">
                <h2 className="text-3xl font-bold text-slate-900 tracking-wide">
                  {userName || 'Student Name'}
                </h2>
              </div>
            </div>

            <p className="text-lg text-slate-700 font-medium">has successfully completed / قد أكمل بنجاح</p>

            <div className="my-6 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg p-4 border-2 border-emerald-200">
              <h3 className="text-2xl font-bold text-emerald-800 mb-1">
                {quizTitle}
              </h3>
              <p className="text-lg text-emerald-700 font-semibold capitalize">
                ({difficulty} Level / مستوى {difficulty === 'easy' ? 'مبتدئ' : difficulty === 'medium' ? 'متوسط' : 'متقدم'})
              </p>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-6 my-8">
              <div className="bg-white rounded-lg p-4 border-2 border-slate-200 shadow-sm">
                <div className="text-2xl font-bold text-emerald-600">{score}</div>
                <div className="text-sm text-slate-600 font-medium">Correct Answers</div>
                <div className="text-xs text-slate-500">إجابات صحيحة</div>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-slate-200 shadow-sm">
                <div className="text-2xl font-bold text-slate-700">{totalQuestions}</div>
                <div className="text-sm text-slate-600 font-medium">Total Questions</div>
                <div className="text-xs text-slate-500">مجموع الأسئلة</div>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-slate-200 shadow-sm">
                <div className={`text-2xl font-bold ${getGradeColor()}`}>{percentage}%</div>
                <div className="text-sm text-slate-600 font-medium">Final Score</div>
                <div className="text-xs text-slate-500">النتيجة النهائية</div>
              </div>
            </div>

            {/* Achievement Level */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-7 w-7 ${
                    percentage >= star * 20 ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                  }`}
                />
              ))}
              <span className={`ml-3 text-lg font-bold ${getGradeColor()}`}>
                {getGradeText()}
              </span>
            </div>
          </div>

          {/* Footer with Signatures */}
          <div className="space-y-4 mt-auto">
            <p className="text-sm text-slate-600 font-medium mb-6">
              تاريخ الإنجاز / Date of Achievement: <span className="font-semibold">{completionDate}</span>
            </p>
            
            <div className="flex items-center justify-between w-full max-w-lg mx-auto pt-4">
              <div className="text-center">
                <div className="w-32 border-t-2 border-slate-400 mb-2"></div>
                <p className="text-xs font-semibold text-slate-700">Academy Director</p>
                <p className="text-xs text-slate-500">مدير الأكاديمية</p>
              </div>
              <div className="mx-8">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <Award className="h-10 w-10 text-white" />
                </div>
              </div>
              <div className="text-center">
                <div className="w-32 border-t-2 border-slate-400 mb-2"></div>
                <p className="text-xs font-semibold text-slate-700">Certified Date</p>
                <p className="text-xs text-slate-500">تاريخ التصديق</p>
              </div>
            </div>
            
            {/* Academy Seal */}
            <div className="text-center mt-4">
              <p className="text-xs text-slate-500 italic">
                "وَقُل رَّبِّ زِدْنِي عِلْمًا" - "And say: My Lord, increase me in knowledge"
              </p>
            </div>
          </div>
        </div>

      </div>
    );
  }
);

Certificate.displayName = 'Certificate';