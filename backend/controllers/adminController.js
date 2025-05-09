import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary} from 'cloudinary';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';

import doctorModel from '../models/DoctorModel.js';
import userModel from '../models/UserModel.js';
// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file

        // checking for all data to add doctor
       if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
       return res.json({success:false, message: 'Missing Details'})
    } 
    // checking for valid email
    if (!validator.isEmail(email)) {
        return res.json({ success: false, message: 'Invalid Email' });
    }
    // checking for valid password
    if (password.length < 8) {
        return res.json({ success: false, message: 'Please enter a strong Password' });
    }
    // hassing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
    const imageUrl = imageUpload.secure_url

    const doctorData = {
        name,
        email,
        image: imageUrl,
        password: hashedPassword,
        speciality,
        degree,
        experience,
        about,
        fees,
        address,
        date: Date.now()
    }
    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()
    res.json({success:true, message:'Doctor Added Successfully'})

}
catch (error) {
    console.log(error)
    res.json({success:false, message: error.message})
}
}
// API For admin Login
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
       const token = jwt.sign(email+password,process.env.JWT_SECRET)
       res.json({success:true, message: 'Admin Login Successfully', token})

    }else {
        res.json({success:false, message:"Invalid credentials"})
    }
    
}catch{
    console.log(error)
res.json({success:false, message: error.message})
}
}

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true, message: 'Doctors List', doctors})
    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true, appointments})
    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
// API for cancel appointments
const appointmentCancel = async (req, res) => {
    try {
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
       
        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

        // releasing doctor slot
        const {docId, slotDate, slotTime} = appointmentData

        const doctorData = await doctorModel.findById(docId)
        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked [slotDate].filter(e => e!== slotTime)
        
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true, message: "Appointment cancelled successfully"})
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
//API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const user = await userModel.find({})
        
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: user.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({success:true, dashData})
    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
export { addDoctor, adminLogin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard };