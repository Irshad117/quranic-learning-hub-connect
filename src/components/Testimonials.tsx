import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Ahmad Ali',
      location: 'Karachi, Pakistan',
      course: 'Hifz Program',
      rating: 5,
      comment: 'The teachers at Al-Sirat al-Mustaqim are incredibly knowledgeable and patient. My son has made tremendous progress in his Hifz journey.',
      image: '👨‍🎓'
    },
    {
      name: 'Fatima Khan',
      location: 'Lahore, Pakistan',
      course: 'Tajweed Classes',
      rating: 5,
      comment: 'Excellent teaching methodology! The online classes are well-structured and the teachers provide individual attention to each student.',
      image: '👩‍🎓'
    },
    {
      name: 'Muhammad Hassan',
      location: 'Islamabad, Pakistan',
      course: 'Quran Recitation',
      rating: 5,
      comment: 'I highly recommend this academy. The flexible timings and quality of education is outstanding. My Arabic pronunciation has improved significantly.',
      image: '👨‍💼'
    },
    {
      name: 'Aisha Malik',
      location: 'Faisalabad, Pakistan',
      course: 'Islamic Studies',
      rating: 5,
      comment: 'The comprehensive curriculum and dedicated teachers make learning enjoyable. My children look forward to their daily classes.',
      image: '👩‍🏫'
    },
    {
      name: 'Omar Sheikh',
      location: 'Rawalpindi, Pakistan',
      course: 'Arabic Language',
      rating: 5,
      comment: 'Professional service with excellent results. The academy has helped me understand the Quran better through proper Arabic learning.',
      image: '👨‍🔬'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say About Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our satisfied students and parents about their learning experience
          </p>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex w-max gap-6 group"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
          >
            <div className="flex group-hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={`${testimonial.name}-${index}`}
                  className="bg-white rounded-xl shadow-lg p-6 min-w-[300px] max-w-xs mx-2 transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{testimonial.image}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                      <p className="text-sm text-blue-600 font-medium">{testimonial.course}</p>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <div className="relative">
                    <Quote className="h-8 w-8 text-blue-200 absolute -top-2 -left-2" />
                    <p className="text-gray-700 italic pl-6 leading-relaxed">
                      "{testimonial.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
