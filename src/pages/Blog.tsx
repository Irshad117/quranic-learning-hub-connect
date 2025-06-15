
import React from 'react';
import { Calendar, User, Play, BookOpen, Heart } from 'lucide-react';

const Blog = () => {
  const featuredStory = {
    title: "Our Journey: 15 Years of Teaching Quran Worldwide",
    description: "Watch our inspiring story of how Al-Sirat al-Mustaqim has touched thousands of lives across the globe through Quranic education.",
    videoThumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    duration: "5:30",
    author: "Academy Team",
    date: "December 15, 2024"
  };

  const blogPosts = [
    {
      title: "The Importance of Tajweed in Quran Recitation",
      excerpt: "Learn why proper Tajweed is essential for accurate Quran recitation and how it enhances your spiritual connection.",
      author: "Sheikh Ahmad",
      date: "December 10, 2024",
      category: "Islamic Education",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      readTime: "5 min read"
    },
    {
      title: "Teaching Quran to Children: Best Practices",
      excerpt: "Discover effective methods and techniques for introducing young minds to the beauty of the Holy Quran.",
      author: "Sister Fatima",
      date: "December 5, 2024",
      category: "Teaching Methods",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      readTime: "7 min read"
    },
    {
      title: "Online Learning: The Future of Islamic Education",
      excerpt: "How technology is revolutionizing Islamic education and making Quran learning accessible to everyone.",
      author: "Dr. Muhammad Ali",
      date: "November 28, 2024",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      readTime: "6 min read"
    },
    {
      title: "Success Stories: Students Who Completed Hifz Online",
      excerpt: "Inspiring stories of dedication and success from our students who memorized the complete Quran through our program.",
      author: "Academy Team",
      date: "November 20, 2024",
      category: "Success Stories",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      readTime: "8 min read"
    },
    {
      title: "Understanding Arabic: Gateway to Quranic Wisdom",
      excerpt: "How learning basic Arabic enhances your understanding and connection with the Quran's profound meanings.",
      author: "Sheikh Abdullah",
      date: "November 15, 2024",
      category: "Language Learning",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      readTime: "5 min read"
    },
    {
      title: "Building a Daily Quran Routine: Tips for Busy Lives",
      excerpt: "Practical advice on incorporating Quran reading and reflection into your daily schedule, no matter how busy you are.",
      author: "Sister Aisha",
      date: "November 8, 2024",
      category: "Spiritual Development",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      readTime: "4 min read"
    }
  ];

  const categories = [
    "All Posts", "Islamic Education", "Teaching Methods", "Technology", 
    "Success Stories", "Language Learning", "Spiritual Development"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-teal-600">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Stories, insights, and updates from our Quranic education journey
            </p>
          </div>
        </div>
      </section>

      {/* Featured Story Video */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Story
            </h2>
            <p className="text-xl text-gray-600">
              Watch our inspiring journey
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              <img
                src={featuredStory.videoThumbnail}
                alt="Featured Story"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                <div className="text-center text-white">
                  <div className="bg-white bg-opacity-20 rounded-full p-6 mb-4 mx-auto w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-12 w-12 ml-1" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{featuredStory.title}</h3>
                  <p className="text-lg mb-4 max-w-2xl">{featuredStory.description}</p>
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <span>{featuredStory.duration}</span>
                    <span>•</span>
                    <span>{featuredStory.author}</span>
                    <span>•</span>
                    <span>{featuredStory.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600">
              Insights and stories from our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                    </div>
                    <span className="text-teal-600 font-medium">{post.readTime}</span>
                  </div>
                  
                  <button className="mt-4 text-teal-600 font-semibold hover:text-teal-700 transition-colors duration-300">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <BookOpen className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Subscribe to our newsletter for the latest articles and updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
                <Heart className="h-5 w-5 mr-2" />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
