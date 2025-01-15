import express from 'express'
import dotenv from 'dotenv'
import connectDb from './DB/db.js';
import router from './Routes/api.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',router);

app.listen(PORT,()=>{
    connectDb()
    console.log(`Server is running at ${PORT}`);
})