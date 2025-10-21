import validator from 'validator'
import bcrypt from 'bcrypt';
import userModel from '../models/userModels.js'
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModels.js'
import  appointmentModel from '../models/appointmentModel.js'
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password || !name) {
            return res.json({ success: false, message: "missingdetails" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "enter a strong password" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = {
            name, email, password: hashedPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (!user) {
            res.json({ sucess: false, message: 'user doesnot exist' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const getProfile = async (req, res) => {
    try {
        // Corrected: Get userId from req instead of req.body
        const userId = req.userId;
        const userData = await userModel.findById(userId).select(['-password'])
        res.json({ success: true, userData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const updateProfile = async (req, res) => {
    try {
        // Corrected: Get userId from req instead of req.body
        const { name, phone, address, dob, gender } = req.body;
        const userId = req.userId;
        const imageFile = req.file
        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "data missing" })
        }
        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }
        res.json({ success: true, message: "profileUpdated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const bookAppointment = async (req, res) => {
  try {
      const userId = req.userId; 
    const {  docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    // Initialize slots_booked if undefined
    let slots_booked = docData.slots_booked || {};

    // Initialize the array for the specific date if not exists
    if (!slots_booked[slotDate]) {
      slots_booked[slotDate] = [];
    }

    // Check if the slot is already booked
    if (slots_booked[slotDate].includes(slotTime)) {
      return res.json({ success: false, message: "Slot not available" });
    }

    // Add the booked slot
    slots_booked[slotDate].push(slotTime);

    // Get user data
    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked; // Remove booked slots from response

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Update doctor's slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const listAppointment=async(req,res)=>{
    try{
         const userId=req.userId;
         const appointments=await appointmentModel.find({userId}) 
         res.json({success:true,appointments})
    }catch(error){
           console.log(error)
               res.json({success:false,message:error.message})
    }
}


const cancelAppointment=async(req,res)=>{
    try{
         const {userId,appointmentId}=req.body;
         const appointmentData=await appointmentModel.findById(appointmentId)
         if(appointmentData.userId!=userId){
            return res.json({success:false,message:"unauthorized response"})
         }
         await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
         //releasing doctors slot
         const {docId,slotDate,slotTime}=appointmentData
         const doctorsData=await doctorModel.findById(docId);
         let slots_booked=doctorsData.slots_booked
         slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)
         await doctorModel.findByIdAndUpdate(docId,{slots_booked})
         res.json({success:true,message:"appointment canceled"})
    }
catch(error){
    console.log(error);
    res.json({success:false,message:error.message});

}
}





export { registerUser, loginUser, getProfile, updateProfile ,bookAppointment,listAppointment,cancelAppointment}
