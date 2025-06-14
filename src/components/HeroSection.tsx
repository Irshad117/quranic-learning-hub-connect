
import React from 'react';
import { BookOpen, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16 lg:py-24">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23059669" fill-opacity="0.03"%3E%3Cpath d="M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Learn the Holy <span className="text-emerald-600">Quran</span>
            <br />
            <span className="text-3xl md:text-5xl text-gray-700">With Expert Teachers</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Join thousands of students learning Quran recitation, Tajweed, and memorization 
            with qualified teachers from around the world. Start your spiritual journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
            <Link
              to="/schedule"
              className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Schedule Free Trial
            </Link>
            <Link
              to="/services"
              className="bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              View Courses
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <Users className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Teachers</h3>
              <p className="text-gray-600">Certified instructors with years of teaching experience</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <Clock className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Flexible Schedule</h3>
              <p className="text-gray-600">Learn at your own pace with flexible timing options</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <BookOpen className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Comprehensive Curriculum</h3>
              <p className="text-gray-600">From basic recitation to advanced Tajweed and memorization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
