import React from 'react';
import { Star, Quote, MapPin, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Ahmad Ali',
      location: 'New York, USA',
      course: 'Hifz Program',
      rating: 5,
      comment: 'The teachers at Sirat al-Mustaqim are incredibly knowledgeable and patient. My son has made tremendous progress in his Hifz journey.',
      image: '👨‍🎓',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      name: 'Fatima Khan',
      location: 'Sydney, Australia',
      course: 'Quran Recitation',
      rating: 5,
      comment: 'Excellent teaching methodology! The online classes are well-structured and the teachers provide individual attention to each student.',
      image: '👩‍🎓',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Muhammad Hassan',
      location: 'Mumbai, India',
      course: 'Tajweed Course',
      rating: 5,
      comment: 'I highly recommend this academy. The flexible timings and quality of education is outstanding. My Arabic pronunciation has improved significantly.',
      image: '👨‍💼',
      gradient: 'from-green-500 to-blue-500'
    },
    {
      name: 'Aisha Malik',
      location: 'Ontario, Canada',
      course: 'Islamic Studies',
      rating: 5,
      comment: 'The comprehensive curriculum and dedicated teachers make learning enjoyable. My children look forward to their daily classes.',
      image: '👩‍🏫',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      name: 'Omar Sheikh',
      location: 'Islamabad, Pakistan', 
      course: 'Arabic Language',
      rating: 5,
      comment: 'Professional service with excellent results. The academy has helped me understand the Quran better through proper Arabic learning.',
      image: '👨‍🔬',
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      name: 'Khadija Rahman',
      location: 'London, UK',
      course: 'Noorani Qaida',
      rating: 5,
      comment: 'My daughter started from scratch and now she can read Quran fluently. The step-by-step approach is perfect for beginners.',
      image: '👩‍💻',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200/30 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-6">
            <Star className="h-5 w-5 fill-current" />
            <span className="font-medium">Student Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-green-600 bg-clip-text text-transparent mb-6">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from our satisfied students and parents about their transformative learning experience
          </p>
        </motion.div>

        {/* First row - scrolling left to right */}
        <div className="relative mb-8 overflow-hidden">
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
          >
            {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map((testimonial, index) => (
              <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>

        {/* Second row - scrolling right to left */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 35 }}
          >
            {[...testimonials.slice(3), ...testimonials.slice(3)].map((testimonial, index) => (
              <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: any }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotateY: 5 }}
    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 min-w-[380px] max-w-sm transition-all duration-500 transform-gpu"
    style={{ 
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)',
      backdropFilter: 'blur(10px)'
    }}
  >
    {/* Gradient border effect */}
    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`}></div>
    <div className="absolute inset-[2px] bg-white rounded-2xl -z-10"></div>
    
    {/* Profile section */}
    <div className="flex items-center mb-6">
      <div className={`text-5xl mr-4 p-3 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center`}>
        <span className="filter drop-shadow-lg">{testimonial.image}</span>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
          <MapPin className="h-4 w-4" />
          {testimonial.location}
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-blue-600">
          <BookOpen className="h-4 w-4" />
          {testimonial.course}
        </div>
      </div>
    </div>

    {/* Rating */}
    <div className="flex items-center mb-6">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current mr-1" />
      ))}
      <span className="ml-2 text-sm text-gray-500 font-medium">({testimonial.rating}.0)</span>
    </div>

    {/* Quote */}
    <div className="relative">
      <Quote className="h-8 w-8 text-blue-200 absolute -top-2 -left-2 transform rotate-180" />
      <blockquote className="text-gray-700 italic pl-6 leading-relaxed font-medium">
        "{testimonial.comment}"
      </blockquote>
      <Quote className="h-6 w-6 text-blue-200 float-right mt-2" />
    </div>

    {/* Verified badge */}
    <div className="absolute top-4 right-4 bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
      ✓ Verified
    </div>
  </motion.div>
);

export default Testimonials;