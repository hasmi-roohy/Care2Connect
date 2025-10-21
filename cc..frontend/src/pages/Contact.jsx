import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
      {/* Heading */}
      <div className="text-center text-3xl font-semibold text-gray-700">
        <p>
          CONTACT <span className="text-blue-600">US</span>
        </p>
      </div>

      {/* Content */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <img
          src={assets.contact_image}
          alt="Hospital Contact"
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />

        {/* Info */}
        <div className="flex-1 space-y-4 text-gray-600">
          <h2 className="text-2xl font-bold text-gray-800">Our Office</h2>
          <p className="text-lg">No: 1-1560, Gandhinagar, YMG</p>
          <p className="text-lg">
            <span className="font-medium">Phone:</span> 63055-----
          </p>
          <p className="text-lg">
            <span className="font-medium">Email:</span> contact@hospital.com
          </p>

          {/* Button */}
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md transition">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
