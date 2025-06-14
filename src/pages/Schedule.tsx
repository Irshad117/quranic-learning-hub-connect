
import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';

const Schedule = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    experience: '',
    timezone: ''
  });

  const courses = [
    'Quran Recitation (Tilawah)',
    'Tajweed Mastery',
    'Quran Memorization (Hifz)',
    'Kids Quran Program',
    'Arabic Language Basics',
    'Advanced Islamic Studies'
  ];

  const teachers = [
    { name: 'Sheikh Ahmad Rahman', speciality: 'Tajweed & Recitation', experience: '15 years' },
    { name: 'Ustadha Khadijah Ali', speciality: 'Tajweed & Women Classes', experience: '12 years' },
    { name: 'Sheikh Omar Hassan', speciality: 'Hifz & Memorization', experience: '10 years' },
    { name: 'Ustadha Maryam Yusuf', speciality: 'Kids Programs', experience: '8 years' },
    { name: 'Sheikh Abdullah Malik', speciality: 'Arabic & Islamic Studies', experience: '12 years' }
  ];

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  const timezones = [
    'UTC-05:00 (Eastern Time)',
    'UTC-06:00 (Central Time)',
    'UTC-07:00 (Mountain Time)',
    'UTC-08:00 (Pacific Time)',
    'UTC+00:00 (GMT)',
    'UTC+01:00 (Central European Time)',
    'UTC+03:00 (Arabia Standard Time)',
    'UTC+05:00 (Pakistan Standard Time)',
    'UTC+08:00 (Singapore Time)'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert('Trial class scheduled successfully! We will contact you soon.');
    console.log('Form submitted:', {
      ...formData,
      selectedCourse,
      selectedTeacher,
      selectedDate,
      selectedTime
    });
  };

  const isFormValid = selectedCourse && selectedTeacher && selectedDate && selectedTime && 
                     formData.name && formData.email && formData.timezone;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Schedule Your <span className="text-emerald-600">Free Trial</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Book a complimentary 30-minute session with one of our expert teachers
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Course Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Select Course *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((course, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedCourse === course
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                      onClick={() => setSelectedCourse(course)}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          selectedCourse === course
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-gray-300'
                        }`}></div>
                        <span className="font-medium text-gray-800">{course}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teacher Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Choose Your Teacher *
                </label>
                <div className="grid grid-cols-1 gap-4">
                  {teachers.map((teacher, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedTeacher === teacher.name
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                      onClick={() => setSelectedTeacher(teacher.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                            selectedTeacher === teacher.name
                              ? 'bg-emerald-500 border-emerald-500'
                              : 'border-gray-300'
                          }`}></div>
                          <div>
                            <span className="font-medium text-gray-800">{teacher.name}</span>
                            <p className="text-sm text-gray-600">{teacher.speciality}</p>
                          </div>
                        </div>
                        <span className="text-sm text-emerald-600">{teacher.experience}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date and Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <Calendar className="inline h-5 w-5 mr-2" />
                    Select Date *
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <Clock className="inline h-5 w-5 mr-2" />
                    Select Time *
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Choose time</option>
                    {timeSlots.map((time, index) => (
                      <option key={index} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <User className="inline h-5 w-5 mr-2" />
                  Personal Information
                </h3>
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Your age"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone *
                    </label>
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Select your timezone</option>
                      {timezones.map((timezone, index) => (
                        <option key={index} value={timezone}>{timezone}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Previous Quran Learning Experience
                    </label>
                    <textarea
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Tell us about your previous experience with Quran learning (optional)"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 ${
                    isFormValid
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle className="inline h-5 w-5 mr-2" />
                  Schedule Free Trial Class
                </button>
                <p className="text-sm text-gray-600 mt-4">
                  * Required fields. We'll contact you within 24 hours to confirm your appointment.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What to Expect in Your Trial Class
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Meet Your Teacher</h3>
              <p className="text-gray-600">Get acquainted with your instructor and discuss your learning goals</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sample Lesson</h3>
              <p className="text-gray-600">Experience our teaching methodology with a mini lesson</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Plan</h3>
              <p className="text-gray-600">Receive a customized learning plan based on your needs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schedule;
