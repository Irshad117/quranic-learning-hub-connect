import React, { useState } from 'react';
import { Upload, Users, BookOpen, Clock, Award, CheckCircle, Globe, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Careers = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    education: '',
    skills: '',
    availability: '',
    motivation: '',
    cv: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        cv: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-home-submission', {
        body: {
          type: 'career_application',
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: `Position: ${formData.position}\nExperience: ${formData.experience}\nEducation: ${formData.education}\nMotivation: ${formData.motivation}`
        }
      });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "We have received your application and will contact you soon.",
      });

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        education: '',
        skills: '',
        availability: '',
        motivation: '',
        cv: null
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const positions = [
    {
      title: "Senior Quran Teacher",
      description: "Lead Quran recitation and Tajweed classes for advanced students",
      requirements: ["Ijazah in Quran recitation", "5+ years teaching experience", "Fluent in English and Arabic"],
      salary: "$2000-3000/month",
      type: "Full-time",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Arabic Language Instructor", 
      description: "Teach Arabic language fundamentals to beginners and intermediate students",
      requirements: ["Arabic language degree", "Teaching certification", "Online teaching experience"],
      salary: "$1500-2500/month",
      type: "Part-time",
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "Islamic Studies Specialist",
      description: "Teach Islamic history, Hadith, Fiqh, and Seerah",
      requirements: ["Islamic Studies degree", "Strong knowledge of Hadith", "Teaching experience"],
      salary: "$1800-2800/month",
      type: "Full-time",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Student Success Coordinator",
      description: "Manage student enrollment, progress tracking, and parent communication",
      requirements: ["Bachelor's degree", "Communication skills", "Administrative experience"],
      salary: "$1200-2000/month",
      type: "Remote",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Work from home with flexible timing options that fit your lifestyle"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Teach students from around the world and make a global difference"
    },
    {
      icon: BookOpen,
      title: "Professional Growth",
      description: "Continuous learning opportunities and skill development programs"
    },
    {
      icon: Award,
      title: "Competitive Package",
      description: "Attractive salary, performance bonuses, and comprehensive benefits"
    },
    {
      icon: Heart,
      title: "Meaningful Work",
      description: "Contribute to spreading Islamic knowledge and touching lives"
    },
    {
      icon: Users,
      title: "Supportive Team",
      description: "Join a collaborative team of dedicated Islamic educators"
    }
  ];

  const stats = [
    { number: "500+", label: "Students Taught", icon: Users },
    { number: "50+", label: "Expert Teachers", icon: Star },
    { number: "25+", label: "Countries Reached", icon: Globe },
    { number: "98%", label: "Satisfaction Rate", icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 py-24 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
              <Heart className="h-5 w-5" />
              <span className="text-sm font-medium">Join Our Mission</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Teach, Inspire, <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Transform</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Join our global team of Islamic educators and help spread Quranic knowledge worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                View Open Positions
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Apply Now
              </motion.button>
            </div>
          </motion.div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Positions */}
      <section id="positions" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent mb-6">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover opportunities to make a meaningful impact in Islamic education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {positions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${position.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{position.title}</h3>
                      <p className="text-gray-600 mb-4">{position.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{position.salary}</div>
                      <div className="text-sm text-gray-500">{position.type}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Requirements:
                    </h4>
                    <ul className="space-y-2">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start text-gray-600">
                          <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${position.gradient} mr-3 mt-2 flex-shrink-0`}></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our Academy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a team that values growth, flexibility, and meaningful impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group text-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-green-50 transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Join Us?
            </h2>
            <p className="text-xl text-gray-600">
              Take the first step towards a rewarding career in Islamic education
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="position" className="block text-sm font-semibold text-gray-700 mb-2">
                    Position Applied For *
                  </label>
                  <select
                    id="position"
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select Position</option>
                    <option value="senior-quran-teacher">Senior Quran Teacher</option>
                    <option value="arabic-instructor">Arabic Language Instructor</option>
                    <option value="islamic-studies">Islamic Studies Specialist</option>
                    <option value="coordinator">Student Success Coordinator</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                  Teaching Experience *
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  required
                  rows={3}
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Describe your teaching experience, including years of experience, subjects taught, and any certifications..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="motivation" className="block text-sm font-semibold text-gray-700 mb-2">
                  Why do you want to work with us? *
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  required
                  rows={4}
                  value={formData.motivation}
                  onChange={handleInputChange}
                  placeholder="Tell us about your motivation to join our team and contribute to Islamic education..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;