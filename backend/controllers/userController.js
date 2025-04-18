import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';

import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/UserModel.js';
import doctorModel from '../models/DoctorModel.js';
// API to register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !password || !email) {
            return res.json({success:false, message: "Please fill in all fields" });
        }
        // validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false, message: "Invalid email"});
        }
        // validating strong password
        if(password.length < 8) {
            return res.json({success:false, message: "Password must be at least 8 characters long"})
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = { name, email, password: hashedPassword }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.json({success:true, token})

    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
// API for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email})
        // const user = await userModel.findOne({email})
        if(!user){
             res.json({success:false, message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
       
        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true, token})
        }else{
            res.json({success:false, message: "Invalid password"})
        }

    } catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }

}


// API to get user profile data
const getUserProfile = async (req, res) => {
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true, userData})

    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
// API to update user profile data

const updateUserProfile = async (req, res) => {
    try {
        const {userId, name, phone, address, dob, gender} = req.body 
        const imageFile = req.file

        if(!name || !phone || !dob || !gender){
            return res.json({success: false, message: "Please fill all fields"})
        }
        await userModel.findByIdAndUpdate(userId,{name, phone, address, dob, gender})
        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'})
            const imageURL = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId,{image: imageURL})
        }
        res.json({success:true, message:'profile updated'})
    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
// API to book Appointment
const bookAppointment = async (req, res) => {
    try {
        const {userId, docId, slotDate, slotTime} = req.body

        // const docData = await doctorModel.findById(docId).select('-password')
        const docData = await doctorModel.findById(docId).select('-password')
        if(!docData.available){
            return res.json({success: false, message: "Doctor not available"})
        }
        let slots_booked = docData.slots_booked
        // Check if slot is already booked
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success: false, message: "Slot not available"})
            } else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] =[]
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId). select('-password')
        delete docData.slots_booked
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,   
            date: Date.now()
        }
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()
        //save new slots data in docData

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success: true, message: "Appointment booked successfully"})

    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
    try {
        const {userId} = req.body
        const appointments = await appointmentModel.find({userId})
        res.json({success: true, appointments})
    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const {userId, appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
       // verify appoint user
        if(appointmentData.userId !== userId){
            res.json({success:false, message: "Unauthorized access" })
        }
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
//API to make payment SSL payment gateway


export {registerUser, loginUser, getUserProfile, updateUserProfile, bookAppointment, listAppointment, cancelAppointment}