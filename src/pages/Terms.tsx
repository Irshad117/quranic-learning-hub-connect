import React from 'react';
import SEOHead from '@/components/SEOHead';

const Terms = () => {
  return (
    <>
      <SEOHead
        title="Terms of Service - Sirat Al-Mustaqim Academy"
        description="Terms of service for Sirat Al-Mustaqim Academy online Quran learning platform. Read our terms and conditions."
        canonical="/terms"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using Sirat Al-Mustaqim Academy's online learning platform, you accept and agree 
                to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use License</h2>
              <p className="text-gray-600 mb-4">
                Permission is granted to temporarily download one copy of the materials on Sirat Al-Mustaqim Academy's 
                website for personal, non-commercial transitory viewing only.
              </p>
              <p className="text-gray-600">This license shall automatically terminate if you violate any restrictions and may be terminated by us at any time.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Educational Services</h2>
              <p className="text-gray-600 mb-4">Our platform provides:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Online Quran recitation lessons</li>
                <li>Tajweed instruction and practice</li>
                <li>Islamic knowledge courses</li>
                <li>Progress tracking and assessments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Responsibilities</h2>
              <p className="text-gray-600 mb-4">As a user, you agree to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of your account</li>
                <li>Use the platform respectfully and appropriately</li>
                <li>Not share course materials without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Terms</h2>
              <p className="text-gray-600">
                Payment for courses is due in advance. Refunds may be available within 7 days of enrollment, 
                subject to our refund policy. We reserve the right to modify pricing with advance notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
              <p className="text-gray-600">
                Sirat Al-Mustaqim Academy shall not be held liable for any damages arising from the use or inability 
                to use our educational platform or materials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-600">
                For questions regarding these terms, please contact us at:
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

export default Terms;