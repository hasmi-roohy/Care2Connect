import React from "react"
import { assets } from "../assets/assets_frontend/assets"; 
import SpecialityMenu from "../components/SpecialityMenu"
const Header = () => {
  return (
    <div className="flex flex-col md:flex-row bg-amber-200  rounded-lg px-6 md:px-10 lg:px-20">
      
     
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-10 md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
          Book Appointment <br /> with Trusted ones
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className='hidden sm:block' /> schedule
          </p>
        </div>

        <a href="SpectialityMenu"  className="flex items-center bg-white gap-2 text-black font-medium px-8 py-3 rounded-full  text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300">
          Approach now
          <img src={assets.arrow_icon} alt="" />
        </a>
      </div>

      
      <div className="md:w-1/2 flex justify-center">
        <img
          className="w-full h-auto rounded-lg"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
