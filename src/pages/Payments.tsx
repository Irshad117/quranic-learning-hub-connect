import React from 'react';
import { CreditCard, Shield, Clock, CheckCircle, Smartphone, Building2, Banknote } from 'lucide-react';

const Payments = () => {
  const paymentMethods = [
    {
      name: "Visa",
      image: "💳",
      description: "Secure payment with your Visa card",
      category: "international"
    },
    {
      name: "Mastercard", 
      image: "💳",
      description: "Pay securely with Mastercard",
      category: "international"
    },
    {
      name: "PayPal",
      image: "🅿️",
      description: "Quick and secure PayPal payments",
      category: "international"
    },
    {
      name: "Payoneer",
      image: "💰",
      description: "Global payment platform",
      category: "international"
    },
    {
      name: "Western Union",
      image: "🏦",
      description: "International money transfer service",
      category: "international"
    },
    {
      name: "EasyPaisa",
      image: "📱",
      description: "Pakistan's leading mobile wallet",
      category: "local"
    },
    {
      name: "JazzCash",
      image: "📲",
      description: "Digital financial services in Pakistan",
      category: "local"
    },
    {
      name: "NayaPay",
      image: "💳",
      description: "Digital banking solution",
      category: "local"
    },
    {
      name: "Meezan Bank",
      image: "🏛️",
      description: "Islamic banking services",
      category: "local"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "All payments are encrypted with 256-bit SSL and secured with industry-standard protocols"
    },
    {
      icon: Clock,
      title: "Instant Processing",
      description: "Your enrollment is activated immediately after payment confirmation with real-time updates"
    },
    {
      icon: CheckCircle,
      title: "Money-Back Guarantee",
      description: "30-day unconditional money-back guarantee if you're not completely satisfied"
    },
    {
      icon: CreditCard,
      title: "Flexible Payment Options",
      description: "Choose from 9+ payment methods including local and international options"
    }
  ];

  const internationalMethods = paymentMethods.filter(method => method.category === "international");
  const localMethods = paymentMethods.filter(method => method.category === "local");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">100% Secure Payments</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Secure <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Payment</span> Solutions
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Multiple trusted payment methods for your convenience and security
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
      </section>

      {/* International Payment Methods */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
              <CreditCard className="h-5 w-5" />
              <span className="font-medium">International Methods</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Global Payment Options
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted worldwide payment solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {internationalMethods.map((method, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-6 text-center hover:border-blue-300 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                    {method.image}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.name}</h3>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Payment Methods */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full mb-4">
              <Smartphone className="h-5 w-5" />
              <span className="font-medium">Local Pakistan Methods</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Pakistani Payment Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Easy and familiar payment methods for Pakistani students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {localMethods.map((method, index) => (
              <div key={index} className="group relative bg-white rounded-2xl border border-gray-200 p-6 text-center hover:border-green-300 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                    {method.image}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.name}</h3>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-green-50/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
              Why Our Payment System Stands Out
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry-leading security and convenience features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group text-center transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:from-blue-200 group-hover:to-green-200 transition-all duration-300">
                  <feature.icon className="h-10 w-10 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Process */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple 3-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with your Quranic education in minutes
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative text-center group">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Choose Package</h3>
                <p className="text-gray-600 leading-relaxed">Select your preferred learning package from our comprehensive course offerings</p>
                {/* Connection line */}
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transform translate-x-8"></div>
              </div>
              
              <div className="relative text-center group">
                <div className="bg-gradient-to-br from-purple-500 to-green-500 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Secure Payment</h3>
                <p className="text-gray-600 leading-relaxed">Pay securely using your preferred method from our 9+ trusted payment options</p>
                {/* Connection line */}
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-300 to-green-300 transform translate-x-8"></div>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Start Learning</h3>
                <p className="text-gray-600 leading-relaxed">Begin your Quranic education journey immediately with expert teachers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Begin Your Spiritual Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students worldwide learning the Quran with our expert teachers
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/packages"
              className="group bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span className="flex items-center gap-2">
                View Packages
                <CreditCard className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </a>
            <a
              href="/contact"
              className="group border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Get Support
                <Shield className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payments;