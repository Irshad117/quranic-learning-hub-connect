
import React from 'react';
import { Users, BookOpen, Award, Clock, Globe, Heart, Star, Target } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { icon: Users, number: "5000+", label: "Students Worldwide", color: "text-blue-600" },
    { icon: Award, number: "50+", label: "Qualified Teachers", color: "text-emerald-600" },
    { icon: Clock, number: "15+", label: "Years of Experience", color: "text-purple-600" },
    { icon: Globe, number: "40+", label: "Countries Reached", color: "text-orange-600" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Teaching",
      description: "Our dedicated teachers are passionate about sharing the beauty and wisdom of the Quran"
    },
    {
      icon: Star,
      title: "Quality Education",
      description: "We maintain the highest standards in Islamic education with certified instructors"
    },
    {
      icon: Target,
      title: "Student Success",
      description: "Every student's success is our priority, with personalized learning approaches"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Building a worldwide community of Quran learners and Islamic knowledge seekers"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side - Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="Quran Learning"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-blue-600 bg-opacity-20 rounded-2xl"></div>
            
            {/* Floating Achievement Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 border-4 border-blue-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600 font-medium">Years Serving</div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              About Our Academy
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Al-Sirat al-Mustaqim</span>
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Al-Sirat al-Mustaqim Quran Academy is dedicated to providing exceptional Quranic education 
              to students worldwide. Our mission is to make the Holy Quran accessible to everyone, 
              regardless of their location, age, or background.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              With over 15 years of experience in Islamic education, we have successfully guided thousands 
              of students from different countries on their spiritual journey. Our team of qualified teachers 
              combines traditional Islamic teaching methods with modern educational technology to create 
              an engaging and effective learning experience.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that learning the Quran is not just about recitation, but about understanding, 
              implementing, and living by its teachings. Our comprehensive programs are designed to nurture 
              both the mind and soul, helping students develop a deep connection with Allah's word.
            </p>

            {/* Mission Statement */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-700 italic">
                "To spread the light of Quranic knowledge across the globe, making quality Islamic education 
                accessible to every Muslim seeking to strengthen their faith and understanding."
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Values */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our teaching methodology and student relationships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                  <value.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Why Students Choose Al-Sirat al-Mustaqim
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Experienced Faculty</h4>
              <p className="text-gray-700">Learn from qualified scholars and certified teachers with decades of combined experience in Islamic education.</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Flexible Learning</h4>
              <p className="text-gray-700">Study at your own pace with flexible scheduling options that accommodate students from all time zones.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Proven Results</h4>
              <p className="text-gray-700">Join thousands of successful students who have achieved their Quranic learning goals through our programs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
