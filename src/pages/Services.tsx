import React from "react";
import { BookOpen, Users, Clock, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Services = () => {
  const courses = [
    {
      title: "Quran Recitation (Tilawah)",
      description:
        "Learn proper pronunciation and beautiful recitation of the Holy Quran",
      duration: "6-12 months",
      level: "Beginner to Advanced",
      price: "$40/month",
      features: [
        "Proper Arabic pronunciation",
        "Beautiful recitation techniques",
        "Basic Tajweed rules",
        "Practice with certified teachers",
        "Progressive difficulty levels",
      ],
      icon: BookOpen,
      popular: false,
    },
    {
      title: "Tajweed Mastery",
      description:
        "Master the art of Quranic recitation with detailed Tajweed rules",
      duration: "8-15 months",
      level: "Intermediate to Advanced",
      price: "$50/month",
      features: [
        "Complete Tajweed rules",
        "Makhraj (pronunciation points)",
        "Sifaat (characteristics of letters)",
        "Advanced recitation techniques",
        "Certification upon completion",
      ],
      icon: Star,
      popular: true,
    },
    {
      title: "Quran Memorization (Hifz)",
      description:
        "Comprehensive program for memorizing the complete Holy Quran",
      duration: "2-4 years",
      level: "All levels",
      price: "$60/month",
      features: [
        "Systematic memorization plan",
        "Regular revision schedules",
        "Memory techniques and tips",
        "Progress tracking",
        "Ijazah certification available",
      ],
      icon: Users,
      popular: false,
    },
    {
      title: "Kids Quran Program",
      description:
        "Fun and engaging Quran classes specially designed for children",
      duration: "Ongoing",
      level: "Ages 4-15",
      price: "$35/month",
      features: [
        "Interactive learning games",
        "Colorful digital materials",
        "Age-appropriate teaching methods",
        "Flexible scheduling",
        "Parent progress reports",
      ],
      icon: Clock,
      popular: false,
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
        "Islamic terminology",
      ],
      icon: BookOpen,
      popular: false,
    },
    {
      title: "Advanced Islamic Studies",
      description:
        "Deep study of Islamic sciences including Tafseer and Hadith",
      duration: "12+ months",
      level: "Advanced",
      price: "$70/month",
      features: [
        "Quranic Tafseer (interpretation)",
        "Hadith studies",
        "Islamic jurisprudence basics",
        "Islamic history",
        "Research methodology",
      ],
      icon: Star,
      popular: false,
    },
  ];

  const additionalServices = [
    {
      title: "Free Trial Class",
      description:
        "Experience our teaching methodology with a complimentary 30-minute session",
    },
    {
      title: "Flexible Scheduling",
      description:
        "Choose from available time slots that work with your schedule",
    },
    {
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed progress reports",
    },
    {
      title: "Makeup Classes",
      description: "Reschedule missed classes at no additional cost",
    },
    {
      title: "Family Packages",
      description: "Special discounts for families with multiple students",
    },
    {
      title: "Certificate Programs",
      description: "Earn certificates and Ijazah upon course completion",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-emerald-50 to-teal-50 bg-cover bg-center bg-no-repeat min-h-[60vh] flex items-center"
        style={{
          backgroundImage: `url('/assets/socialMediaIcons/our-services.jpg')`,
        }}
      >
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-0"></div>

        {/* <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
      Our <span className="text-blue-600">Courses</span>
    </h1>
    <p className="text-xl md:text-2xl text-yellow-600 max-w-4xl mx-auto leading-relaxed">
      Comprehensive Quranic education programs tailored to your learning
      needs and goals
    </p>
  </div> */}
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Our <span className="text-blue-600">Expert Services</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a wide range of personalized Quranic and Islamic
              educational services designed to meet the needs of learners of all
              ages and backgrounds. Begin your spiritual journey with the
              guidance of certified and dedicated instructors.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative bg-white/70 backdrop-blur-xl border p-8 rounded-3xl overflow-visible transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] ${
                  course.popular
                    ? "border-blue-500 ring-1 ring-blue-300"
                    : "border-gray-200 hover:border-emerald-300"
                }`}
              >
                {/* Gradient hover glow */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-tr from-emerald-400 to-blue-500 pointer-events-none rounded-3xl"></div>

                {/* Popular Badge */}
                {course.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <span className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg ring-2 ring-white">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}

                {/* Icon + Title */}
                <div className="text-center relative z-10 mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 ${
                      course.popular
                        ? "bg-blue-100 group-hover:bg-blue-200"
                        : "bg-gray-100 group-hover:bg-emerald-100"
                    }`}
                  >
                    <course.icon
                      className={`h-8 w-8 transition-colors duration-300 ${
                        course.popular
                          ? "text-blue-600 group-hover:text-blue-700"
                          : "text-gray-600 group-hover:text-emerald-600"
                      }`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-center items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>⏱ {course.duration}</span>
                    <span>📚 {course.level}</span>
                  </div>
                  <div className="text-3xl font-bold text-emerald-600 mb-6">
                    {course.price}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8 relative z-10">
                  {course.features.map(
                    (feature: string, featureIndex: number) => (
                      <div key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    )
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  to="/schedule"
                  className={`block w-full text-center py-3 rounded-lg font-semibold relative z-10 transition-all duration-300 ${
                    course.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white"
                  }`}
                >
                  Start Learning
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Additional <span className="text-blue-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Extra benefits and personalized offerings to enhance your Quranic
              learning experience.
            </p>
          </motion.div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-500 border border-transparent"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn in 3 Easy Steps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Start To Learn Quran  <span className="text-blue-600">In 3 Easy Steps</span>
          </h3>
          <p className="text-lg text-gray-600 mb-12">
            You can join our Online Quran Academy by following just
            <span className="font-semibold text-emerald-600">
              {" "}
              03 easy steps
            </span>
            , just follow these steps to get things on the way.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <img
                src="/assets/Logo/contacts-services.png"
                alt="Step 1"
                className="w-20 h-20 mb-4"
              />
              <p className="text-lg text-gray-700">
                <span className="text-blue-600 font-bold">01 </span>
                Fill <strong>Contact form</strong>, <strong>Call us</strong> or
                text us via <strong>WhatsApp</strong>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <img
                src="/assets/Logo/calender-services.png"
                alt="Step 2"
                className="w-20 h-20 mb-4"
              />
              <p className="text-lg text-gray-700">
                <span className="text-blue-600 font-bold">02 </span>
                Get free trial classes at your desired time.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <img
                src="/assets/Logo/learning-quran.png"
                alt="Step 3"
                className="w-20 h-20 mb-4"
              />
              <p className="text-lg text-gray-700">
                <span className="text-blue-600 font-bold">03 </span>
                Sign Up if you like & start learning Quran.
              </p>
            </div>
          </div>

          <Link
            to="/schedule"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-all duration-200"
          >
            Book Free Trial Now
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Join thousands of students who have transformed their relationship
            with the Quran
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
