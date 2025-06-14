
import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Auto-slide every 4 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-gray-50">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${currentIndex}-${index}`}
                className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate-fade-in"
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

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
