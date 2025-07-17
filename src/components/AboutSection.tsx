import React, { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  Award,
  Clock,
  Globe,
  Heart,
  Star,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const stats = [
    {
      icon: Users,
      number: 400,
      label: "Students Worldwide",
      color: "text-blue-600",
    },
    {
      icon: Award,
      number: 30,
      label: "Qualified Teachers",
      color: "text-emerald-600",
    },
    {
      icon: Clock,
      number: 9,
      label: "Years of Experience",
      color: "text-purple-600",
    },
    {
      icon: Globe,
      number: 25,
      label: "Countries Reached",
      color: "text-orange-600",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Teaching",
      description:
        "Our dedicated teachers are passionate about sharing the beauty and wisdom of the Quran",
    },
    {
      icon: Star,
      title: "Quality Education",
      description:
        "We maintain the highest standards in Islamic education with certified instructors",
    },
    {
      icon: Target,
      title: "Student Success",
      description:
        "Every student's success is our priority, with personalized learning approaches",
    },
    {
      icon: Globe,
      title: "Global Community",
      description:
        "Building a worldwide community of Quran learners and Islamic knowledge seekers",
    },
  ];

  const StatCard = ({ icon: Icon, number, label, color }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = number;
      const duration = 9000;
      const stepTime = Math.max(Math.floor(duration / end), 10);

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, stepTime);

      return () => clearInterval(timer);
    }, [number]);

    return (
      <motion.div
        className="text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-2">{count}+</div>
        <div className="text-gray-600 font-medium">{label}</div>
      </motion.div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side - Image */}
          <div className="relative">
            <img
              src="/assets/socialMediaIcons/pexels-haqway-15105872.jpg"
              alt="Quran Learning"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-blue-600 bg-opacity-20 rounded-2xl"></div>

            {/* Floating Achievement Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 border-4 border-blue-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">9+</div>
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
              About <span className="text-blue-600">Sirat al-Mustaqim</span>
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Sirat al-Mustaqim Quran Academy is dedicated to providing exceptional Quranic education to students worldwide. Our mission is to make the Holy Quran accessible to everyone, regardless of their location, age, or background.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              With over 15 years of experience in Islamic education, we have successfully guided thousands of students from different countries on their spiritual journey. Our team of qualified teachers combines traditional Islamic teaching methods with modern educational technology to create an engaging and effective learning experience.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that learning the Quran is not just about recitation, but about understanding, implementing, and living by its teachings. Our comprehensive programs are designed to nurture both the mind and soul, helping students develop a deep connection with Allah's word.
            </p>

            {/* Mission Statement */}
            <motion.div
              className="relative bg-blue-50 border-l-4 border-blue-600 p-8 rounded-r-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-6 -left-6 text-blue-100 text-9xl font-serif select-none pointer-events-none leading-none">
                “
              </div>
              <div className="absolute top-4 right-4 opacity-10">
                <BookOpen className="w-20 h-20 text-blue-300" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">
                  Our Mission
                </h3>
                <p className="text-lg text-gray-700 italic leading-relaxed max-w-3xl">
                  "To spread the light of Quranic knowledge across the globe, making quality Islamic education accessible to every Muslim seeking to strengthen their faith and understanding."
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              number={stat.number}
              label={stat.label}
              color={stat.color}
            />
          ))}
        </div>

        {/* Our Values */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 lg:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core <span className="text-blue-600">Values</span></h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our teaching methodology and student relationships
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                  <value.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Why Students Choose <span className="text-blue-600">Sirat al-Mustaqim</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-gray-900 mb-3">Experienced Faculty</h4>
              <p className="text-gray-700">Learn from qualified scholars and certified teachers with decades of combined experience in Islamic education.</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-gray-900 mb-3">Flexible Learning</h4>
              <p className="text-gray-700">Study at your own pace with flexible scheduling options that accommodate students from all time zones.</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-gray-900 mb-3">Proven Results</h4>
              <p className="text-gray-700">Join thousands of successful students who have achieved their Quranic learning goals through our programs.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
