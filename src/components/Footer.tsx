'use client';

import React from 'react';
import { Phone, Mail, MapPin, Send, BookOpen } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

const Footer = () => {
  const [state, handleSubmit] = useForm("mdkzzvkl");

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
  ];

  const courses = [
    'Quran Recitation',
    'Tajweed Classes',
    'Hifz Program',
    'Islamic Studies',
    'Arabic Language'
  ];

  return (
    <>
      {/* Contact Form Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-18">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get in Touch with Us
            </h2>
            <p className="text-xl text-blue-100">
              Ready to start your Quranic journey? Contact us today!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            {state.succeeded ? (
              <div className="text-center text-white py-12">
                <h3 className="text-2xl font-semibold mb-4">Thank you!</h3>
                <p>We’ve received your message and will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full p-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      className="w-full p-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
                      placeholder="Enter your email"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full p-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full p-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
                      placeholder="Tell us how we can help you..."
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center mx-auto group"
                  >
                    <Send className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                    {state.submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Academy Info */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="">
                  {/* <BookOpen className="h-6 w-6 text-white" /> */}
                  <img src="/assets/Logo/2.svg" alt="Logo" className="h-14 w-14 rounded-full" />
                </div>
                <div>
                  <div className="font-bold text-lg text-white">Sirat al-Mustaqim</div>
                  <div className="text-sm text-blue-300">الصراط المستقيم</div>
                </div>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                Dedicated to providing quality Quranic education and Islamic studies through modern teaching methods and experienced instructors.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-blue-300">Quick Links</h3>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.path}
                    className="block text-blue-200 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Course Catalog */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-blue-300">Our Courses</h3>
              <div className="space-y-3">
                {courses.map((course, index) => (
                  <div
                    key={index}
                    className="text-blue-200 hover:text-white transition-colors duration-300 text-sm cursor-pointer"
                  >
                    {course}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-blue-300">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-4 w-4 text-blue-300 mt-1 flex-shrink-0" />
                  <div className="text-sm text-blue-200">
                    <div>+92 315 3465995</div>
                    <div>+92 332 9959017</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-blue-300 flex-shrink-0" />
                  <a href="mailto:alsiratalmustaqim0@gmail.com" className="text-sm text-blue-200 hover:text-white transition-colors duration-300">
                    alsiratalmustaqim0@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-blue-300 flex-shrink-0" />
                  <span className="text-sm text-blue-200">Online Academy</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3 text-blue-300">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href='https://www.facebook.com/profile.php?id=61577423111420' className="text-blue-200 hover:text-white transition-colors duration-300">
                    <span className="text-lg"><img src="/assets/socialMediaIcons/fb.svg" alt="FB" /></span>
                  </a>
                  <a href='https://www.instagram.com/alsiratalmustaqim0/' className="text-blue-200 hover:text-white transition-colors duration-300">
                    <span className="text-lg"><img src="/assets/socialMediaIcons/insta.svg" alt="" /></span>
                  </a>
                  <a href='https://www.tiktok.com/@alsiratalmustaqim0' className="text-blue-200 hover:text-white transition-colors duration-300">
                    <span className="text-lg"><img src="/assets/socialMediaIcons/tiktok.svg" alt="" /></span>
                  </a>
                  <a href='https://www.youtube.com/@Al-Siratal-Mustaqim-o6k9y' className="text-blue-200 hover:text-white transition-colors duration-300">
                    <span className="text-lg"><img src="/assets/socialMediaIcons/youtue.svg" alt="" /></span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-blue-800 pt-8 text-center">
            <p className="text-blue-300 text-sm">
              © 2024 Sirat al-Mustaqim Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
