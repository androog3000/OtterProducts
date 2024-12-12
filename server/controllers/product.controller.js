import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    console.log("Entered GET products");
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
        //console.log(typeof products);
        //console.log("Products:\n" + products);
    } catch (error) {
        console.log("error fetching products", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const createProduct = async (req, res) => {
    //console.log("API POST", req.body, typeof req.body);
    const product = req.body; // user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        console.log("Product saved:", product);
        res.status(201).json({ success: true, data: newProduct});
    } catch (error) {
        console.error(`Error in creating product ${error.message}`);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Product Id"});
    }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error "}); //500 server error
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    console.log("id:", id);

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Product Id"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted"});
    }   catch (error) {
        console.log("error deleting products", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}