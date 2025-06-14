
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, BookOpen } from 'lucide-react';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Email functionality will be implemented with a backend service
    const emailData = {
      to: 'irshadm791@gmail.com',
      subject: 'New Contact Form Submission',
      body: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`
    };
    
    // For now, we'll use mailto as a fallback
    const mailtoLink = `mailto:irshadm791@gmail.com?subject=Contact Form Submission&body=Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

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
      <section className="bg-gradient-to-r from-blue-50 to-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch with Us
            </h2>
            <p className="text-xl text-gray-600">
              Ready to start your Quranic journey? Contact us today!
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center mx-auto group"
                >
                  <Send className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Social Accounts */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-blue-400">Follow Us</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center space-x-3 hover:text-blue-400 transition-colors duration-300 group">
                  <span className="text-xl group-hover:scale-125 transition-transform duration-300">📘</span>
                  <span>Facebook</span>
                </a>
                <a href="#" className="flex items-center space-x-3 hover:text-blue-400 transition-colors duration-300 group">
                  <span className="text-xl group-hover:scale-125 transition-transform duration-300">📷</span>
                  <span>Instagram</span>
                </a>
                <a href="#" className="flex items-center space-x-3 hover:text-blue-400 transition-colors duration-300 group">
                  <span className="text-xl group-hover:scale-125 transition-transform duration-300">💼</span>
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="flex items-center space-x-3 hover:text-blue-400 transition-colors duration-300 group">
                  <span className="text-xl group-hover:scale-125 transition-transform duration-300">📺</span>
                  <span>YouTube</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-blue-400">Quick Links</h3>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.path}
                    className="block hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Course Catalog */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-blue-400">Course Catalog</h3>
              <div className="space-y-3">
                {courses.map((course, index) => (
                  <div
                    key={index}
                    className="hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform cursor-pointer"
                  >
                    {course}
                  </div>
                ))}
              </div>
            </div>

            {/* Get in Touch */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-blue-400">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <div>
                    <div>+92 315 3465995</div>
                    <div>+92 332 9959017</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <a href="mailto:irshadm791@gmail.com" className="hover:text-blue-400 transition-colors duration-300">
                    irshadm791@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span>Online Quran Academy</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">Al-Sirat al-Mustaqim</span>
              <span className="text-blue-400">الصراط المستقيم</span>
            </div>
            <p className="text-gray-400">
              © 2024 Al-Sirat al-Mustaqim Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
