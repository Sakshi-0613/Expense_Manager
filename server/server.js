import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from './config/mongodb.js'
import authRouter from './routes/authRoutes.js'
import userRouter from "./routes/userRoutes.js";
import expenseRoutes from './routes/expenseRoutes.js';
import incomeRoutes from "./routes/incomeRoutes.js";

const app= express();
const port = process.env.PORT || 4000
connectDB();

//instead of directly adding in cors for letting frontend (link) access backend we are using a variable allowedOrigins 
const allowedOrigins = 'http://localhost:5173'

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin :allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials : true}));


//API Endpoints
app.get('/',(req, res)=> res.send("API Working Fine"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/expenses',expenseRoutes);
app.use("/api/income", incomeRoutes);

app.listen(port, ()=> console.log(`server started on PORT : ${port}`))