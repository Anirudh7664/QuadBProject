const express = require('express');
const router = express.Router();
const Product = require('../models/Product')

// to fetch all products
router.get('/fetchproduct', async (req, res) => {
    try {

        const product = await Product.find()
        res.send(product)
    }
    catch (error) {

        res.status(500).send("Something went wrong")
    }
})
// To get Single product
router.get('/fetchproduct/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        
        res.send(product)
    } catch (error) {
        res.status(500).send("Something went wrong")
    }
})
// to get products for single category
router.post('/fetchproduct/type', async (req, res) => {
    const { userType } = req.body
    try {
        const product = await Product.find({ type: userType })
        res.send(product)
    } catch (error) {
        res.status(500).send("Something went wrong")
    }
})
// to get products category wise
router.post('/fetchproduct/category', async (req, res) => {
    const { userType, userCategory } = req.body;

    try {
        let product;
        
        if (userCategory === "all") {
            product = await Product.find({ type: userType });
        } else if (userCategory === "pricelowtohigh") {
            product = await Product.find({ type: userType }).sort({ price: 1 });
        } else if (userCategory === "pricehightolow") {
            product = await Product.find({ type: userType }).sort({ price: -1 });
        } else if (userCategory === "highrated") {
            product = await Product.find({ type: userType }).sort({ rating: -1 });
        } else if (userCategory === "lowrated") {
            product = await Product.find({ type: userType }).sort({ rating: 1 });
        } else {
            product = await Product.find({ type: userType, category: userCategory });
        }

        console.log("Products fetched:", product); // Log fetched products
        
        if (!product || product.length === 0) {
            console.log("No products found for:", { userType, userCategory });
            res.status(404).json({ error: "No products found" });
        } else {
            res.json(product);
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Something went wrong");
    }
});



module.exports = router