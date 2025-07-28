import React from "react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import WhyChooseSection from "../components/WhyChooseSection";
import BlogSection from "../components/BlogSection";
import {
  Star,
  MessageCircle,
  Users,
  Award,
  Clock,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const stats = [
    { number: "400+", label: "Students Taught", icon: Users },
    { number: "30+", label: "Expert Teachers", icon: Award },
    { number: "24/7", label: "Support Available", icon: Clock },
    { number: "9+", label: "Years Experience", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen w-full">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseSection />

      {/* Quiz Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Test Your Islamic <span className="text-blue-600">Knowledge</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Take a fun and interactive quiz on Quran Reading, Tajweed, Noorani
            Qaida, and more. Great for all ages!
          </p>

          {/* Single Quiz Card */}
          <div className="flex justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <BookOpen className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Islamic Quiz
              </h3>
              <p className="text-gray-600 mb-6">
                40 questions · 2 minutes · Instant feedback
              </p>
              <Link
                to="/quiz"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Start Quiz
              </Link>
            </div>
          </div>

          {/* CTA Below */}
          <div className="mt-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Want to Learn More?
            </h3>
            <p className="text-gray-600 mb-6 text-xl">
              Book a free trial class and begin your Quran learning journey with
              expert teachers.
            </p>
            <Link
              to="/schedule"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-200 transform hover:scale-105 mt-2"
            >
              Book Free Trial Now
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white overflow-hidden group cursor-pointer">
        <div className="whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] flex items-center gap-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center min-w-[200px]"
            >
              <stat.icon className="h-12 w-12 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
          {/* Repeat the icons for continuous loop */}
          {stats.map((stat, index) => (
            <div
              key={`loop-${index}`}
              className="flex flex-col items-center justify-center min-w-[200px]"
            >
              <stat.icon className="h-12 w-12 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* <BlogSection /> */}

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Your Quran Learning Journey Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of students who have transformed their lives through
            Quran education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/schedule"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            >
              Book Free Trial Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
