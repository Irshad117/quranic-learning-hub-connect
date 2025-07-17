
import React from 'react';
import { BookOpen, Users, Award, Heart, Target, Eye } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Devotion",
      description: "We are devoted to preserving and teaching the sacred knowledge of the Quran with utmost respect and care."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a global community of learners connected through their love for the Quran and Islamic teachings."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to providing the highest quality education with certified teachers and proven methodologies."
    }
  ];

  const team = [
    {
      name: "Sheikh Ahmad Rahman",
      role: "Chief Academic Officer",
      credentials: "Ph.D. in Islamic Studies, Ijazah in 7 Qira'at",
      experience: "15 years teaching experience"
    },
    {
      name: "Ustadha Khadijah Ali",
      role: "Senior Tajweed Instructor",
      credentials: "Masters in Arabic Literature, Ijazah in Hafs",
      experience: "12 years specializing in Tajweed"
    },
    {
      name: "Sheikh Omar Hassan",
      role: "Memorization Specialist",
      credentials: "Hafiz, Ijazah in multiple Qira'at",
      experience: "10 years in Hifz programs"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-emerald-600">Sirat-Al Mustaqim Academy</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Dedicated to spreading the light of Quranic knowledge across the globe through 
              innovative online education and traditional Islamic teaching methods.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-emerald-50 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <Target className="h-12 w-12 text-emerald-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To make quality Quranic education accessible to every Muslim around the world, 
                regardless of their location, age, or background. We strive to preserve the 
                authentic teachings of the Quran and pass them on to future generations through 
                innovative teaching methods and dedicated instructors.
              </p>
            </div>

            <div className="bg-teal-50 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <Eye className="h-12 w-12 text-teal-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To become the leading global platform for Quranic education, fostering a 
                community of learners who not only master the recitation and memorization 
                of the Quran but also embody its teachings in their daily lives, creating 
                positive change in their communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
              Our Story
            </h2>
            <div className="prose prose-lg text-gray-700 mx-auto">
              <p className="text-xl leading-relaxed mb-6">
                Sirat Al-Mustaqim Academy was founded in 2008 with a simple yet profound vision: to bring 
                the beauty and wisdom of the Quran to every corner of the world through modern 
                technology while maintaining traditional Islamic teaching principles.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Starting with just a handful of dedicated teachers and a small group of students, 
                we have grown into a global community of over 5,000 active learners from more 
                than 50 countries. Our success lies in our commitment to authentic Islamic 
                education, personalized learning approaches, and the use of cutting-edge 
                technology to create an immersive learning experience.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we continue to expand our reach while maintaining the highest standards 
                of Islamic education, ensuring that each student receives the individual 
                attention they deserve on their spiritual journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Noor Academy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-200">
                <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced Islamic scholars and educators dedicated to your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="text-center">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="h-12 w-12 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-2">{member.credentials}</p>
                  <p className="text-gray-500 text-sm">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Teaching Methodology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven approach combining traditional Islamic education with modern learning techniques
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Traditional Foundation</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-emerald-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-emerald-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Authentic Transmission</h4>
                    <p className="text-gray-600">All our teachers hold valid Ijazah certificates, ensuring authentic transmission of Quranic knowledge.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-emerald-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-emerald-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Classical Methods</h4>
                    <p className="text-gray-600">We employ time-tested teaching methods used in traditional Islamic seminaries for centuries.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Modern Innovation</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-teal-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-teal-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Technology Integration</h4>
                    <p className="text-gray-600">Interactive whiteboards, digital Quran, and progress tracking tools enhance the learning experience.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-teal-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-teal-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Personalized Learning</h4>
                    <p className="text-gray-600">Customized curriculum and pacing based on individual student needs and learning style.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
