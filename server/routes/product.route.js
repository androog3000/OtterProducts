import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Welcome to the shire!");
});

router.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("error fetching products", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}); 

//console.log(process.env.MONGO_URI);

router.get('/products', (req, res) => {
    res.send("Products coming soon");
});

router.post('/api/products', async (req, res) => {
    console.log("API POST", req.body, typeof req.body);
    const product = req.body; // user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        console.log("Product saved: ", product, typeof product);
        res.status(201).json({ success: true, data: newProduct});
    } catch (error) {
        console.error(`Error in creating product ${error.message}`);
        res.status(500).json({ success: false, message: "Server Error"});
    }
});

router.put('/api/products/:id', async (req, res) => {
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
})

router.delete("/api/products/:id", async (req, res) => {
    const {id} = req.params;
    console.log("id:", id);

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted"});
    }   catch (error) {
        console.log("error deleting products", error.message);
        res.status(404).json({ success: false, message: "Product not found" });
    }
});

export default router;