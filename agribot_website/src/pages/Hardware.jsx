import React from "react";
import { ShieldCheck, Eye, Cpu, Move3D, Zap, Handshake, Droplet, Joystick, Leaf, Settings } from "lucide-react";

const features = [
  {
    icon: <Eye className="w-12 h-12 text-green-700" />,
    title: "Advanced Weed Detection",
    description: "Our bot intelligently distinguishes between crops and unwanted weeds, ensuring precise and effective weed removal."
  },
  {
    icon: <Cpu className="w-12 h-12 text-green-700" />,
    title: "Smart Navigation",
    description: "Equipped with an intelligent path-following system, it autonomously navigates your farm for maximum efficiency."
  },
  {
    icon: <Move3D className="w-12 h-12 text-green-700" />,
    title: "Precision Weed Removal",
    description: "Targets and eliminates weeds with pinpoint accuracy, minimizing damage to crops."
  },
  {
    icon: <ShieldCheck className="w-12 h-12 text-green-700" />,
    title: "Rugged & Reliable",
    description: "Built to withstand tough agricultural environments, ensuring long-lasting performance."
  },
  {
    icon: <Droplet className="w-12 h-12 text-green-700" />,
    title: "Smart Irrigation",
    description: "Automated irrigation system that ensures optimal water usage, reducing waste and improving crop health."
  },
  {
    icon: <Joystick className="w-12 h-12 text-green-700" />,
    title: "Manual Control",
    description: "Switch to manual mode anytime for direct control, offering flexibility in various farming operations."
  },
  {
    icon: <Leaf className="w-12 h-12 text-green-700" />,
    title: "Eco-Friendly",
    description: "Reduces chemical herbicide usage, promoting a healthier and more sustainable farming environment."
  },
  {
    icon: <Settings className="w-12 h-12 text-green-700" />,
    title: "Customizable Operations",
    description: "Adjust settings based on farm requirements for a personalized farming experience."
  }
];

const Hardware = () => {
  return (
    <div className="container mx-auto pt-[12vh] px-12 pb-9 ">
      {/* Overview Section */}
      <div className="text-center mb-16">
        <h1 className="mt-9 font-black text-4xl flex items-center justify-center mb-9">Revolutionizing Smart Farming</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Introducing our next-generation Weed Detection Bot (WeedOBot) – an advanced agricultural assistant designed to 
          automate weed removal, optimize irrigation, and enhance productivity. Say goodbye to labor-intensive farming 
          and hello to precision-driven automation!
        </p>
      </div>

      {/* Key Features Section */}
      <h2 className="text-4xl font-bold text-center mb-10 text-green-800">Key Functionalities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 text-center hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold text-green-900 mb-2">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16 bg-green-100 p-10 rounded-xl text-center shadow-md">
        <h2 className="text-4xl font-bold text-green-900">Why Choose Our WeedOBot?</h2>
        <p className="text-lg text-gray-800 mt-4 max-w-3xl mx-auto">
          Unlike traditional farming methods, our bot leverages AI-driven precision, automation, and efficiency.
          It operates tirelessly, reducing the need for herbicides, lowering labor costs, and increasing farm yield.
          With real-time adaptability and low maintenance, it's the perfect partner for modern agriculture.
        </p>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-4xl font-bold text-green-900">Upgrade Your Farm Today</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-3">
          Explore how our AI-powered Weed Detection Bot can transform your farming experience. Reach out now to learn more or request a demo.
        </p>
        <button className="mt-8 px-8 py-4 bg-green-700 text-white rounded-xl text-lg font-semibold hover:bg-green-800 transition transform hover:scale-105">
          Request a Demo
        </button>
      </div>
    </div>
  );
};

export default Hardware;
