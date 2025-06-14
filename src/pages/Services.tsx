
import React from 'react';
import { BookOpen, Users, Clock, Star, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const courses = [
    {
      title: "Quran Recitation (Tilawah)",
      description: "Learn proper pronunciation and beautiful recitation of the Holy Quran",
      duration: "6-12 months",
      level: "Beginner to Advanced",
      price: "$40/month",
      features: [
        "Proper Arabic pronunciation",
        "Beautiful recitation techniques",
        "Basic Tajweed rules",
        "Practice with certified teachers",
        "Progressive difficulty levels"
      ],
      icon: BookOpen,
      popular: false
    },
    {
      title: "Tajweed Mastery",
      description: "Master the art of Quranic recitation with detailed Tajweed rules",
      duration: "8-15 months",
      level: "Intermediate to Advanced",
      price: "$50/month",
      features: [
        "Complete Tajweed rules",
        "Makhraj (pronunciation points)",
        "Sifaat (characteristics of letters)",
        "Advanced recitation techniques",
        "Certification upon completion"
      ],
      icon: Star,
      popular: true
    },
    {
      title: "Quran Memorization (Hifz)",
      description: "Comprehensive program for memorizing the complete Holy Quran",
      duration: "2-4 years",
      level: "All levels",
      price: "$60/month",
      features: [
        "Systematic memorization plan",
        "Regular revision schedules",
        "Memory techniques and tips",
        "Progress tracking",
        "Ijazah certification available"
      ],
      icon: Users,
      popular: false
    },
    {
      title: "Kids Quran Program",
      description: "Fun and engaging Quran classes specially designed for children",
      duration: "Ongoing",
      level: "Ages 4-15",
      price: "$35/month",
      features: [
        "Interactive learning games",
        "Colorful digital materials",
        "Age-appropriate teaching methods",
        "Flexible scheduling",
        "Parent progress reports"
      ],
      icon: Clock,
      popular: false
    },
    {
      title: "Arabic Language Basics",
      description: "Learn Quranic Arabic to understand the meaning of verses",
      duration: "4-8 months",
      level: "Beginner to Intermediate",
      price: "$45/month",
      features: [
        "Quranic vocabulary",
        "Basic grammar rules",
        "Word-by-word translation",
        "Reading comprehension",
        "Islamic terminology"
      ],
      icon: BookOpen,
      popular: false
    },
    {
      title: "Advanced Islamic Studies",
      description: "Deep study of Islamic sciences including Tafseer and Hadith",
      duration: "12+ months",
      level: "Advanced",
      price: "$70/month",
      features: [
        "Quranic Tafseer (interpretation)",
        "Hadith studies",
        "Islamic jurisprudence basics",
        "Islamic history",
        "Research methodology"
      ],
      icon: Star,
      popular: false
    }
  ];

  const additionalServices = [
    {
      title: "Free Trial Class",
      description: "Experience our teaching methodology with a complimentary 30-minute session"
    },
    {
      title: "Flexible Scheduling",
      description: "Choose from available time slots that work with your schedule"
    },
    {
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed progress reports"
    },
    {
      title: "Makeup Classes",
      description: "Reschedule missed classes at no additional cost"
    },
    {
      title: "Family Packages",
      description: "Special discounts for families with multiple students"
    },
    {
      title: "Certificate Programs",
      description: "Earn certificates and Ijazah upon course completion"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-emerald-600">Courses</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive Quranic education programs tailored to your learning needs and goals
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From basic recitation to advanced Islamic studies, we have courses for every level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className={`relative bg-white rounded-xl border-2 p-8 transition-all duration-200 hover:shadow-xl ${course.popular ? 'border-emerald-500 shadow-lg' : 'border-gray-200 hover:border-emerald-300'}`}>
                {course.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${course.popular ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                    <course.icon className={`h-8 w-8 ${course.popular ? 'text-emerald-600' : 'text-gray-600'}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-center items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>⏱ {course.duration}</span>
                    <span>📚 {course.level}</span>
                  </div>
                  <div className="text-3xl font-bold text-emerald-600 mb-6">{course.price}</div>
                </div>

                <div className="space-y-3 mb-8">
                  {course.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/schedule"
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-200 ${
                    course.popular 
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                      : 'bg-gray-100 text-gray-800 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                >
                  Start Learning
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Extra benefits and services to enhance your learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Join thousands of students who have transformed their relationship with the Quran
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/schedule"
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            >
              Schedule Free Trial
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-200 transform hover:scale-105"
            >
              Ask Questions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
