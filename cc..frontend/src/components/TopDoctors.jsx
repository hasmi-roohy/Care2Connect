import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    if (!doctors || doctors.length === 0) {
        return <p className="text-center mt-10">Loading doctors...</p>;
    }

    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-800 md:mx-10">
            <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
            <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors</p>

            <div className="w-full grid grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                        className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                    >
                        <img className="bg-blue-50 w-full h-48 object-cover" src={item.image} alt={item.name} />
                        <div className="p-4">
                            <div className="flex items-center gap-2 text-sm text-green-500">
                                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                                <p>Available</p>
                            </div>
                            <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                            <p className="text-gray-600 text-sm">{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => { navigate('/doctors'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
            >
                More
            </button>
        </div>
    );
};

export default TopDoctors;
