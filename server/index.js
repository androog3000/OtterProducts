import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = 5040;

app.use(express.json()); //allows us to accept JSON data in the req.body

//fills in URL for routes
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});