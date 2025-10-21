import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
    const { doctors, aToken, getAllDoctors,changeAvailability } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllDoctors();
        }
    }, [aToken]);

    if (!doctors) {
        return (
            <div className="flex justify-center items-center h-[90vh]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
            </div>
        );
    }

    if (doctors.length === 0) {
        return (
            <div className="m-5 text-center text-gray-500">
                <p>No doctors found.</p>
            </div>
        );
    }

    return (
        <div className="m-5 h-[90vh] overflow-y-scroll">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">All Doctors</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5">
                {doctors.map((item, index) => (
                    <div 
                        className="border border-indigo-200 rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 bg-white" 
                        key={index}
                    >
                        <img 
                            className="w-full h-48 object-cover bg-indigo-50 group-hover:bg-amber-200 transition-all duration-100" 
                            src={item.image} 
                            alt={`Dr. ${item.name}`}
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{item.speciality}</p>
                            <div className="flex items-center mt-3 text-green-600">
                                <input onChange={()=>changeAvailability(item._id)}                                    type="checkbox" 
                                    checked={item.available} 
                                    readOnly 
                                    className="form-checkbox text-green-600 rounded" 
                                />
                                <p className="ml-2 text-sm font-medium">Available</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsList;