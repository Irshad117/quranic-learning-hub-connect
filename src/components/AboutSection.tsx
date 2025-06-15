
import React from 'react';
import { Users, BookOpen, Award, Clock } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="Quran Learning"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-blue-600 bg-opacity-20 rounded-2xl"></div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Al-Sirat al-Mustaqim</span>
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Al-Sirat al-Mustaqim Quran Academy is dedicated to providing exceptional Quranic education 
              to students worldwide. Our mission is to make the Holy Quran accessible to everyone, 
              regardless of their location or background.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              With over 15 years of experience, we have successfully taught thousands of students 
              from different countries. Our qualified teachers use modern teaching methods combined 
              with traditional Islamic education principles.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800">5000+</h3>
                <p className="text-gray-600">Students Worldwide</p>
              </div>
              
              <div className="text-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800">50+</h3>
                <p className="text-gray-600">Qualified Teachers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
