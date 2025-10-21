import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  const [showFilter,setShowFilter]=useState(false)

  // Apply filter whenever doctors or speciality changes
  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div className="px-6 py-8">
      <p className="text-gray-800">
        Browse through all doctor specialists
      </p>

      {/* Speciality list */}
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
      <div className="flex flex-col gap-4 text-sm text-gray-600">
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter?'bg-amber-200':'text-white'}`} onClick={()=>{setShowFilter(prev =>!prev)}}> Filters</button>
       <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter? 'flex':'hidden sm:flex'}`}>
        <p onClick={()=>speciality ==='General physician'?navigate('/doctors'):navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16  border-gray-400 rounded transition-all cursor-pointer ${speciality =="General Physician"? "bg-indigo-100 text-black":""}`}>General Physician</p>
        <p onClick={()=>speciality ==='Gynecologist'?navigate('/doctors'):navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16  border-gray-300 rounded transition-all cursor-pointer ${speciality =="Gynacologist"? "bg-indigo-100 text-black":""} `}>Gynecologist</p>
        <p onClick={()=>speciality ==='Dermatologist'?navigate('/doctors'):navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16  border-gray-300 rounded transition-all cursor-pointer ${speciality =="Dermatologist"? "bg-indigo-100 text-black":""}`}>Dermatologist</p>
        <p onClick={()=>speciality ==='Pediatricians'?navigate('/doctors'):navigate('/doctors/Pediatricians')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16  border-gray-300 rounded transition-all cursor-pointer ${speciality =="Pediatricians"? "bg-indigo-100 text-black":""}`}>Pediatricians</p>
        <p onClick={()=>speciality ==='Neurologist'?navigate('/doctors'):navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16  border-gray-300 rounded transition-all cursor-pointer ${speciality =="Neurologist"? "bg-indigo-100 text-black":"" }`}>Neurologist</p>
        <p onClick={()=>speciality ==='Gastroenterologist'?navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16  border-gray-300 rounded transition-all cursor-pointer ${speciality =="Gastroenterologist"? "bg-indigo-100 text-black":""}`}>Gastroenterologist</p>
      </div>
      </div>

      {/* Doctors grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
        {filterDoc.length > 0 ? (
          filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
            >
              <img
                className="bg-blue-50 w-full h-48 object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No doctors available for this speciality.
          </p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Doctors;
