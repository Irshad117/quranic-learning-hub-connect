import React from 'react';
import SEOHead from '@/components/SEOHead';

const Privacy = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy - Sirat Al-Mustaqim Academy"
        description="Privacy policy for Sirat Al-Mustaqim Academy online Quran learning platform. Learn how we protect your personal information."
        canonical="/privacy"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
              <p className="text-gray-600 mb-4">
                At Sirat Al-Mustaqim Academy, we collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Create an account on our platform</li>
                <li>Enroll in courses or request information</li>
                <li>Contact us through our forms or email</li>
                <li>Participate in quizzes and assessments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide and improve our educational services</li>
                <li>Communicate with you about courses and updates</li>
                <li>Track your progress and provide personalized learning</li>
                <li>Ensure the security and integrity of our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate technical and organizational security measures to protect your personal data 
                against unauthorized access, alteration, disclosure, or destruction. All data is encrypted and stored 
                securely using industry-standard practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
              <p className="text-gray-600 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access and update your personal information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                Email: alsiratalmustaqim0@gmail.com
              </p>
            </section>

            <p className="text-sm text-gray-500 mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;