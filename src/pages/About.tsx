import React from "react";
import SEOHead from "../components/SEOHead";
import {
  BookOpen,
  Users,
  Award,
  Heart,
  Target,
  Eye,
  Laptop,
  BadgeCheck,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Devotion",
      description:
        "We are devoted to preserving and teaching the sacred knowledge of the Quran with utmost respect and care.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building a global community of learners connected through their love for the Quran and Islamic teachings.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Committed to providing the highest quality education with certified teachers and proven methodologies.",
    },
  ];

  const team = [
    {
      name: "Sheikh Ahmad Rahman",
      role: "Chief Academic Officer",
      credentials: "Ph.D. in Islamic Studies, Ijazah in 7 Qira'at",
      experience: "15 years teaching experience",
    },
    {
      name: "Ustadha Khadijah Ali",
      role: "Senior Tajweed Instructor",
      credentials: "Masters in Arabic Literature, Ijazah in Hafs",
      experience: "12 years specializing in Tajweed",
    },
    {
      name: "Sheikh Omar Hassan",
      role: "Memorization Specialist",
      credentials: "Hafiz, Ijazah in multiple Qira'at",
      experience: "10 years in Hifz programs",
    },
  ];

  const methodologySteps = [
    {
      title: "Authentic Transmission",
      desc: "All our teachers hold valid Ijazah certificates, ensuring authentic transmission of Quranic knowledge.",
      icon: BadgeCheck,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Classical Methods",
      desc: "We employ time-tested teaching methods used in traditional Islamic seminaries for centuries.",
      icon: BookOpen,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Technology Integration",
      desc: "Interactive whiteboards, digital Quran, and progress tracking tools enhance the learning experience.",
      icon: Laptop,
      color: "bg-teal-100 text-teal-600",
    },
    {
      title: "Personalized Learning",
      desc: "Customized curriculum and pacing based on individual student needs and learning style.",
      icon: User,
      color: "bg-teal-100 text-teal-600",
    },
  ];

  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "EducationalOrganization",
      "name": "Sirat Al-Mustaqim Academy",
      "foundingDate": "2016",
      "description": "Leading global platform for Quranic education with over 400 students from 25+ countries"
    }
  };

  return (
    <>
      <SEOHead 
        title="About Sirat Al-Mustaqim Academy | Our Mission & Story | Online Quran Learning"
        description="Founded in 2016, Sirat Al-Mustaqim Academy serves 400+ students from 25+ countries. Learn about our mission, vision, and qualified Islamic scholars."
        canonical="/about"
        structuredData={aboutStructuredData}
      />
      <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[url('/assets/socialMediaIcons/AboutHeroSection.jpg')] bg-cover bg-center py-16 lg:py-24">
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About{" "}
              <span className="text-blue-600">Sirat-Al Mustaqim Academy</span>
            </h1>
            {/* <p className="text-xl md:text-2xl text-gray-900 max-w-4xl mx-auto leading-relaxed">
              Dedicated to spreading the light of Quranic knowledge across the
              globe through innovative online education and traditional Islamic
              teaching methods.
            </p> */}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission Card */}
            <div className="group bg-emerald-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:bg-emerald-100">
              <div className="flex items-center mb-6">
                <Target className="h-12 w-12 text-emerald-600 mr-4 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" />
                <h2 className="text-3xl font-bold text-gray-900 transition-colors duration-500 group-hover:text-emerald-700">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed transition-colors duration-500 group-hover:text-gray-800">
                To make quality Quranic education accessible to every Muslim
                around the world, regardless of their location, age, or
                background. We strive to preserve the authentic teachings of the
                Quran and pass them on to future generations through innovative
                teaching methods and dedicated instructors.
              </p>
            </div>

            {/* Vision Card */}
            <div className="group bg-teal-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:bg-teal-100">
              <div className="flex items-center mb-6">
                <Eye className="h-12 w-12 text-teal-600 mr-4 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" />
                <h2 className="text-3xl font-bold text-gray-900 transition-colors duration-500 group-hover:text-teal-700">
                  Our Vision
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed transition-colors duration-500 group-hover:text-gray-800">
                To become the leading global platform for Quranic education,
                fostering a community of learners who not only master the
                recitation and memorization of the Quran but also embody its
                teachings in their daily lives, creating positive change in
                their communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-7">
              Our Story
            </h2>
            <div className="prose prose-lg text-gray-700 mx-auto">
              <p className="text-xl leading-relaxed mb-6">
                Sirat Al-Mustaqim Academy was founded in 2016 with a simple yet
                profound vision: to bring the beauty and wisdom of the Quran to
                every corner of the world through modern technology while
                maintaining traditional Islamic teaching principles.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Starting with just a handful of dedicated teachers and a small
                group of students, we have grown into a global community of over
                400<sup>+</sup> active learners from more than 25 countries. Our
                success lies in our commitment to authentic Islamic education,
                personalized learning approaches, and the use of cutting-edge
                technology to create an immersive learning experience.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we continue to expand our reach while maintaining the
                highest standards of Islamic education, ensuring that each
                student receives the individual attention they deserve on their
                spiritual journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Noor Academy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative text-center p-8 rounded-2xl bg-gray-50 hover:bg-white shadow transition-all duration-500 ease-in-out hover:shadow-xl hover:scale-[1.02] transform"
              >
                <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <value.icon className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 group-hover:text-emerald-700 transition-colors duration-500">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed transition-colors duration-500 group-hover:text-gray-700">
                  {value.description}
                </p>

                {/* Optional: Animated underline on hover */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-blue-600 transition-all duration-500 group-hover:w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Meet Our <span className="text-blue-600">Leadership Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced Islamic scholars and educators dedicated to your
              learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <div className="text-center">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="h-12 w-12 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-emerald-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    {member.credentials}
                  </p>
                  <p className="text-gray-500 text-sm">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Teaching <span className="text-blue-600">Methodology</span> 
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A balanced blend of traditional Islamic scholarship and
              cutting-edge educational practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {methodologySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border-t-4 border-blue-600"
                >
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      </main>
    </>
  );
};

export default About;
