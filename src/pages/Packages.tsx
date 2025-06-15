
import React from 'react';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Packages = () => {
  const packages = [
    {
      name: "Basic Package",
      price: "$30",
      duration: "per month",
      description: "Perfect for beginners starting their Quranic journey",
      features: [
        "2 classes per week",
        "30 minutes per class",
        "Basic Quran reading",
        "Email support",
        "Progress tracking",
        "Certificate upon completion"
      ],
      popular: false,
      color: "blue"
    },
    {
      name: "Standard Package",
      price: "$50",
      duration: "per month", 
      description: "Most popular choice for serious learners",
      features: [
        "3 classes per week",
        "45 minutes per class",
        "Quran reading + Tajweed",
        "WhatsApp support",
        "Progress tracking",
        "Recorded sessions",
        "Certificate upon completion",
        "Makeup classes"
      ],
      popular: true,
      color: "emerald"
    },
    {
      name: "Premium Package",
      price: "$80",
      duration: "per month",
      description: "Comprehensive package for advanced students",
      features: [
        "5 classes per week",
        "60 minutes per class",
        "Complete Quran + Tajweed + Memorization",
        "24/7 support",
        "Progress tracking",
        "Recorded sessions",
        "Certificate upon completion",
        "Makeup classes",
        "Monthly assessments",
        "Ijazah preparation"
      ],
      popular: false,
      color: "purple"
    },
    {
      name: "Family Package",
      price: "$120",
      duration: "per month",
      description: "Special package for families (up to 4 members)",
      features: [
        "Unlimited classes for family",
        "Flexible timing",
        "All courses included",
        "Dedicated family teacher",
        "24/7 support",
        "Progress tracking for all",
        "Recorded sessions",
        "Certificates for all",
        "Special family discounts"
      ],
      popular: false,
      color: "orange"
    }
  ];

  const getColorClasses = (color: string, isPopular: boolean) => {
    const colors = {
      blue: isPopular ? "border-blue-500 bg-blue-50" : "border-gray-200",
      emerald: isPopular ? "border-emerald-500 bg-emerald-50" : "border-gray-200", 
      purple: isPopular ? "border-purple-500 bg-purple-50" : "border-gray-200",
      orange: isPopular ? "border-orange-500 bg-orange-50" : "border-gray-200"
    };
    return colors[color as keyof typeof colors];
  };

  const getButtonClasses = (color: string, isPopular: boolean) => {
    if (!isPopular) return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    
    const colors = {
      blue: "bg-blue-600 text-white hover:bg-blue-700",
      emerald: "bg-emerald-600 text-white hover:bg-emerald-700",
      purple: "bg-purple-600 text-white hover:bg-purple-700", 
      orange: "bg-orange-600 text-white hover:bg-orange-700"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Packages</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Choose the perfect learning package for your Quranic education journey
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative rounded-xl border-2 p-8 transition-all duration-300 hover:shadow-xl ${getColorClasses(pkg.color, pkg.popular)}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {pkg.price}
                    <span className="text-lg text-gray-500">/{pkg.duration}</span>
                  </div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/schedule"
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-200 ${getButtonClasses(pkg.color, pkg.popular)}`}
                >
                  Choose Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need a Custom Package?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            We can create a personalized learning plan that fits your specific needs and schedule
          </p>
          <Link
            to="/contact"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
          >
            Contact Us for Custom Package
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Packages;
