import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
      {/* Heading */}
      <div className="text-center text-3xl font-semibold text-gray-700">
        <p>
          ABOUT <span className="text-blue-600">US</span>
        </p>
      </div>

      {/* Image + Content */}
      <div className="my-12 flex flex-col md:flex-row items-center gap-10">
        <img
          src={assets.about_image}
          alt="Hospital building"
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />
        <div className="flex-1 space-y-4 text-gray-600 leading-relaxed">
          <p>
            Our hospital is equipped with state-of-the-art medical facilities and
            modern diagnostic tools to ensure accurate and effective treatments.
            We maintain world-class standards in patient care, with advanced
            laboratories, digital imaging, and fully equipped operation theaters.
            Every department is supported by skilled staff and the latest
            technology to deliver safe, reliable, and compassionate healthcare.
          </p>
          <p>
            We believe in combining care with technology. Our hospital is
            equipped with modern diagnostic labs, advanced imaging systems, and
            specialized treatment units. From comfortable patient rooms to fully
            equipped operation theaters, we ensure that every patient receives
            the best care in a safe and supportive environment.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="mt-12 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
        <p className="text-gray-600 leading-relaxed">
          Our hospital features advanced medical equipment, modern laboratories,
          and well-equipped operation theaters. With a focus on safety, hygiene,
          and technology, we strive to deliver top-quality healthcare in a
          patient-friendly environment.
        </p>
      </div>
    </div>
  );
};

export default About;
