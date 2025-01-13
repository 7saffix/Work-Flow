import express from 'express'
import dotenv from 'dotenv'
import connectDb from './DB/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    connectDb()
    console.log(`Server is running at ${PORT}`);
})