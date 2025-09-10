import React, { useState } from 'react';
import { Download as DownloadIcon, BookOpen, FileText, Headphones, Play, Upload, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

const Download = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);

  const downloads = [
    {
      title: "Complete Holy Quran (PDF)",
      description: "Full Quran in Arabic with beautiful calligraphy and verse numbers",
      size: "15.2 MB",
      format: "PDF",
      icon: BookOpen,
      downloadUrl: "#",
      featured: true,
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Quran with English Translation",
      description: "Complete Quran with side-by-side English translation by Sahih International",
      size: "28.5 MB", 
      format: "PDF",
      icon: FileText,
      downloadUrl: "#",
      featured: false,
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "Quran Audio - Mishary Rashid",
      description: "Complete Quran recitation by Sheikh Mishary Rashid Al-Afasy with perfect Tajweed",
      size: "850 MB",
      format: "MP3",
      icon: Headphones,
      downloadUrl: "#",
      featured: true,
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Quran Audio - Abdul Rahman Al-Sudais",
      description: "Beautiful and melodious recitation by Sheikh Abdul Rahman Al-Sudais",
      size: "920 MB",
      format: "MP3", 
      icon: Headphones,
      downloadUrl: "#",
      featured: false,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Tajweed Rules Complete Guide",
      description: "Comprehensive guide to Tajweed rules with examples and audio demonstrations",
      size: "12.8 MB",
      format: "PDF",
      icon: BookOpen,
      downloadUrl: "#",
      featured: true,
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      title: "Daily Duas Collection",
      description: "Essential daily prayers, supplications, and their translations",
      size: "5.2 MB",
      format: "PDF",
      icon: FileText,
      downloadUrl: "#",
      featured: false,
      gradient: "from-teal-500 to-cyan-500"
    }
  ];

  const categories = [
    {
      name: "Quran Text & Translation",
      count: 2,
      description: "Arabic text with various translations",
      icon: BookOpen,
      color: "blue"
    },
    {
      name: "Audio Recitations",
      count: 2,
      description: "High-quality Quran recitations",
      icon: Headphones,
      color: "green"
    },
    {
      name: "Study Materials",
      count: 2,
      description: "Learning guides and references",
      icon: FileText,
      color: "purple"
    }
  ];

  const handleDownload = (item: any) => {
    alert(`Downloading: ${item.title}`);
  };

  const handleYoutubeUpload = () => {
    if (youtubeUrl) {
      setUploadedVideos([...uploadedVideos, youtubeUrl]);
      setYoutubeUrl('');
    }
  };

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 py-24 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
              <DownloadIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Free Islamic Resources</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Download & <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Learn</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-4xl mx-auto leading-relaxed">
              Access the Holy Quran, Islamic learning materials, and educational videos for offline study
            </p>
          </motion.div>
        </div>
      </section>

      {/* YouTube Upload Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Add YouTube Educational Videos
            </h2>
            <p className="text-xl text-gray-600">
              Share Islamic educational videos from YouTube for community learning
            </p>
          </motion.div>

          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="Paste YouTube video URL here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYoutubeUpload}
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300 flex items-center gap-2"
              >
                <Youtube className="h-5 w-5" />
                Add Video
              </motion.button>
            </div>
          </div>

          {/* Uploaded Videos */}
          {uploadedVideos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {uploadedVideos.map((url, index) => {
                const videoId = extractVideoId(url);
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {videoId && (
                      <iframe
                        width="100%"
                        height="200"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`YouTube video ${index + 1}`}
                        frameBorder="0"
                        allowFullScreen
                        className="w-full"
                      ></iframe>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-indigo-600 bg-clip-text text-transparent mb-6">
              Resource Categories
            </h2>
            <p className="text-xl text-gray-600">
              Organized collections for easy access
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-${category.color}-100 hover:border-${category.color}-300`}
              >
                <div className={`bg-gradient-to-r from-${category.color}-100 to-${category.color}-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className={`h-8 w-8 text-${category.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-3">{category.description}</p>
                <span className={`text-${category.color}-600 font-semibold text-lg`}>{category.count} items</span>
              </motion.div>
            ))}
          </div>

          {/* Downloads Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {downloads.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${item.featured ? 'ring-2 ring-indigo-200' : ''}`}
              >
                {item.featured && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
                
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`bg-gradient-to-r ${item.gradient} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                      {item.format}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">{item.size}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(item)}
                      className={`bg-gradient-to-r ${item.gradient} text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2 font-medium`}
                    >
                      <DownloadIcon className="h-4 w-4" />
                      <span>Download</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Download & Usage Instructions
              </h2>
              <p className="text-xl text-gray-600">
                Simple steps to access and use your downloaded resources
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">For PDF Files</h3>
                </div>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                    Click the download button for your desired file
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                    The file will be saved to your downloads folder
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                    Open with any PDF reader application
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                    Compatible with phones, tablets, and computers
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Headphones className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold text-gray-900">For Audio Files</h3>
                </div>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                    Audio files are in high-quality MP3 format
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                    Can be played on any device or music app
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                    Download may take longer due to large file size
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                    Ensure stable internet connection for download
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Need Specific Resources?
            </h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Can't find what you're looking for? Contact us for custom Islamic learning materials or specific requests
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <span>Contact Us</span>
              <Play className="h-5 w-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Download;