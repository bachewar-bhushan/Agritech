import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
      
        <div>
          <h2 className="text-xl font-bold mb-3">About Us</h2>
          <p className="text-gray-300">
            We are dedicated to revolutionizing agriculture with AI-powered weed removal solutions, ensuring efficiency and sustainability for farmers worldwide.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Contact Us</h2>
          <p className="flex items-center justify-center md:justify-start text-gray-300">
            <Mail className="w-5 h-5 mr-2" /> agritech@gmail.com
          </p>
          <p className="flex items-center justify-center md:justify-start text-gray-300 mt-2">
            <Phone className="w-5 h-5 mr-2" /> +91 98765 43210
          </p>
          <p className="flex items-center justify-center md:justify-start text-gray-300 mt-2">
            <MapPin className="w-5 h-5 mr-2" /> Maharashtra, India
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Follow Us</h2>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-300 hover:text-white transition">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Agritech. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
