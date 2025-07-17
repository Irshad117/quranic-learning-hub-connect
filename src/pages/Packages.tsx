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
      <div className="max-w-4xl mx-auto text-center px-4 mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Pricing Plans</h2>
        <p className="text-gray-700 text-lg mb-4">
          The below mentioned fee is implemented on Monthly basis for all courses after the satisfaction of Free trial session.
        </p>
        <h3 className="text-2xl font-semibold text-orange-500 mb-2">Family Discount Package:</h3>
        <p className="text-gray-700 text-lg mb-2">
          We know that families often have to make sacrifices to afford tuition fee. That’s why we have made our Fee Packages as affordable as possible.
        </p>
        <p className="text-gray-700 text-lg mb-2">
          <strong>20%</strong> tuition discount will be awarded to 2nd sibling & subsequent children of a family. <br />
          Fee is accepted via credit, debit cards or PayPal.
        </p>
        <p className="mt-4 text-lg text-black font-semibold">
          5 Days/Week Fee Plan: <em>Most Popular</em>
        </p>
        <p className="text-gray-800 mt-1">
          <strong>Class Type:</strong> 1 on 1 Live Classes.
        </p>
        <p className="text-gray-800">
          <strong>Class Duration:</strong> 30 Minutes each Session.
        </p>
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

