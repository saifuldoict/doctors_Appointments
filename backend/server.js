import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/Cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';


// app config
 const port =process.env.PORT || 3000;
const app = express();
connectDB();
connectCloudinary();


// middleware
app.use(express.json());
app.use(cors());

// api endpoint
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})