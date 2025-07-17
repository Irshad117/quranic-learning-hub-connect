import React, { useEffect } from 'react';
import {
  BookOpen,
  Star,
  Users,
  Clock,
  Award,
  MessageCircle,
  FileText,
  Heart,
  Bookmark,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServicesSection = () => {
  const services = [
    {
      title: 'Online Noorani Qaida Course',
      description:
        'Learn the basics of Arabic reading with our comprehensive Noorani Qaida course',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Online Quran Reading Course',
      description:
        'Perfect your Quran recitation with proper pronunciation and fluency',
      icon: Star,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Online Tajweed Course',
      description:
        'Master the art of beautiful Quran recitation with detailed Tajweed rules',
      icon: Award,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Online Quran Memorization Course',
      description:
        'Systematic Hifz program for memorizing the complete Holy Quran',
      icon: Users,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: 'Online Tafsir Course',
      description:
        'Understand the deep meanings and interpretations of Quranic verses',
      icon: FileText,
      color: 'bg-red-100 text-red-600',
    },
    {
      title: 'Online Ijazah Course',
      description:
        'Earn certification in Quran recitation and memorization',
      icon: MessageCircle,
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      title: 'Online Salah Practices',
      description:
        'Learn the correct way to perform daily prayers according to Sunnah',
      icon: Clock,
      color: 'bg-teal-100 text-teal-600',
    },
    {
      title: 'Online Dua Courses',
      description: 'Learn essential Islamic supplications for daily life',
      icon: Heart,
      color: 'bg-pink-100 text-pink-600',
    },
    {
      title: 'Online Hadith Courses',
      description:
        'Study the sayings and traditions of Prophet Muhammad (PBUH)',
      icon: Bookmark,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive Islamic education programs designed to strengthen your
            faith and knowledge
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${service.color} group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="h-8 w-8" />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            to="/services"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
