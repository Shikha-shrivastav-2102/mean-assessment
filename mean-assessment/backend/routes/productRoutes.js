
const express = require('express');

const router = express.Router();

const verifyToken = require('../middleware/authMiddleware');

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')

// POST - Create
router.post('/', verifyToken,  createProduct);

// GET - All products
router.get('/', verifyToken, getProducts);

// GET - Single product
router.get('/:id', verifyToken, getProductById);

// PUT - Update
router.put('/:id', verifyToken, updateProduct);

// DELETE - Delete
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
