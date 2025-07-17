import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden font-[Poppins]">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src="/assets/socialMediaIcons/8165916-uhd_3840_2160_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-transparent bg-opacity-70 z-10" />

      {/* Main Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Learn Quran with Us
        </motion.h1>

        <motion.p
          className="text-lg sm:text-2xl mb-10 max-w-2xl mx-auto text-white/90"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Sirat al-Mustaqim Quran Academy is one of the internationally leading Quran teaching institutes for kids and adults.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Link
            to="/schedule"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg rounded-lg font-semibold text-white shadow-xl transition-all transform hover:scale-105"
          >
            Get Admission
          </Link>
          <Link
            to="/contact"
            className="bg-white text-blue-700 border-2 border-white hover:bg-blue-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-xl transition-all transform hover:scale-105"
          >
            Contact
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
