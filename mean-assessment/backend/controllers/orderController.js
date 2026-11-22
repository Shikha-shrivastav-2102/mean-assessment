
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');
const db = require('../config/mysql');


// CREATE ORDER
exports.createOrder = async (req, res) => {
    try {

        const { productIds } = req.body;

        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({
                message: 'Select at least one product'
            });
        }

        if (!productIds.every(id =>
            mongoose.Types.ObjectId.isValid(id)
        )) {
            return res.status(400).json({
                message: 'Invalid product ID'
            });
        }

        // Get MySQL user ID from verified JWT
        const userId = req.user.userId;

        // Verify user exists in MySQL
        const [users] = await db.execute(
            'SELECT id FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: 'User does not exist'
            });
        }

        // Fetch products from MongoDB
        const products = await Product.find({
            _id: { $in: productIds }
        });

        if (products.length !== new Set(productIds).size) {
            return res.status(400).json({
                message: 'One or more products do not exist'
            });
        }

        // Calculate total
        const totalAmount = products.reduce(
            (sum, product) => sum + product.price,
            0
        );

        // Create order in MongoDB
        const order = await Order.create({
            userId,
            productIds: products.map(product => product._id),
            totalAmount
        });

        res.status(201).json({
            message: 'Order created successfully',
            data: order
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Order creation failed'
        });
    }
};


// GET ORDER BY ID
exports.getOrder = async (req, res) => {
    try {

        const order = await Order.findOne({
            _id: req.params.id,
            userId: req.user.userId
        }).populate('productIds');

        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        const [users] = await db.execute(
            'SELECT id, username FROM users WHERE id = ?',
            [order.userId]
        );

        res.status(200).json({
            order,
            user: users[0] || null
        });

    } catch (error) {
        res.status(400).json({
            message: 'Unable to fetch order'
        });
    }
};


// UPDATE ORDER
exports.updateOrder = async (req, res) => {
    try {

        const { productIds } = req.body;

        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({
                message: 'Product IDs are required'
            });
        }

        if (!productIds.every(id =>
            mongoose.Types.ObjectId.isValid(id)
        )) {
            return res.status(400).json({
                message: 'Invalid product ID'
            });
        }

        const products = await Product.find({
            _id: { $in: productIds }
        });

        if (products.length !== new Set(productIds).size) {
            return res.status(400).json({
                message: 'One or more products do not exist'
            });
        }

        const totalAmount = products.reduce(
            (sum, product) => sum + product.price,
            0
        );

        const order = await Order.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.userId
            },
            {
                productIds: products.map(p => p._id),
                totalAmount
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        res.status(200).json({
            message: 'Order updated successfully',
            data: order
        });

    } catch (error) {
        res.status(400).json({
            message: 'Unable to update order'
        });
    }
};


// DELETE ORDER
exports.deleteOrder = async (req, res) => {
    try {

        const order = await Order.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        res.status(200).json({
            message: 'Order deleted successfully'
        });

    } catch (error) {
        res.status(400).json({
            message: 'Unable to delete order'
        });
    }
};
