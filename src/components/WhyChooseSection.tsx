
import React from 'react';
import { Globe, Clock, Users, Award, BookOpen, Languages } from 'lucide-react';

const WhyChooseSection = () => {
  const features = [
    {
      title: "Global Recognition",
      description: "Internationally recognized Quran teaching institute with students worldwide",
      icon: Globe,
      color: "bg-blue-500"
    },
    {
      title: "24/7 Quran Classes",
      description: "Round the clock availability to accommodate students from different time zones",
      icon: Clock,
      color: "bg-green-500"
    },
    {
      title: "24/7 Learning",
      description: "Access to learning materials and support available anytime, anywhere",
      icon: BookOpen,
      color: "bg-purple-500"
    },
    {
      title: "One-on-One Lessons",
      description: "Personalized attention with dedicated teachers for accelerated learning",
      icon: Users,
      color: "bg-yellow-500"
    },
    {
      title: "Trial Classes",
      description: "Free trial sessions to experience our teaching methodology before enrollment",
      icon: Award,
      color: "bg-red-500"
    },
    {
      title: "Multilingual Teachers",
      description: "Qualified instructors who speak multiple languages for better communication",
      icon: Languages,
      color: "bg-indigo-500"
    },
    {
      title: "Completion Certificate",
      description: "Official certificates and Ijazah upon successful course completion",
      icon: Award,
      color: "bg-teal-500"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-blue-600">Sirat al-Mustaqim</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes us the preferred choice for Quranic education worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1"
            >
              <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Animated border on hover */}
              <div className="mt-6 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
