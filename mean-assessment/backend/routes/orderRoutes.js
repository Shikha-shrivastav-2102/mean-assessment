const express = require('express');

const router = express.Router();

const verifyToken = require('../middleware/authMiddleware');

const {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/orderController');

router.post('/', verifyToken, createOrder);

router.get('/:id', verifyToken, getOrder);

router.put('/:id', verifyToken, updateOrder);

router.delete('/:id', verifyToken, deleteOrder);

module.exports = router;