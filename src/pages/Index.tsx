
import React from 'react';
import HeroSection from '../components/HeroSection';
import { Star, MessageCircle, Users, Award, Clock, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const testimonials = [
    {
      name: "Aisha Rahman",
      rating: 5,
      comment: "The teachers are incredibly patient and knowledgeable. My Tajweed has improved significantly!",
      course: "Tajweed Mastery"
    },
    {
      name: "Omar Abdullah",
      rating: 5,
      comment: "Flexible scheduling made it possible for me to learn while managing my work. Highly recommended!",
      course: "Quran Memorization"
    },
    {
      name: "Fatima Al-Zahra",
      rating: 5,
      comment: "My children love their classes. The interactive approach keeps them engaged and excited to learn.",
      course: "Kids Quran Program"
    }
  ];

  const stats = [
    { number: "5000+", label: "Students Taught", icon: Users },
    { number: "50+", label: "Expert Teachers", icon: Award },
    { number: "24/7", label: "Support Available", icon: Clock },
    { number: "15+", label: "Years Experience", icon: BookOpen }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Noor Academy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the most comprehensive and flexible Quran learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">One-on-One Classes</h3>
              <p className="text-gray-600">Personalized attention with dedicated teachers for faster progress</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Flexible Timing</h3>
              <p className="text-gray-600">Schedule classes at your convenience, available 24/7</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Certified Teachers</h3>
              <p className="text-gray-600">Learn from qualified instructors with Ijazah certificates</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Complete Curriculum</h3>
              <p className="text-gray-600">From basics to advanced levels including Tajweed and memorization</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Interactive Learning</h3>
              <p className="text-gray-600">Engaging lessons with multimedia tools and progress tracking</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Trial Class</h3>
              <p className="text-gray-600">Free trial lesson to experience our teaching methodology</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">Hear from our satisfied students and parents</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-emerald-600">{testimonial.course}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Your Quran Learning Journey Today
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Join thousands of students who have transformed their lives through Quran education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/schedule"
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            >
              Book Free Trial Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-200 transform hover:scale-105"
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
