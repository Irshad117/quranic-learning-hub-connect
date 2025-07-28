import { Link } from "react-router-dom"; // Make sure this is at the top
import React, { useState } from "react";

const durations = ["30", "45", "60"];
const regions = ["EURO", "USA", "UK", "Pakistan"];

type Plan = {
  classesPerWeek: number;
  price: number;
  duration: string;
  sessionsPerMonth: number;
};

const pricingData: Record<string, Record<string, Plan[]>> = {
  EURO: {
    "30": [
      {
        classesPerWeek: 2,
        price: 30,
        duration: "Monthly",
        sessionsPerMonth: 8,
      },
      {
        classesPerWeek: 3,
        price: 35,
        duration: "Monthly",
        sessionsPerMonth: 12,
      },
      {
        classesPerWeek: 4,
        price: 40,
        duration: "Monthly",
        sessionsPerMonth: 16,
      },
      {
        classesPerWeek: 5,
        price: 45,
        duration: "Monthly",
        sessionsPerMonth: 20,
      },
    ],
    "45": [
      {
        classesPerWeek: 2,
        price: 40,
        duration: "Monthly",
        sessionsPerMonth: 8,
      },
      {
        classesPerWeek: 3,
        price: 45,
        duration: "Monthly",
        sessionsPerMonth: 12,
      },
      {
        classesPerWeek: 4,
        price: 50,
        duration: "Monthly",
        sessionsPerMonth: 16,
      },
      {
        classesPerWeek: 5,
        price: 55,
        duration: "Monthly",
        sessionsPerMonth: 20,
      },
    ],
    "60": [
      {
        classesPerWeek: 2,
        price: 50,
        duration: "Monthly",
        sessionsPerMonth: 8,
      },
      {
        classesPerWeek: 3,
        price: 55,
        duration: "Monthly",
        sessionsPerMonth: 12,
      },
      {
        classesPerWeek: 4,
        price: 60,
        duration: "Monthly",
        sessionsPerMonth: 16,
      },
      {
        classesPerWeek: 5,
        price: 65,
        duration: "Monthly",
        sessionsPerMonth: 20,
      },
    ],
  },
  USA: {
    "30": [
      {
        classesPerWeek: 2,
        price: 30,
        duration: "Monthly",
        sessionsPerMonth: 8,
      },
      {
        classesPerWeek: 3,
        price: 35,
        duration: "Monthly",
        sessionsPerMonth: 12,
      },
      {
        classesPerWeek: 4,
        price: 40,
        duration: "Monthly",
        sessionsPerMonth: 16,
      },
      {
        classesPerWeek: 5,
        price: 45,
        duration: "Monthly",
        sessionsPerMonth: 20,
      },
    ],
    "45": [
      {
        classesPerWeek: 2,
        price: 40,
        duration: "Monthly",
        sessionsPerMonth: 8,
      },
      {
        classesPerWeek: 3,
        price: 45,
        duration: "Monthly",
        sessionsPerMonth: 12,
      },
      {
        classesPerWeek: 4,
        price: 50,
        duration: "Monthly",
        sessionsPerMonth: 16,
      },
      {
        classesPerWeek: 5,
        price: 55,
        duration: "Monthly",
        sessionsPerMonth: 20,
      },
    ],
    "60": [
      {
        classesPerWeek: 2,
        price: 50,
        duration: "Monthly",
        sessionsPerMonth: 8,
      },
      {
        classesPerWeek: 3,
        price: 55,
        duration: "Monthly",
        sessionsPerMonth: 12,
      },
      {
        classesPerWeek: 4,
        price: 60,
        duration: "Monthly",
        sessionsPerMonth: 16,
      },
      {
        classesPerWeek: 5,
        price: 65,
        duration: "Monthly",
        sessionsPerMonth: 20,
      },
    ],
  },
  UK: {
    "30": [
      {
        classesPerWeek: 2,
        price: 30,
        duration: "Monthly",
        sessionsPerMonth: 8,
      },
      {
        classesPerWeek: 3,
        price: 35,
        duration: "Monthly",
        sessionsPerMonth: 12,
      },
      {
        classesPerWeek: 4,
        price: 40,
        duration: "Monthly",
        sessionsPerMonth: 16,
      },
      {
        classesPerWeek: 5,
        price: 45,
        duration: "Monthly",
        sessionsPerMonth: 20,
      },
    ],
    "45": [
      {
        classesPerWeek: 2,
        price: 40,
        duration: "Monthly",
        sessionsPerMonth: 8,
      },
      {
        classesPerWeek: 3,
        price: 45,
        duration: "Monthly",
        sessionsPerMonth: 12,
      },
      {
        classesPerWeek: 4,
        price: 50,
        duration: "Monthly",
        sessionsPerMonth: 16,
      },
      {
        classesPerWeek: 5,
        price: 55,
        duration: "Monthly",
        sessionsPerMonth: 20,
      },
    ],
    "60": [
      {
        classesPerWeek: 2,
        price: 50,
        duration: "Monthly",
        sessionsPerMonth: 8,
      },
      {
        classesPerWeek: 3,
        price: 55,
        duration: "Monthly",
        sessionsPerMonth: 12,
      },
      {
        classesPerWeek: 4,
        price: 60,
        duration: "Monthly",
        sessionsPerMonth: 16,
      },
      {
        classesPerWeek: 5,
        price: 65,
        duration: "Monthly",
        sessionsPerMonth: 20,
      },
    ],
  },
  Pakistan: {
    "30": [
      {
        classesPerWeek: 2,
        price: 2500,
        duration: "Monthly",
        sessionsPerMonth: 8,
      },
      {
        classesPerWeek: 3,
        price: 3500,
        duration: "Monthly",
        sessionsPerMonth: 12,
      },
      {
        classesPerWeek: 4,
        price: 4500,
        duration: "Monthly",
        sessionsPerMonth: 16,
      },
      {
        classesPerWeek: 5,
        price: 5500,
        duration: "Monthly",
        sessionsPerMonth: 20,
      },
    ],
    "45": [
      {
        classesPerWeek: 2,
        price: 3500,
        duration: "Monthly",
        sessionsPerMonth: 8,
      },
      {
        classesPerWeek: 3,
        price: 5000,
        duration: "Monthly",
        sessionsPerMonth: 12,
      },
      {
        classesPerWeek: 4,
        price: 6500,
        duration: "Monthly",
        sessionsPerMonth: 16,
      },
      {
        classesPerWeek: 5,
        price: 8000,
        duration: "Monthly",
        sessionsPerMonth: 20,
      },
    ],
    "60": [
      {
        classesPerWeek: 2,
        price: 4500,
        duration: "Monthly",
        sessionsPerMonth: 8,
      },
      {
        classesPerWeek: 3,
        price: 6500,
        duration: "Monthly",
        sessionsPerMonth: 12,
      },
      {
        classesPerWeek: 4,
        price: 8500,
        duration: "Monthly",
        sessionsPerMonth: 16,
      },
      {
        classesPerWeek: 5,
        price: 10500,
        duration: "Monthly",
        sessionsPerMonth: 20,
      },
    ],
  },
};

const currencySymbol: Record<string, string> = {
  EURO: "€",
  USA: "$",
  UK: "£",
  Pakistan: "PKR ",
};

const Packages: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState("EURO");
  const [selectedDuration, setSelectedDuration] = useState("30");

  const plans = pricingData[selectedRegion]?.[selectedDuration] || [];

  return (
    <div className="py-10 bg-white font-poppins">
      {/* Top Text Section */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-16">
  <h2 className="text-4xl font-bold text-gray-900 mb-4">
    Flexible & Affordable <span className="text-blue-600">Pricing Plans</span>
  </h2>
  <p className="text-lg text-gray-700 mb-6">
    Our pricing is designed to be transparent and student-friendly. The following monthly fee structure applies after a successful <span className="text-blue-400">Free Trial Class</span>.
  </p>

  <h3 className="text-2xl font-semibold text-orange-500 mb-3">
    Special Family Discount
  </h3>
  <p className="text-lg text-gray-700 mb-4">
    We understand the financial commitment families make for quality education. That’s why we offer generous discounts to ease the burden.
  </p>
  <p className="text-lg text-gray-700 mb-4">
    <strong className="text-emerald-600">20% discount</strong> is applied to the second and every additional child from the same family.
    <br />
    Payments can be made through <strong>Credit/Debit Cards</strong> or <strong>PayPal</strong>.
  </p>

  <div className="mt-6 text-lg text-gray-900 font-semibold">
    <p>
      <span className="text-emerald-600">⭐ 5 Days/Week Plan:</span> <em className="text-orange-500">Most Popular</em>
    </p>
    <p className="mt-2"><strong>Class Type:</strong> One-on-One Live Sessions</p>
    <p><strong>Session Duration:</strong> 30 Minutes per Class</p>
  </div>
</div>


      {/* Region Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-6 py-3 text-lg rounded-full font-semibold shadow transition duration-300 transform hover:scale-105 ${
              selectedRegion === region
                ? "bg-black text-white"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            {region} Price
          </button>
        ))}
      </div>

      {/* Time Duration Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {durations.map((time) => (
          <button
            key={time}
            onClick={() => setSelectedDuration(time)}
            className={`px-5 py-2 text-md rounded-full font-medium border shadow-sm transition duration-300 transform hover:scale-105 ${
              selectedDuration === time
                ? "bg-black text-white"
                : "bg-orange-400 text-white hover:bg-orange-500"
            }`}
          >
            {time} Minutes {selectedRegion}
          </button>
        ))}
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="border-2 border-orange-500 rounded-xl p-6 shadow-md bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-orange-600 mb-2">
              {plan.classesPerWeek} Classes Per Week
            </h3>
            <div className="text-5xl font-extrabold text-gray-800 mb-1">
              {currencySymbol[selectedRegion]}
              {plan.price}
            </div>
            <p className="text-sm text-gray-500 mb-4">{plan.duration}</p>
            <div className="text-gray-700 mb-1 text-base">
              {selectedDuration} min /live session
            </div>
            <div className="text-gray-700 mb-6 text-base">
              {plan.sessionsPerMonth} Classes per Month
            </div>
            <Link
              to="/schedule"
              className="block w-full text-center bg-orange-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
            >
              Get Free Trial
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;

