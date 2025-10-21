import React, { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocImg(e.target.files[0]);
    }
  };

  const handleSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error('Image not selected');
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      // ✅ Log form data as key-value pairs
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const {data}=await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{aToken}})
      if(data.success){
         toast.success(data.message);
         setDocImg(false);
         setName('');
         setPassword('');
         setEmail('');
         setAddress1('');
         setAddress2('');
         setAbout('');
         setDegree('');
         setFees('')

         
      }
else{
toast.error('Something went wrong');
}
     
    } catch (error) {
      console.error('Error in submitting form:', error);
      
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
      <form
        onSubmit={handleSubmitHandler}
        className="w-full max-w-6xl bg-white p-12 rounded-xl shadow-lg overflow-y-auto space-y-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Add Doctor</h2>

        {/* Image Upload */}
        <div className="flex items-center gap-6 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-24 h-24 object-cover bg-gray-100 rounded-full border border-gray-300 p-1"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload Doctor"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={handleImageChange}
          />
          <p className="text-base">
            Upload Doctor <br /> Picture
          </p>
        </div>

        {/* Name, Email, Password, Experience, Fees */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-3">
            <label className="text-gray-600 text-lg">Your Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-lg"
            />
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <label className="text-gray-600 text-lg">Doctor Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-lg"
            />
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <label className="text-gray-600 text-lg">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-lg"
            />
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <label className="text-gray-600 text-lg">Experience:</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-lg"
            >
              <option value="">Select Experience</option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} year`}>
                  {`${i + 1} year`}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <label className="text-gray-600 text-lg">Fees:</label>
            <input
              type="number"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              required
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-lg"
            />
          </div>
        </div>

        {/* Speciality, Education, Address */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-3">
            <label className="text-gray-600 text-lg">Speciality:</label>
            <select
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-lg"
            >
              <option value="">Select Speciality</option>
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Neurologist">Neurologist</option>
            </select>
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <label className="text-gray-600 text-lg">Education:</label>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-lg"
            />
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <label className="text-gray-600 text-lg">Address:</label>
            <input
              type="text"
              placeholder="Address 1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              required
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 mb-3 text-lg"
            />
            <input
              type="text"
              placeholder="Address 2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-lg"
            />
          </div>
        </div>

        {/* About Doctor */}
        <div className="flex flex-col gap-3">
          <label className="text-gray-600 text-lg">About Doctor:</label>
          <textarea
            placeholder="Write about doctor"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-4 focus:outline-none focus:ring-2 focus:ring-amber-400 min-h-[150px] text-lg"
          />
        </div>

        <button
          type="submit"
          className="bg-amber-400 text-white px-8 py-3 rounded-lg hover:bg-amber-500 transition-colors text-lg font-semibold"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
