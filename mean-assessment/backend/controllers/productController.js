
const Product = require('../models/product');

// 1. Create Product
const createProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        if (!name || price === undefined || !description) {
            return res.status(400).json({
                success: false,
                message: 'Name, price and description are required'
            });
        }

        if (!Number.isFinite(price) || price < 0) {
            return res.status(400).json({
                success: false,
                message: 'Price must be a valid non-negative number'
            });
        }

        const product = await Product.create({
            name,
            price,
            description
        });

        return res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 2. Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 3. Get Product By ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^[a-fA-F0-9]{24}$/.test(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID'
            });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 4. Update Product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description } = req.body;

        if (!/^[a-fA-F0-9]{24}$/.test(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID'
            });
        }

        if (!name || price === undefined || !description) {
            return res.status(400).json({
                success: false,
                message: 'Name, price and description are required'
            });
        }

        if (!Number.isFinite(price) || price < 0) {
            return res.status(400).json({
                success: false,
                message: 'Price must be a valid non-negative number'
            });
        }

        const product = await Product.findByIdAndUpdate(
            id,
            { name, price, description },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 5. Delete Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^[a-fA-F0-9]{24}$/.test(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID'
            });
        }

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Export all controller functions
module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
