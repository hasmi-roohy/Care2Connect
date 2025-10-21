import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  if (!aToken) return null; // hides sidebar if not logged in

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
      isActive ? 'bg-white' : 'bg-amber-200'
    }`;

  return (
    <div className="min-h-screen bg-white border-r">
      <ul className="text-black mt-5">
        <NavLink to="/admin-dashboard" className={linkClass}>
          <img src={assets.home_icon} alt="Dashboard" />
          <p>Dashboard</p>
        </NavLink>

        <NavLink to="/all-appointments" className={linkClass}>
          <img src={assets.appointment_icon} alt="Appointments" />
          <p>Appointments</p>
        </NavLink>

        <NavLink to="/add-doctor" className={linkClass}>
          <img src={assets.add_icon} alt="Add Doctor" />
          <p>Add Doctor</p>
        </NavLink>

        <NavLink to="/doctor-list" className={linkClass}>
          <img src={assets.people_icon} alt="Doctors List" />
          <p>Doctors List</p>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
