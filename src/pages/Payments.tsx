
import React from 'react';
import { CreditCard, Shield, Clock, CheckCircle } from 'lucide-react';

const Payments = () => {
  const paymentMethods = [
    {
      name: "Visa",
      image: "💳",
      description: "Secure payment with your Visa card",
      
    },
    {
      name: "Mastercard", 
      image: "💳",
      description: "Pay securely with Mastercard",
      
    },
    {
      name: "PayPal",
      image: "🅿️",
      description: "Quick and secure PayPal payments",
      
    },
    {
      name: "Western Union",
      image: "💰",
      description: "International money transfer service",
      
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "All payments are encrypted and secured with industry-standard SSL"
    },
    {
      icon: Clock,
      title: "Instant Processing",
      description: "Your enrollment is activated immediately after payment confirmation"
    },
    {
      icon: CheckCircle,
      title: "Money-Back Guarantee",
      description: "30-day money-back guarantee if you're not satisfied"
    },
    {
      icon: CreditCard,
      title: "Multiple Options",
      description: "Choose from various payment methods that work best for you"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Secure <span className="text-green-600">Payments</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We accept multiple payment methods for your convenience
            </p>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Payment Methods We Accept
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our secure payment options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-xl border-2 border-gray-200 p-8 text-center hover:border-green-300 hover:shadow-lg transition-all duration-300 group">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {method.image}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.name}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                {/* <div className="text-sm text-green-600 font-semibold">
                  Processing Fee: {method.fee}
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Our Payment System is Secure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Payment Works
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Choose Package</h3>
                <p className="text-gray-600">Select your preferred learning package</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Make Payment</h3>
                <p className="text-gray-600">Pay securely using your preferred method</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Start Learning</h3>
                <p className="text-gray-600">Begin your Quranic education journey immediately</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Choose your package and make a secure payment to begin learning
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/packages"
              className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            >
              View Packages
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-200 transform hover:scale-105"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payments;
