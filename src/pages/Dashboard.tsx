
import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, User, Star, TrendingUp, FileText, Settings } from 'lucide-react';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  // Mock user data
  const userData = {
    name: "Ahmed Rahman",
    course: "Tajweed Mastery",
    teacher: "Sheikh Omar Hassan",
    startDate: "March 15, 2024",
    progress: 65,
    completedLessons: 13,
    totalLessons: 20,
    nextClass: "Tomorrow at 7:00 PM"
  };

  const recentLessons = [
    { date: "Dec 10, 2024", topic: "Makhraj of Letters", duration: "45 min", completed: true },
    { date: "Dec 8, 2024", topic: "Noon Sakinah Rules", duration: "40 min", completed: true },
    { date: "Dec 6, 2024", topic: "Meem Sakinah", duration: "50 min", completed: true },
    { date: "Dec 4, 2024", topic: "Qalqalah Rules", duration: "45 min", completed: true },
  ];

  const upcomingClasses = [
    { date: "Dec 15, 2024", time: "7:00 PM", topic: "Sifaat of Letters", teacher: "Sheikh Omar Hassan" },
    { date: "Dec 17, 2024", time: "7:00 PM", topic: "Advanced Tajweed", teacher: "Sheikh Omar Hassan" },
    { date: "Dec 19, 2024", time: "7:00 PM", topic: "Practice Session", teacher: "Sheikh Omar Hassan" },
  ];

  const achievements = [
    { title: "First Month Complete", icon: Star, earned: true },
    { title: "Perfect Attendance", icon: Calendar, earned: true },
    { title: "Makhraj Master", icon: BookOpen, earned: false },
    { title: "Tajweed Expert", icon: TrendingUp, earned: false },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo login - in real app this would authenticate with backend
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <BookOpen className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900">Student Login</h2>
              <p className="text-gray-600 mt-2">Access your learning dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <span className="text-emerald-600 font-medium cursor-pointer hover:underline">
                  Register here
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Demo: Use any email and password to login
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userData.name}!</h1>
              <p className="text-gray-600 mt-1">Continue your Quranic learning journey</p>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Course Progress</p>
                <p className="text-3xl font-bold text-emerald-600">{userData.progress}%</p>
              </div>
              <TrendingUp className="h-12 w-12 text-emerald-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Lessons Completed</p>
                <p className="text-3xl font-bold text-blue-600">{userData.completedLessons}/{userData.totalLessons}</p>
              </div>
              <BookOpen className="h-12 w-12 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Current Course</p>
                <p className="text-lg font-bold text-purple-600">{userData.course}</p>
              </div>
              <Star className="h-12 w-12 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Next Class</p>
                <p className="text-sm font-bold text-orange-600">{userData.nextClass}</p>
              </div>
              <Clock className="h-12 w-12 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Learning Progress</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Overall Progress</span>
                  <span className="text-emerald-600 font-semibold">{userData.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${userData.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-600">13</p>
                  <p className="text-sm text-gray-600">Lessons Completed</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">28</p>
                  <p className="text-sm text-gray-600">Hours Studied</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">95%</p>
                  <p className="text-sm text-gray-600">Attendance Rate</p>
                </div>
              </div>
            </div>

            {/* Recent Lessons */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Lessons</h3>
              <div className="space-y-4">
                {recentLessons.map((lesson, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-emerald-100 p-2 rounded-full mr-4">
                        <BookOpen className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{lesson.topic}</p>
                        <p className="text-sm text-gray-600">{lesson.date} • {lesson.duration}</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Completed
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Upcoming Classes */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Upcoming Classes</h3>
              <div className="space-y-4">
                {upcomingClasses.map((classItem, index) => (
                  <div key={index} className="border-l-4 border-emerald-500 pl-4 py-2">
                    <p className="font-semibold text-gray-900">{classItem.topic}</p>
                    <p className="text-sm text-gray-600">{classItem.date} at {classItem.time}</p>
                    <p className="text-sm text-emerald-600">{classItem.teacher}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200">
                View Full Schedule
              </button>
            </div>

            {/* Achievements */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center p-3 rounded-lg ${achievement.earned ? 'bg-emerald-50' : 'bg-gray-50'}`}>
                    <achievement.icon className={`h-6 w-6 mr-3 ${achievement.earned ? 'text-emerald-600' : 'text-gray-400'}`} />
                    <span className={`font-medium ${achievement.earned ? 'text-emerald-800' : 'text-gray-600'}`}>
                      {achievement.title}
                    </span>
                    {achievement.earned && (
                      <Star className="h-4 w-4 text-yellow-500 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors duration-200 flex items-center">
                  <Calendar className="h-5 w-5 text-emerald-600 mr-3" />
                  <span className="text-emerald-800">Reschedule Class</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200 flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-blue-800">Download Materials</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200 flex items-center">
                  <User className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-purple-800">Contact Teacher</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center">
                  <Settings className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-800">Account Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
