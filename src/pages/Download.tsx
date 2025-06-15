
import React from 'react';
import { Download as DownloadIcon, BookOpen, FileText, Headphones } from 'lucide-react';

const Download = () => {
  const downloads = [
    {
      title: "Complete Holy Quran (PDF)",
      description: "Full Quran in Arabic with beautiful calligraphy",
      size: "15.2 MB",
      format: "PDF",
      icon: BookOpen,
      downloadUrl: "#"
    },
    {
      title: "Quran with English Translation",
      description: "Complete Quran with side-by-side English translation",
      size: "28.5 MB", 
      format: "PDF",
      icon: FileText,
      downloadUrl: "#"
    },
    {
      title: "Quran Audio - Mishary Rashid",
      description: "Complete Quran recitation by Sheikh Mishary Rashid Al-Afasy",
      size: "850 MB",
      format: "MP3",
      icon: Headphones,
      downloadUrl: "#"
    },
    {
      title: "Quran Audio - Abdul Rahman Al-Sudais",
      description: "Beautiful recitation by Sheikh Abdul Rahman Al-Sudais",
      size: "920 MB",
      format: "MP3", 
      icon: Headphones,
      downloadUrl: "#"
    },
    {
      title: "Tajweed Rules Guide",
      description: "Comprehensive guide to Tajweed rules with examples",
      size: "12.8 MB",
      format: "PDF",
      icon: BookOpen,
      downloadUrl: "#"
    },
    {
      title: "Daily Duas Collection",
      description: "Essential daily prayers and supplications",
      size: "5.2 MB",
      format: "PDF",
      icon: FileText,
      downloadUrl: "#"
    }
  ];

  const categories = [
    {
      name: "Quran Text",
      count: 2,
      description: "Arabic text and translations"
    },
    {
      name: "Audio Recitations",
      count: 2,
      description: "Beautiful Quran recitations"
    },
    {
      name: "Study Materials",
      count: 2,
      description: "Learning guides and references"
    }
  ];

  const handleDownload = (item: any) => {
    // In a real application, this would trigger the actual download
    alert(`Downloading: ${item.title}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-indigo-600">Download</span> Resources
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Access the Holy Quran and Islamic learning materials for offline study
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Resource Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {categories.map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-2">{category.description}</p>
                <span className="text-indigo-600 font-semibold">{category.count} items</span>
              </div>
            ))}
          </div>

          {/* Downloads Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {downloads.map((item, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-indigo-100 rounded-lg p-3 group-hover:bg-indigo-200 transition-colors duration-300">
                    <item.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {item.format}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{item.size}</span>
                  <button
                    onClick={() => handleDownload(item)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center space-x-2 group-hover:scale-105 transform"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Download Instructions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">For PDF Files</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Click the download button for your desired file
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    The file will be saved to your downloads folder
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Open with any PDF reader application
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Compatible with phones, tablets, and computers
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">For Audio Files</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Audio files are in high-quality MP3 format
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Can be played on any device or music app
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Download may take longer due to file size
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Ensure stable internet connection for download
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need More Resources?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Contact us if you need specific Islamic learning materials or have any questions
          </p>
          <a
            href="/contact"
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Download;
