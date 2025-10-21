import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import { toast } from "react-toastify";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Load doctor info from context
  useEffect(() => {
    if (doctors && docId) {
      const foundDoc = doctors.find((doc) => doc._id === docId);
      setDocInfo(foundDoc || null);
    }
  }, [doctors, docId]);

  // Generate available slots for 7 days
  const getAvailableSlots = () => {
    if (!docInfo) return;

    let today = new Date();
    let weekSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDate = `${day}-${month}-${year}`;

        // Check availability
        const isSlotAvailable =
          !docInfo.slots_booked ||
          !docInfo.slots_booked[slotDate] ||
          !docInfo.slots_booked[slotDate].includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      weekSlots.push(timeSlots);
    }

    setDocSlots(weekSlots);
  };

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  // Book appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    if (!slotTime || !docSlots[slotIndex] || docSlots[slotIndex].length === 0) {
      toast.error("Select a valid slot");
      return;
    }

    try {
      const date = docSlots[slotIndex][0].dateTime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = `${day}-${month}-${year}`;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData(); 
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    docInfo && (
      <div className="flex flex-col gap-10">
        {/* Doctor Info */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="sm:w-1/3 flex justify-center">
            <img
              className="bg-amber-200 w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

          <div className="sm:w-2/3 border border-gray-400 rounded-lg p-8 py-7 bg-white">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img src={assets.verified_icon} alt="Verified" />
            </p>

            <p className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-800 mt-3">
                About <img className="w-5" src={assets.info_icon} alt="Info" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>

            {/* Slots */}
            <div className="mt-6">
              <p className="font-medium text-gray-700 mb-2">Booking Slots</p>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {docSlots.map((slots, index) => {
                  if (!slots || slots.length === 0) return null;
                  const firstSlot = slots[0].dateTime;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSlotIndex(index);
                        setSlotTime("");
                      }}
                      className={`px-3 py-1 border rounded-lg text-sm ${
                        index === slotIndex
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {new Date(firstSlot).toLocaleDateString("en-US", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {docSlots[slotIndex] &&
                  docSlots[slotIndex].map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSlotTime(slot.time)}
                      className={`px-3 py-1 border rounded-lg text-sm ${
                        slot.time === slotTime
                          ? "bg-green-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
              </div>

              {slotTime && (
                <p className="mt-3 text-sm text-gray-600">
                  Selected:{" "}
                  <span className="font-medium text-gray-900">{slotTime}</span>
                </p>
              )}

              <div className="mt-6 flex">
                <button
                  onClick={bookAppointment}
                  className={`px-6 py-3 rounded-full shadow-md transition text-sm font-medium ${
                    slotTime
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                  disabled={!slotTime}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Doctors */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Related Doctors
          </h2>
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    )
  );
};

export default Appointment;
