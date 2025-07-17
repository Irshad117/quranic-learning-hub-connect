import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Calendar, Clock, User, CheckCircle, BookOpen } from 'lucide-react';

const Schedule = () => {
  const [state, handleSubmit] = useForm("xgvynwoy");

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

  const isFormValid = selectedCourse && selectedTeacher && selectedDate && selectedTime &&
    formData.name && formData.email && formData.timezone;

  if (state.succeeded) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-emerald-600 mb-4">🎉 Thank you!</h2>
        <p className="text-gray-700">Your free trial class request has been submitted. We'll contact you soon inshaAllah.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Schedule Your <span className="text-emerald-600">Free Trial</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Hidden Inputs for Formspree */}
            <input type="hidden" name="Course" value={selectedCourse} />
            <input type="hidden" name="Teacher" value={selectedTeacher} />
            <input type="hidden" name="Date" value={selectedDate} />
            <input type="hidden" name="Time" value={selectedTime} />

            {/* Course Selection */}
            <div>
              <label className="block text-lg font-semibold mb-2">Select Course *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 cursor-pointer ${selectedCourse === course ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}
                    onClick={() => setSelectedCourse(course)}
                  >
                    {course}
                  </div>
                ))}
              </div>
            </div>

            {/* Teacher Selection */}
            <div>
              <label className="block text-lg font-semibold mb-2">Choose Teacher *</label>
              <div className="space-y-3">
                {teachers.map((teacher, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 cursor-pointer ${selectedTeacher === teacher.name ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}
                    onClick={() => setSelectedTeacher(teacher.name)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{teacher.name}</div>
                        <div className="text-sm text-gray-500">{teacher.speciality}</div>
                      </div>
                      <div className="text-sm text-emerald-600">{teacher.experience}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">
                  <Calendar className="inline h-5 w-5 mr-2" />
                  Select Date *
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  <Clock className="inline h-5 w-5 mr-2" />
                  Select Time *
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Choose Time</option>
                  {timeSlots.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Personal Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                <User className="inline h-5 w-5 mr-2" /> Personal Info
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>

                <div>
                  <label className="block mb-1 text-sm">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                <div>
                  <label className="block mb-1 text-sm">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-1 text-sm">Timezone *</label>
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="">Select Timezone</option>
                    {timezones.map((tz, i) => (
                      <option key={i} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-1 text-sm">Previous Experience</label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={state.submitting || !isFormValid}
                className={`px-8 py-4 rounded-lg text-lg font-semibold ${
                  isFormValid
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle className="inline h-5 w-5 mr-2" />
                Schedule Free Trial Class
              </button>
              <p className="text-sm text-gray-600 mt-4">
                * Required fields. We’ll contact you within 24 hours.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Schedule;
