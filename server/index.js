import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json()); //allows us to accept JSON data in the req.body

app.listen(5000, () => {
    connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});