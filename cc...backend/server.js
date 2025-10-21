import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Connect to database and cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true // If you're using cookies or authentication
}));

// API Endpoints
app.use('/api/admin', adminRouter);   // e.g. localhost:4000/api/admin/add-doctor
app.use('/api/doctors', doctorRouter);
app.use('/api/user', userRouter);

// Test endpoint
app.get("/", (req, res) => {
    res.send("API working");
});

// Start server
app.listen(port, () => {
    console.log(`Server connected successfully on port ${port}`);
});
